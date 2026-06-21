"use client";

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
  onSelect,
}: {
  selected: TemplateFilterValue;
  onSelect: (value: TemplateFilterValue) => void;
}) {
  return (
    <div className="mx-auto flex max-w-full justify-start gap-3 overflow-x-auto pb-2 [scrollbar-width:none] sm:justify-center [&::-webkit-scrollbar]:hidden">
      {templateFilterOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onSelect(option.value)}
          className={cn("h-11 shrink-0 rounded-full border border-brand-light bg-white px-6 text-sm font-semibold text-[#6B7280] transition hover:bg-primary-soft", selected === option.value && "border-brand-primary bg-brand-primary text-white shadow-sm hover:bg-brand-violet")}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
