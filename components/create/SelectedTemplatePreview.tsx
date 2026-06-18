import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TemplatePreview } from "@/components/templates/TemplatePreview";
import type { EventTemplate } from "@/lib/templates";

export function SelectedTemplatePreview({ template }: { template: EventTemplate }) {
  return (
    <Card className="overflow-hidden p-4">
      <div className="flex gap-4">
        <TemplatePreview template={template} compact className="w-28 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Selected template</p>
          <h2 className="mt-1 font-serif text-2xl font-bold">{template.name}</h2>
          <div className="mt-2 flex gap-2"><Badge>{template.category}</Badge>{template.isPremium && <Badge className="bg-amber-50 text-amber-700">Premium</Badge>}</div>
          <Button asChild variant="outline" size="sm" className="mt-3"><Link href="/categories">Change template</Link></Button>
        </div>
      </div>
    </Card>
  );
}
