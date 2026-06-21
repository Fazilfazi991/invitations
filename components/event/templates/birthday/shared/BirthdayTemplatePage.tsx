"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Cake,
  CalendarDays,
  Camera,
  Clock,
  Crown,
  Gamepad2,
  Gift,
  Heart,
  MapPin,
  Music,
  Navigation,
  Phone,
  Send,
  Shirt,
  Sparkles,
  Utensils,
  WandSparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  buildBirthdayShareText,
  formatBirthdayDate,
  formatBirthdayTime,
  getBirthdayAgeLabel,
  getBirthdayContacts,
  getBirthdayCountdown,
  getBirthdayDressCode,
  getBirthdayGallery,
  getBirthdayName,
  getBirthdaySchedule,
  getBirthdayVenue,
  type BirthdayEventData,
  type BirthdayHighlight,
  type BirthdayThemeConfig,
} from "@/components/event/templates/birthday/birthday-template-utils";
import { cn } from "@/lib/utils";
import { getThemeStyles } from "@/lib/themes";

type ThemeArt = {
  heroTitle: string;
  heroScene: string;
  timelineTitle: string;
  galleryTitle: string;
  closing: string;
  ornaments: string[];
  motifs: string[];
  mapTint: string;
  darkCard?: string;
};

const themeArt: Record<string, ThemeArt> = {
  "pink-teddy-birthday": {
    heroTitle: "soft teddy party",
    heroScene: "teddy, cake and balloons",
    timelineTitle: "Party Timeline",
    galleryTitle: "Photo Gallery",
    closing: "Can't wait to celebrate with you!",
    ornaments: ["Teddy", "Cake", "Balloons", "Flowers"],
    motifs: ["bear", "balloon", "cake", "flower"],
    mapTint: "#FDE7EF",
  },
  "blue-sky-birthday": {
    heroTitle: "sky high celebration",
    heroScene: "clouds, stars and blue balloons",
    timelineTitle: "Party Timeline",
    galleryTitle: "Gallery",
    closing: "Join us to make it a day to remember!",
    ornaments: ["Clouds", "Stars", "Balloons", "Fun"],
    motifs: ["cloud", "star", "balloon", "cloud"],
    mapTint: "#DBEAFE",
  },
  "floral-princess-birthday": {
    heroTitle: "royal garden party",
    heroScene: "crowns, castles and flowers",
    timelineTitle: "Royal Timeline",
    galleryTitle: "Gallery",
    closing: "A royal celebration awaits.",
    ornaments: ["Crown", "Castle", "Flowers", "Magic"],
    motifs: ["crown", "flower", "castle", "sparkle"],
    mapTint: "#F3E8FF",
  },
  "black-gold-luxe-birthday": {
    heroTitle: "black gold luxe",
    heroScene: "gold balloons and sparkling lights",
    timelineTitle: "Party Timeline",
    galleryTitle: "Gallery",
    closing: "Let's celebrate in style.",
    ornaments: ["Gold", "Music", "Balloons", "Lights"],
    motifs: ["crown", "music", "sparkle", "gift"],
    mapTint: "#211908",
    darkCard: "#11100C",
  },
  "candyland-birthday": {
    heroTitle: "sweet candyland",
    heroScene: "lollipops, donuts and colorful balloons",
    timelineTitle: "Sweet Timeline",
    galleryTitle: "Gallery",
    closing: "Sweet memories start here.",
    ornaments: ["Candy", "Lollipop", "Donut", "Balloons"],
    motifs: ["candy", "cake", "gift", "sparkle"],
    mapTint: "#FCE7F3",
  },
  "dino-adventure-birthday": {
    heroTitle: "dino adventure",
    heroScene: "jungle leaves, volcano and dinos",
    timelineTitle: "Adventure Timeline",
    galleryTitle: "Adventure Memories",
    closing: "A roar-some adventure awaits.",
    ornaments: ["Dino", "Leaves", "Volcano", "Tracks"],
    motifs: ["dino", "leaf", "volcano", "egg"],
    mapTint: "#ECFCCB",
  },
};

const iconMap = {
  cake: Cake,
  gift: Gift,
  heart: Heart,
  music: Music,
  phone: Phone,
  sparkle: Sparkles,
  users: Gamepad2,
};

