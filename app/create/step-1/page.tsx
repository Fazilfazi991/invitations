"use client";

import { CalendarDays, Clock, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CreateEventLayout, FormField, UploadCard } from "@/components/shared";

export default function StepOnePage() {
  return (
    <CreateEventLayout step={1} title="Create Your Event" nextHref="/create/step-2">
      <Card className="space-y-4 p-5">
        <h2 className="font-serif text-2xl font-bold"><Heart className="mr-2 inline h-5 w-5 text-primary" />Basic Details</h2>
        <FormField label="Event title" placeholder="Afsal & Fathima Wedding" />
        <div className="grid gap-4 sm:grid-cols-2"><FormField label="Groom / Host name" placeholder="Afsal" /><FormField label="Bride / Co-host name" placeholder="Fathima" /></div>
        <FormField label="Event type" placeholder="Wedding" />
        <div className="grid gap-4 sm:grid-cols-2"><FormField label="Date" placeholder="May 24, 2025" icon={CalendarDays} /><FormField label="Time" placeholder="06:00 PM" icon={Clock} /></div>
      </Card>
      <UploadCard />
    </CreateEventLayout>
  );
}
