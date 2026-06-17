import { CalendarDays, Image, MapPinned, MessageCircle, ShieldCheck, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  { title: "Smart RSVP", text: "Track responses in real time.", icon: UserCheck },
  { title: "Photo Gallery", text: "Collect and share memories.", icon: Image },
  { title: "Event Timeline", text: "Share every moment clearly.", icon: CalendarDays },
  { title: "Interactive Maps", text: "Help guests find the venue.", icon: MapPinned },
  { title: "WhatsApp Sharing", text: "Share invites in one tap.", icon: MessageCircle },
  { title: "Secure Hosting", text: "Your event stays safe online.", icon: ShieldCheck },
];

export function HeroFeatureCards() {
  return (
    <div className="flex gap-3 overflow-x-auto px-6 pb-8 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-8">
      {features.map(({ title, text, icon: Icon }) => (
        <Card key={title} className="flex min-w-64 items-center gap-3 p-4 lg:min-w-0">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary-soft"><Icon className="h-6 w-6 text-primary" /></div>
          <div><h3 className="text-sm font-bold">{title}</h3><p className="text-xs leading-5 text-muted">{text}</p></div>
        </Card>
      ))}
    </div>
  );
}
