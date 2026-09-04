# Sabel UX Implementation Plan

## Objective

Produce the complete UX blueprint required by `SABEL-UX.md`, without defining visual design, frontend implementation, backend architecture, or operations. The finished documentation must remove meaningful product-flow decisions from Lara and Marie while preserving the core RSVP loop:

`create → configure → preview → publish → share → guest submits → customer reviews`

## Scope and source of truth

Use these files as the governing requirements:

- `CORE.md` for the core loop and non-negotiable product rules.
- `TEAM-OVERVIEW.md` for personas, ownership, and definition of done.
- `SABEL-UX.md` for the UX deliverables.
- `LARA-UI.md` and `MARIE-BACKEND.md` only to ensure the handoffs give each role the product decisions it needs.

The UX documentation will not introduce pricing, fixed per-event-type flows, advanced AND/OR conditions, extra question types, or new product areas.

## Deliverables

Create the following files:

| File | Purpose |
|---|---|
| `SABEL-UX-SPEC.md` | The canonical sitemap, rules, journeys, screen specifications, states, and mobile rules. |
| `LARA-UI-HANDOFF.md` | Screen-by-screen UI implementation handoff. |
| `MARIE-BACKEND-HANDOFF.md` | Flow-by-flow data, validation, access, and result handoff. |

`SABEL-UX-SPEC.md` is authoritative when a handoff repeats a behavior. The two handoffs should translate that behavior for their respective owners, not redefine it.

## Phase 0: Domain data schema

Define the following technology-neutral data schema before writing the flow specifications. This is the product contract for the UX and backend handoff; Marie chooses the physical database, field types, indexes, and API design.

### Entities and ownership

| Entity | Purpose | Owner / visibility |
|---|---|---|
| Customer | Authenticated account that creates and manages events. | Private to the authenticated customer. |
| Event | Event metadata and its RSVP lifecycle container. | Owned by one customer; guest-safe fields are public only after publishing. |
| RSVP Configuration | The editable guest-form configuration attached to one event. | Owned by the event owner; a sanitized published version is public by URL. |
| Template | Reusable starting configuration for an RSVP. | Readable in the public/customer template catalogue; never modified by a customer using it. |
| Question | One dynamically configured RSVP input, ordered within an RSVP configuration. | Private in draft; guest-visible only when published and applicable. |
| Question Option | A selectable answer belonging to a choice question. | Inherits its question visibility. |
| Conditional Rule | One `source question + source answer -> target question` visibility rule. | Inherits its RSVP configuration visibility. |
| Guest Response | One submitted RSVP instance for an event. | Private to the event owner; never publicly retrievable. |
| Response Answer | A dynamic answer belonging to a guest response and referring to the question it answered. | Inherits its response visibility. |
| Custom RSVP Request | A separate sales/service enquiry submitted from the public custom-request form. | Private operational record; never treated as an event or guest response. |

### Conceptual relationships

```text
Customer 1 -> many Events
Event 1 -> 1 RSVP Configuration
Template 1 -> many customer-created RSVP Configuration copies
RSVP Configuration 1 -> many Questions
Question 1 -> many Question Options (choice types only)
RSVP Configuration 1 -> many Conditional Rules
Conditional Rule -> 1 source Question + 1 source Answer/Option + 1 target Question
Event 1 -> many Guest Responses
Guest Response 1 -> many Response Answers
Response Answer -> 1 Question (and zero-to-many selected Question Options)
```

### Required information by entity

| Entity | Required product fields | Important derived/system fields |
|---|---|---|
| Customer | Account identity and contact email. | Unique ID, authentication state, created/updated timestamps. |
| Event | Name, event type, date; time, location, description, and RSVP deadline follow the UX field contract. | Owner ID, draft/published/closed status, timestamps. |
| RSVP Configuration | Event ID and selected-template reference when applicable. | Public identifier after publish, published snapshot/version, publish timestamps. |
| Template | Name, category, preview-safe metadata, reusable RSVP configuration. | Template ID and availability status. |
| Question | RSVP configuration ID, type, prompt, required flag, display order. | Help text/constraints when UX permits; active state. |
| Question Option | Question ID, label, stored value, display order. | Active state; reference protection while used by a rule. |
| Conditional Rule | RSVP configuration ID, source question, triggering answer/option, target question. | Active/valid state and validation issue when no longer valid. |
| Guest Response | Event ID and submitted timestamp. | Submission status, optional duplicate-detection key when available. |
| Response Answer | Response ID, question ID, answer value(s). | Submitted question prompt/type snapshot where needed to preserve historic readability. |
| Custom RSVP Request | Name, email, event type, event date, location, guest count, description. | Request status and created timestamp. |

### Integrity, lifecycle, and visibility rules

