# DESIGN — LeetWrite AI Design System

## Brand Personality

LeetWrite AI feels like a precision instrument, not a chat window. It is calm, confident, and fast. It never over-explains itself, never uses exclamation points in the UI, and never tries to feel "friendly" through excessive copy. The product earns trust through restraint and speed, not through decoration.

Three words that describe the product: **Precise. Fast. Unshowy.**

---

## Visual Identity

- **Primary surface:** near-black, not pure black — avoids the harshness of `#000000` while keeping the premium, focused feel of a dark-first developer tool.
- **Accent color:** a single, deliberate accent used sparingly — for primary actions, focus states, and the loading indicator only. Never used decoratively.
- **Contrast philosophy:** high-contrast text on low-contrast surfaces. The UI should feel quiet until the user needs to act.
- **No illustration, no mascots, no stock imagery.** Typography, spacing, and code itself are the visual language.

---

## Typography

| Role | Typeface Style | Usage |
|---|---|---|
| Display / Headings | Geometric sans, tight tracking | Page titles, section headers |
| Body | Neutral, highly legible sans | Descriptions, labels, UI copy |
| Code | Monospace, ligature-friendly | Solution code, formatted output |

**Type scale (base 16px):**

| Token | Size | Line Height | Usage |
|---|---|---|---|
| `text-xs` | 12px | 16px | Meta labels, badges |
| `text-sm` | 14px | 20px | Secondary UI text |
| `text-base` | 16px | 24px | Body copy |
| `text-lg` | 18px | 28px | Emphasized body, subheadings |
| `text-xl` | 24px | 32px | Section headers |
| `text-2xl` | 32px | 40px | Page titles |
| `text-3xl` | 48px | 56px | Hero headline only |

Font weight is used deliberately: 400 for body, 500 for UI labels and buttons, 600 for headings. Never more than three weights on screen at once.

---

## Spacing

An 8px base unit governs all spacing. No arbitrary values.

