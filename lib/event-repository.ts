import {
  loadDraft,
  hasStoredDraft,
  loadPublishedEvents,
  loadTemporaryInvite,
  normalizeStoredEvent,
  saveDraft,
  savePublishedEvent,
  saveTemporaryInvite,
  type EventDraft,
} from "@/lib/event-draft";
import { BYPASS_AUTH_FOR_DEMO } from "@/lib/demo-bypass";
import { ensureUniqueSlug, getEventUrl } from "@/lib/event-url";
import { isLiveEventType } from "@/lib/event-types";
import { createQrCodeSvg } from "@/lib/qr-code";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const localTestMode = process.env.NEXT_PUBLIC_JASHNLY_LOCAL_TEST_MODE === "true" || BYPASS_AUTH_FOR_DEMO;
let draftWriteQueue: Promise<void> = Promise.resolve();

function getInvitePathMatches(inviteId: string) {
  return [`/i/${inviteId}`, `/invite/${inviteId}`];
}

function getStableInviteId(event: Partial<EventDraft>) {
  if (event.status === "published" && event.slug) return event.slug;
  const fromPublicUrl = event.publicUrl?.match(/\/(?:i|invite)\/([^/?#]+)/)?.[1];
  return fromPublicUrl || globalThis.crypto?.randomUUID?.() || Date.now().toString();
}

function matchesPublicInvite(event: EventDraft, inviteId: string) {
  if (event.slug === inviteId) return true;
  const paths = getInvitePathMatches(inviteId);
  return paths.some((path) => event.publicUrl?.includes(path) || event.qrCodeData?.includes(path));
}

function loadCachedPublicEvent(inviteId: string) {
  return loadTemporaryInvite(inviteId) ?? loadPublishedEvents().find((event) => matchesPublicInvite(event, inviteId)) ?? null;
}

export async function getCurrentAuthUser() {
  if (BYPASS_AUTH_FOR_DEMO) return null;
  if (localTestMode) return null;
  const { data } = await createSupabaseBrowserClient().auth.getUser();
  return data.user;
}

export async function loadEventDraft() {
  const cached = loadDraft();
  if (localTestMode) return cached;
  const user = await getCurrentAuthUser();
  if (!user) return hasStoredDraft() ? cached : null;
  if (hasStoredDraft()) {
    await persistEventDraft(cached);
    return cached;
  }
  await draftWriteQueue;
  const { data, error } = await createSupabaseBrowserClient()
    .from("event_drafts")
    .select("data")
    .eq("owner_id", user.id)
    .maybeSingle();
  if (error) throw error;
  return data?.data ? normalizeStoredEvent(data.data as Partial<EventDraft>) : null;
}

export async function persistEventDraft(draft: EventDraft) {
  if (!isLiveEventType(draft.eventType)) {
    const weddingDefaults = normalizeStoredEvent({ eventType: "wedding" });
    draft = {
      ...weddingDefaults,
      title: draft.title || weddingDefaults.title,
      primaryName: draft.primaryName,
      secondaryName: draft.secondaryName,
      date: draft.date || weddingDefaults.date,
      time: draft.time || weddingDefaults.time,
      venueName: draft.venueName,
      address: draft.address,
      city: draft.city,
      mapLink: draft.mapLink,
      youtubeLink: draft.youtubeLink,
      gallery: draft.gallery,
      contacts: draft.contacts,
      schedule: draft.schedule,
      eventType: "wedding",
    };
  }
  saveDraft(draft);
  if (localTestMode) {
    return;
  }
  const write = draftWriteQueue.catch(() => undefined).then(async () => {
    const user = await getCurrentAuthUser();
    if (!user) return;
    const { error } = await createSupabaseBrowserClient()
      .from("event_drafts")
      .upsert({ owner_id: user.id, data: draft, updated_at: new Date().toISOString() });
    if (error) throw error;
  });
  // Keep the queue usable after a transient failed write while still surfacing
  // the current write failure to callers that explicitly await it.
  draftWriteQueue = write.catch(() => undefined);
  return write;
}

export async function loadOrganizerEvents() {
  const cached = loadPublishedEvents();
  if (localTestMode) return cached;
  const user = await getCurrentAuthUser();
  if (!user) return [];
  const { data, error } = await createSupabaseBrowserClient()
    .from("events")
    .select("data")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map((row: { data: unknown }) => normalizeStoredEvent(row.data as Partial<EventDraft>));
}

export async function loadPublicEvent(slug: string) {
  const cached = loadCachedPublicEvent(slug);
  if (process.env.NODE_ENV !== "production") {
    console.debug("Public invite lookup:", {
      routeParamId: slug,
      fetchResult: cached ? "local-cache" : "local-miss",
      inviteId: cached?.slug,
      generatedInviteUrl: cached?.publicUrl,
    });
  }
  if (localTestMode) return cached;
  const { data, error } = await createSupabaseBrowserClient()
    .from("events")
    .select("data")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  if (!data?.data) return null;
  const event = normalizeStoredEvent(data.data as Partial<EventDraft>);
    if (process.env.NODE_ENV !== "production") {
      console.debug("Public invite lookup:", {
        routeParamId: slug,
        fetchResult: "supabase",
        inviteId: event.slug,
        generatedInviteUrl: event.publicUrl,
      });
    }
  return event;
}

export async function publishEvent(event: EventDraft) {
  if (!isLiveEventType(event.eventType)) {
    throw new Error("This event type is coming soon. Wedding invitations are live now.");
  }
  if (process.env.NODE_ENV !== "production") {
    console.debug("Publishing event template:", {
      slug: event.slug,
      templateId: event.templateId,
      eventType: event.eventType,
    });
  }

  if (localTestMode) {
    const inviteId = getStableInviteId(event);
    const slug = inviteId;
    const publicUrl = getEventUrl(slug);
    const qrCodeData = await createQrCodeSvg(publicUrl);
    const published = { ...event, slug, publicUrl, qrCodeData, status: "published" as const };
    if (process.env.NODE_ENV !== "production") {
      console.debug("Published local public invite:", {
        eventId: event.slug,
        inviteId,
        publicInviteId: slug,
        generatedInviteUrl: publicUrl,
      });
    }
    saveTemporaryInvite(inviteId, published);
    savePublishedEvent(published);
    return published;
  }

  const user = await getCurrentAuthUser();
  if (!user) throw new Error("You must be signed in to publish an event.");
  await draftWriteQueue;
  const supabase = createSupabaseBrowserClient();
  const { data: existing, error: existingError } = await supabase.from("events").select("slug").ilike("slug", `${event.slug || event.title}%`);
  if (existingError) throw existingError;
  const inviteId = getStableInviteId(event);
  const slug = event.status === "published" && event.slug ? event.slug : ensureUniqueSlug(inviteId, (existing || []) as Partial<EventDraft>[]);
  const publicUrl = getEventUrl(slug);
  const qrCodeData = await createQrCodeSvg(publicUrl);
  const published = { ...event, ownerId: user.id, slug, publicUrl, qrCodeData, status: "published" as const };
  if (process.env.NODE_ENV !== "production") {
    console.debug("Published event template:", {
      eventId: event.slug,
      slug: published.slug,
      inviteId,
      publicInviteId: published.slug,
      templateId: published.templateId,
      publicUrl: published.publicUrl,
    });
  }
  const { error } = await supabase.from("events").insert({
    owner_id: user.id,
    slug,
    status: "published",
    event_type: published.eventType,
    title: published.title,
    date: published.date || null,
    time: published.time || null,
    theme: published.theme,
    template_id: published.templateId,
    template_name: published.templateName,
    template_image: published.templateImage || null,
    data: published,
  });
  if (error) throw error;
  savePublishedEvent(published);
  const { error: draftDeleteError } = await supabase.from("event_drafts").delete().eq("owner_id", user.id);
  if (draftDeleteError) {
    // The event is already published. Draft cleanup must never turn a successful
    // insert into an apparent publish failure that strands the user on Step 5.
    console.warn("Published event, but could not remove the saved draft.", draftDeleteError.message);
  }
  return published;
}

export async function updatePublishedEvent(event: EventDraft) {
  if (!isLiveEventType(event.eventType)) {
    throw new Error("This event type is coming soon. Wedding invitations are live now.");
  }
  savePublishedEvent(event);
  if (localTestMode) return event;
  const user = await getCurrentAuthUser();
  if (!user) throw new Error("You must be signed in.");
  const { error } = await createSupabaseBrowserClient()
    .from("events")
    .update({
      event_type: event.eventType,
      title: event.title,
      theme: event.theme,
      template_id: event.templateId,
      template_name: event.templateName,
      template_image: event.templateImage || null,
      data: event,
      updated_at: new Date().toISOString(),
    })
    .eq("slug", event.slug)
    .eq("owner_id", user.id);
  if (error) throw error;
  return event;
}
