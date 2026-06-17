"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Check, Copy, Crown, Heart, ImagePlus, MapPin, QrCode, Share2, Upload, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { galleryImages, sampleEvent } from "@/lib/mock-data";

export function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className={cn("px-5 py-6", className)}>{children}</motion.section>;
}

export function CategoryCard({ label, icon: Icon, href = "/create/step-1" }: { label: string; icon: React.ElementType; href?: string }) {
  return (
    <motion.div whileTap={{ scale: 0.97 }}>
      <Link href={href} className="flex min-h-28 flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-white p-4 text-center shadow-card transition hover:border-primary">
        <Icon className="h-8 w-8 text-primary" />
        <span className="text-sm font-semibold">{label}</span>
      </Link>
    </motion.div>
  );
}

export function FeaturePill({ label, icon: Icon }: { label: string; icon: React.ElementType }) {
  return <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium shadow-card"><Icon className="h-5 w-5 text-primary" />{label}</div>;
}

export function EventCard({ event }: { event: { id: string; title: string; date: string; status: string; coverImage: string } }) {
  return (
    <Link href={`/dashboard/${event.id}`} className="flex items-center gap-4 rounded-2xl border border-border bg-white p-3 shadow-card">
      <img src={event.coverImage} alt="" className="h-20 w-24 rounded-xl object-cover" />
      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-xl font-bold text-primary">{event.title}</h3>
        <p className="mt-1 text-sm text-muted">{event.date}</p>
        <Badge className="mt-2">{event.status}</Badge>
      </div>
      <ArrowRight className="h-5 w-5 text-primary" />
    </Link>
  );
}

