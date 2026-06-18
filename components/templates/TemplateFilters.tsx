"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const templateFilterOptions = [
  { label: "All", value: "all" },
  { label: "Wedding", value: "wedding" },
  { label: "Birthday", value: "birthday" },
  { label: "Housewarming", value: "housewarming" },
  { label: "Naming", value: "naming" },
  { label: "Religious", value: "religious" },
  { label: "Business", value: "business" },
  { label: "Custom", value: "custom" },
] as const;

export type TemplateFilterValue = (typeof templateFilterOptions)[number]["value"];

export function TemplateFilters({
  selected,
  search,
  onSelect,
  onSearch,
}: {
  selected: TemplateFilterValue;
  search: string;
  onSelect: (value: TemplateFilterValue) => void;
  onSearch: (value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted" />
        <Input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search wedding, birthday, housewarming..." className="h-12 rounded-2xl bg-white pl-12 shadow-card" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {templateFilterOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={cn("shrink-0 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-muted shadow-card transition", selected === option.value && "border-primary bg-primary text-white")}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
