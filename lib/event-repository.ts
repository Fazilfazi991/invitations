import {
  loadDraft,
  loadPublishedEvents,
  normalizeStoredEvent,
  saveDraft,
  savePublishedEvent,
  type EventDraft,
} from "@/lib/event-draft";
import { ensureUniqueSlug, getEventUrl } from "@/lib/event-url";
import { createQrCodeSvg } from "@/lib/qr-code";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const localTestMode = process.env.NEXT_PUBLIC_JASHNLY_LOCAL_TEST_MODE === "true";
let draftWriteQueue: Promise<void> = Promise.resolve();

function fallback<T>(message: string, value: T, error?: unknown) {
  console.warn(`[occazn storage fallback] ${message}`, error);
  return value;
}

export async function getCurrentAuthUser() {
  if (localTestMode) return null;
  const { data } = await createSupabaseBrowserClient().auth.getUser();
  return data.user;
}

export async function loadEventDraft() {
  const cached = loadDraft();
  if (localTestMode) return cached;
  try {
    const user = await getCurrentAuthUser();
    if (!user) return cached;
    // A route transition can mount the next create step while the previous
    // step's queued upsert is still in flight. Wait for the newest queued
    // write before reading, otherwise stale remote data can replace the
    // selected event type/template in local state.
    await draftWriteQueue;
    const { data, error } = await createSupabaseBrowserClient()
      .from("event_drafts")
      .select("data")
      .eq("owner_id", user.id)
      .maybeSingle();
    if (error) throw error;
    if (!data?.data) return cached;
    const draft = normalizeStoredEvent(data.data as Partial<EventDraft>);
    saveDraft(draft);
    return draft;
  } catch (error) {
    return fallback("Could not load the Supabase draft.", cached, error);
  }
}

export async function persistEventDraft(draft: EventDraft) {
  saveDraft(draft);
  if (localTestMode) return;
  draftWriteQueue = draftWriteQueue.then(async () => {
    try {
      const user = await getCurrentAuthUser();
      if (!user) return;
      const { error } = await createSupabaseBrowserClient()
        .from("event_drafts")
        .upsert({ owner_id: user.id, data: draft, updated_at: new Date().toISOString() });
      if (error) throw error;
    } catch (error) {
      fallback("Draft remains cached locally because Supabase could not be reached.", undefined, error);
    }
  });
  return draftWriteQueue;
}

export async function loadOrganizerEvents() {
  const cached = loadPublishedEvents();
  if (localTestMode) return cached;
  try {
    const user = await getCurrentAuthUser();
    if (!user) return [];
    const { data, error } = await createSupabaseBrowserClient()
      .from("events")
      .select("data")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false });
    if (error) throw error;
    const events = (data || []).map((row: { data: unknown }) => normalizeStoredEvent(row.data as Partial<EventDraft>));
    events.forEach(savePublishedEvent);
    return events;
  } catch (error) {
    return fallback("Could not load organizer events from Supabase.", cached, error);
  }
}

export async function loadPublicEvent(slug: string) {
  const cached = loadPublishedEvents().find((event) => event.slug === slug) ?? null;
  if (localTestMode) return cached;
  try {
    const { data, error } = await createSupabaseBrowserClient()
      .from("events")
      .select("data")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    if (error) throw error;
    if (!data?.data) return cached;
    const event = normalizeStoredEvent(data.data as Partial<EventDraft>);
    savePublishedEvent(event);
    return event;
  } catch (error) {
    return fallback(`Could not load public event ${slug} from Supabase.`, cached, error);
  }
}

export async function publishEvent(event: EventDraft) {
  if (process.env.NODE_ENV !== "production") {
    console.debug("Publishing event template:", {
      slug: event.slug,
      templateId: event.templateId,
      eventType: event.eventType,
    });
  }

  if (localTestMode) {
    const slug = ensureUniqueSlug(event.slug || event.title, loadPublishedEvents());
    const publicUrl = getEventUrl(slug);
    const qrCodeData = await createQrCodeSvg(publicUrl);
    const published = { ...event, slug, publicUrl, qrCodeData, status: "published" as const };
    savePublishedEvent(published);
    return published;
  }

  const user = await getCurrentAuthUser();
  if (!user) throw new Error("You must be signed in to publish an event.");
  const supabase = createSupabaseBrowserClient();
  const { data: existing, error: existingError } = await supabase.from("events").select("slug").ilike("slug", `${event.slug || event.title}%`);
  if (existingError) throw existingError;
  const slug = ensureUniqueSlug(event.slug || event.title || event.eventType, (existing || []) as Partial<EventDraft>[]);
  const publicUrl = getEventUrl(slug);
  const qrCodeData = await createQrCodeSvg(publicUrl);
  const published = { ...event, ownerId: user.id, slug, publicUrl, qrCodeData, status: "published" as const };
  if (process.env.NODE_ENV !== "production") {
    console.debug("Published event template:", {
      slug: published.slug,
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
  await supabase.from("event_drafts").delete().eq("owner_id", user.id);
  return published;
}

export async function updatePublishedEvent(event: EventDraft) {
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
