import { Card } from "@/components/ui/card";
import { memoryHighlights } from "@/lib/mock-data";

export function MemoryGallery() {
  return (
    <Card className="p-5">
      <h2 className="font-serif text-2xl font-bold">Moments we'll never forget</h2>
      <div className="mt-4 grid gap-3">
        {memoryHighlights.map((item) => (
          <div key={item.id} className="flex gap-3 rounded-2xl border border-border bg-white p-3">
            <img src={item.image} alt="" className="h-24 w-28 rounded-xl object-cover" />
            <div>
              <h3 className="font-serif text-xl font-bold text-primary">{item.title}</h3>
              <p className="mt-1 text-sm leading-5 text-muted">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
