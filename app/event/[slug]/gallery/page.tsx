import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { GalleryGrid, Section } from "@/components/shared";

export default function GalleryPage() {
  return (
    <main className="phone-shell min-h-screen pb-20">
      <MobileHeader action="search" />
      <Section>
        <h1 className="font-serif text-5xl font-bold">Gallery</h1>
        <p className="mt-2 text-muted">Moments we cherish.</p>
        <div className="my-5 flex gap-2"><Button size="sm">All</Button><Button variant="outline" size="sm">Photos</Button><Button variant="outline" size="sm">Videos</Button></div>
        <GalleryGrid />
      </Section>
      <BottomNav type="guest" />
    </main>
  );
}
