import { CreateEventLayout, ThemeCard } from "@/components/shared";

export default function StepFourPage() {
  return (
    <CreateEventLayout step={4} title="Theme & Publish" nextHref="/dashboard">
      <div>
        <h1 className="font-serif text-4xl font-bold">Choose a Theme</h1>
        <p className="mt-2 text-muted">Pick a style you love.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {["Blush", "Sage", "Classic", "Royal"].map((name, i) => <ThemeCard key={name} name={name} selected={i === 0} />)}
      </div>
    </CreateEventLayout>
  );
}
