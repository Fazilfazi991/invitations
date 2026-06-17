import Link from "next/link";
import { ArrowRight, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VendorCategoryCard } from "@/components/vendors/VendorCategoryCard";
import { vendorCategories } from "@/lib/mock-data";

export function VendorMarketplaceTeaser() {
  return (
    <Card className="p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary-soft">
          <Store className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="font-serif text-3xl font-bold">Coming soon: trusted wedding vendors</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Find photographers, makeup artists, decorators, caterers, halls and live streaming teams for your celebration.
          </p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
        {vendorCategories.map((category) => <VendorCategoryCard key={category.id} category={category} />)}
      </div>
      <p className="mt-5 rounded-2xl bg-primary-soft p-4 text-sm leading-6 text-muted">
        Future marketplace revenue through vendor listings, verified partners and event service bookings.
      </p>
      <Button asChild variant="outline" className="mt-4 w-full">
        <Link href="/vendors">Explore vendor preview<ArrowRight className="h-4 w-4" /></Link>
      </Button>
    </Card>
  );
}
