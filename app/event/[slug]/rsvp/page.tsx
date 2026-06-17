import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Card } from "@/components/ui/card";
import { RSVPForm, Section } from "@/components/shared";

export default function RSVPPage() {
  return (
    <main className="phone-shell min-h-screen pb-20">
      <MobileHeader action="search" />
      <Section>
        <h1 className="font-serif text-5xl font-bold">RSVP</h1>
        <p className="mt-2 text-muted">Let us know if you&apos;re coming.</p>
        <Card className="mt-6 p-5"><RSVPForm /></Card>
      </Section>
      <BottomNav type="guest" />
    </main>
  );
}