export function StepProgress({ step }: { step: number }) {
  return (
    <div className="px-5 pb-4">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted">
        <span>Step {step} of 4</span><span>{Math.round((step / 4) * 100)}%</span>
      </div>
      <div className="h-2 rounded-full bg-primary-soft"><div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${(step / 4) * 100}%` }} /></div>
    </div>
  );
}

export function CreateEventLayout({ step, title, children, nextHref }: { step: number; title: string; children: React.ReactNode; nextHref: string }) {
  return (
    <main className="phone-shell min-h-screen pb-28">
      <div className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-border bg-background/95 px-5 backdrop-blur">
        <Button asChild variant="ghost" size="icon"><Link href={step === 1 ? "/categories" : `/create/step-${step - 1}`} aria-label="Back">←</Link></Button>
        <h1 className="font-serif text-2xl font-bold">{title}</h1>
        <Button asChild size="sm"><Link href={nextHref}>{step === 4 ? "Publish" : "Next"}</Link></Button>
      </div>
      <StepProgress step={step} />
      <div className="space-y-5 px-5">{children}</div>
      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md bg-white/90 p-5 backdrop-blur">
        <Button asChild className="w-full"><Link href={nextHref}>{step === 4 ? "Publish Event" : "Save & Continue"}<ArrowRight className="h-4 w-4" /></Link></Button>
      </div>
    </main>
  );
}

export function FormField({ label, placeholder, icon: Icon }: { label: string; placeholder: string; icon?: React.ElementType }) {
  return <label className="block space-y-2 text-sm font-semibold text-foreground"><span>{label}</span><div className="relative">{Icon && <Icon className="absolute left-3 top-3.5 h-5 w-5 text-primary" />}<Input className={Icon ? "pl-11" : ""} placeholder={placeholder} defaultValue={placeholder.includes("Afsal") || placeholder.includes("Fathima") || placeholder.includes("Calicut") ? placeholder : undefined} /></div></label>;
}

export function UploadCard({ title = "Upload cover image or invitation" }: { title?: string }) {
  return <Card className="flex items-center gap-4 border-dashed p-4"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary-soft"><Upload className="h-7 w-7 text-primary" /></div><div><h3 className="font-semibold">{title}</h3><p className="text-sm text-muted">JPG, PNG or WebP up to 5MB</p></div></Card>;
}

export function ThemeCard({ name, selected }: { name: string; selected?: boolean }) {
  return <Card className={cn("p-3", selected && "border-primary ring-2 ring-primary/15")}><div className="floral mb-3 h-28 rounded-xl" /><div className="flex items-center justify-between"><span className="font-semibold">{name}</span>{selected && <Check className="h-5 w-5 text-primary" />}</div></Card>;
}

export function DashboardMetricCard({ label, value, icon: Icon, trend }: { label: string; value: string; icon: React.ElementType; trend?: string }) {
  return <Card className="p-4"><div className="mb-3 grid h-11 w-11 place-items-center rounded-full bg-primary-soft"><Icon className="h-6 w-6 text-primary" /></div><p className="text-sm font-semibold">{label}</p><p className="font-serif text-3xl">{value}</p>{trend && <p className={cn("text-sm", trend.startsWith("-") ? "text-red-500" : "text-emerald-600")}>{trend}</p>}</Card>;
}

export function TimelineItem({ item }: { item: { title: string; time: string; venue: string; description?: string; icon: React.ElementType } }) {
  return <Card className="flex gap-4 p-4"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary-soft"><item.icon className="h-6 w-6 text-primary" /></div><div><h3 className="font-serif text-xl font-bold">{item.title}</h3><p className="text-sm font-semibold text-primary">{item.time}</p><p className="text-sm text-muted">{item.venue}</p>{item.description && <p className="mt-2 text-sm text-muted">{item.description}</p>}</div></Card>;
}

export function LocationCard({ location }: { location: { title: string; address: string; detail: string } }) {
  return <Card className="p-4"><div className="mb-3 flex items-center gap-3"><MapPin className="h-6 w-6 text-primary" /><div><h3 className="font-serif text-xl font-bold">{location.title}</h3><p className="text-sm text-muted">{location.detail}</p></div></div><p className="text-sm">{location.address}</p><Button variant="outline" size="sm" className="mt-4">Open in Maps</Button></Card>;
}

export function GalleryGrid() {
  return <div className="grid grid-cols-2 gap-3">{galleryImages.map((src, index) => <img key={src} src={src} alt={`Gallery moment ${index + 1}`} className={cn("h-40 w-full rounded-2xl object-cover shadow-card", index === 0 && "row-span-2 h-full")} />)}</div>;
}

export function RSVPForm() {
  return (
    <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert("RSVP submitted. Thank you!"); }}>
      <Input placeholder="Your Name" />
      <Input placeholder="Phone Number" />
      <select className="h-12 w-full rounded-xl border border-border bg-white px-4 text-sm"><option>Yes, I&apos;ll be there</option><option>Maybe</option><option>Sorry, can&apos;t make it</option></select>
      <Input placeholder="Number of guests" type="number" min={1} defaultValue={1} />
      <textarea className="min-h-28 w-full rounded-xl border border-border bg-white p-4 text-sm outline-none focus:border-primary" placeholder="Message optional" />
      <Button className="w-full" type="submit"><Heart className="h-4 w-4" />Submit RSVP</Button>
    </form>
  );
}

export function QRCodeCard() {
  return <Card className="p-5 text-center"><div className="mx-auto grid h-36 w-36 place-items-center rounded-2xl border border-border bg-white"><QrCode className="h-28 w-28 text-foreground" /></div><p className="mt-3 text-sm text-muted">Scan to share</p><Button variant="outline" className="mt-4">Download QR</Button></Card>;
}

export function ShareCard() {
  return <Card className="space-y-4 p-5"><div className="flex items-center gap-3"><Share2 className="h-6 w-6 text-primary" /><h3 className="font-serif text-2xl font-bold">Share the Joy</h3></div><div className="flex gap-2"><Button className="flex-1">WhatsApp</Button><Button variant="outline" className="flex-1">More</Button></div><div className="flex items-center gap-2 rounded-xl border border-border p-3 text-sm"><span className="min-w-0 flex-1 truncate">jashnly.app/event/afsal-fathima</span><Copy className="h-4 w-4 text-primary" /></div></Card>;
}

export function GuestEventHero() {
  return (
    <Card className="floral overflow-hidden p-5 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">The Wedding Of</p>
      <h1 className="mt-2 font-serif text-5xl font-bold text-primary">{sampleEvent.couple}</h1>
      <img src={sampleEvent.coupleImage} alt={sampleEvent.couple} className="mx-auto mt-5 h-36 w-36 rounded-full border-4 border-white object-cover shadow-soft" />
      <div className="mt-5 space-y-2 text-sm"><p><CalendarDays className="mr-2 inline h-4 w-4 text-primary" />{sampleEvent.date} · {sampleEvent.time}</p><p><MapPin className="mr-2 inline h-4 w-4 text-primary" />{sampleEvent.location}</p></div>
      <div className="mt-5 grid grid-cols-4 divide-x divide-border rounded-2xl border border-border bg-white/70 p-3">
        {["28 Days", "14 Hrs", "36 Min", "52 Sec"].map((t) => <div key={t} className="text-center"><b className="block text-primary">{t.split(" ")[0]}</b><span className="text-xs">{t.split(" ")[1]}</span></div>)}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        <Button asChild variant="soft" size="sm"><Link href="/event/afsal-fathima/rsvp">RSVP</Link></Button>
        <Button asChild variant="outline" size="sm"><Link href="/event/afsal-fathima/locations">Location</Link></Button>
        <Button asChild variant="outline" size="sm"><a href={sampleEvent.liveLink}>Live</a></Button>
      </div>
    </Card>
  );
}

export function TemplateCard({ title, image, tags }: { title: string; image: string; tags: string[] }) {
  return <Card className="overflow-hidden"><div className="relative"><img src={image} alt="" className="h-44 w-full object-cover" /><span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white text-gold shadow-card"><Crown className="h-5 w-5" /></span></div><div className="p-4"><h3 className="font-serif text-xl font-bold">{title}</h3><div className="my-3 flex gap-2">{tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div><Button variant="outline" className="w-full">Use Template</Button></div></Card>;
}

export function FooterTrust() {
  return <footer className="flex flex-wrap items-center justify-center gap-5 px-5 py-5 text-xs text-muted"><span>Secure & Private</span><span>Always Online</span><span>Made with Love in India 🇮🇳</span></footer>;
}
