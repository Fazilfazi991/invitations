import Link from "next/link";
import { Images, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function MemoryModeCard({ slug = "afsal-fathima" }: { slug?: string }) {
  return (
    <Card className="overflow-hidden p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-soft">
          <Images className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold">Memory Mode</h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            After the event, your page becomes a beautiful memory album with photos, wishes and highlight videos.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge>Invitation Mode: Active</Badge>
        <Badge className="bg-primary-soft text-primary">Memory Mode: Preview available</Badge>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button asChild><Link href={`/event/${slug}/memories`}><Sparkles className="h-4 w-4" />Open Memory Album</Link></Button>
        <Button asChild variant="outline"><Link href={`/event/${slug}?mode=memory`}>Quick preview</Link></Button>
      </div>
    </Card>
  );
}
