import type { Metadata } from "next";
import { InviteRouteClient } from "./InviteRouteClient";
import type { WeddingEventData } from "@/components/event/templates/template-utils";

const invitationSlug = "muhammed-suhaib-fathima-gafoor";
const publicInviteUrl = `https://occazn.com/invite/${invitationSlug}`;

type InvitePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return [{ slug: invitationSlug }];
}

export async function generateMetadata({ params }: InvitePageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug !== invitationSlug) {
    return {};
  }

  return {
    title: "Muhammed Suhaib & Fathima Gafoor | Wedding Invitation",
    description: "Wedding invitation for Muhammed Suhaib and Fathima Gafoor at T. M. Mahal Auditorium, Thiruvathra.",
    alternates: {
      canonical: `/invite/${invitationSlug}`,
    },
    openGraph: {
      title: "Muhammed Suhaib & Fathima Gafoor",
      description: "With full hearts, joyfully invite you to their wedding.",
      url: `/invite/${invitationSlug}`,
      type: "website",
    },
  };
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { slug } = await params;

  return <InviteRouteClient slug={slug} fallbackEvent={slug === invitationSlug ? suhaibFathimaInvitation : undefined} />;
}

const suhaibFathimaInvitation: WeddingEventData = {
  eventType: "wedding",
  title: "Muhammed Suhaib and Fathima Gafoor Wedding",
  primaryName: "Muhammed Suhaib",
  secondaryName: "Fathima Gafoor",
  groomName: "Muhammed Suhaib",
  brideName: "Fathima Gafoor",
  date: "2026-07-20",
  time: "12:00",
  venueName: "T. M. MAHAL AUDITORIUM",
  address: "T. M. MAHAL AUDITORIUM, THIRUVATHRA",
  city: "THIRUVATHRA",
  mapLink: "https://www.google.com/maps/search/?api=1&query=T.%20M.%20Mahal%20Auditorium%2C%20Thiruvathra",
  youtubeLink: "",
  invitationCard: "",
  coverImage: "",
  gallery: [],
  rsvpEnabled: false,
  familyContactsEnabled: false,
  qrEnabled: true,
  schedule: [
    {
      id: "lunch",
      title: "Lunch",
      startTime: "12:00",
      venue: "T. M. Mahal Auditorium",
      description: "Wedding lunch with family and friends.",
    },
  ],
  contacts: [],
  templateId: "royal-nikah-elegance",
  templateName: "Royal Nikah Elegance",
  templateImage: "/templates/previews/royal_nikah_elegance_preview.png",
  theme: "classic",
  openingAnimation: "minimal",
  music: { enabled: false, trackId: "none", url: "", autoplay: false },
  status: "published",
  slug: invitationSlug,
  publicUrl: publicInviteUrl,
  qrCodeData: publicInviteUrl,
  qrCodePath: "",
  hijriDate: "1448 Safar 6",
  invitationOpening: "\u0628\u0650\u0633\u0652\u0645\u0650 \u0671\u0644\u0644\u064e\u0651\u0670\u0647\u0650 \u0671\u0644\u0631\u064e\u0651\u062d\u0652\u0645\u064e\u0640\u0670\u0646\u0650 \u0671\u0644\u0631\u064e\u0651\u062d\u0650\u064a\u0645\u0650",
  invitationLine: "With full hearts,\njoyfully invite you to their wedding",
  lunchTime: "12:00 PM",
};
