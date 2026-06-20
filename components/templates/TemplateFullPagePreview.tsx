"use client";

import { CalendarDays, Clock, Gift, Heart, MapPin, Phone, Sparkles } from "lucide-react";
import { BirthdayTemplateRenderer } from "@/components/event/templates/birthday/BirthdayTemplateRenderer";
import { WeddingTemplateRenderer } from "@/components/event/templates/WeddingTemplateRenderer";
import { getDefaultDraft } from "@/lib/event-draft";
import { galleryImages, sampleEvent } from "@/lib/mock-data";
import { templateCategoryToEventType, templateMoodToTheme, type EventTemplate } from "@/lib/templates";

function buildPreviewEvent(template: EventTemplate) {
  const eventType = templateCategoryToEventType(template.category);
  const draft = getDefaultDraft(eventType);

  return {
    ...draft,
    eventType,
    templateId: template.id,
    theme: templateMoodToTheme(template.style.mood),
    date: eventType === "birthday" ? "2026-08-24" : "2026-11-24",
    time: eventType === "birthday" ? "17:00" : "18:30",
    venueName: eventType === "birthday" ? "The Party Place" : "Grand Seasons",
    address: eventType === "birthday" ? "Sunshine Towers, Bangalore" : "Kozhikode, Kerala",
    city: eventType === "birthday" ? "Bangalore" : "Kozhikode",
    coverImage: eventType === "wedding" ? sampleEvent.coupleImage : template.previewImage,
    gallery: galleryImages.slice(0, 5),
    youtubeLink: "https://youtube.com/live/sample",
    schedule: eventType === "birthday"
      ? [
          { id: "arrival", title: "Guest Arrival", startTime: "16:30", description: "Welcome smiles" },
          { id: "games", title: "Games & Fun", startTime: "17:00", description: "Play together" },
          { id: "cake", title: "Cake Cutting", startTime: "18:00", description: "Sweet moment" },
          { id: "dinner", title: "Dinner & Treats", startTime: "19:00", description: "Yummy bites" },
        ]
      : [
          { id: "nikah", title: "Nikah Ceremony", startTime: "18:30", description: "Ceremony" },
          { id: "photos", title: "Photos", startTime: "19:15", description: "Capture moments" },
          { id: "dinner", title: "Dinner", startTime: "20:00", description: "Let's dine" },
          { id: "reception", title: "Reception", startTime: "21:00", description: "Dance & celebrate" },
        ],
    contacts: eventType === "birthday"
      ? [{ id: "host", name: "Rahman Family", role: "Host", phone: "+91 98765 43210" }]
      : [
          { id: "bride-family", name: "Fathima's Family", role: "Bride's Family", phone: "+91 98765 43210" },
          { id: "groom-family", name: "Afsal's Family", role: "Groom's Family", phone: "+91 98765 43211" },
        ],
  };
}

export function TemplateFullPagePreview({ template }: { template: EventTemplate }) {
  const previewEvent = buildPreviewEvent(template);

  if (template.category === "wedding") {
    return <WeddingTemplateRenderer event={previewEvent} />;
  }

  if (template.category === "birthday") {
    return <BirthdayTemplateRenderer event={previewEvent} />;
  }

  return <GenericTemplatePage template={template} />;
}