const motifIconMap = {
  bear: Heart,
  balloon: Sparkles,
  cake: Cake,
  flower: Sparkles,
  cloud: Sparkles,
  star: Sparkles,
  crown: Crown,
  castle: Crown,
  music: Music,
  candy: Gift,
  dino: Gamepad2,
  leaf: Sparkles,
  volcano: WandSparkles,
  egg: Heart,
  gift: Gift,
};

export function BirthdayTemplatePage({ event, config }: { event: BirthdayEventData; config: BirthdayThemeConfig }) {
  const selectedTheme = getThemeStyles(event.theme);
  config = {
    ...config,
    primary: selectedTheme.primary,
    secondary: selectedTheme.accent,
    border: selectedTheme.border,
    background: `linear-gradient(180deg, ${selectedTheme.background}, ${selectedTheme.soft})`,
  };
  const art = themeArt[config.id] ?? themeArt["pink-teddy-birthday"];
  const name = getBirthdayName(event);
  const ageLabel = getBirthdayAgeLabel(event);
  const venue = getBirthdayVenue(event);
  const contacts = getBirthdayContacts(event);
  const contact = contacts[0];
  const schedule = getBirthdaySchedule(event);
  const gallery = getBirthdayGallery(event, config);
  const shareText = buildBirthdayShareText(event);
  const [countdown, setCountdown] = useState(() => ({
    started: false,
    values: ["23", "14", "36", "12"],
  }));
  const isDark = Boolean(config.dark);
  const panelStyle = useMemo(
    () => ({
      backgroundColor: isDark ? art.darkCard ?? "#11100C" : "rgba(255,255,255,0.72)",
      borderColor: config.border,
      boxShadow: isDark ? "0 18px 50px rgba(0,0,0,0.35)" : "0 18px 45px rgba(217,79,112,0.10)",
    }),
    [art.darkCard, config.border, isDark]
  );

  useEffect(() => {
    const updateCountdown = () => setCountdown(getBirthdayCountdown(event.date, event.time));

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(timer);
  }, [event.date, event.time]);

  return (
    <div className={cn("min-h-screen", isDark ? "bg-[#050505]" : "bg-[#FFF7F8]")} style={{ color: config.text }}>
      <main
        className="relative mx-auto min-h-screen max-w-md overflow-hidden"
        style={{ background: config.background }}
      >
        <TemplateBackground art={art} config={config} />
        <div className="relative z-10 px-4 pb-6 pt-5">
          <HeroSection event={event} config={config} art={art} name={name} ageLabel={ageLabel} venue={venue} isDark={isDark} panelStyle={panelStyle} />
          <CountdownSection countdown={countdown} config={config} panelStyle={panelStyle} />
          <HighlightsSection items={config.highlights} config={config} art={art} panelStyle={panelStyle} />
          <TimelineSection items={schedule} config={config} art={art} panelStyle={panelStyle} />
          <LocationSection event={event} config={config} art={art} venue={venue} panelStyle={panelStyle} />
          <GallerySection items={gallery} config={config} art={art} />
          <FooterInfo event={event} contact={contact} config={config} panelStyle={panelStyle} />
          <ShareSection config={config} shareText={shareText} closing={art.closing} isDark={isDark} />
        </div>
      </main>
    </div>
  );
}

