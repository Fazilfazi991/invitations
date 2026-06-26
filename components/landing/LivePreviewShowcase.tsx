"use client";

import { Monitor, Smartphone, Tablet } from "lucide-react";

const features = [
  { label: "Mobile optimized", icon: Smartphone },
  { label: "Tablet friendly", icon: Tablet },
  { label: "Desktop ready", icon: Monitor },
];

const previewImage = "/templates/previews/floral_wedding_elegance_preview.png";

export function LivePreviewShowcase() {
  return (
    <section className="group relative overflow-hidden rounded-[2rem] border border-brand-light/80 bg-gradient-to-br from-white via-brand-offWhite to-primary-soft/55 px-5 py-6 shadow-[0_18px_60px_rgba(108,23,133,0.08)] transition duration-300 hover:-translate-y-1 hover:border-brand-lavender sm:px-7 sm:py-7 lg:px-8 lg:py-8">
      <span className="pointer-events-none absolute left-8 top-8 h-3 w-3 rounded-full bg-brand-light/70" />
      <span className="pointer-events-none absolute bottom-8 left-16 h-5 w-5 rounded-full bg-primary-soft" />
      <span className="pointer-events-none absolute right-8 top-8 h-6 w-6 rounded-full bg-brand-light/45" />
      <span className="pointer-events-none absolute bottom-10 right-[45%] h-4 w-4 rounded-full bg-brand-light/35" />

      <div className="relative z-10 grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="max-w-xl">
          <div className="flex items-center gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">LIVE PREVIEW</p>
            <span className="h-2.5 w-2.5 rounded-full bg-brand-light" />
          </div>
          <h2 className="mt-4 font-serif text-[clamp(30px,5.2vw,46px)] font-bold leading-[1.04] text-[#172033]">
            See your event before you share it
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-muted">
            Preview your invitation exactly how guests will see it - beautiful on mobile, tablet, and desktop.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:max-w-xl">
            {features.map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl border border-brand-light/60 bg-white/70 px-3 py-2.5 shadow-[0_10px_30px_rgba(108,23,133,0.06)] backdrop-blur">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold leading-snug text-[#273142]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto min-h-[260px] w-full max-w-[660px] overflow-hidden rounded-[1.5rem] pb-2 sm:min-h-[330px] lg:min-h-[360px]">
          <div className="absolute right-0 top-6 w-[82%] transition duration-300 group-hover:-translate-y-1 sm:top-8">
            <LaptopPreview />
          </div>
          <div className="absolute left-[22%] top-14 w-[34%] min-w-[150px] transition duration-300 group-hover:-translate-y-1 sm:left-[20%] sm:top-20">
            <TabletPreview />
          </div>
          <div className="absolute left-[7%] top-[34%] w-[22%] min-w-[96px] transition duration-300 group-hover:-translate-y-1 sm:left-[10%] sm:top-[40%]">
            <MobilePreview />
          </div>
        </div>
      </div>
    </section>
  );
}

function InvitationScreen({ className, alt }: { className?: string; alt: string }) {
  return (
    <div className={className}>
      <img src={previewImage} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}

function LaptopPreview() {
  return (
    <figure aria-label="Desktop invitation preview" className="relative">
      <div className="rounded-t-[1.1rem] border-[8px] border-[#111318] bg-[#111318] shadow-[0_22px_45px_rgba(31,41,55,0.16)]">
        <div className="overflow-hidden rounded-md bg-white">
          <div className="flex h-8 items-center justify-between border-b border-brand-light/45 bg-white px-4">
            <span className="text-xs font-bold text-primary">occazn</span>
            <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-white">Preview</span>
          </div>
          <div className="grid aspect-[16/9] grid-cols-[0.26fr_0.74fr] bg-brand-offWhite">
            <aside className="border-r border-brand-light/45 p-3 text-[10px] font-semibold text-muted">
              <p className="text-primary">Live Preview</p>
              <div className="mt-4 space-y-3">
                {["Mobile", "Tablet", "Desktop"].map((item) => (
                  <span key={item} className="block rounded-xl bg-white/80 px-3 py-2">{item}</span>
                ))}
              </div>
            </aside>
            <div className="grid place-items-center p-4">
              <InvitationScreen alt="Desktop screen showing a floral wedding invitation preview" className="aspect-[4/3] w-[78%] overflow-hidden rounded-lg border border-brand-light/60 bg-white shadow-card" />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto h-3 w-[94%] rounded-b-full bg-gradient-to-r from-[#9CA3AF] via-[#E5E7EB] to-[#9CA3AF]" />
    </figure>
  );
}

function TabletPreview() {
  return (
    <figure aria-label="Tablet invitation preview" className="rounded-[1.05rem] border-[7px] border-[#111318] bg-[#111318] shadow-[0_18px_38px_rgba(31,41,55,0.18)]">
      <InvitationScreen alt="Tablet screen showing a floral event invitation preview" className="aspect-[3/4] overflow-hidden rounded-md bg-white" />
    </figure>
  );
}

function MobilePreview() {
  return (
    <figure aria-label="Mobile invitation preview" className="rounded-[1.1rem] border-[6px] border-[#111318] bg-[#111318] shadow-[0_18px_36px_rgba(31,41,55,0.20)]">
      <div className="mx-auto mb-1 h-1 w-8 rounded-full bg-[#111318]" />
      <InvitationScreen alt="Mobile screen showing a floral event invitation preview" className="aspect-[9/16] overflow-hidden rounded-md bg-white" />
    </figure>
  );
}
