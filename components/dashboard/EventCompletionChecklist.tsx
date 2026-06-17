"use client";

import Link from "next/link";
import type { ElementType } from "react";
import {
  CalendarCheck,
  CheckCircle,
  Circle,
  Contact,
  Image,
  MapPin,
  MessageCircle,
  PlayCircle,
  QrCode,
  Sparkles,
  Upload,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { eventChecklist } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const icons: Record<string, ElementType> = {
  "basic-details": CalendarCheck,
  "cover-image": Image,
  "invitation-card": Upload,
  schedule: Sparkles,
  location: MapPin,
  rsvp: Users,
  "youtube-live": PlayCircle,
  "family-contacts": Contact,
  "qr-code": QrCode,
  "whatsapp-message": MessageCircle,
};

const actionHref: Record<string, string> = {
  "basic-details": "/create/step-1",
  "cover-image": "/create/step-1",
  "invitation-card": "/create/step-3",
  schedule: "/create/step-3",
  location: "/create/step-2",
  rsvp: "/create/step-3",
  "youtube-live": "/create/step-3",
  "family-contacts": "/create/step-3",
  "qr-code": "/event/afsal-fathima/share",
  "whatsapp-message": "/event/afsal-fathima/share",
};

export function EventCompletionChecklist({ compact = false }: { compact?: boolean }) {
  const completed = eventChecklist.filter((item) => item.completed).length;
  const percent = Math.round((completed / eventChecklist.length) * 100);
  const visibleItems = compact ? eventChecklist.filter((item) => !item.completed).slice(0, 3) : eventChecklist;

  return (
    <Card className={cn("overflow-hidden p-5", compact && "bg-gradient-to-br from-white to-primary-soft/40")}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold">Event setup</h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            Complete these steps to make your event page ready for guests.
          </p>
        </div>
        <Badge className="shrink-0">{percent}% complete</Badge>
      </div>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-primary-soft">
        <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
      </div>
      <div className={cn("mt-5 space-y-3", compact && "mt-4")}>
        {visibleItems.map((item) => {
          const Icon = icons[item.id] ?? Sparkles;
          return (
            <div key={item.id} className="flex gap-3 rounded-2xl border border-border bg-white/85 p-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-soft">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-muted">{item.description}</p>
                  </div>
                  {item.completed ? (
                    <CheckCircle className="h-5 w-5 shrink-0 text-emerald-500" />
                  ) : (
                    <Circle className="h-5 w-5 shrink-0 text-primary" />
                  )}
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <Badge className={item.completed ? "bg-emerald-50 text-emerald-600" : "bg-primary-soft text-primary"}>
                    {item.completed ? "Completed" : "Pending"}
                  </Badge>
                  {!item.completed && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={actionHref[item.id] ?? "/create/step-1"}>{item.actionLabel}</Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {compact && (
        <Button asChild variant="ghost" className="mt-4 w-full">
          <Link href="/dashboard/afsal-fathima">View full setup</Link>
        </Button>
      )}
    </Card>
  );
}