function HeroSection({
  event,
  config,
  art,
  name,
  ageLabel,
  venue,
  isDark,
  panelStyle,
}: {
  event: BirthdayEventData;
  config: BirthdayThemeConfig;
  art: ThemeArt;
  name: string;
  ageLabel: string;
  venue: ReturnType<typeof getBirthdayVenue>;
  isDark: boolean;
  panelStyle: React.CSSProperties;
}) {
  return (
    <section className="relative overflow-hidden rounded-b-[2.25rem] pb-5 text-center">
      <div className="flex items-center justify-between">
        <p className="font-serif text-2xl font-bold" style={{ color: config.primary }}>Jashnly</p>
        <span className="grid h-10 w-10 place-items-center rounded-full border" style={{ borderColor: config.border, backgroundColor: isDark ? "#17120A" : "rgba(255,255,255,0.78)", color: config.primary }}>
          <Music className="h-5 w-5" />
        </span>
      </div>

      <div className="relative mt-6 rounded-[2rem] border p-4 pt-12" style={panelStyle}>
        <HeroArt art={art} config={config} />
        <p className="relative z-10 text-sm font-bold uppercase tracking-[0.18em]" style={{ color: config.primary }}>{config.titlePrefix}</p>
        <h1 className="relative z-10 mt-3 font-serif text-5xl font-bold leading-[0.92] sm:text-6xl" style={{ color: config.primary }}>
          {name}'s
          <span className="block">{ageLabel} Birthday!</span>
        </h1>
        <p className="relative z-10 mx-auto mt-3 max-w-xs text-sm font-semibold" style={{ color: config.muted }}>{config.intro}</p>

        <div className="relative z-10 mt-6 grid grid-cols-3 divide-x rounded-[1.4rem] border px-2 py-4 backdrop-blur" style={{ borderColor: config.border, backgroundColor: isDark ? "rgba(0,0,0,0.42)" : "rgba(255,255,255,0.74)" }}>
          <Detail icon={CalendarDays} title={formatBirthdayDate(event.date)} note="Date" color={config.primary} />
          <Detail icon={Clock} title={formatBirthdayTime(event.time)} note="Onwards" color={config.primary} />
          <Detail icon={MapPin} title={venue.venue} note={venue.city} color={config.primary} />
        </div>

        <Button className="relative z-10 mt-5 rounded-full px-8" style={{ backgroundColor: config.primary, color: isDark ? "#111827" : "#fff" }}>
          {config.cta} <Heart className="h-4 w-4" />
        </Button>
        <p className="relative z-10 mt-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: config.muted }}>{art.heroScene}</p>
      </div>
    </section>
  );
}