1. Every customer-owned record must resolve to the same authenticated customer through its event; ownership is always enforced server-side.
2. An event has exactly one active RSVP configuration. A template is copied into that configuration; editing it cannot alter the template.
3. Question and option display order is explicit, stable, and scoped to its parent configuration/question.
4. Options exist only for Single Choice, Multiple Choice, and Dropdown questions. A choice question cannot be publishable without the minimum UX-defined number of active options.
5. A conditional rule may reference only questions in its own RSVP configuration. The source and target cannot be the same; invalid references, duplicate rules, and cycles are rejected.
6. Deleting or changing a question/option with dependent rules must surface the dependency and require rule cleanup before the configuration can be valid for publishing.
7. Guest submissions are accepted only against a published, open RSVP configuration. The server evaluates visible conditional questions and validates only answers that should be shown for that submitted response.
8. A response and its answers are immutable after successful submission unless an explicitly approved future edit policy is added. Published configuration changes must not make historic answers unreadable.
9. Public RSVP retrieval exposes only published event/configuration/question/option/rule fields intended for guests. It never exposes customer data, draft content, internal IDs, custom requests, or any response data.
10. Custom RSVP requests remain isolated from guest response records and RSVP creation data.

**Exit criterion:** The dynamic question, conditional-rule, publish, guest-submit, and response-management journeys all have stable entities, relationships, ownership, and visibility boundaries to reference.

## Phase 1 — Establish UX conventions and shared rules

Document these rules at the beginning of the canonical specification before describing individual screens:

1. Personas and access boundaries: visitor, authenticated customer, unauthenticated guest.
2. Route and navigation conventions for public, customer, and guest zones.
3. Draft/save model: saving preserves a customer-owned draft; publishing is a separate action; preview never creates a response.
4. Wizard conventions: visible current step, prior-step access, Continue behavior, saving feedback, and behavior after a failed save.
5. Universal form conventions: required marker, inline validation timing, focus/error summary behavior, disabled submissions, retry behavior, and preservation of entered values.
6. Public-RSVP conventions: no account requirement, only guest-safe event content, no exposure of responses or customer details.
7. MVP constraints: dynamic questions, one-condition/one-target `WHEN answer matches → SHOW question` rules only, and template copying rather than editing template originals.

**Exit criterion:** Later sections can reference these conventions instead of leaving common behavior ambiguous.

## Phase 2 — Information architecture and visitor acquisition flows

### 2.1 Sitemap

Document every required public, customer, and guest route in the Sabel brief. For each entry identify access level, primary purpose, valid entry points, and primary exits. Explicitly include invalid and closed public RSVP destinations.

### 2.2 First-visit journey

Define the homepage choices as three self-contained flow tables:

- Browse Templates
- Create an RSVP
- Request a Custom RSVP

Each table will specify start, goal, CTA label, authentication boundary, next screen, data required, completion, and error recovery.

### 2.3 Template journey

Define browse, search, filters, card contents, preview contents, selection persistence, and Use Template behavior. Specify recovery paths: continue browsing, return to results with filters/search retained, or move to Custom RSVP. State that a chosen template creates a customer-editable copy only after the customer passes the login boundary.

### 2.4 Custom RSVP request

Create the requirements form field contract for name, email, event type, event date, location, guest count, and description. For each field specify input type, requiredness, format/range validation, exact user-facing error, and small-screen behavior. Define submit loading, retryable failure, and success/next-step messaging.

**Exit criterion:** Every public CTA has a destination and every public form has a completion and recovery path.

## Phase 3 — Customer RSVP creation and publishing journey

Document the required wizard in this exact order:

`Event Details → Template Selection → Configure RSVP → Preview → Publish`

For each step provide a screen contract containing purpose, displayed information, editable inputs, primary/secondary actions, Back behavior, save lifecycle, loading, validation, error recovery, success feedback, and mobile changes.

### 3.1 Event Details

Define field-level behavior for event name, type, date, time, location, description, and RSVP deadline. Make required/optional status and valid date/deadline relationships explicit. Define Continue, Back, and saving-failure behavior without assuming a special event type.

### 3.2 Template Selection and configuration

Specify browsing/selection within the wizard, selected-template state, optional template changes, and the transition to configuration. Clarify what configuring an RSVP contains: questions, question order/options, requiredness, and conditional rules.

### 3.3 Preview and publish

Define preview as a safe guest-experience simulation including desktop/mobile modes, required validation, and conditional rendering. Define publish preflight: problem summary, links back to the relevant configuration area, blocked publish while invalid, publishing state, success state, public URL, copy/open actions, and return-to-dashboard option.

**Exit criterion:** A customer can always tell the current step, whether work is saved, why publishing is blocked, and how to reach the next action.

## Phase 4 — Dynamic question builder and conditional logic

### 4.1 Question builder

Document the shared builder behavior: add, type selection, edit, required toggle, duplicate (approve as an MVP convenience), delete confirmation, reorder, option management, unsaved edit handling, and empty builder state.

Create a type matrix for all ten supported types. Each row will state customer configuration, guest control, required behavior, valid answer rules, precise validation failure, and mobile treatment:

