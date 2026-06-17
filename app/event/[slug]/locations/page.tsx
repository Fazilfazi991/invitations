import { MapPin } from "lucide-react";
import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { LocationCard, Section } from "@/components/shared";
import { locations } from "@/lib/mock-data";

export default function LocationsPage() {
  return (
    <main className="phone-shell min-h-screen pb-20">
      <MobileHeader action="search" />
      <Section>
        <h1 className="font-serif text-5xl font-bold">Event Locations</h1>
        <div className="map-bg mt-5 grid h-52 place-items-center rounded-2xl border border-border bg-primary-soft"><MapPin className="h-14 w-14 text-primary" /></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">{locations.map((location) => <LocationCard key={location.title} location={location} />)}</div>
      </Section>
      <BottomNav type="guest" />
    </main>
  );
}
