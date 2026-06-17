import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { QRCodeCard, Section, ShareCard } from "@/components/shared";

export default function SharePage() {
  return (
    <main className="phone-shell min-h-screen pb-20">
      <MobileHeader action="search" />
      <Section>
        <h1 className="font-serif text-5xl font-bold">Share this event</h1>
        <p className="mt-2 text-muted">Invite your family and friends.</p>
        <div className="mt-5 grid grid-cols-2 gap-3"><Button>WhatsApp</Button><Button variant="outline">Instagram</Button><Button variant="outline">Facebook</Button><Button variant="outline">More</Button></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2"><ShareCard /><QRCodeCard /></div>
      </Section>
      <BottomNav type="guest" />
    </main>
  );
}