- Short Text, Long Text, Email, Phone, Number
- Single Choice, Multiple Choice, Dropdown, Yes/No, Date

For choice-based inputs, define minimum option requirements, option deletion/reordering behavior, and safeguards when an option is used in a condition.

### 4.2 Conditional questions

Define the creation flow as: choose an eligible source question, choose one of its supported answers, choose a different target question, review rule, save. Define valid source types, target eligibility, rule editing/deletion, duplicate/cycle prevention, and the customer-visible explanation of invalid rules.

Define dependency cleanup precisely: deleting a source/target question removes or invalidates its affected rule before save; deleting a referenced answer requires replacing or deleting the rule. In either case, the customer sees the affected rule and a clear corrective action. Guest answers to hidden questions are not requested or submitted.

**Exit criterion:** Both customer configuration and guest rendering remain predictable for every supported question and a single conditional rule.

## Phase 5 — Guest RSVP and response management

### 5.1 Guest flow

Document public URL entry, event information, dynamically visible questions, submit, confirmation, and all special routes/states:

- Invalid or not-found RSVP URL
- Closed RSVP after deadline or closure
- Server/load failure and retry
- Invalid submitted answers
- Duplicate submission outcome

Specify duplicate-submission behavior explicitly (the recommended MVP policy is one accepted submission per guest identity when an email question is configured; otherwise warn only after a matching server-detected submission). If product policy differs, record the approved alternative before handoff.

### 5.2 Dashboard and responses

Define the post-login dashboard: event list/card contents, status, response count, create action, open/edit, preview, public-link, and responses actions. Include first-use empty state.

Define response list and detail contracts that render answers dynamically rather than assuming fields. Include loading, empty, error, unauthorized, and not-found cases, plus how attendance is displayed when a relevant attendance question exists.

**Exit criterion:** A guest can finish without an account and an event owner can locate and interpret each submitted response, while other customers cannot enter the journey.

## Phase 6 — Cross-cutting states and responsive behavior

Add two reference sections to the canonical specification:

1. **State matrix:** Apply loading, empty, error, success, validation, disabled, not found, unauthorized, and closed states to each major screen. For every entry state the trigger, content/message intent, allowed action, and recovery destination.
2. **Mobile behavior matrix:** Cover public navigation, template cards, all forms, question builder, choice options, conditional logic, preview mode, publish result, guest RSVP, dashboard, and response list/detail. State layout/interaction changes, touch-safe controls, horizontal overflow rules, and how essential actions remain available.

**Exit criterion:** No major screen depends on an implementer inventing a failure, unavailable, or mobile interaction.

## Phase 7 — Produce role handoffs

### Lara UI handoff

For every screen, include: screen name, user/purpose, required layout regions, component inventory, data/content shown, primary and secondary CTAs, navigation destinations, interaction rules, state variants, and mobile behavior. Reference UX-spec sections for shared rules rather than duplicating inconsistent text.

### Marie backend handoff

For every flow, include: data collected, persisted data, retrieved data, client/server validation responsibilities, public versus private fields, authentication/ownership permissions, success result, failure result, and the conditions requiring structured errors. Explicitly cover templates, drafts, questions/options/order, condition dependencies, publish validation, guest submission, duplicate handling, and dynamic response retrieval.

**Exit criterion:** Lara can build every UI state and Marie can expose every required outcome without deciding product policy.

## Review and sign-off sequence

1. Verify sitemap and all three visitor entry paths against `SABEL-UX.md`.
2. Walk the critical path as customer, guest, and unauthorized visitor.
3. Check every input has requiredness, validation, error/recovery, and mobile behavior.
4. Check every screen has entry, primary action, back/exit action where applicable, and next destination.
5. Check conditional-rule deletion and publish-invalid paths specifically; these are the highest-risk ambiguous flows.
6. Cross-check the two handoffs against the canonical specification and remove contradictory behavior.
7. Perform a final requirements checklist against all 17 Sabel tasks and the `CORE.md` definition of done.

## Dependency order

| Order | UX output | Unblocks |
|---|---|---|
| 1 | Domain data schema | Dynamic data, ownership, and public/private handoff constraints |
| 2 | Shared rules, sitemap, visitor/template/custom-request flows | Public navigation and acquisition UI/API scope |
| 3 | Creation wizard and event details | Draft/event UI and data contracts |
| 4 | Questions and conditional logic | Dynamic builder and RSVP engine |
| 5 | Preview, publish, guest flow | End-to-end critical path |
| 6 | Dashboard, responses, state/mobile matrices | Management UI and edge-case completion |
| 7 | Lara and Marie handoffs | Implementation work |

## Definition of complete

The UX package is complete only when the domain schema, all 15 required UX outputs, and both required handoffs are present; every major user action has a result and recovery behavior; each relevant screen documents mobile behavior and states; and the end-to-end critical path can be followed without an implementation owner making a product decision.
