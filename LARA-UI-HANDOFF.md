# Lara UI Handoff

## Authority and shared rules

Implement the screen contracts in `SABEL-UX-SPEC.md`; that document is authoritative for UX behavior. This handoff translates the requirements into an implementation-ready screen inventory. It does not prescribe visual style, frontend technology, or API architecture.

Apply the shared validation, state, privacy, and responsive rules from UX spec sections 1 and 6 to every applicable screen. Preserve data on failures, provide accessible error summaries after attempted submission, do not rely on hover/drag alone, and retain the three distinct navigation zones.

## Screen inventory

| Screen | Purpose, layout, and components | CTA / navigation / interactions | States and mobile |
|---|---|---|---|
| Home | Public header; approved marketing content; three distinct action regions. Components: public navigation, `Browse Templates`, `Create an RSVP`, `Request a Custom RSVP`. | CTAs go to Templates, authenticated creation handoff, and Custom RSVP. | Public-page load/error only. Stack paths on mobile; keep Login and one primary CTA reachable. |
| About, Services, How It Works, Portfolio, Contact | Public header, approved page content, and relevant public CTA/footer. Do not invent testimonials, pricing, logos, statistics, or awards. | Use public navigation and approved CTAs only. | Public load/not-found/error rules. Single-column mobile content. |
| Templates | Public header; search/filter/sort region; result grid; template cards with image, name, category, description, Preview and Use Template. | Search/filter/sort; Preview; Use Template; Clear filters; Custom RSVP. Preserve browse state when returning. | Card skeleton, no-results, empty, error/retry. One card per row on mobile. |
| Template Preview | Public header; Back to Templates; artwork/sample region; name/category/description; Use Template and Custom RSVP. | Use Template authenticates if required, then retains selection through Event Details to Template Selection. | Load/error/not-found. Scale preview and keep actions visible on mobile. |
| Login / Register | Focused authentication form with safe return-destination handling. | Submit, switch auth mode, and successful return to intended safe customer route/Dashboard. | Loading, credential validation/error, auth service error. Full-width mobile form. |
| Custom RSVP Request | Public header; field form in specified order; error summary; Submit Request; context-aware Back action. | Reveal Other event-type detail; validate; Submit Request; Retry. | Loading, validation, retryable error, confirmation. One-column mobile inputs with native keyboards. |
| Custom RSVP Confirmation | Public confirmation content with submitted event type/date summary and Browse Templates/Home actions. | Browse Templates; Back to Home. | Success only; no promised price/delivery date. Mobile stacks actions. |
| Dashboard / Events | Customer header/navigation; Create RSVP; owned event cards/rows with name, type, date, status, counts, actions. | Create, Open, Edit, Preview, Public RSVP, Responses. Draft public action explains publish prerequisite. | Loading, empty first-use, partial error/retry, auth. Mobile labelled event cards with visible actions/menu. |
| Event Overview | Customer event context, status, counts, and action set; links to relevant wizard step rather than duplicating builder. | Edit, Preview, Publish/Republish, Public RSVP when available, Responses, Back to Dashboard. | Loading/error/not-found/unauthorized/closed status. Stack actions on mobile. |
| Event Details | Wizard stepper; event-detail form; saved indicator; Continue, Save for later, Back to Dashboard. | Other event-type field; cross-field deadline validation; save/continue/back unsaved-change check. | Loading, validation, saving/error/retry, not-found/unauthorized. One-column mobile form. |
| Template Selection | Stepper; event context; selected state; search/filter/sort/cards; Start Blank; Continue. | Select/change template; change confirmation if questions/rules would be replaced; Start Blank; Back; Save. | Loading, no results, error/retry, disabled Continue until selection. One-card mobile layout. |
| Configure RSVP: Questions | Stepper and event/template context; ordered question cards; Add Question; save status; Preview. Editor has type picker, prompt/help/required fields and type-specific settings/options. | Add, edit, delete confirm, duplicate, move up/down, option actions, Preview, Back, Save. | Builder load/empty; editor validation/save failure; draft readiness guidance. Mobile uses focused full-width editor and explicit reorder controls. |
| Configure RSVP: Conditional Logic | Same wizard context; readable rule list; Add Conditional Rule; empty guidance. Rule editor follows source -> answer -> target sequence and shows summary. | Add/edit/delete rule; links to Questions; disable downstream selects until prerequisite chosen. | Empty/no-eligible-source/no-target, validation, save failure. Vertical full-width controls on mobile. |
| Preview | Preview-only notice; device selector; contained guest form; Edit RSVP and Continue to Publish. | Simulate answers, conditional visibility, validation, Reset preview; no real submit/response. | Preview load/error; local validation/local success only. Default to mobile frame on small viewports. |
| Publish | Event status/readiness; problem list with Fix links or success URL/action region. | Publish/Republish; Fix; Back to Preview; Copy link; Open RSVP; View responses; Dashboard. | Validation blockers, publishing, retryable error, success. Stack link/actions on mobile. |
| Public Guest RSVP | Guest-safe event information before dynamic form; required legend; questions; Submit RSVP. No customer navigation or management UI. | Conditional show/hide and answer clearing; submit; retry. | Load, inline validation, submit error/retry, invalid, closed, confirmation, duplicate. Full-width controls and touch-safe choices. |
| Guest Confirmation / Invalid / Closed | Simple terminal guest-facing status page with safe public content only. | Home where appropriate; no edit/re-submit/customer action. | Confirmation, duplicate, invalid, closed, server retry per UX spec. Mobile single-column. |
| Responses | Customer event header; response count/attendance summary if configured; ordered response rows/cards. | Open response; Back to Event; Open public RSVP in empty state when available. | Loading, no responses, error/retry, not-found/unauthorized. Vertical cards on mobile. |
| Response Detail | Customer header; submission metadata; optional attendance result; dynamic prompt/answer list; Back to Responses. | Back to Responses only; answers are read-only. | Loading, error/retry, not-found/unauthorized. Stack prompt/answer pairs on mobile. |
| Account | Customer header; account form and saved indicator. | Save account; Dashboard. | Loading, validation, saving/success/error, auth. One-column mobile form. |

## Required reusable components

- Public header, customer header, guest-safe header/context, footer
- Accessible form field, error summary, inline error, saved status, unsaved-changes confirmation
- Wizard stepper and action bar
- Template card, filter/search controls, empty/error/skeleton states
- Event card/status badge/action menu
- Question card/editor, option-row editor, required toggle, reorder controls
- Conditional-rule editor and readable rule sentence
- Preview frame/device selector
- Publish blocker list, URL field, copy-feedback state
- Dynamic guest form renderer
- Dynamic response row and prompt/answer renderer

## Verification checklist

1. Test the critical path using a new customer, a template, one required question, one conditional rule, publish, guest submission, and response detail.
2. Test every state in UX spec section 6, particularly saved-value retention after failures and guest invalid/closed links.
3. Test at mobile, tablet, and desktop thresholds. Confirm every action works with keyboard and without hover or drag.
4. Render all questions/responses dynamically; do not hard-code event types, guest fields, or answers.
