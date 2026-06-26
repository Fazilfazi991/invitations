import Link from "next/link";
import { ArrowRight, Baby, Cake, Church, Heart, HeartHandshake, Home, Sparkles } from "lucide-react";

const celebrations = [
  {
    title: "Wedding",
    description: "Elegant invitations for your big day.",
    href: "/categories?type=wedding",
    icon: HeartHandshake,
  },
  {
    title: "Birthday",
    description: "Make their day feel extra special.",
    href: "/categories?type=birthday",
    icon: Cake,
  },
  {
    title: "Baby Shower",
    description: "Celebrate the little one on the way.",
    href: "/categories?type=custom",
    icon: Baby,
  },
  {
    title: "Housewarming",
    description: "Invite loved ones into your new space.",
    href: "/categories?type=housewarming",
    icon: Home,
  },
  {
    title: "Naming Ceremony",
    description: "A beautiful beginning, shared with family.",
    href: "/categories?type=naming",
    icon: Baby,
  },
  {
    title: "Engagement",
    description: "Celebrate the promise before the wedding.",
    href: "/categories?type=engagement",
    icon: Heart,
  },
  {
    title: "Baptism",
    description: "Honor a meaningful spiritual milestone.",
    href: "/categories?type=religious",
    icon: Church,
  },
  {
    title: "Holy Communion",
    description: "Create a graceful invitation for a blessed day.",
    href: "/categories?type=religious",
    icon: Church,
  },
  {
    title: "Anniversary",
    description: "Celebrate love, memories, and milestones.",
    href: "/categories?type=custom",
    icon: Heart,
  },
  {
    title: "Other",
    description: "Create an event page for any special moment.",
    href: "/categories",
    icon: Sparkles,
  },
];

export default function CreateEventStartPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-br from-brand-offWhite via-white to-primary-soft/40 px-5 py-8">
      <section className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[2rem] border border-brand-light/80 bg-white/82 px-5 py-10 shadow-[0_18px_60px_rgba(108,23,133,0.08)] backdrop-blur sm:px-8 lg:px-12">
        <span className="pointer-events-none absolute -left-20 top-24 h-56 w-56 rounded-full bg-primary-soft/80" />
        <span className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full border-[8px] border-brand-light/45" />
        <span className="pointer-events-none absolute bottom-10 right-[28%] h-3 w-3 rotate-45 bg-brand-lavender/70" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
            <Sparkles className="h-4 w-4" />
            Start your celebration
          </p>
          <h1 className="mt-5 font-serif text-[clamp(38px,7vw,72px)] font-bold leading-[1.02] text-[#172033]">
            Let&apos;s create something <span className="italic text-primary">beautiful</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Choose your celebration type and we&apos;ll show templates made for that moment.
          </p>
        </div>

        <div className="relative z-10 mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {celebrations.map(({ title, description, href, icon: Icon }) => (
            <Link
              key={title}
              href={href}
              className="group relative min-h-[190px] overflow-hidden rounded-[1.5rem] border border-brand-light/75 bg-gradient-to-br from-white to-primary-soft/35 p-5 shadow-[0_12px_36px_rgba(108,23,133,0.07)] transition hover:-translate-y-1 hover:border-primary hover:shadow-soft"
            >
              <span className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-light/20 transition group-hover:bg-brand-light/35" />
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-primary shadow-[0_10px_26px_rgba(108,23,133,0.10)]">
                <Icon className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-serif text-2xl font-bold text-[#172033]">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary opacity-85 transition group-hover:translate-x-1 group-hover:opacity-100">
                View designs
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        <div className="relative z-10 mt-9 text-center">
          <Link href="/categories" className="inline-flex items-center gap-2 rounded-full border border-brand-light bg-white px-5 py-3 text-sm font-semibold text-primary shadow-[0_10px_28px_rgba(108,23,133,0.06)] transition hover:-translate-y-0.5 hover:bg-primary-soft">
            Not sure yet? Browse all templates
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
