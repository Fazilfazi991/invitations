import type { Metadata } from "next";
import { normalizeStoredEvent } from "@/lib/event-draft";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { EventMusicControl } from "@/components/event/EventMusicControl";
import { WeddingTemplateRenderer } from "@/components/event/templates/WeddingTemplateRenderer";
import { isLiveEventType } from "@/lib/event-types";

type ShortInvitePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ShortInvitePageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: "Occazn Invitation",
    description: "Open this digital invitation on Occazn.",
    alternates: {
      canonical: `/i/${slug}`,
    },
    openGraph: {
      title: "Occazn Invitation",
      description: "Open this digital invitation on Occazn.",
      url: `/i/${slug}`,
      type: "website",
    },
  };
}

export default async function ShortInvitePage({ params }: ShortInvitePageProps) {
  const { slug } = await params;
  if (process.env.NEXT_PUBLIC_JASHNLY_LOCAL_TEST_MODE === "true") {
    const { InviteRouteClient } = await import("@/app/invite/[slug]/InviteRouteClient");
    return <InviteRouteClient slug={slug} />;
  }
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("events")
    .select("data")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  const event = data?.data ? normalizeStoredEvent(data.data) : null;

  if (!event) {
    return <main className="grid min-h-dvh place-items-center bg-[#fbf0f6] px-4 text-center"><div className="rounded-3xl border border-[#F0B6C8] bg-white/80 p-8"><h1 className="font-serif text-3xl font-bold text-[#D84B73]">Invitation not found</h1><p className="mt-2 text-sm text-[#6F6670]">Please check the invite link and try again.</p></div></main>;
  }
  if (!isLiveEventType(event.eventType)) {
    return <main className="grid min-h-dvh place-items-center bg-[#fbf0f6] px-4 text-center"><h1 className="font-serif text-3xl font-bold text-[#D84B73]">Coming soon</h1></main>;
  }

  return <><WeddingTemplateRenderer event={event} /><EventMusicControl music={event.music} eventSlug={event.slug || slug} /></>;
}
