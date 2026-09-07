import { BYPASS_AUTH_FOR_DEMO } from "@/lib/demo-bypass";
import { loadDraft, loadPublishedEvents, normalizeStoredEvent, type EventDraft } from "@/lib/event-draft";
import { getCurrentAuthUser } from "@/lib/event-repository";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export type RsvpRecord = {
  id: string;
  eventId: string;
  guestName: string;
  attendance: "attending" | "declined";
  guestCount: number;
  message: string;
  createdAt: string;
};

export type OrganizerInvitation = {
  id: string;
  event: EventDraft;
  status: "draft" | "published";
  createdAt: string | null;
  updatedAt: string | null;
  responseCount: number;
  attendingCount: number;
  declinedCount: number;
  expectedGuests: number;
};

type EventRow = {
  id: string;
  status: "draft" | "published";
  data: Partial<EventDraft>;
  created_at: string;
  updated_at: string;
};

type RsvpRow = {
  id: string;
  event_id: string;
  guest_name: string;
  attendance: "attending" | "declined";
  guest_count: number;
  message: string | null;
  created_at: string;
};

const localTestMode = process.env.NEXT_PUBLIC_JASHNLY_LOCAL_TEST_MODE === "true" || BYPASS_AUTH_FOR_DEMO;

function summarizeRsvps(rows: Pick<RsvpRow, "event_id" | "attendance" | "guest_count">[]) {
  const summaries = new Map<string, Omit<OrganizerInvitation, "id" | "event" | "status" | "createdAt" | "updatedAt">>();
  for (const row of rows) {
    const current = summaries.get(row.event_id) ?? { responseCount: 0, attendingCount: 0, declinedCount: 0, expectedGuests: 0 };
    current.responseCount += 1;
    if (row.attendance === "attending") {
      current.attendingCount += 1;
      current.expectedGuests += row.guest_count;
    } else {
      current.declinedCount += 1;
    }
    summaries.set(row.event_id, current);
  }
  return summaries;
}

export async function loadOrganizerDashboard(): Promise<OrganizerInvitation[]> {
  if (localTestMode) {
    return loadPublishedEvents().map((event) => {
      const stored = typeof window === "undefined" ? [] : JSON.parse(window.localStorage.getItem(`occazn_rsvps_${event.slug}`) || "[]") as Array<{ attendance: "attending" | "declined"; guestCount: number }>;
      const attending = stored.filter((row) => row.attendance === "attending");
      return {
        id: event.slug,
        event,
        status: "published",
        createdAt: null,
        updatedAt: null,
        responseCount: stored.length,
        attendingCount: attending.length,
        declinedCount: stored.length - attending.length,
        expectedGuests: attending.reduce((total, row) => total + row.guestCount, 0),
      };
    });
  }

  const user = await getCurrentAuthUser();
  if (!user) return [];
  const supabase = createSupabaseBrowserClient();
  const [{ data: eventRows, error: eventsError }, { data: draftRow, error: draftError }] = await Promise.all([
    supabase.from("events").select("id,status,data,created_at,updated_at").eq("owner_id", user.id).order("updated_at", { ascending: false }),
    supabase.from("event_drafts").select("data,updated_at").eq("owner_id", user.id).maybeSingle(),
  ]);
  if (eventsError || draftError) throw eventsError ?? draftError;

  const rows = (eventRows ?? []) as EventRow[];
  const ids = rows.map((row) => row.id);
  let rsvpRows: Pick<RsvpRow, "event_id" | "attendance" | "guest_count">[] = [];
  if (ids.length > 0) {
    const { data, error } = await supabase.from("rsvps").select("event_id,attendance,guest_count").in("event_id", ids);
    if (error) throw error;
    rsvpRows = data ?? [];
  }
  const summaries = summarizeRsvps(rsvpRows);
  const invitations: OrganizerInvitation[] = rows.map((row) => ({
    id: row.id,
    event: normalizeStoredEvent(row.data),
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    ...(summaries.get(row.id) ?? { responseCount: 0, attendingCount: 0, declinedCount: 0, expectedGuests: 0 }),
  }));

  if (draftRow?.data) {
    const draft = normalizeStoredEvent(draftRow.data as Partial<EventDraft>);
    invitations.unshift({
      id: "current-draft",
      event: { ...draft, status: "draft" },
      status: "draft",
      createdAt: null,
      updatedAt: draftRow.updated_at,
      responseCount: 0,
      attendingCount: 0,
      declinedCount: 0,
      expectedGuests: 0,
    });
  }
  return invitations;
}

export async function loadOwnedInvitationWithRsvps(slug: string) {
  if (localTestMode) {
    const event = loadPublishedEvents().find((item) => item.slug === slug) ?? null;
    const stored = typeof window === "undefined" ? [] : JSON.parse(window.localStorage.getItem(`occazn_rsvps_${slug}`) || "[]");
    const rsvps: RsvpRecord[] = stored.map((row: { guestName: string; attendance: "attending" | "declined"; guestCount: number; message: string }, index: number) => ({
      id: `local-${index}`,
      eventId: slug,
      guestName: row.guestName,
      attendance: row.attendance,
      guestCount: row.guestCount,
      message: row.message,
      createdAt: new Date().toISOString(),
    }));
    return event ? { id: slug, event, rsvps } : null;
  }

  const user = await getCurrentAuthUser();
  if (!user) return null;
  const supabase = createSupabaseBrowserClient();
  const { data: eventRow, error: eventError } = await supabase
    .from("events")
    .select("id,data")
    .eq("slug", slug)
    .eq("owner_id", user.id)
    .maybeSingle();
  if (eventError) throw eventError;
  if (!eventRow) return null;

  const { data, error } = await supabase
    .from("rsvps")
    .select("id,event_id,guest_name,attendance,guest_count,message,created_at")
    .eq("event_id", eventRow.id)
    .order("created_at", { ascending: false });
  if (error) throw error;
  const rsvps = ((data ?? []) as RsvpRow[]).map((row) => ({
    id: row.id,
    eventId: row.event_id,
    guestName: row.guest_name,
    attendance: row.attendance,
    guestCount: row.guest_count,
    message: row.message ?? "",
    createdAt: row.created_at,
  }));
  return { id: eventRow.id, event: normalizeStoredEvent(eventRow.data as Partial<EventDraft>), rsvps };
}

export function loadLocalDraftForDashboard() {
  return localTestMode ? loadDraft() : null;
}
