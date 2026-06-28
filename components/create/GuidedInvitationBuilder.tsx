"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import type React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Baby, BriefcaseBusiness, Cake, CalendarDays, Check, ChevronRight, Clock, Eye, Gift, Gem, GraduationCap, Heart, HeartHandshake, Home, Image as ImageIcon, Link as LinkIcon, Loader2, MapPin, Music2, PartyPopper, PlayCircle, Send, Sparkles, Trash2, Wand2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { GuestAuthModal } from "@/components/auth/GuestAuthModal";
import { useAuth } from "@/components/auth/AuthProvider";
import { useEventDraft } from "@/hooks/use-event-draft";
import { TemplateFullPagePreview } from "@/components/templates/TemplateFullPagePreview";
import { TemplatePreview } from "@/components/templates/TemplatePreview";
import { DRAFT_KEY, EVENT_TYPE_KEY, generateSlug, getDefaultDraft, type EventDraft } from "@/lib/event-draft";
import { BYPASS_AUTH_FOR_DEMO } from "@/lib/demo-bypass";
import { getEventTypeLabel, type EventType } from "@/lib/event-types";
import { formatEventDate } from "@/lib/date-utils";
import { publishEvent } from "@/lib/event-repository";
import { getDefaultTemplateForType, getTemplateById, templates, templateMoodToTheme, type EventTemplate } from "@/lib/templates";
import { cn } from "@/lib/utils";

const brand = {
  primary: "#6C1785",
  deep: "#500D68",
  violet: "#7B3892",
  lavender: "#A477B4",
  light: "#D0B8D8",
  soft: "#F6F0F8",
};

type OccasionValue = "wedding" | "birthday" | "other";
type OtherEventType = Exclude<EventType, "wedding" | "birthday" | "business" | "religious" | "reception">;
type StyleValue = "royal" | "floral" | "minimal";
type FeatureSheet = "photos" | "video" | "music" | "location" | null;

const occasionCards: Array<{
  value: OccasionValue;
  title: string;
  icon: React.ElementType;
}> = [
  { value: "wedding", title: "Wedding", icon: Gem },
  { value: "birthday", title: "Birthday", icon: Cake },
  { value: "other", title: "Other", icon: Gift },
];

const otherEventCards: Array<{
  value: OtherEventType;
  title: string;
  icon: React.ElementType;
}> = [
  { value: "engagement", title: "Engagement", icon: Gem },
  { value: "anniversary", title: "Anniversary", icon: Heart },
  { value: "baby-shower", title: "Baby Shower", icon: Baby },
  { value: "housewarming", title: "Housewarming", icon: Home },
  { value: "corporate", title: "Corporate Event", icon: BriefcaseBusiness },
  { value: "graduation", title: "Graduation", icon: GraduationCap },
  { value: "farewell", title: "Farewell", icon: Send },
  { value: "naming", title: "Naming Ceremony", icon: HeartHandshake },
  { value: "custom", title: "Custom Event", icon: PartyPopper },
];

const styleCards: Array<{
  value: StyleValue;
  title: string;
  description: string;
  dots: string[];
}> = [
  { value: "royal", title: "Royal", description: "Rich, elegant and timeless", dots: [brand.primary, brand.lavender, "#2D0C48"] },
  { value: "floral", title: "Floral", description: "Soft, natural and beautiful", dots: [brand.violet, brand.light, "#FEFDFC"] },
  { value: "minimal", title: "Minimal", description: "Clean, simple and modern", dots: ["#171717", brand.lavender, "#FEFDFC"] },
];

function eventTypeToOccasion(eventType: EventType): OccasionValue {
  if (eventType === "wedding") return "wedding";
  if (eventType === "birthday") return "birthday";
  return "other";
}

function inferStyleFromTemplate(templateId?: string): StyleValue {
  const template = getTemplateById(templateId);
  if (!template) return "royal";
  if (template.style.mood === "minimal") return "minimal";
  if (template.id.includes("floral") || template.style.mood === "romantic" || template.style.mood === "cute") return "floral";
  return "royal";
}

function templateForStyle(eventType: EventType, style: StyleValue) {
  const compatible = templates.filter((template) => template.category === eventType);
  const byStyle = compatible.find((template) => {
    if (style === "minimal") return template.style.mood === "minimal" || template.id.includes("minimal");
    if (style === "floral") return template.id.includes("floral") || template.style.mood === "romantic" || template.style.mood === "cute";
    return template.style.mood === "traditional" || template.style.mood === "luxury" || template.id.includes("royal");
  });
  return byStyle ?? getDefaultTemplateForType(eventType);
}

