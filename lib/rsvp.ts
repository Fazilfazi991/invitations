import { BYPASS_AUTH_FOR_DEMO } from "@/lib/demo-bypass";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export type RsvpResponse = {
  guestName: string;
  attendance: "attending" | "declined";
  guestCount: number;
  message: string;
};

const localKey = (slug: string) => `occazn_rsvps_${slug}`;

export async function submitRsvp(slug: string, response: RsvpResponse) {
  const normalized = {
    ...response,
    guestName: response.guestName.trim(),
    message: response.message.trim(),
    // The production schema requires 1..10. A declined row stores 1 as a
    // compatibility sentinel; organizer totals, display, and CSV always
    // interpret declined responses as zero expected guests.
    guestCount: response.attendance === "declined" ? 1 : Math.max(1, Math.min(10, response.guestCount || 1)),
  };

  if (!normalized.guestName) throw new Error("Please enter your name.");
  if (normalized.message.length > 500) throw new Error("Please keep your message under 500 characters.");

  if (BYPASS_AUTH_FOR_DEMO) {
    const stored = JSON.parse(window.localStorage.getItem(localKey(slug)) || "[]") as RsvpResponse[];
    window.localStorage.setItem(localKey(slug), JSON.stringify([normalized, ...stored]));
    return;
  }

  const { data: event, error: eventError } = await createSupabaseBrowserClient()
    .from("events")
    .select("id")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (eventError || !event) throw new Error("This invitation is no longer accepting responses.");

  const { error } = await createSupabaseBrowserClient().from("rsvps").insert({
    event_id: event.id,
    guest_name: normalized.guestName,
    attendance: normalized.attendance,
    guest_count: normalized.guestCount,
    message: normalized.message,
  });
  if (error) throw new Error("We couldn't save your RSVP. Please try again.");
}