function GenericTemplatePage({ template }: { template: EventTemplate }) {
  const primary = template.style.primary;
  const secondary = template.style.secondary;

  return (
    <main className="mx-auto min-h-screen max-w-md overflow-hidden bg-white text-[#273142]" style={{ background: `linear-gradient(180deg, ${template.style.background}, #FFFDF9 62%, ${secondary}22)` }}>
      <section className="relative overflow-hidden px-5 pb-7 pt-5 text-center">
        <span className="absolute -left-16 top-24 h-44 w-44 rounded-full opacity-30 blur-3xl" style={{ backgroundColor: secondary }} />
        <span className="absolute -right-20 top-8 h-52 w-52 rounded-full opacity-25 blur-3xl" style={{ backgroundColor: primary }} />
        <div className="relative z-10 flex items-center justify-between">
          <p className="font-serif text-3xl font-bold" style={{ color: primary }}>Jashnly</p>
          <span className="grid h-10 w-10 place-items-center rounded-full border bg-white/80" style={{ borderColor: `${primary}33`, color: primary }}>
            <Sparkles className="h-5 w-5" />
          </span>
        </div>
        <div className="relative z-10 mt-5 overflow-hidden rounded-[1.75rem] border bg-white/75 p-4 shadow-[0_18px_55px_rgba(31,41,55,0.10)]" style={{ borderColor: `${primary}30` }}>
          <img src={template.previewImage} alt="" className="h-52 w-full rounded-[1.25rem] object-cover" />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: secondary }}>You're invited to</p>
          <h1 className="mt-2 font-serif text-4xl font-bold leading-tight" style={{ color: primary }}>{template.name}</h1>
          <p className="mx-auto mt-2 max-w-xs text-sm text-muted">{template.description}</p>
          <div className="mt-5 grid grid-cols-3 divide-x rounded-2xl border bg-white/80 p-3 text-xs" style={{ borderColor: `${primary}25` }}>
            <Detail icon={CalendarDays} title="24 May 2026" note="Date" color={primary} />
            <Detail icon={Clock} title="5:00 PM" note="Onwards" color={primary} />
            <Detail icon={MapPin} title="Grand Hall" note="Calicut" color={primary} />
          </div>
          <button className="mt-5 rounded-full px-8 py-3 text-sm font-bold text-white shadow-soft" style={{ backgroundColor: primary }}>
            RSVP Now
          </button>
        </div>
      </section>

      <section className="space-y-5 px-5 pb-7">
        <InfoCard title="Event Highlights" primary={primary}>
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Beautiful Page", "Premium invitation", Gift],
              ["RSVP Ready", "Collect responses", Heart],
              ["Photo Gallery", "Share memories", Sparkles],
              ["Easy Sharing", "One tap invite", Phone],
            ].map(([title, note, Icon]) => (
              <div key={String(title)} className="rounded-2xl border bg-white/80 p-4 text-center" style={{ borderColor: `${primary}25` }}>
                <Icon className="mx-auto h-6 w-6" style={{ color: primary }} />
                <h3 className="mt-2 font-bold">{String(title)}</h3>
                <p className="text-xs text-muted">{String(note)}</p>
              </div>
            ))}
          </div>
        </InfoCard>

        <InfoCard title="Timeline" primary={primary}>
          {["Guest Arrival", "Main Ceremony", "Photos", "Dinner"].map((item, index) => (
            <div key={item} className="mt-2 flex items-center gap-3 rounded-2xl bg-white/80 p-3">
              <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: `${secondary}33`, color: primary }}>{index + 5}:00 PM</span>
              <div>
                <p className="font-bold">{item}</p>
                <p className="text-xs text-muted">A special moment for guests</p>
              </div>
            </div>
          ))}
        </InfoCard>

        <InfoCard title="Location" primary={primary}>
          <div className="map-bg mt-3 grid h-28 place-items-center rounded-2xl">
            <MapPin className="h-9 w-9" style={{ color: primary }} />
          </div>
          <h3 className="mt-3 font-serif text-2xl font-bold" style={{ color: primary }}>Grand Celebration Hall</h3>
          <p className="text-sm text-muted">Calicut, Kerala</p>
        </InfoCard>

        <InfoCard title="Gallery" primary={primary}>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {galleryImages.slice(0, 4).map((src) => <img key={src} src={src} alt="" className="aspect-square rounded-xl object-cover" />)}
          </div>
        </InfoCard>
      </section>
    </main>
  );
}

function InfoCard({ title, primary, children }: { title: string; primary: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[1.5rem] border bg-white/70 p-4 shadow-card" style={{ borderColor: `${primary}25` }}>
      <h2 className="text-center font-serif text-2xl font-bold" style={{ color: primary }}>{title}</h2>
      {children}
    </section>
  );
}

function Detail({ icon: Icon, title, note, color }: { icon: typeof CalendarDays; title: string; note: string; color: string }) {
  return (
    <div className="px-1 text-center">
      <Icon className="mx-auto h-4 w-4" style={{ color }} />
      <p className="mt-1 truncate font-bold">{title}</p>
      <p className="text-[10px] text-muted">{note}</p>
    </div>
  );
}