export function GuidedInvitationBuilder() {
  const router = useRouter();
  const { user } = useAuth();
  const { draft, setDraft, loaded } = useEventDraft();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [occasion, setOccasion] = useState<OccasionValue | null>(null);
  const [showOtherTypes, setShowOtherTypes] = useState(false);
  const [otherEventType, setOtherEventType] = useState<OtherEventType | null>(null);
  const [eventTypeError, setEventTypeError] = useState("");
  const [style, setStyle] = useState<StyleValue>("royal");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<EventTemplate | null>(null);
  const [confettiKey, setConfettiKey] = useState(0);
  const [focusedField, setFocusedField] = useState("");
  const [activeSheet, setActiveSheet] = useState<FeatureSheet>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    const hasStoredEventChoice = typeof window !== "undefined" && Boolean(window.localStorage.getItem(DRAFT_KEY) || window.localStorage.getItem(EVENT_TYPE_KEY));
    if (!hasStoredEventChoice && draft.eventType === "custom") {
      setOccasion(null);
      setOtherEventType(null);
      setStyle(inferStyleFromTemplate(draft.templateId));
      setSelectedTemplateId(null);
      return;
    }
    setOccasion(eventTypeToOccasion(draft.eventType));
    setOtherEventType(draft.eventType === "wedding" || draft.eventType === "birthday" ? null : draft.eventType as OtherEventType);
    setStyle(inferStyleFromTemplate(draft.templateId));
    setSelectedTemplateId(draft.templateId || null);
  }, [draft.eventType, draft.templateId, loaded]);

  const heading = step === 1 ? showOtherTypes ? "Choose your event type" : "What are you celebrating?" : step === 2 ? "Choose Your Template" : step === 3 ? "Add event details" : step === 4 ? "Bring your invite to life" : "You're all set!";
  const subheading = step === 1 ? showOtherTypes ? "Select one so your invite matches the celebration." : "Choose one to get started." : step === 2 ? "Pick a design you love. You can customize everything next." : step === 3 ? "Just the basics. You can edit everything later." : step === 4 ? "Add the things you want to include." : "Let's create your invite and make it magical.";

  const selectedEventType = useMemo<EventType | null>(() => {
    if (occasion === "wedding" || occasion === "birthday") return occasion;
    if (occasion === "other") return otherEventType;
    return null;
  }, [occasion, otherEventType]);
  const coupleNames = [draft.primaryName, draft.secondaryName].filter(Boolean).join(" & ") || draft.hostName || "";
  const completedDetailCount = [
    coupleNames.trim(),
    draft.date,
    draft.venueName.trim(),
  ].filter(Boolean).length;
  const detailsComplete = completedDetailCount === 3;
  const isCoupleEvent = ["wedding", "engagement", "reception"].includes(draft.eventType);
  const featureStatus = {
    photos: draft.gallery.length > 0,
    video: Boolean(draft.youtubeLink.trim()),
    music: draft.music.enabled,
    location: Boolean(draft.venueName.trim() || draft.mapLink.trim()),
  };
  const availableTemplates = useMemo(() => {
    if (!selectedEventType) return [];
    const exactMatches = templates.filter((template) => template.category === selectedEventType);
    return exactMatches.length ? exactMatches : templates.filter((template) => template.category === "custom");
  }, [selectedEventType]);
  const visibleTemplates = showAllTemplates ? availableTemplates : availableTemplates.slice(0, 3);

  function applyEventType(eventType: EventType) {
    const nextDefaults = getDefaultDraft(eventType);
    setSelectedTemplateId(null);
    setShowAllTemplates(false);
    setDraft((current) => ({
      ...nextDefaults,
      date: current.date,
      time: current.time,
      venueName: current.venueName,
      address: current.address,
      city: current.city,
      mapLink: current.mapLink,
      eventType,
      templateId: "",
      templateName: "",
      templateImage: "",
    }));
  }

  function selectOccasion(nextOccasion: OccasionValue) {
    setOccasion(nextOccasion);
    setEventTypeError("");
    if (nextOccasion === "other") {
      setOtherEventType(null);
      return;
    }
    setShowOtherTypes(false);
    setOtherEventType(null);
    applyEventType(nextOccasion);
  }

  function selectOtherEventType(eventType: OtherEventType) {
    setOtherEventType(eventType);
    setEventTypeError("");
    applyEventType(eventType);
  }

  function selectStyle(nextStyle: StyleValue) {
    if (!selectedEventType) return;
    const template = templateForStyle(selectedEventType, nextStyle);
    setStyle(nextStyle);
    setDraft((current) => ({
      ...current,
      templateId: template.id,
      templateName: template.name,
      templateImage: template.previewImage,
      theme: templateMoodToTheme(template.style.mood),
    }));
  }

  function selectTemplate(template: EventTemplate) {
    setSelectedTemplateId(template.id);
    setDraft((current) => ({
      ...current,
      eventType: selectedEventType ?? current.eventType,
      templateId: template.id,
      templateName: template.name,
      templateImage: template.previewImage,
      theme: templateMoodToTheme(template.style.mood),
    }));
  }

  function burstAndContinue() {
    if (step === 1) {
      if (showOtherTypes) {
        if (!otherEventType) {
          setEventTypeError("Please choose an event type to continue.");
          return;
        }
      } else if (occasion === "other") {
        setShowOtherTypes(true);
        setEventTypeError("");
        return;
      } else if (!selectedEventType) {
        setEventTypeError("Please choose an event type to continue.");
        return;
      }
    }
    if (step === 2 && !selectedTemplateId) return;
    setConfettiKey((current) => current + 1);
    window.setTimeout(() => {
      if (step === 1) setStep(2);
      else if (step === 2) setStep(3);
      else if (step === 3) setStep(4);
      else if (step === 4) setStep(5);
    }, 260);
  }

  function skipDetails() {
    setStep(4);
  }

  function skipExtras() {
    setStep(5);
  }

  async function createInvite() {
    if (creating) return;
    // Temporary demo bypass - remove before production.
    if (!user && !BYPASS_AUTH_FOR_DEMO) {
      setAuthOpen(true);
      return;
    }
    if (!draft.title || !draft.date || !draft.venueName || !draft.templateId) {
      setStep(3);
      return;
    }

    setCreating(true);
    setConfettiKey((current) => current + 1);
    try {
      const trimmedPrimary = draft.primaryName.trim();
      const trimmedSecondary = (draft.secondaryName || "").trim();
      const normalizedTitle = titleForDraft(draft, trimmedPrimary, trimmedSecondary);
      const published = await publishEvent({
        ...draft,
        title: normalizedTitle,
        primaryName: trimmedPrimary,
        secondaryName: trimmedSecondary,
        groomName: trimmedPrimary,
        brideName: trimmedSecondary,
        venueName: draft.venueName.trim(),
        address: draft.address.trim(),
        city: draft.city.trim(),
        mapLink: draft.mapLink.trim(),
        ownerId: user?.id,
        status: "published",
        slug: generateSlug(normalizedTitle),
      });
      setDraft(published);
      window.setTimeout(() => router.push(BYPASS_AUTH_FOR_DEMO ? `/event/${published.slug}/share` : "/dashboard"), 420);
    } catch {
      setCreating(false);
    }
  }

  function saveAsDraft() {
    setDraft((current) => ({ ...current, status: "draft" }));
    setDraftSaved(true);
    window.setTimeout(() => setDraftSaved(false), 1800);
  }

  function goBack() {
    if (step === 1 && showOtherTypes) {
      setShowOtherTypes(false);
      setOtherEventType(null);
      setEventTypeError("");
      return;
    }
    setStep((current) => current === 5 ? 4 : current === 4 ? 3 : current === 3 ? 2 : 1);
  }

  function titleForDraft(current: EventDraft, primaryName: string, secondaryName = current.secondaryName || "") {
    if (["wedding", "engagement", "reception"].includes(current.eventType)) {
      const names = [primaryName, secondaryName].filter(Boolean).join(" & ");
      return names ? `${names} ${current.eventType === "engagement" ? "Engagement" : "Wedding"}` : current.title;
    }
    if (current.eventType === "birthday") return primaryName ? `${primaryName} Birthday` : current.title;
    return primaryName ? `${primaryName} Celebration` : current.title;
  }

  function updatePrimaryName(value: string) {
    setDraft((current) => ({
      ...current,
      primaryName: value,
      groomName: value,
      birthdayPersonName: current.eventType === "birthday" ? value : current.birthdayPersonName,
      childName: current.eventType === "birthday" ? value : current.childName,
      hostName: current.eventType === "custom" ? value : current.hostName,
      title: titleForDraft(current, value),
    }));
  }

  function updateSecondaryName(value: string) {
    setDraft((current) => ({
      ...current,
      secondaryName: value,
      brideName: value,
      title: titleForDraft(current, current.primaryName, value),
    }));
  }

  if (!loaded) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#F6F0F8] px-5 text-[#500D68]">
        <div className="text-sm font-semibold">Loading builder...</div>
      </main>
    );
  }

  return (
    <BuilderOnboardingShell step={step} onBack={goBack}>
      <FloatingSparkles />
      <TinyConfetti burstKey={confettiKey} />
      <BottomWave show={step >= 4} />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-5 pt-[clamp(1rem,2.4dvh,2rem)] sm:px-7">
        <header className="text-center">
          <div className="mx-auto mb-[clamp(0.65rem,1.7dvh,1.5rem)] flex items-center justify-center gap-3">
            {(step > 1 || showOtherTypes) && (
              <button
                type="button"
                onClick={goBack}
                className={cn("absolute left-5 top-[clamp(1rem,2.4dvh,2rem)] grid h-11 w-11 place-items-center rounded-full shadow-[0_8px_22px_rgba(80,13,104,0.12)] focus:outline-none focus:ring-2 focus:ring-[#6C1785]", step === 4 ? "bg-[#6C1785] text-white" : "bg-white text-[#500D68]")}
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            {step >= 3 ? (
              <div>
                <div className="font-serif text-[clamp(2rem,5dvh,2.7rem)] font-bold leading-none text-[#500D68]">Occazn<span className="align-top text-xl text-[#A477B4]">*</span></div>
                {step === 3 && <p className="mt-1 text-sm font-semibold text-[#686078]">Make every invite magical</p>}
              </div>
            ) : (
              <>
                <span className="grid h-[clamp(2.3rem,5.2dvh,2.75rem)] w-[clamp(2.3rem,5.2dvh,2.75rem)] place-items-center rounded-2xl bg-[#6C1785] text-white shadow-[0_12px_28px_rgba(108,23,133,0.22)]">
                  <Sparkles className="h-5 w-5" />
                </span>
                <span className="font-serif text-[clamp(2rem,5dvh,2.7rem)] font-bold leading-none text-[#500D68]">Occazn</span>
              </>
            )}
          </div>
          <BuilderProgress step={step} />
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className={cn(step === 3 ? "mt-[clamp(0.9rem,2dvh,1.6rem)]" : step >= 4 ? "mt-[clamp(0.65rem,1.4dvh,1.2rem)]" : "mt-[clamp(1.2rem,3dvh,3.5rem)]")}
            >
              {step === 4 && <FeatureIllustration />}
              {step === 5 && <FinalInviteIllustration draft={draft} />}
              <h1 className={cn("font-bold leading-tight text-[#171717]", step === 1 ? "font-serif text-[clamp(2rem,5.4dvh,2.65rem)] text-[#2D0C48]" : step === 2 ? "font-serif text-[clamp(2.1rem,5.4dvh,2.75rem)] text-[#2D0C48]" : step >= 4 ? "mt-[clamp(0.7rem,1.5dvh,1.6rem)] text-[clamp(1.65rem,4dvh,2.1rem)]" : "text-[clamp(2rem,5.4dvh,2.75rem)]")}>
                <>{heading}{step >= 2 && <Sparkles className="ml-2 inline h-7 w-7 fill-[#A477B4] text-[#A477B4]" />}</>
              </h1>
              {step >= 3 ? <p className={cn("mx-auto mt-[clamp(0.4rem,1dvh,1rem)] font-medium leading-[1.35] text-[#686078]", step >= 4 ? "max-w-[330px] text-[clamp(1rem,2.5dvh,1.25rem)]" : "max-w-[310px] text-[clamp(1.05rem,2.6dvh,1.25rem)]")}>{subheading}</p> : step === 2 ? <p className="mt-2 text-[clamp(1.2rem,3dvh,1.5rem)] font-medium text-[#686078]">{subheading}</p> : <p className="mt-3 text-[clamp(1.2rem,3dvh,1.5rem)] font-medium text-[#686078]">{subheading}</p>}
              {step === 1 && <DecorativeSwoosh />}
            </motion.div>
          </AnimatePresence>
        </header>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div key={showOtherTypes ? "other-event-types" : "occasion"} className={cn("mt-[clamp(1rem,2.8dvh,2.6rem)]", showOtherTypes ? "grid grid-cols-1 gap-[clamp(0.55rem,1.4dvh,0.9rem)]" : "space-y-[clamp(0.65rem,1.6dvh,1.25rem)]")} initial="hidden" animate="visible" exit={{ opacity: 0, y: -8 }} variants={listVariants}>
              {(showOtherTypes ? otherEventCards : occasionCards).map((card) => (
                <OptionCard
                  key={card.value}
                  selected={showOtherTypes ? otherEventType === card.value : occasion === card.value}
                  title={card.title}
                  icon={card.icon}
                  compact={showOtherTypes}
                  onClick={() => showOtherTypes ? selectOtherEventType(card.value as OtherEventType) : selectOccasion(card.value as OccasionValue)}
                />
              ))}
              {eventTypeError && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-[#F6F0F8] px-4 py-3 text-center text-sm font-bold text-[#6C1785]">
                  {eventTypeError}
                </motion.p>
              )}
            </motion.div>
          ) : step === 2 ? (
            <motion.div key="templates" className="mt-[clamp(1rem,2dvh,1.5rem)] space-y-4 overflow-y-auto pb-3 pr-1" initial="hidden" animate="visible" exit={{ opacity: 0, y: -8 }} variants={listVariants}>
              {visibleTemplates.map((template) => (
                <TemplateSelectionCard
                  key={template.id}
                  template={template}
                  selected={selectedTemplateId === template.id}
                  onPreview={() => setPreviewTemplate(template)}
                  onSelect={() => selectTemplate(template)}
                />
              ))}
              {availableTemplates.length > visibleTemplates.length && (
                <button
                  type="button"
                  onClick={() => setShowAllTemplates(true)}
                  className="h-12 w-full rounded-2xl border border-[#D0B8D8] bg-white text-sm font-bold text-[#6C1785] shadow-[0_10px_24px_rgba(80,13,104,0.06)] focus:outline-none focus:ring-2 focus:ring-[#6C1785]"
                >
                  View More Templates
                </button>
              )}
              {!availableTemplates.length && (
                <p className="rounded-2xl bg-[#F6F0F8] px-4 py-3 text-center text-sm font-bold text-[#6C1785]">Choose an event type first.</p>
              )}
            </motion.div>
          ) : step === 3 ? (
            <motion.div key="details" className="mt-8 space-y-4" initial="hidden" animate="visible" exit={{ opacity: 0, y: -8 }} variants={listVariants}>
              {isCoupleEvent ? (
                <>
                  <DetailFieldCard
                    id="partnerOneName"
                    label="Partner 1 name"
                    value={draft.primaryName}
                    placeholder="Afsal"
                    icon={HeartHandshake}
                    focused={focusedField === "partnerOneName"}
                    onFocus={() => setFocusedField("partnerOneName")}
                    onBlur={() => setFocusedField("")}
                    onChange={updatePrimaryName}
                  />
                  <DetailFieldCard
                    id="partnerTwoName"
                    label="Partner 2 name"
                    value={draft.secondaryName || ""}
                    placeholder="Fathima"
                    icon={Heart}
                    focused={focusedField === "partnerTwoName"}
                    onFocus={() => setFocusedField("partnerTwoName")}
                    onBlur={() => setFocusedField("")}
                    onChange={updateSecondaryName}
                  />
                </>
              ) : (
                <DetailFieldCard
                  id="primaryEventName"
                  label={draft.eventType === "birthday" ? "Celebrant name" : draft.eventType === "baby-shower" || draft.eventType === "naming" ? "Baby or family name" : draft.eventType === "corporate" || draft.eventType === "business" ? "Event or company name" : "Event title"}
                  value={draft.primaryName || draft.hostName || draft.title}
                  placeholder={draft.eventType === "birthday" ? "Ava" : "Ayisha Celebration"}
                  icon={HeartHandshake}
                  focused={focusedField === "primaryEventName"}
                  onFocus={() => setFocusedField("primaryEventName")}
                  onBlur={() => setFocusedField("")}
                  onChange={updatePrimaryName}
                />
              )}
              <DetailFieldCard
                id="eventDate"
                label="Event date"
                value={draft.date}
                placeholder="25 December 2025"
                type="date"
                icon={CalendarDays}
                focused={focusedField === "eventDate"}
                onFocus={() => setFocusedField("eventDate")}
                onBlur={() => setFocusedField("")}
                onChange={(value) => setDraft((current) => ({ ...current, date: value }))}
                trailingIcon={CalendarDays}
              />
              <DetailFieldCard
                id="eventTime"
                label="Event time"
                optional
                value={draft.time}
                placeholder="06:00 PM"
                type="time"
                icon={Clock}
                focused={focusedField === "eventTime"}
                onFocus={() => setFocusedField("eventTime")}
                onBlur={() => setFocusedField("")}
                onChange={(value) => setDraft((current) => ({ ...current, time: value }))}
                trailingIcon={Clock}
              />
              <DetailFieldCard
                id="venueName"
                label="Venue name"
                value={draft.venueName}
                placeholder="The Royal Palace"
                icon={MapPin}
                focused={focusedField === "venueName"}
                onFocus={() => setFocusedField("venueName")}
                onBlur={() => setFocusedField("")}
                onChange={(value) => setDraft((current) => ({ ...current, venueName: value }))}
              />
              <DetailFieldCard
                id="locationLink"
                label="Location link"
                optional
                value={draft.mapLink}
                placeholder="https://maps.app.goo.gl/xyz123"
                icon={LinkIcon}
                focused={focusedField === "locationLink"}
                onFocus={() => setFocusedField("locationLink")}
                onBlur={() => setFocusedField("")}
                onChange={(value) => setDraft((current) => ({ ...current, mapLink: value }))}
              />
              <HelperProgressCard completed={completedDetailCount} />
            </motion.div>
          ) : step === 4 ? (
            <motion.div key="features" className="mt-[clamp(0.75rem,1.8dvh,1.4rem)] space-y-[clamp(0.5rem,1.3dvh,0.95rem)]" initial="hidden" animate="visible" exit={{ opacity: 0, y: -8 }} variants={listVariants}>
              <FeatureCard title="Add Photos" description="Create a photo gallery" icon={ImageIcon} complete={featureStatus.photos} onClick={() => setActiveSheet("photos")} />
              <FeatureCard title="Add Video" description="Add YouTube or video link" icon={PlayCircle} complete={featureStatus.video} onClick={() => setActiveSheet("video")} />
              <FeatureCard title="Add Music" description="Set the mood with music" icon={Music2} complete={featureStatus.music} onClick={() => setActiveSheet("music")} />
              <FeatureCard title="Add Location" description="Share your venue location" icon={MapPin} complete={featureStatus.location} onClick={() => setActiveSheet("location")} />
            </motion.div>
          ) : (
            <FinalActionCard />
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-20 mt-auto shrink-0 rounded-t-[1.5rem] bg-white/92 px-5 pb-[clamp(0.7rem,1.8dvh,1.5rem)] pt-[clamp(0.65rem,1.6dvh,1.2rem)] shadow-[0_-18px_42px_rgba(80,13,104,0.08)] backdrop-blur sm:px-7">
        <ContinueButton disabled={step === 1 ? (showOtherTypes ? false : !occasion) : step === 2 ? !selectedTemplateId : step === 3 ? !detailsComplete : false} onClick={step === 5 ? createInvite : burstAndContinue} label={step === 5 ? "Create My Invite" : "Continue"} loading={creating} />
        {step === 2 && (
          <button
            type="button"
            onClick={() => setStep(3)}
            className="mt-[clamp(0.45rem,1.2dvh,1rem)] h-[clamp(2.3rem,5dvh,2.75rem)] w-full text-center text-[clamp(1rem,2.5dvh,1.125rem)] font-bold text-[#7B3892] focus:outline-none focus:ring-2 focus:ring-[#6C1785]"
          >
            Skip this step
          </button>
        )}
        {step === 3 && (
          <button
            type="button"
            onClick={skipDetails}
            className="mt-[clamp(0.45rem,1.2dvh,1rem)] h-[clamp(2.3rem,5dvh,2.75rem)] w-full text-center text-[clamp(1rem,2.5dvh,1.125rem)] font-bold text-[#7B3892] focus:outline-none focus:ring-2 focus:ring-[#6C1785]"
          >
            Skip details for now
          </button>
        )}
        {step === 4 && (
          <button
            type="button"
            onClick={skipExtras}
            className="mt-[clamp(0.45rem,1.2dvh,1rem)] h-[clamp(2.3rem,5dvh,2.75rem)] w-full text-center text-[clamp(1rem,2.5dvh,1.125rem)] font-bold text-[#7B3892] focus:outline-none focus:ring-2 focus:ring-[#6C1785]"
          >
            Skip for now
          </button>
        )}
        {step === 5 && (
          <button
            type="button"
            onClick={saveAsDraft}
            className="mt-[clamp(0.45rem,1.2dvh,1rem)] h-[clamp(2.3rem,5dvh,2.75rem)] w-full text-center text-[clamp(1rem,2.5dvh,1.125rem)] font-bold text-[#7B3892] focus:outline-none focus:ring-2 focus:ring-[#6C1785]"
          >
            {draftSaved ? "Draft saved" : "Save as Draft"}
          </button>
        )}
      </div>
      <TemplatePreviewModal template={previewTemplate} onClose={() => setPreviewTemplate(null)} onUse={(template) => { selectTemplate(template); setPreviewTemplate(null); }} />
      <FeatureBottomSheet sheet={activeSheet} draft={draft} setDraft={setDraft} onClose={() => setActiveSheet(null)} />
      <DemoDebugPanel draft={draft} />
      {!BYPASS_AUTH_FOR_DEMO && <GuestAuthModal open={authOpen} onClose={() => setAuthOpen(false)} nextPath="/create-event" />}
    </BuilderOnboardingShell>
  );
}

function DemoDebugPanel({ draft }: { draft: EventDraft }) {
  if (process.env.NODE_ENV === "production" || !BYPASS_AUTH_FOR_DEMO) return null;
  const rows = [
    ["inviteId", draft.slug || "(pending)"],
    ["eventType", draft.eventType],
    ["selectedTemplateId", draft.templateId || "(none)"],
    ["primaryName", draft.primaryName || "(empty)"],
    ["secondaryName", draft.secondaryName || "(empty)"],
    ["eventTitle", draft.title || "(empty)"],
    ["date", draft.date || "(empty)"],
    ["time", draft.time || "(empty)"],
    ["venueName", draft.venueName || "(empty)"],
  ];

  return (
    <details className="absolute bottom-24 left-3 z-40 max-h-52 max-w-[calc(100%-1.5rem)] overflow-auto rounded-xl border border-[#D0B8D8] bg-white/95 p-2 text-[10px] text-[#500D68] shadow-[0_12px_28px_rgba(80,13,104,0.12)]">
      <summary className="cursor-pointer font-bold">Demo draft debug</summary>
      <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
        {rows.map(([label, value]) => (
          <Fragment key={label}>
            <dt className="font-bold">{label}</dt>
            <dd className="break-all">{value}</dd>
          </Fragment>
        ))}
      </dl>
    </details>
  );
}

function BuilderOnboardingShell({ children, step, onBack }: { children: React.ReactNode; step: 1 | 2 | 3 | 4 | 5; onBack: () => void }) {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-[radial-gradient(circle_at_top,#F8F3FA_0,#FFFFFF_46%,#F4ECF7_100%)] text-[#2D0C48] sm:grid sm:place-items-center sm:p-6">
      <section className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col overflow-x-hidden bg-white/82 shadow-[0_28px_90px_rgba(80,13,104,0.13)] sm:min-h-[min(860px,calc(100dvh-3rem))] sm:rounded-[3.5rem] sm:border sm:border-white/80">
        {step > 1 && <span className="sr-only"><button type="button" onClick={onBack}>Back</button></span>}
        {children}
      </section>
    </main>
  );
}

function BuilderProgress({ step }: { step: 1 | 2 | 3 | 4 | 5 }) {
  if (step >= 3) {
    return (
      <div aria-label={`Step ${step} of 5`} className="mx-auto w-full max-w-[240px]">
        <div className="relative flex items-center justify-between">
          <motion.span
            className="absolute left-5 right-5 top-1/2 h-0.5 -translate-y-1/2 bg-[#E9DDF0]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.42 }}
            style={{ transformOrigin: "left" }}
          />
          {Array.from({ length: 5 }).map((_, index) => {
            const complete = index < step - 1;
            const active = index === step - 1;
            return (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.06, duration: 0.24 }}
                className={cn(
                  "relative z-10 grid h-[clamp(2rem,4.8dvh,2.5rem)] w-[clamp(2rem,4.8dvh,2.5rem)] place-items-center rounded-full text-sm font-bold shadow-[0_5px_15px_rgba(80,13,104,0.12)]",
                  complete && "bg-[#6C1785] text-white",
                  active && "border-4 border-[#D0B8D8] bg-[#6C1785] text-white",
                  !complete && !active && "bg-white text-[#686078]",
                )}
              >
                {complete ? <Check className="h-5 w-5" /> : index + 1}
              </motion.span>
            );
          })}
        </div>
        <p className="mt-[clamp(0.45rem,1.1dvh,1rem)] text-[clamp(0.95rem,2.2dvh,1.125rem)] font-bold text-[#6C1785]">Step {step} of 5</p>
      </div>
    );
  }

  return (
      <div aria-label={`Step ${step} of 5`} className="mx-auto w-full max-w-[175px]">
      <p className="mb-[clamp(0.55rem,1.4dvh,1.25rem)] text-[clamp(0.95rem,2.2dvh,1.125rem)] font-semibold text-[#686078]">Step {step} of 5</p>
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: 5 }).map((_, index) => {
          const active = index === step - 1;
          const complete = index < step - 1;
          return (
            <motion.span
              key={index}
              className="h-2.5 rounded-full"
              initial={false}
              animate={{ width: active ? 34 : 18, backgroundColor: active || complete ? brand.primary : "#E9DDF0" }}
              transition={{ duration: 0.28 }}
            />
          );
        })}
      </div>
    </div>
  );
}

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

