import type { Metadata } from "next";
import { InviteRouteClient } from "@/app/invite/[slug]/InviteRouteClient";

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

  return <InviteRouteClient slug={slug} />;
}