function CountdownSection({ countdown, config, panelStyle }: { countdown: { started: boolean; values: string[] }; config: BirthdayThemeConfig; panelStyle: React.CSSProperties }) {
  return (
    <section className="mt-5 rounded-[1.5rem] border p-4 backdrop-blur" style={panelStyle}>
      {countdown.started ? (
        <p className="text-center font-serif text-2xl font-bold" style={{ color: config.primary }}>The celebration has started</p>
      ) : (
        <div className="grid grid-cols-4 divide-x" style={{ borderColor: config.border }}>
          {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => (
            <div key={label} className="text-center">
              <p className="font-serif text-3xl font-bold" style={{ color: config.primary }}>{countdown.values[index]}</p>
              <p className="text-[11px]" style={{ color: config.muted }}>{label}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function HighlightsSection({ items, config, art, panelStyle }: { items: BirthdayHighlight[]; config: BirthdayThemeConfig; art: ThemeArt; panelStyle: React.CSSProperties }) {
  return (
    <section className="mt-7">
      <SectionTitle title={config.sectionTitle} color={config.primary} />
      <div className="mt-4 grid grid-cols-2 gap-3">
        {items.slice(0, 5).map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] || Sparkles;
          return (
            <div key={item.title} className={cn("relative overflow-hidden rounded-[1.35rem] border p-4 text-center backdrop-blur", items.length === 5 && item === items[4] && "col-span-2")} style={panelStyle}>
              <span className="absolute -right-5 -top-5 h-16 w-16 rounded-full opacity-20" style={{ backgroundColor: config.secondary }} />
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full" style={{ backgroundColor: config.card, color: config.primary }}>
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-3 font-bold" style={{ color: config.primary }}>{item.title}</h3>
              <p className="text-xs" style={{ color: config.muted }}>{item.note}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.18em] opacity-60">{art.heroTitle}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TimelineSection({ items, config, art, panelStyle }: { items: ReturnType<typeof getBirthdaySchedule>; config: BirthdayThemeConfig; art: ThemeArt; panelStyle: React.CSSProperties }) {
  return (
    <section className="mt-7">
      <SectionTitle title={art.timelineTitle} color={config.primary} />
      <div className="mt-4 space-y-2">
        {items.map((item, index) => (
          <div key={`${item.title}-${item.time}`} className="relative flex items-center gap-3 rounded-2xl border p-3" style={panelStyle}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold" style={{ backgroundColor: config.card, color: config.primary }}>{index + 1}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-bold">{item.title}</p>
                <span className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold" style={{ backgroundColor: config.card, color: config.primary }}>{item.time}</span>
              </div>
              <p className="text-xs" style={{ color: config.muted }}>{item.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LocationSection({
  event,
  config,
  art,
  venue,
  panelStyle,
}: {
  event: BirthdayEventData;
  config: BirthdayThemeConfig;
  art: ThemeArt;
  venue: ReturnType<typeof getBirthdayVenue>;
  panelStyle: React.CSSProperties;
}) {
  return (
    <section className="mt-7">
      <SectionTitle title="Location" color={config.primary} />
      <div className="mt-4 overflow-hidden rounded-[1.5rem] border p-4" style={panelStyle}>
        <div className="relative h-32 overflow-hidden rounded-2xl border" style={{ borderColor: config.border, background: `linear-gradient(135deg, ${art.mapTint}, rgba(255,255,255,0.85))` }}>
          <span className="absolute inset-0 opacity-55 [background-image:linear-gradient(30deg,transparent_45%,rgba(156,163,175,0.45)_46%,transparent_47%),linear-gradient(110deg,transparent_42%,rgba(156,163,175,0.35)_43%,transparent_44%),linear-gradient(160deg,transparent_48%,rgba(156,163,175,0.35)_49%,transparent_50%)]" />
          <span className="absolute left-[48%] top-[38%] grid h-12 w-12 place-items-center rounded-full bg-white/85 shadow-card">
            <MapPin className="h-7 w-7" style={{ color: config.primary }} />
          </span>
        </div>
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
          <div>
            <h3 className="font-serif text-2xl font-bold" style={{ color: config.primary }}>{venue.venue}</h3>
            <p className="mt-1 text-sm" style={{ color: config.muted }}>{venue.address}</p>
            <Button asChild variant="outline" className="mt-3 rounded-full" style={{ borderColor: config.border, color: config.primary }}>
              <Link href={event.mapLink || "#"}><Navigation className="h-4 w-4" />View Location</Link>
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            {[Navigation, Phone, Send].map((Icon, index) => (
              <span key={index} className="grid h-10 w-10 place-items-center rounded-full border" style={{ borderColor: config.border, backgroundColor: config.card, color: config.primary }}>
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection({ items, config, art }: { items: string[]; config: BirthdayThemeConfig; art: ThemeArt }) {
  return (
    <section className="mt-7">
      <SectionTitle title={art.galleryTitle} color={config.primary} />
      <div className="mt-4 grid grid-cols-5 gap-2">
        {items.slice(0, 5).map((src, index) => (
          src.startsWith("gradient:") ? (
            <div
              key={src}
              className="relative aspect-square overflow-hidden rounded-2xl border shadow-sm"
              style={{
                borderColor: config.border,
                background: `radial-gradient(circle at 35% 25%, ${config.secondary}88, transparent 34%), linear-gradient(135deg, ${config.card}, ${config.background})`,
              }}
            >
              <span className="absolute inset-0 grid place-items-center">
                {renderMotif(art.motifs[index % art.motifs.length], config, "h-7 w-7")}
              </span>
            </div>
          ) : (
            <img key={src} src={src} alt="" className="aspect-square rounded-2xl border object-cover shadow-sm" style={{ borderColor: config.border }} />
          )
        ))}
      </div>
    </section>
  );
}

function FooterInfo({ event, contact, config, panelStyle }: { event: BirthdayEventData; contact?: { phone: string }; config: BirthdayThemeConfig; panelStyle: React.CSSProperties }) {
  return (
    <section className="mt-7 grid grid-cols-2 gap-3 rounded-[1.5rem] border p-4" style={panelStyle}>
      <InfoBlock title="Dress Code" value={getBirthdayDressCode(event, config.dressCode)} icon={Shirt} config={config} />
      <InfoBlock title="Contact" value={contact?.phone || "+91 98765 43210"} icon={Phone} config={config} />
    </section>
  );
}

function ShareSection({ config, shareText, closing, isDark }: { config: BirthdayThemeConfig; shareText: string; closing: string; isDark: boolean }) {
  return (
    <section className="mt-5 pb-2 text-center">
      <Button asChild className="rounded-full px-8" style={{ backgroundColor: config.primary, color: isDark ? "#111827" : "#fff" }}>
        <a href={`https://wa.me/?text=${shareText}`} target="_blank" rel="noreferrer"><Send className="h-4 w-4" />Share Invite</a>
      </Button>
      <p className="mt-4 font-serif text-lg italic" style={{ color: config.primary }}>{closing}</p>
      <p className="mt-2 text-xs" style={{ color: config.muted }}>Made with love on Jashnly</p>
    </section>
  );
}

function Detail({ icon: Icon, title, note, color }: { icon: typeof CalendarDays; title: string; note: string; color: string }) {
  return (
    <div className="px-1 text-center">
      <Icon className="mx-auto h-5 w-5" style={{ color }} />
      <p className="mt-2 truncate text-xs font-bold">{title}</p>
      <p className="text-[10px] opacity-75">{note}</p>
    </div>
  );
}

function InfoBlock({ title, value, icon: Icon, config }: { title: string; value: string; icon: typeof Gift; config: BirthdayThemeConfig }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full" style={{ backgroundColor: config.card, color: config.primary }}>
        <Icon className="h-6 w-6" />
      </span>
      <div className="min-w-0">
        <p className="font-bold" style={{ color: config.primary }}>{title}</p>
        <p className="truncate text-sm" style={{ color: config.muted }}>{value}</p>
      </div>
    </div>
  );
}

function SectionTitle({ title, color }: { title: string; color: string }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-12 opacity-45" style={{ backgroundColor: color }} />
      <h2 className="text-center font-serif text-3xl font-bold leading-tight" style={{ color }}>{title}</h2>
      <span className="h-px w-12 opacity-45" style={{ backgroundColor: color }} />
    </div>
  );
}

function HeroArt({ art, config }: { art: ThemeArt; config: BirthdayThemeConfig }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
      {art.motifs.map((motif, index) => (
        <span
          key={`${motif}-${index}`}
          className={cn(
            "absolute grid place-items-center rounded-full border backdrop-blur",
            index % 2 === 0 ? "h-16 w-16" : "h-12 w-12"
          )}
          style={{
            left: `${index % 2 === 0 ? 4 + index * 20 : 76 - index * 14}%`,
            top: `${index < 2 ? 8 + index * 18 : 68 - index * 9}%`,
            borderColor: config.border,
            backgroundColor: index % 2 === 0 ? config.card : "rgba(255,255,255,0.42)",
            color: config.primary,
            transform: `rotate(${index % 2 ? 9 : -8}deg)`,
          }}
        >
          {renderMotif(motif, config, index % 2 === 0 ? "h-7 w-7" : "h-5 w-5")}
        </span>
      ))}
    </div>
  );
}

function TemplateBackground({ art, config }: { art: ThemeArt; config: BirthdayThemeConfig }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <span className="absolute -left-12 top-24 h-44 w-44 rounded-full opacity-25 blur-3xl" style={{ backgroundColor: config.secondary }} />
      <span className="absolute -right-16 top-48 h-52 w-52 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: config.primary }} />
      <span className="absolute bottom-24 left-8 h-36 w-36 rounded-full opacity-20 blur-2xl" style={{ backgroundColor: config.secondary }} />
      {art.ornaments.map((label, index) => (
        <span
          key={`${label}-${index}`}
          className="absolute rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] opacity-40"
          style={{
            left: `${(index * 29 + 4) % 82}%`,
            top: `${14 + ((index * 23) % 72)}%`,
            borderColor: config.border,
            color: config.primary,
            transform: `rotate(${index % 2 ? 12 : -12}deg)`,
          }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

function renderMotif(motif: string, config: BirthdayThemeConfig, className: string) {
  const Icon = motifIconMap[motif as keyof typeof motifIconMap] || Sparkles;

  if (motif === "balloon") {
    return <span className="relative block h-8 w-5 rounded-full" style={{ backgroundColor: config.secondary }}><span className="absolute left-1/2 top-full h-6 w-px -translate-x-1/2" style={{ backgroundColor: config.primary }} /></span>;
  }

  if (motif === "cloud") {
    return <span className="relative block h-5 w-9 rounded-full bg-white/90"><span className="absolute -top-2 left-1 h-5 w-5 rounded-full bg-white/90" /><span className="absolute -top-3 right-1 h-6 w-6 rounded-full bg-white/90" /></span>;
  }

  if (motif === "dino") {
    return <span className="font-serif text-lg font-black" style={{ color: config.primary }}>D</span>;
  }

  return <Icon className={className} style={{ color: config.primary }} />;
}
