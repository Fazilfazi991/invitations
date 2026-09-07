---
name: Occazn Organizer Workspace
description: A calm, wedding-led workspace for publishing invitations and privately managing real responses.
colors:
  primary: "#6C1785"
  primary-deep: "#500D68"
  violet: "#7B3892"
  lavender: "#A477B4"
  light-lavender: "#D0B8D8"
  primary-soft: "#F5EFF8"
  background: "#FEFDFC"
  surface: "#FFFFFF"
  heading: "#2D1735"
  foreground: "#1F2937"
  muted: "#6B7280"
  secondary-ink: "#514657"
  border-subtle: "#E6D8EB"
  divider: "#EEE5F1"
  attending-bg: "#ECFDF5"
  attending-text: "#065F46"
  draft-bg: "#FFFBEB"
  draft-text: "#92400E"
  declined-bg: "#F1F5F9"
  declined-text: "#334155"
  error: "#BE123C"
typography:
  display:
    fontFamily: '"Playfair Display", Georgia, serif'
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: '"Playfair Display", Georgia, serif'
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
  title:
    fontFamily: '"Playfair Display", Georgia, serif'
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  control:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.333
    letterSpacing: "normal"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  2xl: "24px"
  3xl: "32px"
  4xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.control}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "48px"
  button-primary-small:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.control}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "40px"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.control}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "40px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "44px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "16px"
  badge-published:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  navigation-item-active:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px"
    height: "44px"
---

# Design System: Occazn Organizer Workspace

## Overview

**Creative North Star: "The Calm Invitation Desk"**

Occazn treats invitation management like a composed personal workspace, not an enterprise console. Warm paper, soft white cards, wedding-led serif headings, and a restrained purple voice make state and next actions feel obvious without turning the couple's celebration into a data product.

The system is compact but never cramped. Real invitation state, response totals, and guest records occupy clear, shallow layers; expressive character lives in typography, gentle lavender atmosphere, and cover imagery rather than dashboard chrome. The confirmed anti-reference is the dense enterprise-admin grid.

**Key Characteristics:**

- Warm, nearly white ground with quiet lavender atmosphere.
- Playfair headings and numerals paired with Inter controls and metadata.
- Purple reserved for action, orientation, and active state.
- Mobile-first stacking that becomes a compact organizer workspace on wider screens.
- Honest loading, empty, error, and zero-data states using the same visual language as populated views.

## Colors

The palette is a warm neutral field with one restrained purple family, supported by semantic colors only where status must be unmistakable.

### Primary

- **Ceremony Purple** (`colors.primary`): Primary actions, active navigation, links, focus outlines, and compact icon emphasis.
- **Deep Plum** (`colors.primary-deep`): Hover depth for the primary action; it should read as a state change, not a second brand voice.

### Secondary

- **Velvet Violet** (`colors.violet`): A supporting brand accent inherited from the established Occazn identity.
- **Dusty Lavender** (`colors.lavender`) and **Petal Lavender** (`colors.light-lavender`): Soft brand atmosphere, hairlines, and low-emphasis decorative transitions.
- **Orchid Wash** (`colors.primary-soft`): Active navigation, selected filters, published badges, loading blocks, and quiet icon wells.

### Neutral

- **Warm Paper** (`colors.background`): The page ground and bounded organizer shell.
- **Clear White** (`colors.surface`): Cards, controls, sticky chrome, and selected filter segments.
- **Aubergine Ink** (`colors.heading`): Occasion-bearing headings, event names, guest names, and metric numerals.
- **Body Ink** (`colors.foreground`): Default prose and control content.
- **Muted Slate** (`colors.muted`): Dates, labels, helper text, and secondary metadata.
- **Lavender Hairline** (`colors.border-subtle`) and **Whisper Divider** (`colors.divider`): Container boundaries and row separation without gray admin-table heaviness.

### Tertiary

- **Attending Mint** (`colors.attending-bg`, `colors.attending-text`): Positive attendance status only.
- **Draft Amber** (`colors.draft-bg`, `colors.draft-text`): Invitations that are not yet published.
- **Declined Slate** (`colors.declined-bg`, `colors.declined-text`): Neutral handling of non-attendance.
- **Recovery Rose** (`colors.error`): Inline failures that require organizer attention.

**The One Purple Voice Rule.** Purple communicates brand, action, focus, or selection; do not add unrelated accent hues to decorate organizer screens.

## Typography

**Display Font:** Playfair Display (with Georgia and serif fallbacks)  
**Body Font:** Inter (with system-ui and sans-serif fallbacks)

**Character:** The serif makes invitation names, section headings, and response totals feel tied to the occasion. The sans serif keeps actions, search, dates, labels, and guest data direct and highly scannable.

### Hierarchy

- **Display** (`typography.display`): Page titles and RSVP event titles; expands from 30px to 36px only where the shipped responsive heading does so.
- **Headline** (`typography.headline`): Empty-state titles and prominent section-level messages.
- **Title** (`typography.title`): Invitation names and compact failure headings.
- **Body** (`typography.body`): Search inputs and primary reading text; mobile inputs remain at 16px to avoid zoom behavior.
- **Control** (`typography.control`): Buttons, action links, filter choices, and prominent metadata.
- **Label** (`typography.label`): Metric labels, table headers, timestamps, and badges.

**The Serif Carries the Occasion Rule.** Use Playfair for names, headings, and meaningful totals; keep operational copy and controls in Inter.

## Layout

Organizer screens live inside a centered shell no wider than 980px. Mobile uses 20px side gutters and vertical stacking; the `sm` breakpoint (640px) increases gutters to 32px, places the page CTA beside the heading, turns invitation cards into a 160px-image two-column composition, and expands RSVP metrics from two to four columns. The RSVP response list stays card-like on mobile and becomes a five-column data row at the `md` breakpoint (768px).

