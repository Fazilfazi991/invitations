import { redirect } from "next/navigation";

export default async function LegacyInvitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/i/${slug}`);
}
