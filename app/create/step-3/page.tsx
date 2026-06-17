"use client";

import { ImagePlus, Link as LinkIcon, QrCode, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateEventLayout, TimelineItem, UploadCard } from "@/components/shared";
import { schedule } from "@/lib/mock-data";

const tools = [
  { label: "RSVP", icon: Users },
  { label: "Gallery", icon: ImagePlus },
  { label: "QR Sharing", icon: QrCode },
];

export default function StepThreePage() {
  return (
    <CreateEventLayout step={3} title="Media & Schedule" nextHref="/create/step-4">
      <UploadCard title="Wedding Card / Invitation" />
      <Card className="space-y-3 p-5">
        <h2 className="font-serif text-2xl font-bold"><LinkIcon className="mr-2 inline h-5 w-5 text-primary" />YouTube Live Link</h2>
        <Input defaultValue="https://youtube.com/live/sample" />
      </Card>
      <Card className="space-y-3 p-5">
        <div className="flex items-center justify-between"><h2 className="font-serif text-2xl font-bold">Event Schedule</h2><Button variant="ghost" size="sm">Add item</Button></div>
        {schedule.slice(0, 3).map((item) => <TimelineItem key={item.title} item={item} />)}
      </Card>
      <Card className="grid grid-cols-3 gap-3 p-5 text-center text-sm font-semibold">
        {tools.map(({ label, icon: Icon }) => <div key={label} className="rounded-xl bg-primary-soft p-4"><Icon className="mx-auto mb-2 h-6 w-6 text-primary" />{label}</div>)}
      </Card>
    </CreateEventLayout>
  );
}