function OptionCard({ selected, title, icon: Icon, compact = false, onClick }: { selected: boolean; title: string; icon: React.ElementType; compact?: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      variants={cardVariants}
      whileTap={{ scale: 0.985 }}
      animate={selected ? { scale: [1, 1.015, 1] } : { scale: 1 }}
      transition={{ duration: 0.16 }}
      onClick={onClick}
      aria-pressed={selected}
      className={cn("flex w-full items-center rounded-[1.25rem] border bg-white text-left shadow-[0_12px_28px_rgba(80,13,104,0.08)] transition focus:outline-none focus:ring-2 focus:ring-[#6C1785]", compact ? "min-h-[clamp(4.05rem,8.2dvh,4.8rem)] gap-3 px-4" : "min-h-[clamp(5.5rem,12dvh,7rem)] gap-[clamp(1rem,4vw,2rem)] px-[clamp(1.1rem,5vw,2rem)]", selected && "bg-[#F8F3FA] shadow-[0_16px_32px_rgba(108,23,133,0.12)]")}
      style={{ borderColor: selected ? brand.primary : "rgba(208,184,216,0.38)" }}
    >
      <span className={cn("relative grid shrink-0 place-items-center text-[#7B19C9]", compact ? "h-11 w-11" : "h-[clamp(3rem,7dvh,4rem)] w-[clamp(3rem,7dvh,4rem)]")}>
        <Icon className={cn("stroke-[1.6]", compact ? "h-8 w-8" : "h-[clamp(2.5rem,6dvh,3.5rem)] w-[clamp(2.5rem,6dvh,3.5rem)]")} />
        <Sparkles className="absolute -right-2 -top-2 h-4 w-4 fill-[#CFA7F0] text-[#CFA7F0]" />
      </span>
      <span className={cn("min-w-0 flex-1 font-serif font-bold text-[#2D0C48]", compact ? "text-[clamp(1.2rem,2.6dvh,1.45rem)]" : "text-[clamp(1.65rem,4dvh,2rem)]")}>{title}</span>
      <AnimatePresence>
        {selected && (
          <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="grid h-10 w-10 place-items-center rounded-full bg-[#7B19C9] text-white">
            <Check className="h-6 w-6" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function TemplateSelectionCard({ template, selected, onPreview, onSelect }: { template: EventTemplate; selected: boolean; onPreview: () => void; onSelect: () => void }) {
  return (
    <motion.article
      variants={cardVariants}
      className={cn(
        "overflow-hidden rounded-[1.35rem] border bg-white text-left shadow-[0_14px_30px_rgba(80,13,104,0.08)] transition",
        selected && "shadow-[0_18px_36px_rgba(108,23,133,0.14)]",
      )}
      style={{ borderColor: selected ? brand.primary : "rgba(208,184,216,0.42)" }}
    >
      <div className="relative">
        <TemplatePreview template={template} className="h-[clamp(9.5rem,24dvh,12rem)] rounded-none border-0" />
        {selected && (
          <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-[#6C1785] text-white shadow-[0_10px_24px_rgba(80,13,104,0.22)]">
            <Check className="h-5 w-5" />
          </span>
        )}
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7B3892]">{template.style.mood.replace("-", " ")}</p>
            <h2 className="mt-1 font-serif text-[clamp(1.45rem,3dvh,1.8rem)] font-bold leading-tight text-[#2D0C48]">{template.name}</h2>
          </div>
          <span className="shrink-0 rounded-full bg-[#F6F0F8] px-3 py-1 text-xs font-bold text-[#6C1785]">{getEventTypeLabel(template.category)}</span>
        </div>
        <p className="line-clamp-2 text-sm font-medium leading-5 text-[#686078]">{template.description}</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onPreview}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#D0B8D8] bg-white text-sm font-bold text-[#500D68] focus:outline-none focus:ring-2 focus:ring-[#6C1785]"
          >
            <Eye className="h-4 w-4" />
            Preview
          </button>
          <button
            type="button"
            onClick={onSelect}
            className={cn(
              "inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#500D68]",
              selected ? "bg-[#F6F0F8] text-[#6C1785]" : "bg-[#6C1785] text-white",
            )}
          >
            {selected && <Check className="h-4 w-4" />}
            {selected ? "Selected" : "Select"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function TemplatePreviewModal({ template, onClose, onUse }: { template: EventTemplate | null; onClose: () => void; onUse: (template: EventTemplate) => void }) {
  if (!template) return null;

  return (
    <AnimatePresence>
      <motion.div className="absolute inset-0 z-50 flex flex-col bg-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label={`${template.name} template preview`}>
        <div className="flex shrink-0 items-center justify-between border-b border-[#D0B8D8]/50 bg-white/95 px-4 py-4">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7B3892]">Template Preview</p>
            <h2 className="truncate font-serif text-2xl font-bold text-[#2D0C48]">{template.name}</h2>
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#F6F0F8] text-[#500D68] focus:outline-none focus:ring-2 focus:ring-[#6C1785]" aria-label="Back to templates">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto bg-[#F6F0F8]">
          <TemplateFullPagePreview template={template} />
        </div>
        <div className="shrink-0 border-t border-[#D0B8D8]/50 bg-white/95 p-4 backdrop-blur">
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="h-12 flex-1 rounded-xl border border-[#D0B8D8] bg-white text-sm font-bold text-[#500D68] focus:outline-none focus:ring-2 focus:ring-[#6C1785]">
              Back to Templates
            </button>
            <button type="button" onClick={() => onUse(template)} className="h-12 flex-1 rounded-xl bg-[#6C1785] text-sm font-bold text-white shadow-[0_12px_26px_rgba(108,23,133,0.22)] focus:outline-none focus:ring-2 focus:ring-[#500D68]">
              Use This Template
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function StyleCard({ selected, title, description, dots, value, onClick }: { selected: boolean; title: string; description: string; dots: string[]; value: StyleValue; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      variants={cardVariants}
      whileTap={{ scale: 0.985 }}
      animate={selected ? { scale: [1, 1.015, 1] } : { scale: 1 }}
      transition={{ duration: 0.16 }}
      onClick={onClick}
      aria-pressed={selected}
      className="relative flex min-h-[150px] w-full items-center gap-6 rounded-[1.35rem] border bg-white p-5 text-left shadow-[0_15px_34px_rgba(80,13,104,0.08)] transition focus:outline-none focus:ring-2 focus:ring-[#6C1785]"
      style={{ borderColor: selected ? brand.primary : "rgba(208,184,216,0.38)", background: selected ? "#FDFBFE" : "white" }}
    >
      <StyleThumbnail value={value} />
      <span className="min-w-0 flex-1">
        <span className="block text-3xl font-bold text-[#140D24]">{title}</span>
        <span className="mt-3 block max-w-[170px] text-xl font-medium leading-snug text-[#686078]">{description}</span>
        <span className="mt-5 flex gap-3">
          {dots.map((dot) => <span key={dot} className="h-7 w-7 rounded-full shadow-inner" style={{ background: dot }} />)}
        </span>
      </span>
      <AnimatePresence>
        {selected && (
          <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-[#7B19C9] text-white">
            <Check className="h-6 w-6" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function StyleThumbnail({ value }: { value: StyleValue }) {
  const royal = value === "royal";
  const floral = value === "floral";
  return (
    <span className="grid h-32 w-28 shrink-0 place-items-center overflow-hidden rounded-lg bg-[#FEFDFC] shadow-[0_10px_22px_rgba(80,13,104,0.13)]">
      <span
        className="relative h-full w-full p-3"
        style={{
          background: royal
            ? "linear-gradient(145deg,#2D0C48,#500D68)"
            : floral
              ? "linear-gradient(145deg,#FEFDFC,#F6F0F8)"
              : "linear-gradient(145deg,#FFFFFF,#FEFDFC)",
        }}
      >
        <span className="absolute inset-3 rounded border" style={{ borderColor: royal ? brand.light : floral ? brand.lavender : brand.light }} />
        <span className="absolute left-1/2 top-8 -translate-x-1/2 text-center font-serif text-lg font-bold" style={{ color: royal ? brand.light : floral ? brand.violet : "#171717" }}>
          A<br />&amp;<br />S
        </span>
        <span className="absolute bottom-6 left-1/2 h-1 w-14 -translate-x-1/2 rounded-full" style={{ background: royal ? brand.light : floral ? brand.lavender : brand.light }} />
        {floral && <span className="absolute -right-3 -top-3 h-12 w-12 rounded-full border-8 border-[#D0B8D8]/40" />}
      </span>
    </span>
  );
}

function DetailFieldCard({
  id,
  label,
  optional,
  value,
  placeholder,
  type = "text",
  icon: Icon,
  trailingIcon: TrailingIcon,
  focused,
  onFocus,
  onBlur,
  onChange,
}: {
  id: string;
  label: string;
  optional?: boolean;
  value: string;
  placeholder: string;
  type?: "text" | "date" | "time";
  icon: React.ElementType;
  trailingIcon?: React.ElementType;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (value: string) => void;
}) {
  return (
    <motion.label
      variants={cardVariants}
      animate={focused ? { y: -2, scale: 1.006 } : { y: 0, scale: 1 }}
      className="group flex min-h-[88px] items-center gap-4 rounded-[1.25rem] border bg-white px-4 py-3 shadow-[0_12px_28px_rgba(80,13,104,0.08)] transition"
      style={{ borderColor: focused ? brand.primary : "rgba(208,184,216,0.35)", boxShadow: focused ? "0 14px 34px rgba(108,23,133,0.14)" : undefined }}
      htmlFor={id}
    >
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#F8F3FA] text-[#7B3892] transition group-focus-within:text-[#6C1785]">
        <Icon className="h-7 w-7 stroke-[1.8]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-bold text-[#171717]">
          {label} {optional && <span className="font-medium text-[#686078]">(optional)</span>}
        </span>
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
          className="mt-2 h-7 w-full min-w-0 bg-transparent text-xl font-medium text-[#686078] outline-none placeholder:text-[#9A94A5]"
        />
      </span>
      {TrailingIcon && <TrailingIcon className="h-7 w-7 shrink-0 text-[#7B3892]" />}
    </motion.label>
  );
}

function HelperProgressCard({ completed }: { completed: number }) {
  const circumference = 2 * Math.PI * 22;
  const progress = (completed / 3) * circumference;
  return (
    <motion.div
      variants={cardVariants}
      className="relative flex min-h-[108px] items-center gap-4 overflow-hidden rounded-[1.25rem] bg-[#F6F0F8] px-5 py-4 shadow-[0_12px_28px_rgba(80,13,104,0.06)]"
    >
      <span className="relative grid h-16 w-16 shrink-0 place-items-center text-[#6C1785]">
        <Wand2 className="h-10 w-10 rotate-[-20deg]" />
        <Sparkles className="occazn-twinkle absolute right-0 top-1 h-4 w-4 fill-[#A477B4] text-[#A477B4]" />
      </span>
      <AnimatePresence mode="wait">
        <motion.span key={completed} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="min-w-0 flex-1">
          <span className="block text-xl font-bold text-[#6C1785]">Almost there!</span>
          <span className="mt-1 block text-base leading-6 text-[#686078]">{completed < 3 ? "Add venue to make your invite more helpful for your guests." : "You're building something beautiful."}</span>
        </motion.span>
      </AnimatePresence>
      <span className="relative grid h-16 w-16 shrink-0 place-items-center">
        <svg className="-rotate-90" width="60" height="60" viewBox="0 0 60 60" aria-hidden="true">
          <circle cx="30" cy="30" r="22" stroke="#D0B8D8" strokeWidth="7" fill="none" />
          <motion.circle
            cx="30"
            cy="30"
            r="22"
            stroke="#6C1785"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            initial={false}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 0.35 }}
          />
        </svg>
        <span className="absolute text-lg font-bold text-[#6C1785]">{completed}/3</span>
      </span>
    </motion.div>
  );
}

function FeatureIllustration() {
  return (
    <div className="relative mx-auto h-[clamp(7.6rem,18dvh,10rem)] w-full max-w-[300px]" aria-hidden="true">
      <span className="occazn-feature-float absolute left-[12%] top-[24%] z-10 grid h-[clamp(3.8rem,8dvh,5rem)] w-[clamp(3.4rem,7dvh,4.3rem)] -rotate-6 place-items-center rounded-xl bg-white shadow-[0_12px_24px_rgba(80,13,104,0.12)]">
        <span className="grid h-[clamp(2.7rem,5.6dvh,3.5rem)] w-[clamp(2.7rem,5.6dvh,3.5rem)] place-items-center rounded-2xl bg-[#F6F0F8] text-[#6C1785]"><ImageIcon className="h-7 w-7" /></span>
      </span>
      <span className="occazn-feature-float absolute left-[34%] top-[6%] z-10 grid h-[clamp(3.4rem,7dvh,4.4rem)] w-[clamp(3rem,6dvh,3.8rem)] -rotate-3 place-items-center rounded-xl bg-white shadow-[0_12px_24px_rgba(80,13,104,0.12)]" style={{ animationDelay: "0.15s" }}>
        <span className="grid h-[clamp(2.4rem,5dvh,3.1rem)] w-[clamp(2.4rem,5dvh,3.1rem)] place-items-center rounded-2xl bg-[#F6F0F8] text-[#7B3892]"><Music2 className="h-6 w-6" /></span>
      </span>
      <span className="occazn-feature-float absolute right-[34%] top-[6%] z-10 grid h-[clamp(3.4rem,7dvh,4.4rem)] w-[clamp(3rem,6dvh,3.8rem)] rotate-3 place-items-center rounded-xl bg-white shadow-[0_12px_24px_rgba(80,13,104,0.12)]" style={{ animationDelay: "0.25s" }}>
        <span className="grid h-[clamp(2.4rem,5dvh,3.1rem)] w-[clamp(2.4rem,5dvh,3.1rem)] place-items-center rounded-2xl bg-[#F6F0F8] text-[#6C1785]"><PlayCircle className="h-6 w-6" /></span>
      </span>
      <span className="occazn-feature-float absolute right-[12%] top-[24%] z-10 grid h-[clamp(3.8rem,8dvh,5rem)] w-[clamp(3.4rem,7dvh,4.3rem)] rotate-6 place-items-center rounded-xl bg-white shadow-[0_12px_24px_rgba(80,13,104,0.12)]" style={{ animationDelay: "0.35s" }}>
        <span className="grid h-[clamp(2.7rem,5.6dvh,3.5rem)] w-[clamp(2.7rem,5.6dvh,3.5rem)] place-items-center rounded-2xl bg-[#F6F0F8] text-[#500D68]"><MapPin className="h-7 w-7" /></span>
      </span>
      <span className="absolute bottom-[10%] left-1/2 h-[clamp(3.2rem,7dvh,4.3rem)] w-[clamp(9.5rem,36vw,12rem)] -translate-x-1/2 rounded-b-2xl bg-[#A477B4] shadow-[0_14px_30px_rgba(80,13,104,0.18)]" />
      <span className="absolute bottom-[44%] left-[46%] h-[clamp(2.2rem,5dvh,3.2rem)] w-[clamp(5.8rem,22vw,7.5rem)] -translate-x-1/2 skew-x-[-18deg] rounded bg-[#D0B8D8]" />
      <span className="absolute bottom-[44%] left-[54%] h-[clamp(2.2rem,5dvh,3.2rem)] w-[clamp(5.8rem,22vw,7.5rem)] -translate-x-1/2 skew-x-[18deg] rounded bg-[#A477B4]" />
      <Sparkles className="occazn-twinkle absolute left-[4%] top-[58%] h-4 w-4 fill-[#A477B4] text-[#A477B4]" />
      <Sparkles className="occazn-twinkle absolute right-[5%] top-[48%] h-4 w-4 fill-[#7B3892] text-[#7B3892]" />
    </div>
  );
}

function FeatureCard({ title, description, icon: Icon, complete, onClick }: { title: string; description: string; icon: React.ElementType; complete: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      variants={cardVariants}
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className="group relative flex min-h-[clamp(4.35rem,9dvh,5.1rem)] w-full items-center gap-3 rounded-[1.1rem] border bg-white px-4 py-2.5 text-left shadow-[0_10px_24px_rgba(80,13,104,0.08)] transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#6C1785]"
      style={{ borderColor: complete ? brand.primary : "rgba(208,184,216,0.35)" }}
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#F6F0F8] text-[#6C1785]">
        <Icon className="h-7 w-7 stroke-[1.8]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[clamp(1rem,2.5dvh,1.2rem)] font-bold text-[#171717]">{title}</span>
        <span className="mt-0.5 block text-[clamp(0.85rem,2dvh,1rem)] font-medium text-[#686078]">{description}</span>
      </span>
      <AnimatePresence>
        {complete && (
          <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="grid h-7 w-7 place-items-center rounded-full bg-[#6C1785] text-white">
            <Check className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>
      <ChevronRight className="h-7 w-7 text-[#171717] transition group-hover:translate-x-1" />
    </motion.button>
  );
}

function FinalInviteIllustration({ draft }: { draft: EventDraft }) {
  const names = [draft.primaryName, draft.secondaryName].filter(Boolean).join(" & ") || draft.title || "Your Invite";
  const dateLabel = draft.date ? formatEventDate(draft.date) : "Event Date";

  return (
    <div className="relative mx-auto h-[clamp(9.4rem,23dvh,14rem)] w-full max-w-[330px]" aria-hidden="true">
      <span className="occazn-float-sparkle absolute left-2 top-12 text-[#A477B4]">*</span>
      <span className="occazn-float-sparkle absolute right-6 top-8 text-[#7B3892]" style={{ animationDelay: "0.4s" }}>*</span>
      <span className="occazn-float-sparkle absolute left-9 bottom-12 text-[#D0B8D8]" style={{ animationDelay: "0.9s" }}>*</span>
      <span className="occazn-float-sparkle absolute right-12 bottom-8 text-[#A477B4]" style={{ animationDelay: "1.2s" }}>*</span>
      <motion.span
        className="occazn-envelope-float absolute left-1/2 top-[10%] z-10 flex h-[clamp(5.5rem,12dvh,7rem)] w-[clamp(6.7rem,26vw,8rem)] -translate-x-1/2 flex-col items-center rounded-lg bg-white px-3 py-[clamp(0.8rem,2dvh,1.25rem)] text-center shadow-[0_16px_38px_rgba(80,13,104,0.13)]"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42 }}
      >
        <span className="line-clamp-1 font-serif text-[clamp(0.9rem,2.2dvh,1.125rem)] font-bold text-[#6C1785]">{names}</span>
        <span className="mt-[clamp(0.35rem,1dvh,0.75rem)] h-px w-14 bg-[#D0B8D8]" />
        <span className="mt-[clamp(0.35rem,1dvh,0.75rem)] text-xs font-bold text-[#686078]">{dateLabel}</span>
        <Heart className="mt-[clamp(0.35rem,1dvh,0.75rem)] h-4 w-4 fill-[#A477B4] text-[#A477B4]" />
      </motion.span>
      <span className="absolute bottom-[8%] left-1/2 h-[clamp(5.5rem,12dvh,7rem)] w-[clamp(11rem,48vw,14rem)] -translate-x-1/2 overflow-hidden rounded-b-2xl bg-[#7B3892] shadow-[0_22px_48px_rgba(80,13,104,0.2)]">
        <span className="absolute inset-x-0 top-0 h-0 w-0 border-l-[112px] border-r-[112px] border-t-[72px] border-l-transparent border-r-transparent border-t-[#D0B8D8]" />
        <span className="absolute bottom-0 left-0 h-0 w-0 border-b-[86px] border-r-[112px] border-b-[#6C1785] border-r-transparent" />
        <span className="absolute bottom-0 right-0 h-0 w-0 border-b-[86px] border-l-[112px] border-b-[#500D68] border-l-transparent" />
      </span>
      <span className="absolute bottom-6 left-1/2 h-4 w-64 -translate-x-1/2 rounded-full bg-[#D0B8D8]/35 blur-md" />
    </div>
  );
}

function FinalActionCard() {
  const rows = [
    { title: "We'll create your invite", description: "Sit back, we're adding the magic.", icon: Wand2 },
    { title: "Preview & customize", description: "Review and make it perfect.", icon: Heart },
    { title: "Share with your guests", description: "Send and start the celebrations!", icon: Send },
  ];

  return (
    <motion.div key="final" className="mt-[clamp(0.8rem,1.8dvh,1.5rem)] overflow-hidden rounded-[1.25rem] border bg-white shadow-[0_14px_32px_rgba(80,13,104,0.09)]" initial="hidden" animate="visible" exit={{ opacity: 0, y: -8 }} variants={listVariants} style={{ borderColor: "rgba(208,184,216,0.34)" }}>
      {rows.map(({ title, description, icon: Icon }, index) => (
        <motion.button
          key={title}
          type="button"
          variants={cardVariants}
          className={cn("group flex min-h-[clamp(4.5rem,9dvh,5.5rem)] w-full items-center gap-3 bg-white px-4 py-3 text-left transition hover:bg-[#F6F0F8]/45 focus:outline-none focus:ring-2 focus:ring-[#6C1785]", index > 0 && "border-t border-[#D0B8D8]/35")}
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#F6F0F8] text-[#6C1785]">
            <Icon className="h-7 w-7 stroke-[1.8]" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[clamp(1rem,2.4dvh,1.2rem)] font-bold text-[#171717]">{title}</span>
            <span className="mt-0.5 block text-[clamp(0.9rem,2.1dvh,1.05rem)] font-medium leading-snug text-[#686078]">{description}</span>
          </span>
          <ChevronRight className="h-7 w-7 text-[#7B3892] transition group-hover:translate-x-1" />
        </motion.button>
      ))}
    </motion.div>
  );
}

function FeatureBottomSheet({
  sheet,
  draft,
  setDraft,
  onClose,
}: {
  sheet: FeatureSheet;
  draft: EventDraft;
  setDraft: (next: EventDraft | ((current: EventDraft) => EventDraft)) => void;
  onClose: () => void;
}) {
  const [videoUrl, setVideoUrl] = useState(draft.youtubeLink);
  const [venueName, setVenueName] = useState(draft.venueName);
  const [mapLink, setMapLink] = useState(draft.mapLink);
  const [musicUrl, setMusicUrl] = useState(draft.music.url);

  useEffect(() => {
    if (!sheet) return;
    setVideoUrl(draft.youtubeLink);
    setVenueName(draft.venueName);
    setMapLink(draft.mapLink);
    setMusicUrl(draft.music.url);
  }, [draft.mapLink, draft.music.url, draft.venueName, draft.youtubeLink, sheet]);

  if (!sheet) return null;

  function title() {
    if (sheet === "photos") return "Add photos";
    if (sheet === "video") return "Add video";
    if (sheet === "music") return "Add music";
    return "Add location";
  }

  function save() {
    if (sheet === "video") setDraft((current) => ({ ...current, youtubeLink: videoUrl }));
    if (sheet === "music") setDraft((current) => ({ ...current, music: { ...current.music, enabled: Boolean(musicUrl || current.music.trackId), url: musicUrl } }));
    if (sheet === "location") setDraft((current) => ({ ...current, venueName, mapLink }));
    onClose();
  }

  return (
    <AnimatePresence>
      <motion.div className="absolute inset-0 z-50 flex items-end bg-[#500D68]/30 px-4 pb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="feature-sheet-title">
        <motion.div initial={{ y: 120 }} animate={{ y: 0 }} exit={{ y: 120 }} transition={{ duration: 0.24 }} className="w-full rounded-[1.75rem] border bg-white p-5 shadow-[0_24px_70px_rgba(80,13,104,0.24)]" style={{ borderColor: brand.light }}>
          <div className="mb-5 flex items-center justify-between">
            <h2 id="feature-sheet-title" className="text-2xl font-bold text-[#171717]">{title()}</h2>
            <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-[#F6F0F8] text-[#500D68] focus:outline-none focus:ring-2 focus:ring-[#6C1785]" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>

          {sheet === "photos" && (
            <div className="space-y-4">
              <label className="block rounded-2xl border border-dashed border-[#D0B8D8] bg-[#F6F0F8] p-4 text-center text-sm font-bold text-[#6C1785]">
                Select photos
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(event) => {
                    const files = Array.from(event.target.files || []).map((file) => file.name);
                    setDraft((current) => ({ ...current, gallery: [...current.gallery, ...files] }));
                  }}
                />
              </label>
              <div className="grid grid-cols-2 gap-2">
                {draft.gallery.map((photo) => (
                  <span key={photo} className="flex items-center gap-2 rounded-xl bg-[#F6F0F8] px-3 py-2 text-sm font-semibold text-[#500D68]">
                    <ImageIcon className="h-4 w-4" />
                    <span className="min-w-0 flex-1 truncate">{photo}</span>
                    <button type="button" onClick={() => setDraft((current) => ({ ...current, gallery: current.gallery.filter((item) => item !== photo) }))} aria-label={`Remove ${photo}`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
              <button type="button" onClick={onClose} className="h-12 w-full rounded-xl bg-[#6C1785] font-bold text-white">Save photos</button>
            </div>
          )}

          {sheet === "video" && (
            <SheetField label="Video link" value={videoUrl} placeholder="Paste YouTube or video link" onChange={setVideoUrl} onSave={save} saveLabel="Save video" />
          )}

          {sheet === "music" && (
            <div className="space-y-3">
              <button type="button" onClick={() => { setDraft((current) => ({ ...current, music: { ...current.music, enabled: false, url: "" } })); onClose(); }} className="h-12 w-full rounded-xl border border-[#D0B8D8] bg-white font-bold text-[#500D68]">No music</button>
              <button type="button" onClick={() => { setDraft((current) => ({ ...current, music: { ...current.music, enabled: true } })); onClose(); }} className="h-12 w-full rounded-xl border border-[#D0B8D8] bg-[#F6F0F8] font-bold text-[#6C1785]">Use default music</button>
              <SheetField label="Music link" value={musicUrl} placeholder="Paste music link" onChange={setMusicUrl} onSave={save} saveLabel="Save music" />
            </div>
          )}

          {sheet === "location" && (
            <div className="space-y-3">
              <label className="block text-sm font-bold text-[#171717]">Venue name<input value={venueName} onChange={(event) => setVenueName(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#D0B8D8] bg-white px-4 text-base outline-none focus:border-[#6C1785]" /></label>
              <SheetField label="Location link" value={mapLink} placeholder="Paste map/location link" onChange={setMapLink} onSave={save} saveLabel="Save location" />
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function SheetField({ label, value, placeholder, onChange, onSave, saveLabel }: { label: string; value: string; placeholder: string; onChange: (value: string) => void; onSave: () => void; saveLabel: string }) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-bold text-[#171717]">
        {label}
        <input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#D0B8D8] bg-white px-4 text-base outline-none focus:border-[#6C1785]" />
      </label>
      <button type="button" onClick={onSave} className="h-12 w-full rounded-xl bg-[#6C1785] font-bold text-white">{saveLabel}</button>
    </div>
  );
}

function BottomWave({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 overflow-hidden">
      <svg className="absolute bottom-0 h-full w-full" viewBox="0 0 430 140" preserveAspectRatio="none">
        <path d="M0 72C88 86 121 132 210 116C293 101 319 57 430 86V140H0Z" fill="#F6F0F8" />
        <path d="M0 110C86 92 146 136 231 125C304 115 345 96 430 108V140H0Z" fill="#D0B8D8" opacity="0.34" />
      </svg>
    </div>
  );
}

function ContinueButton({ disabled, onClick, label = "Continue", loading = false }: { disabled: boolean; onClick: () => void; label?: string; loading?: boolean }) {
  return (
    <motion.button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      whileTap={{ scale: 0.985 }}
      className="occazn-shimmer relative flex h-[clamp(3.25rem,7dvh,4rem)] w-full items-center justify-center overflow-hidden rounded-[1.15rem] bg-[#6C1785] text-[clamp(1.1rem,2.8dvh,1.25rem)] font-bold text-white shadow-[0_14px_28px_rgba(108,23,133,0.24)] focus:outline-none focus:ring-2 focus:ring-[#500D68] disabled:opacity-50"
      aria-busy={loading}
    >
      {loading && <Loader2 className="mr-3 h-5 w-5 animate-spin" />}
      {loading ? "Creating..." : label}
      {!loading && <ArrowRight className="absolute right-8 h-8 w-8" />}
    </motion.button>
  );
}

function DecorativeSwoosh() {
  return (
    <div className="mt-[clamp(0.9rem,2dvh,2rem)] flex items-center justify-center gap-3 text-[#A477B4]">
      <Sparkles className="h-4 w-4 fill-[#A477B4]" />
      <svg width="86" height="16" viewBox="0 0 86 16" fill="none" aria-hidden="true">
        <path d="M2 12C22 1 36 14 52 9C62 6 70 3 84 6" stroke="#A477B4" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <Sparkles className="h-4 w-4 fill-[#A477B4]" />
    </div>
  );
}

function FloatingSparkles() {
  const sparkles = [
    "left-[12%] top-[8%]",
    "right-[15%] top-[12%]",
    "left-[8%] top-[34%]",
    "right-[8%] top-[42%]",
    "left-[18%] bottom-[18%]",
    "right-[12%] bottom-[16%]",
    "left-[50%] top-[28%]",
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {sparkles.map((position, index) => (
        <span key={position} className={cn("occazn-float-sparkle absolute text-[#A477B4]/55", position)} style={{ animationDelay: `${index * 0.7}s` }}>
          *
        </span>
      ))}
    </div>
  );
}

function TinyConfetti({ burstKey }: { burstKey: number }) {
  if (!burstKey) return null;
  return (
    <div key={burstKey} aria-hidden="true" className="pointer-events-none absolute left-1/2 top-36 z-30 h-16 w-16 -translate-x-1/2">
      {Array.from({ length: 10 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
          style={{ background: index % 2 ? brand.light : brand.primary }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0.8 }}
          animate={{
            opacity: 0,
            x: Math.cos(index) * 42,
            y: Math.sin(index) * 30,
            scale: 0.2,
          }}
          transition={{ duration: 0.62, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