| Token | Value |
|---|---|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-12` | 48px |
| `space-16` | 64px |

Generous whitespace around the primary action area at all times — the "Generate" button should never feel crowded.

---

## Grid

- 12-column responsive grid on desktop, collapsing to a single column below 768px.
- Max content width: 1120px, centered, with fluid gutters.
- The core generation flow (input → preview) uses a two-panel layout on desktop (input left, preview right) and a stacked, tabbed layout on mobile.

---

## Color Palette

| Token | Usage | Notes |
|---|---|---|
| `bg-primary` | Main app background | Near-black |
| `bg-surface` | Cards, panels | One step lighter than primary |
| `bg-surface-hover` | Hover state for surfaces | Subtle lift only |
| `border-subtle` | Default borders | Low contrast, barely visible |
| `border-strong` | Focus, active borders | Uses accent color |
| `text-primary` | Headings, primary copy | Near-white |
| `text-secondary` | Descriptions, labels | Muted gray |
| `text-tertiary` | Placeholder, disabled | Low-contrast gray |
| `accent` | Primary actions, focus rings, links | Single brand accent |
| `success` | Success states | Restrained green, not neon |
| `error` | Error states | Restrained red, not alarming |
| `warning` | Non-blocking warnings | Amber, used rarely |

Color is functional, never ornamental. If a color doesn't communicate state or hierarchy, it shouldn't be there.

---

## Buttons

| Variant | Usage | Style |
|---|---|---|
| Primary | Single primary action per screen ("Generate Discussion") | Filled, accent background |
| Secondary | Supporting actions ("Copy Markdown") | Outlined, subtle border |
| Ghost | Low-emphasis actions (nav links, tertiary actions) | No border, text-only |
| Destructive | Not used in V1 (no delete actions exist) | Reserved for future versions |

**States required for every button:** default, hover, active/pressed, focus-visible, disabled, loading.

Loading state on the primary button replaces the label with a compact spinner and disables interaction — never a full-page blocking spinner.

---

## Inputs

- Single-line and multi-line (code) inputs share consistent border radius, padding, and focus treatment.
- Focus state: border transitions to `accent`, with a soft outer ring — no color-only focus indication (accessibility requirement).
- The code textarea uses a monospace font, preserves whitespace, and supports tab-to-indent behavior.
- Placeholder text is instructional, not decorative (e.g. "Paste your accepted solution here" — not "Type something...").

---

## Cards

Used for the preview panel and any grouped content. Subtle border, subtle background elevation, no heavy drop shadows. Shadows, when used, are soft and low-opacity — signaling elevation, not decoration.

---

## Badges

Used sparingly — e.g. language tag on the formatted code block ("JAVA", "PYTHON"). Small, uppercase, muted background, high-contrast text.

---

## Navigation

V1 has minimal navigation: a simple top bar with the product wordmark and a single link to documentation/GitHub. No sidebar, no multi-level menus. As the product grows (V3+), navigation expands only as far as new surfaces (history, settings) require — never speculatively.

---

## Forms

The entire V1 product is effectively one form: URL, language, code. Form design principles:

- Inline validation feedback, appearing on blur, not on every keystroke.
- Errors appear directly below the relevant field, in `error` color, with specific and actionable text.
- The primary submit button is disabled until the form is valid — no "click and get an error" pattern.

---

## Code Blocks

- Syntax-highlighted, monospace, with a visible language badge in the top-right corner.
- A copy icon appears on hover in the top-right of the block.
- Line wrapping is disabled by default (horizontal scroll) to preserve code structure — this is a developer tool, not a blog.

---

## Loading States

Loading is a first-class state, not an afterthought, because AI generation takes several seconds.

- The primary button shows an inline spinner and a subtly animated label (e.g. progressive text: "Analyzing solution…" → "Structuring discussion…") to communicate progress without a fake progress bar.
- The preview panel shows skeleton placeholders matching the exact shape of the eventual content — never a generic spinner in an empty box.

---

## Skeletons

Skeleton blocks match the geometry of: title (single line), intuition (paragraph block), approach (multi-line block), complexity (two short lines), code (rectangular block), key takeaways (3 short lines). Skeleton animation is a slow, subtle shimmer — never fast or distracting.

---

## Empty States

Before generation, the preview panel shows a calm empty state: a simple line of text ("Your discussion will appear here") and no illustration. Empty states inform, they don't decorate.

---

## Error States

- Field-level errors: inline, specific, actionable (see Forms above).
- Request-level errors (timeout, AI failure): shown in the preview panel area with a clear message and a "Try Again" action — mapped to the error codes in `API.md`.
- Errors never use blame language ("You did something wrong") — always neutral and solution-oriented ("That didn't go through — try again").

---

## Success States

Success is communicated through the content appearing, not through a separate success banner. The one exception: "Copy Markdown" shows a brief, subtle confirmation (icon swap + micro label change to "Copied") for 2 seconds before reverting.

---

## Icons

A single, consistent icon set (line-style, consistent stroke width) throughout. Icons are functional — copy, language, external link — never decorative filler.

---

## Animations

- Duration range: 120–240ms for UI transitions, never longer.
- Easing: standard ease-out for entrances, ease-in for exits.
- Motion is used to clarify state changes (loading → content, error → retry), never for flourish.

## Motion Principles

1. Motion should explain a state change, not decorate one.
2. Nothing animates on scroll for its own sake.
3. If motion is disabled (`prefers-reduced-motion`), all functional state changes must still be instantly legible without animation.

---

## Accessibility

- All interactive elements reachable and operable via keyboard.
- Focus-visible states on every interactive element, never suppressed.
- Color is never the sole indicator of state (icons/text accompany color changes).
- Minimum contrast ratio of 4.5:1 for body text, 3:1 for large text, per WCAG AA.
- `prefers-reduced-motion` respected throughout.

---

## Responsive Design

- Breakpoints: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px.
- Below `md`, the two-panel input/preview layout collapses into a tabbed single-column view ("Input" / "Preview" tabs).
- Touch targets are a minimum of 44x44px on mobile.

---

## Dark Theme Philosophy

Dark is the only theme in V1 — this is a deliberate product decision, not a missing feature. The target audience (developers, in an editor-adjacent context) expects and prefers dark interfaces for this category of tool. A light theme may be considered in a future version once the dark experience is fully refined, not before.

---

## Design Tokens (Summary Reference)

| Category | Token Examples |
|---|---|
| Color | `bg-primary`, `bg-surface`, `text-primary`, `accent`, `error`, `success` |
| Spacing | `space-1` … `space-16` (8px base unit) |
| Typography | `text-xs` … `text-3xl` |
| Radius | `radius-sm` (6px), `radius-md` (10px), `radius-lg` (16px) |
| Shadow | `shadow-subtle`, `shadow-elevated` (both low-opacity) |
| Motion | `duration-fast` (120ms), `duration-base` (200ms) |

---

## Component Guidelines

- Every component must support all required states before shipping (default, hover, focus, disabled, loading where applicable).
- No component should introduce a new color, spacing value, or font size outside the token set above.
- Components are composed from primitives (Button, Input, Card, Badge) rather than styled ad hoc per screen.

---

## UX Principles

1. **One primary action per screen.** The user should never wonder what to click next.
2. **The system always communicates state.** Loading, error, and success are never ambiguous.
3. **Speed is a feature.** Every interaction should feel instantaneous except the AI generation itself, which is clearly communicated as in-progress.
4. **No unnecessary confirmation dialogs.** V1 has no destructive actions — don't invent friction.
5. **Copy should read like it was written by an engineer, for engineers.** No marketing fluff inside the product.