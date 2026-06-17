import { Heart, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

export type Blessing = {
  id: string;
  name: string;
  message: string;
  relation?: string;
  createdAt: string;
};

export function BlessingCard({ blessing }: { blessing: Blessing }) {
  return (
    <Card className="relative overflow-hidden p-4">
      <Sparkles className="absolute right-4 top-4 h-5 w-5 text-gold/70" />
      <div className="flex gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-soft">
          <Heart className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="pr-7">
            <h3 className="font-semibold">{blessing.name}</h3>
            <p className="text-xs text-muted">
              {blessing.relation || "Guest"} · {blessing.createdAt}
            </p>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">{blessing.message}</p>
        </div>
      </div>
    </Card>
  );
}