The recurring spatial rhythm is 4px at the smallest detail, then 8px, 12px, 16px, 20px, 24px, 32px, and 40px. Primary information appears before actions: page or event context, status and totals, dominant actions, then secondary sharing tools. Bottom navigation remains sticky and bounded to a compact 4-item mobile grid.

**The One Calm Workspace Rule.** Preserve the bounded shell, shallow vertical hierarchy, and responsive reflow; never widen the dashboard into a wall-to-wall admin grid.

## Elevation & Depth

Depth is a hybrid of warm tonal layering, lavender hairlines, and two low-contrast shadows. Cards use an ambient card shadow (`0 10px 30px rgba(31, 41, 55, 0.06)`) with a one-pixel lavender ring; the primary button uses a slightly broader purple-tinted shadow (`0 16px 45px rgba(108, 23, 133, 0.10)`). Sticky headers and navigation use translucent white or warm paper plus backdrop blur. Response rows remain flat inside one bordered container.

### Shadow Vocabulary

- **Card Drift** (`0 10px 30px rgba(31, 41, 55, 0.06)`): Invitation cards, metrics, and elevated empty or error surfaces.
- **Action Bloom** (`0 16px 45px rgba(108, 23, 133, 0.10)`): Primary buttons only.
- **Selected Segment** (`0 1px 2px rgba(0, 0, 0, 0.05)`): The active filter resting above its orchid track.

**The Soft Offset Rule.** Elevation clarifies hierarchy but never announces itself; combine faint shadow with a lavender boundary and keep data rows flat.

## Shapes

The system uses gently rounded geometry throughout: 8px for nested selected segments and skeleton details, 12px for buttons, inputs, and navigation targets, 16px for cards and response containers, and fully rounded pills or avatar wells for compact status. Cover imagery clips to its card, while cards and lists avoid ornamental frames beyond one hairline boundary.

**The Nested Radius Rule.** A child control is one radius step tighter than the container or track that holds it.

## Components

### Buttons

- **Shape:** Confident rounded rectangle (`rounded.md`) with a 40px compact or 48px default height; icon-only buttons remain at least 44px square.
- **Primary:** Ceremony Purple with white type, semibold Inter, 16–20px horizontal padding, and Action Bloom depth.
- **Hover / Focus:** Deep Plum on hover, a two-pixel purple focus ring with clear offset, and a restrained 0.98 active scale.
- **Outline / Ghost / Soft:** White with a lavender border, transparent neutral, or Orchid Wash respectively; each resolves to the same purple hover language.

### Chips

- **Style:** Fully rounded, compact semibold labels. Published uses Orchid Wash and Ceremony Purple; draft, attending, and declined each use their dedicated semantic pair.
- **State:** RSVP filters use a three-choice segmented track; the selected choice becomes a white nested surface with purple text and a small shadow, while unselected choices remain neutral.

### Cards / Containers

- **Corner Style:** Gently rounded (`rounded.lg`).
- **Background:** Clear White over Warm Paper.
- **Shadow Strategy:** Card Drift plus a Lavender Hairline for primary cards and metrics; response lists use only the hairline.
- **Border:** One-pixel lavender ring or divider.
- **Internal Padding:** 16px on mobile, growing to 20px where invitation content has more horizontal room.

### Inputs / Fields

- **Style:** White field, one-pixel lavender border, 12px corners, 44–48px height, 16px Inter text, and a compact leading icon when search context benefits.
- **Focus:** Border shifts to Ceremony Purple under the global two-pixel focus outline.
- **Error / Disabled:** Errors use Recovery Rose with a direct recovery sentence; disabled actions retain shape and lose emphasis through reduced opacity.

### Navigation

Sticky mobile navigation uses a translucent white surface, top hairline, blur, and four evenly weighted destinations. Each target is at least 44px tall with a 20px line icon and 11px label; active and hover states use Orchid Wash with Ceremony Purple. The RSVP manager uses a lightweight purple back link rather than repeating the full bottom navigation.

### Invitation Card

This is the organizer workspace's signature component. A full-width cover image sits above content on mobile and becomes a 160px column at 640px; title, date, publish state, template, and truthful response count precede two dominant actions. Edit, copy, WhatsApp, and Share & QR remain quieter text actions with full-height tap targets.

### RSVP Metrics and Response List

Four compact metric cards lead with a purple icon, a 12px label, and a 30px Playfair tabular number. Guest responses stay readable cards on mobile, then align into the observed five-column structure at 768px; statuses remain badges, messages wrap, and long lists paginate in groups of 25.

## Do's and Don'ts

### Do:

- **Do** keep every organizer view centered within the 980px shell and reflow it without horizontal scrolling.
- **Do** place real invitation state, real response totals, and the next useful action before secondary sharing tools.
- **Do** use Playfair selectively for occasion-bearing hierarchy and Inter for operations and guest data.
- **Do** give interactive controls a minimum 44px mobile target and a visible focus treatment.
- **Do** use honest zero, loading, empty, error, and not-found states in the same warm, reassuring visual language.

### Don't:

- **Don't** turn the dashboard or RSVP manager into a dense enterprise-admin grid.
- **Don't** invent analytics, guest records, response totals, or decorative charts when real data is absent.
- **Don't** expose private RSVP detail outside the owner workspace or let status styling imply a value the data does not contain.
- **Don't** use purple as an all-over fill; its restraint is what preserves hierarchy.
- **Don't** introduce sharp containers, heavy black shadows, or cold gray page grounds into the organizer workspace.
