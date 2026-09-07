import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";

export const metadata = {
  title: "Privacy Policy | Occazn",
  description: "How Occazn handles account, invitation, and RSVP information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-brand-offWhite px-5 py-10 text-[#171B33]">
      <article className="mx-auto max-w-3xl rounded-[2rem] bg-white p-6 shadow-sm sm:p-10">
        <Link href="/" aria-label="Occazn home"><BrandLogo imageClassName="h-12" /></Link>
        <h1 className="mt-8 font-serif text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted">Last updated: September 7, 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-muted">
          <section><h2 className="font-serif text-2xl font-bold text-[#171B33]">Information we collect</h2><p className="mt-2">Occazn processes account information such as your name and email address, the event details you choose to publish, and RSVP responses submitted by invited guests. Google sign-in provides only basic profile information and an email address.</p></section>
          <section><h2 className="font-serif text-2xl font-bold text-[#171B33]">How we use information</h2><p className="mt-2">We use this information to authenticate organizers, save and publish invitations, display event information, receive guest RSVPs, and operate and protect the service.</p></section>
          <section><h2 className="font-serif text-2xl font-bold text-[#171B33]">Sharing and public invitations</h2><p className="mt-2">Published invitation details are available to anyone with the invitation link. We use service providers, including Supabase and Vercel, to host and operate Occazn. We do not sell personal information.</p></section>
          <section><h2 className="font-serif text-2xl font-bold text-[#171B33]">Data choices and retention</h2><p className="mt-2">Organizers control the event information they enter. We retain information while it is needed to provide the service and meet legitimate security or legal requirements. You may request access, correction, or deletion by contacting us.</p></section>
          <section><h2 className="font-serif text-2xl font-bold text-[#171B33]">Security and contact</h2><p className="mt-2">We use reasonable safeguards and access controls, but no online service can guarantee absolute security. Questions or privacy requests may be sent to <a className="font-semibold text-primary underline" href="mailto:fazil4fazi@gmail.com">fazil4fazi@gmail.com</a>.</p></section>
        </div>
      </article>
    </main>
  );
}
