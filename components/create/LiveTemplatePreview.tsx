import { CalendarDays, MapPin } from "lucide-react";
import { BirthdayTemplateRenderer } from "@/components/event/templates/birthday/BirthdayTemplateRenderer";
import type { BirthdayEventData } from "@/components/event/templates/birthday/birthday-template-utils";
import { WeddingTemplateRenderer } from "@/components/event/templates/WeddingTemplateRenderer";
import type { WeddingEventData } from "@/components/event/templates/template-utils";
import { Card } from "@/components/ui/card";
import { formatEventDate } from "@/lib/date-utils";
import type { EventDraft } from "@/lib/event-draft";
import { getEventHeroLabel } from "@/lib/event-types";
import type { EventTemplate } from "@/lib/templates";

function previewTitle(draft: EventDraft) {
  if (draft.eventType === "birthday") {
    const name = draft.childName || draft.birthdayPersonName || draft.primaryName;
    const age = draft.ageTurning || draft.age;
    return name ? `${name}${age ? ` turns ${age}` : ""}` : draft.title;
  }
  if (draft.eventType === "housewarming") return draft.primaryName || draft.hostName || draft.title;
  if (draft.eventType === "naming") return draft.childName || draft.primaryName || draft.title;
  if (draft.eventType === "business") return draft.businessName || draft.title;
  if (draft.secondaryName) return `${draft.primaryName} & ${draft.secondaryName}`;
  return draft.primaryName || draft.hostName || draft.title;
}

export function LiveTemplatePreview({ draft, template }: { draft: EventDraft; template: EventTemplate }) {
  const previewDraft = {
    ...draft,
    templateId: template.id,
    templateName: template.name,
    templateImage: template.previewImage,
  };

  if (["wedding", "engagement", "reception"].includes(previewDraft.eventType)) {
    return (
      <Card className="overflow-hidden p-0">
        <div className="h-[520px] overflow-y-auto bg-[#fbf0f6]">
          <WeddingTemplateRenderer event={previewDraft as WeddingEventData} />
        </div>
      </Card>
    );
  }

  if (previewDraft.eventType === "birthday") {
    return (
      <Card className="overflow-hidden p-0">
        <div className="h-[520px] overflow-y-auto bg-white">
          <BirthdayTemplateRenderer event={previewDraft as BirthdayEventData} />
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden p-4" style={{ background: `linear-gradient(135deg, ${template.style.background}, #fff)` }}>
      <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: template.style.secondary }}>{getEventHeroLabel(draft.eventType)}</p>
      <h2 className="mt-2 font-serif text-3xl font-bold leading-tight" style={{ color: template.style.primary }}>{previewTitle(draft)}</h2>
      <p className="mt-2 text-sm text-muted">{draft.title}</p>
      <div className="mt-4 space-y-2 rounded-2xl bg-white/70 p-4 text-sm">
        <p><CalendarDays className="mr-2 inline h-4 w-4" style={{ color: template.style.primary }} />{draft.date ? formatEventDate(draft.date) : "Event date"}</p>
        <p><MapPin className="mr-2 inline h-4 w-4" style={{ color: template.style.primary }} />{draft.venueName || draft.city ? `${draft.venueName}${draft.city ? `, ${draft.city}` : ""}` : "Venue or city"}</p>
      </div>
    </Card>
  );
}
