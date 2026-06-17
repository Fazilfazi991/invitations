import { Building2, Camera, Flower2, Sparkles, Utensils, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const icons = {
  camera: Camera,
  sparkles: Sparkles,
  flower: Flower2,
  utensils: Utensils,
  building: Building2,
  video: Video,
};

export function VendorCategoryCard({ category }: { category: { name: string; description: string; icon: string } }) {
  const Icon = icons[category.icon as keyof typeof icons] ?? Sparkles;
  return (
    <Card className="p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-full bg-primary-soft">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <Badge>Coming soon</Badge>
      </div>
      <h3 className="font-serif text-xl font-bold">{category.name}</h3>
      <p className="mt-1 text-sm leading-5 text-muted">{category.description}</p>
    </Card>
  );
}
