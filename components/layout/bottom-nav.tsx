"use client";

import Link from "next/link";
import { CalendarHeart, Home, Image, PlusCircle, Share2, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const dashboardItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Events", icon: CalendarHeart },
  { href: "/categories", label: "Add", icon: PlusCircle },
  { href: "/event/afsal-fathima/gallery", label: "Media", icon: Image },
  { href: "/profile", label: "Profile", icon: User },
];

const guestItems = [
  { href: "/event/afsal-fathima", label: "Event", icon: Home },
  { href: "/event/afsal-fathima/schedule", label: "Schedule", icon: CalendarHeart },
  { href: "/event/afsal-fathima/rsvp", label: "RSVP", icon: Users },
  { href: "/event/afsal-fathima/gallery", label: "Gallery", icon: Image },
  { href: "/event/afsal-fathima/share", label: "Share", icon: Share2 },
];

export function BottomNav({ type = "dashboard" }: { type?: "dashboard" | "guest" }) {
  const items = type === "guest" ? guestItems : dashboardItems;
  return (
    <nav className="sticky bottom-0 z-40 border-t border-border bg-white/95 px-3 py-2 backdrop-blur">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className={cn("flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] text-muted transition hover:bg-primary-soft hover:text-primary")}>
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
