import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreateEventLayout, FormField, LocationCard } from "@/components/shared";
import { locations } from "@/lib/mock-data";

export default function StepTwoPage() {
  return (
    <CreateEventLayout step={2} title="Location Details" nextHref="/create/step-3">
      <Card className="space-y-4 p-5">
        <h2 className="font-serif text-2xl font-bold"><MapPin className="mr-2 inline h-5 w-5 text-primary" />Add Locations</h2>
        <FormField label="Venue name" placeholder="Calicut Convention Centre" />
        <FormField label="Address" placeholder="Mini Bypass Rd, Kozhikode, Kerala" />
        <FormField label="City" placeholder="Calicut" />
        <FormField label="Google Maps link" placeholder="https://maps.google.com/sample" />
        <Button variant="outline" className="w-full">Add another location</Button>
      </Card>
      <div className="map-bg grid h-40 place-items-center rounded-2xl border border-border bg-primary-soft"><MapPin className="h-12 w-12 text-primary" /></div>
      <LocationCard location={locations[1]} />
    </CreateEventLayout>
  );
}
