import { Search, Star } from "lucide-react";
import { MobileHeader } from "@/components/layout/mobile-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { VendorCategoryCard } from "@/components/vendors/VendorCategoryCard";
import { Section } from "@/components/shared";
import { featuredVendors, vendorCategories } from "@/lib/mock-data";

export default function VendorsPage() {
  return (
    <main className="phone-shell min-h-screen pb-10">
      <MobileHeader action="search" />
      <Section>
        <h1 className="font-serif text-5xl font-bold">Trusted Vendors</h1>
        <p className="mt-2 text-muted">Coming soon to occazn.</p>
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-card">
          <Search className="h-5 w-5 text-muted" />
          <span className="text-sm text-muted">Search photographers, halls, decor...</span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
          {vendorCategories.map((category) => <VendorCategoryCard key={category.id} category={category} />)}
        </div>
        <h2 className="mt-8 font-serif text-3xl font-bold">Featured vendors</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {featuredVendors.map((vendor) => (
            <Card key={vendor.name} className="overflow-hidden">
              <img src={vendor.image} alt="" className="h-36 w-full object-cover" />
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-xl font-bold">{vendor.name}</h3>
                    <p className="text-sm text-muted">{vendor.category} - {vendor.location}</p>
                  </div>
                  <Badge>Coming soon</Badge>
                </div>
                <p className="mt-3 flex items-center gap-1 text-sm font-semibold text-brand-violet">
                  <Star className="h-4 w-4 fill-current" />{vendor.rating}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
