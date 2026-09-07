import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";

export const metadata = {
  title: "Terms of Service | Occazn",
  description: "Terms for using the Occazn invitation service.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-brand-offWhite px-5 py-10 text-[#171B33]">
      <article className="mx-auto max-w-3xl rounded-[2rem] bg-white p-6 shadow-sm sm:p-10">
        <Link href="/" aria-label="Occazn home"><BrandLogo imageClassName="h-12" /></Link>
        <h1 className="mt-8 font-serif text-4xl font-bold">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted">Last updated: September 7, 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-muted">
          <section><h2 className="font-serif text-2xl font-bold text-[#171B33]">Using Occazn</h2><p className="mt-2">Occazn lets organizers create and share digital invitations and lets guests submit RSVPs. You must provide accurate information, protect your account, and use the service only for lawful purposes.</p></section>
          <section><h2 className="font-serif text-2xl font-bold text-[#171B33]">Your content</h2><p className="mt-2">You retain responsibility for names, images, event details, links, and other content you provide. You confirm that you have the rights and permissions needed to publish that content and understand that published invitation pages can be viewed by anyone with their link.</p></section>
          <section><h2 className="font-serif text-2xl font-bold text-[#171B33]">Acceptable use</h2><p className="mt-2">Do not misuse the service, attempt unauthorized access, interfere with its operation, impersonate others, or publish unlawful, harmful, or infringing content.</p></section>
          <section><h2 className="font-serif text-2xl font-bold text-[#171B33]">Availability</h2><p className="mt-2">Occazn is provided on an as-available basis. Features may change, and we cannot promise uninterrupted or error-free operation. To the extent permitted by law, Occazn is not liable for indirect or consequential losses resulting from use of the service.</p></section>
          <section><h2 className="font-serif text-2xl font-bold text-[#171B33]">Contact</h2><p className="mt-2">Questions about these terms may be sent to <a className="font-semibold text-primary underline" href="mailto:fazil4fazi@gmail.com">fazil4fazi@gmail.com</a>.</p></section>
        </div>
      </article>
    </main>
  );
}
