"use client";

import Link from "next/link";
import { Heart, Plus, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { InvitationCard } from "@/components/dashboard/InvitationCard";
import { BottomNav } from "@/components/layout/bottom-nav";
import { MobileHeader } from "@/components/layout/mobile-header";
import { Button } from "@/components/ui/button";
import { loadOrganizerDashboard, type OrganizerInvitation } from "@/lib/organizer-data";

export default function DashboardPage() {
  const [invitations, setInvitations] = useState<OrganizerInvitation[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const load = useCallback(async () => {
    setState("loading");
    try {
      setInvitations(await loadOrganizerDashboard());
      setState("ready");
    } catch {
      setState("error");
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  return (
    <main className="phone-shell flex min-h-screen flex-col">
      <MobileHeader action="avatar" showMenu={false} />
      <section className="flex-1 px-5 pb-6 pt-4 sm:px-8 sm:pt-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-[-0.02em] text-[#2D1735] sm:text-4xl">Your Invitations</h1>
            <p className="mt-1 max-w-xl text-sm leading-6 text-muted sm:text-base">Create, share, and keep track of every response in one calm place.</p>
          </div>
          <Button asChild className="w-full sm:w-auto"><Link href="/create-event"><Plus className="h-4 w-4" />Create Wedding Invitation</Link></Button>
        </div>
        {state === "loading" ? <DashboardSkeleton /> : null}
        {state === "error" ? (
          <div role="alert" className="mt-6 rounded-2xl bg-white p-6 text-center shadow-card ring-1 ring-[#E6D8EB]">
            <h2 className="font-serif text-xl font-bold">We couldn&apos;t load your invitations</h2>
            <p className="mt-2 text-sm text-muted">Your invitations are safe. Check your connection and try again.</p>
            <Button type="button" onClick={load} variant="outline" size="sm" className="mt-4"><RefreshCw className="h-4 w-4" />Try again</Button>
          </div>
        ) : null}
        {state === "ready" && invitations.length === 0 ? <EmptyDashboard /> : null}
        {state === "ready" && invitations.length > 0 ? <div className="mt-6 space-y-4" aria-live="polite">{invitations.map((invitation) => <InvitationCard key={`${invitation.status}-${invitation.id}`} invitation={invitation} />)}</div> : null}
      </section>
      <BottomNav />
    </main>
  );
}

function EmptyDashboard() {
  return <div className="mt-8 rounded-2xl bg-white px-6 py-10 text-center shadow-card ring-1 ring-[#E6D8EB]"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary-soft text-primary"><Heart className="h-6 w-6" /></span><h2 className="mt-4 font-serif text-2xl font-bold text-[#2D1735]">Create your first Wedding invitation</h2><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">Design, publish, and share your invitation in a few minutes.</p><Button asChild className="mt-5"><Link href="/create-event">Create Wedding Invitation</Link></Button></div>;
}

function DashboardSkeleton() {
  return <div className="mt-6 space-y-4" aria-label="Loading invitations" aria-busy="true">{[0, 1].map((item) => <div key={item} className="h-52 animate-pulse rounded-2xl bg-[#F1E7F4] sm:h-40" />)}</div>;
}
