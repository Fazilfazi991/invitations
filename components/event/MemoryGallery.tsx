import { Card } from "@/components/ui/card";
import { galleryImages, memoryHighlights } from "@/lib/mock-data";
import type { EventDraft } from "@/lib/event-draft";
import type { GuestMemory } from "@/lib/guest-memories";
import { getThemeStyles } from "@/lib/themes";

export function MemoryGallery({ event, guestMemories = [] }: { event?: EventDraft; guestMemories?: GuestMemory[] }) {
  const theme = getThemeStyles(event?.theme);
  const eventImages = (event?.gallery || []).filter((src) => src.startsWith("/") || src.startsWith("http"));
  const highlights = eventImages.length
    ? eventImages.map((image, index) => ({ id: `event-${index}`, image, title: index === 0 ? "A favorite moment" : `Memory ${index + 1}`, description: "A beautiful moment from the celebration." }))
    : memoryHighlights;
  return (
    <Card className="p-5" style={{ borderColor: theme.border }}>
      <h2 className="font-serif text-2xl font-bold">Moments we'll never forget</h2>
      <div className="mt-4 grid gap-3">
        {highlights.map((item) => (
          <div key={item.id} className="flex gap-3 rounded-2xl border border-border bg-white p-3">
            <img src={item.image} alt="" className="h-24 w-28 rounded-xl object-cover" />
            <div>
              <h3 className="font-serif text-xl font-bold" style={{ color: theme.primary }}>{item.title}</h3>
              <p className="mt-1 text-sm leading-5 text-muted">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      {guestMemories.length > 0 && (
        <>
          <h3 className="mt-6 font-serif text-xl font-bold">Shared by guests</h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {guestMemories.map((memory) => (
              <figure key={memory.id} className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: theme.border }}>
                <img src={memory.image} alt={memory.caption || `Photo from ${memory.guestName}`} className="h-36 w-full object-cover" />
                <figcaption className="p-3"><p className="text-sm font-semibold">{memory.guestName}</p>{memory.caption && <p className="mt-1 text-xs text-muted">{memory.caption}</p>}</figcaption>
              </figure>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}
