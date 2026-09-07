"use client";

import Link from "next/link";
import { ArrowLeft, Download, ExternalLink, MessageCircle, RefreshCw, Search, Share2, UserCheck, UserX, Users } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatEventDate } from "@/lib/date-utils";
import { getEventUrl } from "@/lib/event-url";
import { loadOwnedInvitationWithRsvps, type RsvpRecord } from "@/lib/organizer-data";

type Filter = "all" | "attending" | "declined";
const PAGE_SIZE = 25;

export function RsvpManager({ slug }: { slug: string }) {
  const [result, setResult] = useState<Awaited<ReturnType<typeof loadOwnedInvitationWithRsvps>>>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const load = useCallback(async () => {
    setState("loading");
    try { setResult(await loadOwnedInvitationWithRsvps(slug)); setState("ready"); } catch { setState("error"); }
  }, [slug]);
  useEffect(() => { void load(); }, [load]);

  const rows = result?.rsvps ?? [];
  const attending = rows.filter((row) => row.attendance === "attending");
  const declined = rows.length - attending.length;
  const guests = attending.reduce((total, row) => total + row.guestCount, 0);
  const filtered = useMemo(() => rows.filter((row) => (filter === "all" || row.attendance === filter) && row.guestName.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())), [filter, rows, search]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  useEffect(() => { setPage(1); }, [filter, search]);

  if (state === "loading") return <RsvpLoading />;
  if (state === "error") return <RsvpError retry={load} />;
  if (!result) return <RsvpNotFound />;
  const { event } = result;
  const publicUrl = getEventUrl(event.slug);

  function exportCsv() {
    const values = [["Guest name", "Attendance", "Expected guests", "Message", "Submitted"], ...rows.map((row) => [row.guestName, row.attendance, String(row.attendance === "attending" ? row.guestCount : 0), row.message, row.createdAt])];
    const csv = values.map((line) => line.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = `${event.slug}-rsvps.csv`; link.click(); URL.revokeObjectURL(url);
  }

  return (
    <main className="phone-shell min-h-screen pb-10">
      <header className="border-b border-[#E6D8EB] bg-white/90 px-5 py-4 backdrop-blur sm:px-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"><ArrowLeft className="h-4 w-4" />Back to Dashboard</Link>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><div className="flex flex-wrap items-center gap-2"><h1 className="font-serif text-3xl font-bold tracking-[-0.02em] text-[#2D1735]">{event.title}</h1><Badge>Published</Badge></div><p className="mt-1 text-sm text-muted">Wedding — {formatEventDate(event.date)}</p></div>
          <div className="flex flex-wrap gap-2"><Button asChild variant="outline" size="sm"><Link href={`/i/${event.slug}`} target="_blank"><ExternalLink className="h-4 w-4" />View Invitation</Link></Button><Button asChild size="sm"><a href={`https://wa.me/?text=${encodeURIComponent(`${event.title}\n${publicUrl}`)}`} target="_blank" rel="noreferrer"><Share2 className="h-4 w-4" />Share</a></Button></div>
        </div>
      </header>

      <section className="px-5 py-6 sm:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Metric label="Total Responses" value={rows.length} icon={Users} />
          <Metric label="Attending" value={attending.length} icon={UserCheck} />
          <Metric label="Declined" value={declined} icon={UserX} />
          <Metric label="Expected Guests" value={guests} icon={MessageCircle} />
        </div>

        {rows.length === 0 ? <EmptyRsvps shareUrl={`https://wa.me/?text=${encodeURIComponent(`${event.title}\n${publicUrl}`)}`} /> : (
          <div className="mt-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div role="group" className="inline-flex w-full rounded-xl bg-[#F1E7F4] p-1 sm:w-auto" aria-label="Filter responses">{(["all", "attending", "declined"] as Filter[]).map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} className={`min-h-11 flex-1 rounded-lg px-3 text-sm font-semibold capitalize transition sm:flex-none ${filter === item ? "bg-white text-primary shadow-sm" : "text-[#5F5363]"}`}>{item === "all" ? "All" : item === "declined" ? "Not Attending" : "Attending"}</button>)}</div>
              <div className="flex gap-2"><label className="relative min-w-0 flex-1 sm:w-64"><span className="sr-only">Search guest name</span><Search className="absolute left-3 top-3.5 h-4 w-4 text-muted" /><input value={search} onChange={(event) => setSearch(event.target.value)} className="h-11 w-full rounded-xl border border-border bg-white pl-9 pr-3 text-base outline-none focus:border-primary" placeholder="Search guest name" /></label><Button type="button" onClick={exportCsv} variant="outline" size="sm" className="h-11" aria-label="Export RSVP responses as CSV"><Download className="h-4 w-4" /><span className="hidden sm:inline">Export CSV</span></Button></div>
            </div>

            {visible.length === 0 ? <p className="mt-5 rounded-2xl bg-white p-6 text-center text-sm text-muted ring-1 ring-[#E6D8EB]">No responses match this filter.</p> : <ResponseList rows={visible} />}
            {pageCount > 1 ? <div className="mt-4 flex items-center justify-between text-sm"><Button type="button" size="sm" variant="outline" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>Previous</Button><span className="text-muted">Page {page} of {pageCount}</span><Button type="button" size="sm" variant="outline" disabled={page === pageCount} onClick={() => setPage((value) => value + 1)}>Next</Button></div> : null}
          </div>
        )}
      </section>
    </main>
  );
}

function Metric({ label, value, icon: Icon }: { label: string; value: number; icon: React.ElementType }) { return <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-[#E6D8EB]"><Icon className="h-5 w-5 text-primary" /><p className="mt-3 text-xs font-semibold text-muted">{label}</p><p className="mt-1 font-serif text-3xl font-bold tabular-nums text-[#2D1735]">{value}</p></div>; }
function ResponseList({ rows }: { rows: RsvpRecord[] }) { return <div className="mt-4 overflow-hidden rounded-2xl bg-white ring-1 ring-[#E6D8EB]"><div className="hidden grid-cols-[1.2fr_.8fr_.45fr_1.5fr_.8fr] gap-4 border-b border-[#E6D8EB] px-4 py-3 text-xs font-bold text-muted md:grid"><span>Guest</span><span>Response</span><span>Guests</span><span>Message</span><span>Submitted</span></div>{rows.map((row) => <article key={row.id} className="grid gap-2 border-b border-[#EEE5F1] p-4 last:border-0 md:grid-cols-[1.2fr_.8fr_.45fr_1.5fr_.8fr] md:items-center md:gap-4"><div><h3 className="font-semibold text-[#2D1735]">{row.guestName}</h3><p className="text-xs text-muted md:hidden">{formatSubmitted(row.createdAt)}</p></div><div><Badge className={responseBadgeClass(row.attendance)}>{row.attendance === "attending" ? "Attending" : "Not Attending"}</Badge></div><p className="text-sm tabular-nums"><span className="text-muted md:hidden">Guests: </span>{row.attendance === "attending" ? row.guestCount : 0}</p><p className="break-words text-sm text-[#514657]">{row.message || <span className="text-muted">No message</span>}</p><p className="hidden text-xs text-muted md:block">{formatSubmitted(row.createdAt)}</p></article>)}</div>; }
function responseBadgeClass(attendance: RsvpRecord["attendance"]) { return attendance === "attending" ? "bg-emerald-50 text-emerald-800" : "bg-slate-100 text-slate-700"; }
function formatSubmitted(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(date); }
function EmptyRsvps({ shareUrl }: { shareUrl: string }) { return <div className="mt-6 rounded-2xl bg-white px-6 py-10 text-center ring-1 ring-[#E6D8EB]"><Users className="mx-auto h-7 w-7 text-primary" /><h2 className="mt-3 font-serif text-2xl font-bold">No RSVPs yet</h2><p className="mt-2 text-sm text-muted">Responses will appear here when guests RSVP.</p><Button asChild className="mt-5" size="sm"><a href={shareUrl} target="_blank" rel="noreferrer">Share Invitation</a></Button></div>; }
function RsvpLoading() { return <main className="phone-shell min-h-screen px-5 py-8" aria-busy="true"><div className="h-8 w-52 animate-pulse rounded-lg bg-[#F1E7F4]" /><div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">{[0,1,2,3].map((item) => <div key={item} className="h-28 animate-pulse rounded-2xl bg-[#F1E7F4]" />)}</div></main>; }
function RsvpError({ retry }: { retry: () => void }) { return <main className="phone-shell min-h-screen px-5 py-16 text-center"><h1 className="font-serif text-3xl font-bold">We couldn&apos;t load RSVPs</h1><p className="mt-2 text-muted">Your guest responses are safe. Please try again.</p><Button type="button" onClick={retry} className="mt-5"><RefreshCw className="h-4 w-4" />Try again</Button></main>; }
function RsvpNotFound() { return <main className="phone-shell min-h-screen px-5 py-16 text-center"><h1 className="font-serif text-3xl font-bold">Invitation not found</h1><p className="mt-2 text-muted">This invitation is unavailable or belongs to another organizer.</p><Button asChild className="mt-5"><Link href="/dashboard">Back to Dashboard</Link></Button></main>; }
