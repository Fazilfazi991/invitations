"use client";

import { BirthdayTemplateRenderer } from "@/components/event/templates/birthday/BirthdayTemplateRenderer";
import { WeddingTemplateRenderer } from "@/components/event/templates/WeddingTemplateRenderer";
import { getDefaultDraft } from "@/lib/event-draft";
import { templateCategoryToEventType, templateMoodToTheme, type EventTemplate } from "@/lib/templates";

function buildPreviewEvent(template: EventTemplate) {
  const eventType = templateCategoryToEventType(template.category);
  const draft = getDefaultDraft(eventType);

  return {
    ...draft,
    eventType,
    templateId: template.id,
    theme: templateMoodToTheme(template.style.mood),
    date: eventType === "birthday" ? "2026-08-24" : "2026-11-24",
    time: eventType === "birthday" ? "17:00" : "18:30",
    venueName: eventType === "birthday" ? "The Party Place" : "Grand Seasons",
    address: eventType === "birthday" ? "Sunshine Towers, Bangalore" : "Kozhikode, Kerala",
    city: eventType === "birthday" ? "Bangalore" : "Kozhikode",
    schedule: eventType === "birthday"
      ? [
          { id: "arrival", title: "Guest Arrival", startTime: "16:30", description: "Welcome smiles" },
          { id: "games", title: "Games & Fun", startTime: "17:00", description: "Play together" },
          { id: "cake", title: "Cake Cutting", startTime: "18:00", description: "Sweet moment" },
          { id: "dinner", title: "Dinner & Treats", startTime: "19:00", description: "Yummy bites" },
        ]
      : [
          { id: "nikah", title: "Nikah Ceremony", startTime: "18:30", description: "Ceremony" },
          { id: "photos", title: "Photos", startTime: "19:15", description: "Capture moments" },
          { id: "dinner", title: "Dinner", startTime: "20:00", description: "Let's dine" },
          { id: "reception", title: "Reception", startTime: "21:00", description: "Dance & celebrate" },
        ],
    contacts: eventType === "birthday"
      ? [{ id: "host", name: "Rahman Family", role: "Host", phone: "+91 98765 43210" }]
      : [
          { id: "bride-family", name: "Fathima's Family", role: "Bride's Family", phone: "+91 98765 43210" },
          { id: "groom-family", name: "Afsal's Family", role: "Groom's Family", phone: "+91 98765 43211" },
        ],
  };
}

export function TemplateFullPagePreview({ template }: { template: EventTemplate }) {
  const previewEvent = buildPreviewEvent(template);

  if (template.category === "wedding") {
    return <WeddingTemplateRenderer event={previewEvent} />;
  }

  if (template.category === "birthday") {
    return <BirthdayTemplateRenderer event={previewEvent} />;
  }

  return (
    <div className="bg-[#FFFDF9] p-4">
      <img
        src={template.previewImage}
        alt={`${template.name} full template preview`}
        className="mx-auto h-auto w-full max-w-md rounded-[1.5rem] border border-[#F3D8DE] bg-white object-contain shadow-[0_18px_55px_rgba(217,79,112,0.12)]"
      />
    </div>
  );
}
