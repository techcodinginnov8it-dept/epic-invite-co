# Epic Invite Co. UX Specification

## Document status

This is the canonical UX specification. Phase 1 is complete below; later phases will add the sitemap, individual journeys, screen contracts, states, mobile matrix, and role handoffs described in `SABEL-IMPLEMENTATION-PLAN.md`.

## 1. Shared UX conventions

### 1.1 Users and access boundaries

| User | Starts from | Can do | Cannot do |
|---|---|---|---|
| Visitor | Public website | Browse public content and templates; start an RSVP; send a Custom RSVP request; log in or register. | View a customer dashboard, drafts, private event data, or responses. |
| Customer | Authenticated customer area | Create, edit, preview, publish, share, and review only their own events and responses. | Access another customer's records or alter the original template. |
| Guest | A published public RSVP URL | Read guest-safe event information and submit one RSVP without an account. | Access customer information, drafts, dashboard, response records, or another guest's response. |

Protected customer destinations redirect an unauthenticated visitor to Login. After successful authentication, return the person to their intended destination when it is safe and belongs to their account; otherwise send them to Dashboard. A customer attempting to access another customer's private URL sees an Unauthorized state and is not told whether the target exists.

### 1.2 Zone and route conventions

The product has three distinct zones. Navigation must not make guests or visitors appear to be inside the customer workspace.

| Zone | Route convention | Persistent navigation | Primary exit |
|---|---|---|---|
| Public | Public marketing routes, templates, Custom RSVP, Login | Public-site navigation and account entry | Start a customer flow, submit a custom request, or remain browsing. |
| Customer | Authenticated dashboard, event, builder, preview, publish, responses, account routes | Customer workspace navigation with Dashboard as the stable home | Dashboard, account actions, or public RSVP link. |
| Guest | Unique published RSVP URL and its confirmation/closed/invalid outcomes | No customer navigation; only event/RSVP context | Submission confirmation or an invalid/closed explanation. |

Back returns to the immediately preceding valid product screen, preserving entered data and the selected template where applicable. It never sends a guest into customer routes. Browser Back must remain safe: it cannot discard a successfully submitted guest response or undo a completed publish action.

### 1.3 Draft, save, and publish model

1. Starting Create RSVP immediately creates a customer-owned draft event and RSVP configuration after the minimum required information for that start action is accepted.
2. Each successful Continue, question change, rule change, or explicit Save action saves the current valid change to the draft. The interface confirms completion with a non-blocking saved status.
3. A user may leave and resume a draft from Dashboard. A draft is never visible at a public RSVP URL.
4. If a save fails, keep the entered values on screen, show that the change was not saved, and provide Retry. The user may navigate away only after an explicit leave-with-unsaved-changes decision.
5. Preview reads the latest saved draft configuration. It does not publish, generate a public URL, or create a guest response.
6. Publish runs validation against the complete saved event and RSVP configuration. It changes the RSVP to Published only after validation succeeds.
7. Publishing makes a unique public URL available. Later edits are saved as draft changes while guests continue to see the last published version; the customer must publish again to apply them to the same public URL.

### 1.4 Creation-wizard conventions

The customer workflow order is Event Details, Template Selection, Configure RSVP, Preview, then Publish.

- The active step and the total sequence are always visible to the customer.
- Completed earlier steps are reachable from the wizard step navigation unless the current screen has an unsaved invalid edit; in that case, resolve the edit first.
- Continue validates only the current step's required inputs, saves it, then moves forward one step.
- Back never deletes a draft or clears saved choices. From the first step, Back returns to the customer Dashboard after a leave-with-unsaved-changes check when needed.
- The primary action is the one forward action for the current state. Secondary actions are limited to Back, Save for later, or Cancel/leave where relevant.
- A loading action disables only controls that would duplicate or conflict with the same action. It must retain the user-visible step and entered values.
- Any failed save or validation keeps the customer in context, identifies the problem, and offers a direct route to correct it.

### 1.5 Form and validation conventions

All forms use these rules unless an individual screen states a stricter requirement:

1. Required fields are visibly marked and identified in accessible text; optional fields are labelled Optional.
2. Do not show an error while a person is initially typing. Validate a field after it loses focus, after an attempted Continue/Submit, or when a dependent field makes it invalid.
3. On an attempted Continue/Submit with errors, show an error summary at the top of the form and an inline message next to each invalid field. Move focus to the summary; each summary item moves focus to its field.
4. Error messages explain the correction needed in plain language. Server errors do not discard valid entered data or expose technical internals.
5. Primary submission actions remain available until activated. Once activated, they display progress and prevent duplicate requests until the result is known.
6. Correcting an invalid value clears its inline error when it becomes valid. The summary updates on the next validation pass.
7. Date, email, phone, number, choice, and conditional-answer validation is checked again by the server. Client validation improves guidance but never authorizes a result.
8. When an action is unavailable, the control is disabled only when its prerequisite is visible and its reason is explained. Otherwise use an enabled action that returns the actionable validation guidance.

### 1.6 Public RSVP conventions

- A guest RSVP is available only through a valid, published, open public URL. It requires no account, login, or customer navigation.
- The guest sees only event information intentionally designated as public plus the current published RSVP questions, options, and applicable conditional questions.
- A hidden conditional question is not required, not validated, and not submitted. If a changed answer hides a previously completed question, its client-side answer is removed before submission.
- Submitting a guest RSVP is a final action. The confirmation state confirms receipt but never reveals other responses or customer-only operations.
- Invalid URLs, unpublished RSVPs, and unavailable public records resolve to Invalid RSVP. Expired deadlines or intentionally closed RSVPs resolve to Closed RSVP. Both states provide a concise explanation without exposing private event data.

### 1.7 MVP product constraints

- One dynamic RSVP system supports every event type; no event type creates a separate flow or fixed question model.
- Supported questions are limited to Short Text, Long Text, Email, Phone, Number, Single Choice, Multiple Choice, Dropdown, Yes/No, and Date.
- Conditional logic supports exactly one rule form: `WHEN Question A = Answer, SHOW Question B`. It does not support AND, OR, nested groups, or arbitrary expressions.
- A template is an immutable source. Selecting it creates an independent, customer-editable RSVP configuration.
- Ownership, public/private visibility, publish validation, and response permissions are server-enforced; interface state is never the security boundary.

## Phase 1 acceptance checklist

- [x] Visitor, customer, and guest access is defined.
- [x] Public, customer, and guest zones have navigation and exit rules.
- [x] Draft, save, preview, and publish behavior is defined.
- [x] The creation wizard has forward, back, loading, and error conventions.
- [x] Form validation and disabled-control behavior is defined.
- [x] Guest-safe public RSVP behavior is defined.
- [x] MVP constraints prevent unsupported product-flow expansion.

## 2. Information architecture and visitor acquisition

### 2.1 Sitemap

Route names below are UX route conventions, not a technology decision. A dynamic identifier is represented by a value in braces.

#### Public

| Destination | Route convention | Purpose | Primary exits |
|---|---|---|
| Home | `/` | Explain Epic Invite Co. and offer the three primary visitor paths. | Templates, Create RSVP, Custom RSVP Request. |
| About | `/about` | Explain the company and service context. | Services, Templates, Contact. |
| Services | `/services` | Explain the available RSVP services. | Templates, Create RSVP, Custom RSVP Request. |
| Templates | `/templates` | Browse, search, and filter reusable RSVP starting points. | Template Preview, Login/Register to use a template, Custom RSVP Request. |
| Template Preview | `/templates/{template-slug}` | Inspect one template before selecting it. | Templates, Login/Register to use template, Custom RSVP Request. |
| How It Works | `/how-it-works` | Explain the customer and guest RSVP process. | Create RSVP, Templates, Custom RSVP Request. |
| Portfolio / Examples | `/portfolio` | Show approved examples of RSVP outcomes. | Templates, Custom RSVP Request, Contact. |
| Contact | `/contact` | Provide the approved contact path. | Custom RSVP Request or other public navigation. |
| Custom RSVP Request | `/custom-rsvp` | Collect a request for a bespoke RSVP. | Request Confirmation, public navigation. |
| Custom RSVP Request Confirmation | `/custom-rsvp/confirmation` | Confirm a successfully submitted custom request. | Templates, Home. |
| Login | `/login` | Authenticate an existing customer. | Intended customer destination or Dashboard. |
| Register | `/register` | Create a customer account when required to begin a customer flow. | Intended customer destination or Dashboard. |

#### Customer

| Destination | Route convention | Purpose | Primary exits |
|---|---|---|---|
| Dashboard | `/dashboard` | List owned events and their status/response counts. | Create RSVP, Event Details, Preview, Public RSVP, Responses, Account. |
| Events | `/events` | Dedicated full event list when it is reached from Dashboard navigation. | Create RSVP, Event Details. |
| Create RSVP | `/events/new` | Start a customer-owned draft RSVP. | Event Details or Dashboard. |
| Event Details | `/events/{event-id}/edit/details` | Create or edit event metadata. | Template Selection, Dashboard. |
| Template Selection | `/events/{event-id}/edit/template` | Select or change the draft's template copy. | RSVP Questions, Event Details. |
| RSVP Questions | `/events/{event-id}/edit/questions` | Add, edit, order, and remove dynamic RSVP questions. | Conditional Logic, Preview, Template Selection. |
| Conditional Logic | `/events/{event-id}/edit/conditions` | Manage single-condition question visibility rules. | RSVP Questions, Preview. |
| Preview | `/events/{event-id}/preview` | Safely simulate the current guest-facing RSVP. | Relevant edit step, Publish. |
| Publish | `/events/{event-id}/publish` | Validate, publish or republish, and show the public link. | Relevant edit step, Public RSVP, Dashboard. |
| Event Details / overview | `/events/{event-id}` | Provide event-specific actions and status after creation. | Edit, Preview, Publish, Responses, Dashboard. |
| Responses | `/events/{event-id}/responses` | List submitted responses for the owned event. | Response Detail, Event overview. |
| Response Detail | `/events/{event-id}/responses/{response-id}` | Show one dynamic response. | Responses, Event overview. |
| Account | `/account` | Manage customer account information and account actions. | Dashboard. |

All customer routes require authentication and ownership of `{event-id}` or `{response-id}`. Non-owned records resolve to Unauthorized; malformed or absent owned records resolve to Not Found.

#### Guest

| Destination | Route convention | Purpose | Primary exits |
|---|---|---|---|
| Public RSVP | `/r/{public-id}` | Show a valid, open published RSVP and its guest form. | Confirmation after submission. |
| RSVP Form | `/r/{public-id}` | The form region or form-focused continuation of Public RSVP; it uses the same public URL. | Confirmation after submission. |
| Confirmation | `/r/{public-id}/confirmation` | Confirm a successful guest submission. | No further RSVP action. |
| Invalid RSVP | `/r/{public-id}/invalid` or equivalent resolved state | Explain that the link cannot be used without exposing private information. | Home when public-site navigation is appropriate. |
| Closed RSVP | `/r/{public-id}/closed` or equivalent resolved state | Explain that the RSVP is no longer accepting submissions. | Home when public-site navigation is appropriate. |

### 2.2 First-visit journey

The Home page has three equally available primary actions. A visitor may also use public navigation without committing to one.

| Option | Starting page and goal | Primary CTA | Next screen and authentication | Information required | Completion | Error / recovery |
|---|---|---|---|---|---|---|
| Browse Templates | Home; find an RSVP starting point before creating an event. | `Browse Templates` | Templates; no account required to browse or preview. `Use Template` requires Login or Register, then resumes the selected template. | Search/filter choices only; none required. | The selected template is retained while the customer completes Event Details, then becomes the draft's private editable copy when Template Selection is saved. | Catalogue failure offers Retry; no-results state offers Clear filters; an unsuitable template offers Custom RSVP Request. |
| Create an RSVP | Home; start a custom RSVP without first browsing. | `Create an RSVP` | Login/Register if unauthenticated, then Create RSVP and Event Details. Authenticated customers go directly to Create RSVP. | Account credentials if needed, then event details. | Customer has a saved event draft and proceeds through the creation wizard to publish. | Authentication failure remains on the auth screen with an actionable error; draft-save failure retains entered details and offers Retry. |
| Request a Custom RSVP | Home; request assistance for a bespoke RSVP. | `Request a Custom RSVP` | Custom RSVP Request; no account required. | The required request-form fields in section 2.4. | Confirmation identifies that the request was received and gives the next expected contact step. | Inline field errors prevent submission; service failure retains all entries and offers Retry. |

If a visitor chooses Create an RSVP or Use Template while already authenticated, bypass Login/Register. If they authenticate after choosing a template, return them to the selected template's use flow rather than Dashboard.

### 2.3 Template journey

#### Browse templates

The Templates page starts with all currently available templates. It provides a search field and filters without requiring an account.

| Element | Behavior |
|---|---|
| Search | Searches template name and short description after the visitor enters text. Search is case-insensitive. Clearing it restores the currently filtered result set. |
| Event-type filter | Offers `All`, `Wedding`, `Birthday`, `Corporate`, and `Other`. It filters the catalogue but does not change the event type selected later in Event Details. |
| Sort | Offers `Recommended` by default and `Name A-Z`. Sorting applies after search and filtering. |
| Active filters | Remain visible and can be removed individually or together with `Clear filters`. They persist when opening a preview and returning to results. |
| Template card | Shows a preview image, template name, event-type category, a concise approved description, and `Preview` / `Use Template` actions. Artwork itself is not specified by UX. |
| Loading | Show non-interactive card placeholders while the catalogue loads. |
| Empty catalogue | Explain that templates are currently unavailable; offer Retry and Custom RSVP Request. |
| No results | Explain that no available template matches the current search/filters; offer Clear filters and Custom RSVP Request. |
| Load error | Preserve search/filter selections, explain the catalogue could not load, and offer Retry. |

#### Preview a template

Selecting `Preview` opens Template Preview. The preview displays the template's name, category, preview artwork, approved short description, and a representative guest-facing layout/content sample. It does not expose customer drafts or real guest responses.

- `Use Template` begins the selected-template creation path. An unauthenticated visitor first sees Login/Register and then resumes this action; an authenticated customer continues to a new draft's Event Details screen with the selection retained.
- `Back to Templates` returns to the exact prior result set, retaining search, filter, sort, and scroll context where the platform can do so safely.
- `Browse another template` has the same return behavior as Back to Templates.
- `Request a Custom RSVP` opens the Custom RSVP Request form and may prefill the description with the selected template name only after the visitor can review and edit it.
- If preview data fails to load, show an error with Retry and Back to Templates. A missing/unavailable template shows a not-found message and Back to Templates; it cannot be used.

#### Use-template result

Using a template retains that selection while the customer completes Event Details. The subsequent Template Selection step shows it as selected; on a successful continuation, it creates the new customer-owned RSVP configuration copied from the source template. The source template is never changed, and the selection can be changed before publish. Leaving the draft follows the shared save/leave rules in section 1.3.

### 2.4 Custom RSVP request journey

#### Flow

`Custom RSVP Request -> complete requirements form -> Submit Request -> Request Confirmation`

The page explains that this is a request for the Epic Invite Co. team, not an instant self-service RSVP builder and not a guest RSVP. It contains one form and one primary `Submit Request` action. `Back to Templates` is available if the visitor arrived from a template; otherwise `Back to Home` is the secondary action.

#### Field contract

| Field | Input and requiredness | Validation | Exact error message | Mobile behavior |
|---|---|---|---|---|
| Name | Single-line text; required. | Trimmed value must contain at least 2 non-space characters. | `Enter your name.` | Full-width field; name-appropriate keyboard/autofill. |
| Email | Email input; required. | Trimmed value must match a valid email format. | `Enter a valid email address.` | Full-width email field; email keyboard and autofill. |
| Event type | Select with Wedding, Birthday, Corporate, Other; required. Selecting Other reveals an additional required text field labelled `Event type`. | A listed value is required. For Other, the detail has at least 2 non-space characters. | `Select an event type.` / `Describe the event type.` | Native/select-friendly control; revealed detail appears directly after the select. |
| Event date | Date input; required. | Must be today or later in the visitor's local date. | `Enter an event date that is today or later.` | Native date picker where available; typed date remains supported. |
| Location | Single-line text; required. | Trimmed value must contain at least 2 non-space characters. | `Enter the event location.` | Full-width field; no map or address lookup is required. |
| Guest count | Numeric whole-number input; required. | Integer from 1 to 100000. | `Enter a guest count between 1 and 100000.` | Numeric keypad; never use small increment/decrement controls as the only entry method. |
| Description of needs | Multi-line text; required. | Trimmed value must contain at least 20 characters. | `Tell us a little more about what you need (at least 20 characters).` | Full-width textarea with a usable minimum height; no character counter is required until a limit is introduced. |

All fields follow the form conventions in section 1.5. The form does not require customer authentication and does not ask for payment, guest answers, or an RSVP URL.

#### Submission, errors, and success

1. `Submit Request` validates all fields. With errors, show the standard summary and inline messages; do not send a request.
2. With valid input, disable repeat submission, display `Sending request...`, and retain the entries until the result is known.
3. On a retryable server or network failure, show `We could not send your request. Your details are still here - please try again.` and a `Try again` action.
4. On success, show Request Confirmation with `Thanks - we received your Custom RSVP request.` Include the submitted event type and date as a confirmation summary, state that the team will respond using the submitted email, and offer `Browse Templates` and `Back to Home`.
5. The confirmation never promises a delivery date, price, or service capability not otherwise approved.

## Phase 2 acceptance checklist

- [x] All required public, customer, and guest sitemap destinations are defined.
- [x] Each Home-page primary path has a start, CTA, auth boundary, completion, and recovery behavior.
- [x] Template browse, preview, selection persistence, no-results, and Custom RSVP escape paths are defined.
- [x] Custom RSVP fields have requiredness, validation, exact errors, mobile behavior, and success/failure states.

## 3. Customer RSVP creation and publishing

### 3.1 Wizard overview

The authenticated customer creation sequence is fixed:

`Event Details -> Template Selection -> Configure RSVP -> Preview -> Publish`

The customer sees this ordered sequence throughout the workflow. `Configure RSVP` includes Questions and Conditional Logic as named subsections; it is one creation step rather than an alternative route. The event remains a private draft until Publish succeeds.

| Step | Purpose | Primary CTA | Secondary CTA | Valid next destination |
|---|---|---|---|---|
| Event Details | Establish the event guests will be invited to. | `Continue to Template` | `Save for later`, `Back to Dashboard` | Template Selection. |
| Template Selection | Choose a reusable starting point or start with a blank configuration. | `Continue to Configure` | `Back to Event Details`, `Save for later` | Configure RSVP. |
| Configure RSVP | Define questions, options, order, requiredness, and conditional rules. | `Preview RSVP` | `Back to Template`, `Save for later` | Preview. |
| Preview | Test the saved guest experience without creating a response. | `Continue to Publish` | `Edit RSVP` | Publish. |
| Publish | Resolve all publish blockers and make/revise the public version. | `Publish RSVP` or `Republish RSVP` | `Back to Preview`, `Save for later` | Publish Success or the relevant correction step. |

`Save for later` saves any valid current changes, shows `Draft saved.`, and returns to Dashboard. If the current change is invalid or the save fails, retain the user in context and follow section 1.3. A customer may select a completed prior step from the step navigation; selecting a future step is allowed only after every prior step has saved successfully.

### 3.2 Event Details

#### Screen contract

| Aspect | Definition |
|---|---|
| Purpose | Collect the event metadata used in the customer workspace and the guest RSVP. |
| Information displayed | Wizard step, draft status, field labels/help text, and the selected template only when returning to this step after selection. |
| User input | Event name, event type, date, time, location, description, and RSVP deadline. |
| Primary CTA | `Continue to Template`; validates and saves the step, then opens Template Selection. |
| Secondary CTA | `Save for later` saves and returns to Dashboard. `Back to Dashboard` checks for unsaved changes before leaving. |
| Back behavior | There is no prior wizard step. Back returns to Dashboard only after the unsaved-changes rule is satisfied. |
| Save behavior | A valid Continue or Save for later persists the full event-detail draft. Returning to the screen restores saved values. |
| Loading behavior | During save, retain all entries, show saving progress, and disable duplicate save/continue actions. |
| Error behavior | Field errors remain inline; a save failure retains all entered values and presents Retry. |
| Success behavior | Continue advances to Template Selection. Save for later returns to Dashboard with a draft status. |
| Mobile behavior | Fields are one column in the stated order. Date/time inputs use suitable native controls when available; the action area remains reachable after long descriptions. |

#### Field contract

| Field | Requiredness and input | Validation | Exact error message |
|---|---|---|---|
| Event name | Required single-line text. | Trimmed value is 2-120 characters. | `Enter an event name between 2 and 120 characters.` |
| Event type | Required select: Wedding, Birthday, Corporate, Other. Other reveals required `Event type` text. | A listed value is selected; Other detail is 2-60 trimmed characters. | `Select an event type.` / `Describe the event type.` |
| Event date | Required date. | Today or a future local date. | `Enter an event date that is today or later.` |
| Event time | Optional time. | When supplied, it is a valid local time. | `Enter a valid event time.` |
| Location | Optional single-line text. | When supplied, it is 2-160 trimmed characters. | `Enter a location between 2 and 160 characters.` |
| Description | Optional multi-line text. | When supplied, it is at most 2,000 characters. | `Keep the description to 2,000 characters or fewer.` |
| RSVP deadline | Required date. | Today or a future local date and not after the event date. | `Enter an RSVP deadline that is today or later and on or before the event date.` |

The event date, time, location, and description are the guest-visible event details once published. The RSVP deadline controls the Closed RSVP state; a customer must edit and republish it to change what public guests receive. The customer is warned immediately if changing the event date would make a saved deadline invalid.

#### Continue, Back, and save failure

On `Continue to Template`, validate all fields in the table. If a prerequisite is absent or invalid, remain on Event Details, move focus to the standard error summary, and do not create a partial next step. If validation succeeds but saving fails, remain on the screen with `We could not save your event details. Your changes are still here - try again.` and a `Try again` action. If a save succeeds, the customer advances exactly once.

### 3.3 Template Selection

#### Screen contract

| Aspect | Definition |
|---|---|
| Purpose | Choose the draft's starting RSVP configuration without changing the source template. |
| Information displayed | Wizard step, current event name/type, selected-template state, search/filter/sort controls, template cards, and blank-start option. |
| User input | One template selection, or an explicit choice to start blank. Search/filter/sort changes affect only what is shown. |
| Primary CTA | `Continue to Configure`, enabled after a template or Start Blank is selected. |
| Secondary CTA | `Back to Event Details` and `Save for later`. |
| Back behavior | Returns to Event Details without clearing a saved template choice. |
| Save behavior | A selection is saved to the draft only when Continue or Save for later is successful. Switching selections replaces the draft copy before configuration begins; it does not alter a source template. |
| Error behavior | Catalogue errors preserve selection/search/filter state and offer Retry. A failed selection save retains the selected item and offers Retry. |
| Loading behavior | Show template-card placeholders while loading; prevent Continue until the selected source is confirmed. |
| Success behavior | Continue saves the selected copied configuration, or blank configuration, and opens Configure RSVP. |
| Mobile behavior | Cards remain one per row. Search/filters appear above results; selection and Continue remain visible without relying on hover. |

`Start Blank` is presented alongside templates as an explicit configuration choice, not as a template card. It creates an empty customer-owned RSVP configuration. If the customer changes templates after adding questions or rules, show a confirmation: `Changing the template will replace your current questions and rules. Continue?` The actions are `Change template` and `Keep current setup`; no data is replaced until the customer confirms.

### 3.4 Configure RSVP

#### Screen contract

| Aspect | Definition |
|---|---|
| Purpose | Build the guest form for the current draft. |
| Information displayed | Wizard step, event name, selected template or Blank setup, save status, question list/order, Questions subsection, Conditional Logic subsection, and Preview readiness guidance. |
| User input | Question creation/editing, type-specific settings, choices, requiredness, order, and single-condition visibility rules. Detailed behavior is defined in Phase 4. |
| Primary CTA | `Preview RSVP`; saves valid changes and opens Preview. |
| Secondary CTA | `Back to Template`, `Save for later`, and in-context navigation between Questions and Conditional Logic. |
| Back behavior | Returns to Template Selection. If changing template would overwrite saved configuration, use the confirmation in section 3.3. |
| Save behavior | Each completed question/rule action saves its valid change. `Save for later` returns to Dashboard. |
| Error behavior | Invalid question or rule edits stay open/in context with correction guidance. Save failures retain the working edit and offer Retry. |
| Loading behavior | Saving one item prevents duplicate changes to that item but does not erase the list. Loading an existing configuration shows builder placeholders. |
| Success behavior | Preview displays the latest saved draft. The customer may preview an incomplete draft but cannot publish it until all publish requirements are met. |
| Mobile behavior | Questions are shown in a vertical list; editing uses a focused full-width panel/sheet. Reordering uses explicit Move up/Move down controls in addition to any supported touch drag gesture. |

The empty configuration explains `Add your first RSVP question to start collecting responses.` and provides `Add question`. It may be previewed to inspect event information, but publish validation will report that at least one guest question is required.

### 3.5 Preview RSVP

#### Screen contract

| Aspect | Definition |
|---|---|
| Purpose | Let the customer test the latest saved guest-facing RSVP before publishing. |
| Information displayed | Guest-safe event details, selected template treatment, visible questions and options, required markers, a device mode selector, preview-only notice, and current draft save status. |
| User input | Preview-only answers used to test form validation and conditional visibility. They are discarded when the preview is closed or reset. |
| Primary CTA | `Continue to Publish`. |
| Secondary CTA | `Edit RSVP`, which returns to Configure RSVP; `Back` returns to Configure RSVP. |
| Edit behavior | `Edit RSVP` returns to the relevant Questions or Conditional Logic subsection when opened through an inline preview warning; otherwise it returns to Questions. |
| Loading behavior | Show a preview loading shell while saved event/configuration data is retrieved. The action buttons appear only after the preview is ready. |
| Error behavior | If preview cannot load, preserve the draft, explain the failure, and offer Retry or Edit RSVP. Preview errors never create a guest response. |
| Success behavior | The customer can test shown/hidden questions and required-field feedback, then continue to Publish. |
| Mobile behavior | Device modes include Desktop and Mobile. On small screens, Mobile is selected by default and the preview fills the available width; Desktop remains available in a horizontally contained frame, never requiring the page itself to horizontally scroll. |

Preview uses the same question ordering, required rules, input validation guidance, and conditional visibility logic as a guest RSVP. A preview submission is a simulation: it may show validation feedback and a local `Preview complete` acknowledgement, but it never saves a response, changes response count, sends an email, or redirects to guest confirmation. Resetting the preview clears all simulated answers.

### 3.6 Publish and republish

#### Screen contract

| Aspect | Definition |
|---|---|
| Purpose | Confirm publication readiness, publish an eligible draft, and provide the usable public RSVP URL. |
| Information displayed | Event name, current status, last-published information when applicable, readiness status, publish-problem list when invalid, and public URL only after a successful first publish. |
| Primary CTA | `Publish RSVP` for a draft, or `Republish RSVP` when saved edits exist after an earlier publish. |
| Secondary CTA | `Back to Preview`, `Save for later`, plus direct `Fix` links for each blocker. |
| Back behavior | Returns to Preview without changing publication state. |
| Loading behavior | Display `Publishing RSVP...`, disable duplicate publishing actions, and keep the current page visible until a result is returned. |
| Error behavior | Preserve the saved draft. For validation failures, show the structured problems and relevant Fix links. For a service failure, show Retry without treating the event as published. |
| Success behavior | Show Publish Success with the public URL, `Copy link`, `Open RSVP`, `View responses`, and `Back to Dashboard`. |
| Mobile behavior | Problem list appears above the primary CTA. URL actions stack vertically; Copy link remains a separately reachable action. |

#### Publish preflight

Before enabling a successful publish result, validate the saved event and RSVP configuration. At minimum, the system must confirm:

1. Event Details meet section 3.2 requirements.
2. A template copy or blank RSVP configuration exists for the event.
3. At least one active guest question exists.
4. Every active question has a supported type, a non-empty prompt, and a valid required setting.
5. Every active choice question has at least two active, non-empty options.
6. Every conditional rule has a valid source question, triggering answer, and distinct target question in the same configuration; it has no duplicate or cyclic dependency.
7. The event is owned by the current customer and no server-side publication rule has failed.

If any check fails, keep the RSVP unpublished (or retain the prior published version during republish), show `Your RSVP needs a few fixes before it can be published.`, and list each issue with a `Fix` action leading to Event Details, Template Selection, Questions, or Conditional Logic. On arrival, the relevant field/question/rule is focused and identified. The customer returns to Publish after saving a correction; validation runs again.

#### Publish Success

First publication creates one stable unique public URL. Republish updates the public content at that same URL; it does not create a second share link. The success screen includes:

- `Your RSVP is published.` or `Your RSVP updates are published.`
- The event name and current published status.
- The full public RSVP URL in a selectable field.
- `Copy link`, with a visible `Link copied.` result.
- `Open RSVP`, opening the guest experience in a separate browsing context.
- `View responses` and `Back to Dashboard`.

If copying is unavailable, the URL remains selectable and the interface says `Select and copy the link manually.` If publication cannot be confirmed because of a service failure, do not show a new success state or claim the public version changed; show `We could not publish your RSVP. Please try again.` and retain Retry.

## Phase 3 acceptance checklist

- [x] The complete wizard order, step navigation, saving, loading, and exit behavior are defined.
- [x] Event Details has field requiredness, validation, exact errors, and public/closed-date rules.
- [x] Template selection supports copied templates, blank setup, replacement confirmation, and mobile/error states.
- [x] Configure RSVP, safe preview, and no-response simulation behavior are defined.
- [x] Publish validation, error correction, first publish, and republish-to-the-same-link behavior are defined.

## 4. Dynamic question builder and conditional logic

### 4.1 Question builder: shared behavior

The Questions subsection is the source of truth for a draft RSVP's dynamic guest questions. It shows questions in guest display order, their type, required state, conditional-state indicator where applicable, and actions that operate on that individual question.

#### Add and edit a question

1. `Add question` opens a focused question editor with a required `Question type` selection and required `Question` prompt.
2. Selecting a type immediately shows only its relevant configuration fields. Changing the type before saving clears incompatible type-specific settings and asks for confirmation if it would discard entered options or constraints.
3. `Save question` validates the editor, adds the question to the end of the list, and saves it. `Cancel` closes a new editor without adding a question; an edited saved question uses the unsaved-changes rule before closing.
4. `Edit` reopens the question with its current values. Saving preserves its position and any valid dependent rule.
5. Every question type shares these configurable fields: question prompt (2-240 trimmed characters), optional help text (up to 500 characters), and Required toggle. The prompt error is `Enter a question between 2 and 240 characters.` The help-text error is `Keep the help text to 500 characters or fewer.`
6. Required applies when the question is visible to the guest. It does not make a conditionally hidden question required.

#### Question actions

| Action | Behavior |
|---|---|
| Add | Opens the new-question editor. The empty builder's `Add question` is the primary action. |
| Edit | Opens the selected question editor. Changing a question that affects a condition identifies the affected rule before saving. |
| Delete | Opens confirmation with the prompt and any affected conditional rules. Confirming deletes the question and all rules that reference it; `Cancel` leaves everything unchanged. A question with saved guest responses cannot be deleted from the historic published version; removal affects only a future draft/republication. |
| Duplicate | Creates a new editable copy directly after the original, labelled `Copy of {original prompt}`. The copy is optional by default, has no conditional rules, and must be saved as a valid question before it is added. |
| Reorder | Desktop supports drag/reorder controls. Every viewport provides `Move up` and `Move down`; first/last items disable only the unavailable direction. Reordering does not change answers or rules. |
| Required toggle | Saves the new required state after confirmation of any invalid dependent edit. It is available for every supported type. |
| Options | Choice types expose option add/edit/delete/reorder inside their question editor. Non-choice types do not show option controls. |

An unsaved question editor never changes the guest preview. A saved edit is immediately available to Preview, but a published RSVP continues serving its previously published version until Republish.

#### Attendance designation

A customer may designate one Yes/No question as the RSVP's `Attendance question`. This is optional and is not shown differently to guests. When designated, `Yes` is counted as Attending and `No` as Declined in the customer dashboard and response list. Only one question may hold this designation; selecting another moves it after confirmation. Deleting, changing the type of, or removing the designation from this question removes the attendance summary from future drafts and republishes only after the customer confirms the change. No attendance count is inferred from question wording or another question type.

#### Question type matrix

| Type | Customer configuration | Guest experience | Required behavior | Valid answer | Guest error | Mobile behavior |
|---|---|---|---|---|---|---|
| Short Text | Shared fields; optional maximum character limit from 1-250. | One-line text field. | A visible empty value is invalid when required. | Text no longer than the configured limit, if any. | `Enter an answer.` or `Keep your answer to {limit} characters or fewer.` | Full-width input; text keyboard; no horizontal clipping. |
| Long Text | Shared fields; optional maximum character limit from 1-2,000. | Multi-line text area. | A visible empty value is invalid when required. | Text no longer than the configured limit, if any. | `Enter an answer.` or `Keep your answer to {limit} characters or fewer.` | Full-width textarea with a comfortable minimum height; it expands within the page rather than creating nested scrolling. |
| Email | Shared fields only. | Email input. | A visible empty value is invalid when required. | Valid email format. | `Enter an email address.` or `Enter a valid email address.` | Email keyboard and autofill support. |
| Phone | Shared fields; optional example/help text for expected local format. | Telephone input. | A visible empty value is invalid when required. | 7-20 digits after spaces, parentheses, hyphens, and a leading `+` are normalized. | `Enter a phone number.` or `Enter a valid phone number.` | Telephone keypad; do not require a country picker in MVP. |
| Number | Shared fields; optional minimum and/or maximum whole-number value. | Numeric input. | A visible empty value is invalid when required. | A whole number within configured bounds, if any. | `Enter a number.` / `Enter a whole number.` / `Enter a number from {minimum} to {maximum}.` | Numeric keypad; typed entry is supported in addition to any browser controls. |
| Single Choice | Shared fields; at least two non-empty, unique options; option order. | Radio group; one answer can be selected. | No selected option is invalid when required. | Exactly one currently active option. | `Select one option.` | Options stack vertically with full-row tap targets. |
| Multiple Choice | Shared fields; at least two non-empty, unique options; option order. | Checkbox group; zero or more answers can be selected. | No selected option is invalid when required. | One or more currently active options when required; otherwise any subset. | `Select at least one option.` | Options stack vertically with full-row tap targets; selections remain visible. |
| Dropdown | Shared fields; at least two non-empty, unique options; option order. | Select control with an unselected placeholder `Select an option`. | Placeholder/no selected option is invalid when required. | Exactly one currently active option. | `Select an option.` | Native/select-friendly control; options must not rely on hover. |
| Yes/No | Shared fields only; answer labels are fixed as `Yes` and `No`. | Two mutually exclusive visible choices. | Neither answer selected is invalid when required. | Exactly `Yes` or `No`. | `Select Yes or No.` | Two full-row or equally sized tap targets; selected state is visually clear. |
| Date | Shared fields; optional earliest and/or latest allowed date. | Date input. | A visible empty value is invalid when required. | Valid local date within configured bounds, if any. | `Enter a date.` or `Enter a date from {earliest} to {latest}.` | Native date picker where available, with typed entry support. |

For every type, optional questions accept an empty answer. If an optional question is answered, its format and configured constraints still apply. A choice option label must be 1-120 trimmed characters and unique within its question; its errors are `Enter an option.` and `Each option must be different.` A choice question with fewer than two active options cannot be saved: `Add at least two options.`

#### Option management

- `Add option` adds an empty option row after the final existing option and focuses it.
- `Edit option` validates the label before saving; option values are stored independently from their displayed label so a valid label rename can preserve response history.
- `Delete option` is available only while at least two active options remain. If the option is referenced by a conditional rule, do not delete it immediately; show `This option is used by a conditional rule. Edit or delete that rule first.` with a link to the rule.
- `Move up` and `Move down` reorder options using the same accessible behavior as questions. The choice order shown to guests matches the saved order.

### 4.2 Conditional logic

#### MVP rule model

Each rule has exactly this form:

`WHEN [source question] = [answer] -> SHOW [target question]`

A rule determines whether one target question becomes visible to a guest. It does not change question values, skip pages, hide event information, or perform any other action. There are no AND/OR groups, free-form expressions, multiple conditions for one target, or rules based on text, dates, phone numbers, or numeric comparisons.

Only Single Choice, Dropdown, and Yes/No questions are eligible source questions because they provide one stable exact answer. Any active question other than the source may be a target, subject to the safeguards below. A target may have one rule only. A question already used as a conditional target cannot be used as a source; this prevents rule chains and keeps MVP behavior to one clear condition.

#### Create a rule

1. In the Conditional Logic subsection, `Add conditional rule` opens the rule editor.
2. The customer first chooses a source question from eligible active Single Choice, Dropdown, and Yes/No questions.
3. The Answer control remains unavailable until a source is chosen, then lists that source's current active options or `Yes`/`No` values.
4. The customer chooses one triggering answer.
5. The Target question control lists eligible active questions in the same RSVP configuration, excluding the source and questions that already have a rule or would create a dependency chain.
6. The editor shows a readable rule summary, for example `When Will you attend? is Yes, show Number of guests.`
7. `Save rule` validates the full relationship, saves it, and returns to the rule list. `Cancel` makes no changes.

If no eligible source question exists, the subsection explains `Add a Single Choice, Dropdown, or Yes/No question before creating conditional logic.` with a direct `Add question` action. If there are no eligible targets, it explains why and provides `Back to questions`.

#### Edit and delete a rule

- `Edit` opens the full rule editor with current source, answer, and target values. Saving a change revalidates all three values and updates guest preview behavior immediately for the draft.
- `Delete rule` asks `Delete this conditional rule? The target question will remain in your RSVP and be shown to every guest.` `Delete rule` confirms; `Cancel` preserves it.
- The rule list displays each rule as a readable sentence, the source/target question prompts, and Edit/Delete actions. A list empty state explains that all RSVP questions currently show to every guest and provides `Add conditional rule`.

#### Dependency changes and invalid rules

| Change | Required behavior |
|---|---|
| Delete a source question | The delete confirmation lists each rule that will be deleted. Confirming deletes the question and those rules together. |
| Delete a target question | The delete confirmation lists the rule that will be deleted. Confirming deletes the question and rule together. |
| Change source question type to an ineligible type | Before saving, show the affected rule and require the customer to delete the rule or choose an eligible type. The type change cannot be saved while the rule would be invalid. |
| Delete a referenced source option | Block option deletion and direct the customer to edit or delete its rule first. |
| Rename a referenced source option | Preserve the rule through the option's stable identity and update its readable label in the rule summary. |
| Deactivate/remove a question while keeping history | Treat it as deleting it from the future draft and follow the source/target deletion rule above; historic published responses remain readable. |
| A stale or server-detected invalid relationship | Mark the rule `Needs attention`, explain the invalid reference, prevent publish, and provide `Edit rule` / `Delete rule`. The invalid rule never controls the guest form. |

Server-side validation repeats the same configuration checks. A browser cannot create a cross-event rule, a source-answer mismatch, a same-question source/target rule, a duplicate target rule, or a rule that creates a chain/cycle.

#### Guest behavior for conditions

1. Guests see source questions in normal display order.
2. A target question appears in its configured position only after the saved source answer exactly matches the rule's trigger.
3. Changing the source answer so it no longer matches hides the target immediately, clears its in-progress answer, removes its validation error, and excludes it from submission.
4. A shown target question follows its own type and Required rules. A hidden target is never required or validated.
5. Preview uses this exact behavior with simulated answers; public guest RSVP uses it with server-side revalidation on submission.

## Phase 4 acceptance checklist

- [x] Add, edit, delete, duplicate, reorder, required, save, and empty states are defined for questions.
- [x] Every supported question type has customer configuration, guest behavior, required rules, validation, errors, and mobile treatment.
- [x] Choice option creation, uniqueness, ordering, and conditional-rule protection are defined.
- [x] The customer rule-creation, edit, delete, no-eligible-question, and empty-list flows are defined.
- [x] Deleting questions/options and invalidating rules have explicit cleanup behavior.
- [x] Guest conditional visibility, clearing, validation, and submission behavior are defined without advanced logic.

## 5. Guest RSVP and response management

### 5.1 Guest RSVP journey

#### Public RSVP entry and event information

`Public RSVP URL -> Event information -> RSVP questions -> Submit RSVP -> Confirmation`

Opening a valid public URL first resolves the RSVP's public status. Guests never create or sign into an account.

| Resolved status | Guest outcome |
|---|---|
| Published and open | Show the guest RSVP page and allow submission. |
| Invalid, unpublished, deleted, or unknown public identifier | Show Invalid RSVP. Do not expose event name, customer identity, or whether the URL once existed. |
| Published but past RSVP deadline | Show Closed RSVP. Show only the public event name when it is safe to do so; do not show questions or allow submission. |
| Temporary retrieval failure | Show a server-error state with Retry. Do not treat the RSVP as invalid or closed. |

For an open RSVP, the guest page displays only these published, guest-safe details when they are available: event name, event date, event time, location, description, and RSVP deadline. It then presents questions in their configured order. The page makes the event information readable before the first form control and identifies that fields marked Required must be completed.

The guest page has no dashboard, edit, template, customer account, response count, or management controls. A visible Epic Invite Co. home link is optional public navigation and must not interrupt the form.

#### Completing the RSVP form

1. Load the saved published questions, active options, and valid rules in display order.
2. Render initially visible questions. Conditional targets remain absent until their source answer matches; section 4.2 governs all show/hide behavior.
3. Apply each question type's guest control, required behavior, and inline error from section 4.1.
4. `Submit RSVP` validates every currently visible question. It does not validate hidden condition targets or any unpublished draft changes.
5. With client-valid answers, show `Submitting RSVP...`, prevent a repeat click, and send one submission. The server repeats status, conditional visibility, required, type, option, and duplicate checks.
6. On accepted submission, navigate to Confirmation. The guest cannot use browser Back to resubmit the same completed form; returning to the public URL resolves according to duplicate policy.

All guest form controls are full-width or have touch-safe targets on mobile. The submit action appears after the final currently visible question and remains reachable without a permanently floating control. On an attempted invalid submission, the standard form summary receives focus and lists only currently visible invalid questions.

#### Guest validation and submission outcomes

| Trigger | Guest-facing behavior |
|---|---|
| Missing or invalid visible answer | Stay on the form, show the type-specific inline error and standard error summary. |
| Question changed visibility while completing the form | Hide the target immediately, clear it, remove its error, and exclude it from submission. |
| Closed between page load and submit | Do not save the response. Resolve to Closed RSVP with `This RSVP is now closed and can no longer accept responses.` |
| Published RSVP changed or became unavailable between load and submit | Do not save an answer against stale data. Reload the current guest form with `This RSVP has been updated. Please review it and submit again.` If it is no longer valid/public, resolve to Invalid RSVP. |
| Retryable server/network failure | Keep all entered values and show `We could not submit your RSVP. Your answers are still here - please try again.` |
| Successful submission | Show Confirmation and prevent duplicate submission. |

#### Duplicate submission policy

Duplicate protection is deliberate and server-enforced:

1. If the published RSVP contains an active Email question, its normalized submitted email is the guest identity for this RSVP.
2. A second accepted submission with that identity is not saved. The guest sees `We already received an RSVP for this email address.` and `If you need to change your response, contact the event organizer.` No other response data is shown.
3. A retry of the same in-progress submission caused by a network interruption is idempotent. If the first request was accepted, return the original Confirmation rather than creating a second response.
4. If no active Email question exists, the product cannot reliably identify a returning guest. It prevents duplicate click/retry submissions through idempotency but otherwise accepts a later independently submitted form. It does not falsely claim that the guest has already responded.

#### Confirmation, invalid, closed, and error screens

| Screen | Content and actions |
|---|---|
| Confirmation | Heading `Your RSVP has been received.` Show the public event name and a short thank-you. Do not show answers, guest identity, response ID, edit action, other guests, or customer details. |
| Invalid RSVP | Heading `This RSVP link is not available.` Explain `Check that the link is complete or ask the event organizer for a new one.` Offer public Home only when appropriate. |
| Closed RSVP | Heading `This RSVP is closed.` Explain `The deadline to respond has passed.` Show safe public event name when available; do not show form fields. |
| Server error | Heading `We could not load this RSVP.` Explain it may be temporary and provide `Try again`. Do not reveal internal error details. |
| Duplicate response | Heading `We already received your RSVP.` Use the duplicate policy message above; no resubmission control is offered. |

### 5.2 Customer dashboard journey

#### Dashboard screen contract

Dashboard is the authenticated customer's stable starting point after Login. It lists only events owned by that customer, ordered by most recently updated first.

| Element | Behavior |
|---|---|
| Create RSVP | Persistent primary `Create RSVP` action starts a new draft and opens Event Details. |
| Event record | Shows event name, event type, event date, current status, last updated date, and response count. If an Attendance question exists, also show `Attending` and `Declined` counts. |
| Event status | `Draft`: never published. `Published`: current saved version is public. `Changes not published`: a published event has later saved draft edits. `Closed`: the published event has passed its RSVP deadline. |
| Open event | Selecting an event name/card or `Open event` opens Event Details / overview. |
| Edit RSVP | Opens Event Details for metadata changes; the customer can use the wizard to reach Templates, Questions, or Conditional Logic. |
| Preview | Opens the saved draft preview. |
| Public RSVP | For Published, Changes not published, or Closed events, opens the most recently published guest URL. For Draft, show unavailable text `Publish this RSVP to create a public link.` |
| Responses | Opens the event's response list. The action remains available for all statuses; draft events show the no-responses state. |
| Loading | Show event-record placeholders while records are loading. |
| Error | Preserve any safely loaded records, show `We could not load all of your events. Try again.`, and provide Retry. |

On mobile, event records are vertical cards. Status and response counts appear before secondary actions; actions are visible buttons or an accessible action menu, never hover-only controls. `Create RSVP` remains prominent above the list.

#### Empty dashboard

When the customer owns no events, replace the list with:

- Heading: `Create your first RSVP`
- Explanation: `Set up an event, customize the questions, and share one RSVP link with your guests.`
- Primary action: `Create RSVP`
- Secondary action: `Browse Templates`

The empty state does not show fake events, analytics, response counts, or unapproved promotional claims.

### 5.3 Event overview and response-management journey

`Dashboard -> Event -> Responses -> Response Detail`

The Event overview provides the event's status and the same context-sensitive actions as its Dashboard record: Edit RSVP, Preview, Publish/Republish, Public RSVP where available, and Responses. It is not required to duplicate the full builder; it directs the customer into the appropriate wizard step.

#### Response list

| Aspect | Definition |
|---|---|
| Purpose | Let the event owner find and open submitted guest responses. |
| Header | Event name, response count, attendance summary when an Attendance question is configured, and `Back to Event`. |
| Row content | Submission date/time, answer to the designated Attendance question when available, and a concise identity label. The identity label uses the answer to an Email question when one exists; otherwise it is `Response {sequence number}`. |
| Order | Newest submitted response first. |
| Open action | Selecting a row or `View response` opens Response Detail. |
| Dynamic behavior | The list does not assume a name, email, attendance, or any other fixed question. It uses only configured data that is available. |
| Loading | Show response-row placeholders; do not display a misleading zero count until loading resolves. |
| Empty | Show `No responses yet.` and `Share your public RSVP link when you are ready to collect responses.` Provide `Open public RSVP` only when a public link exists. |
| Error | Show `We could not load responses. Try again.` and Retry. Keep safely loaded list rows visible. |
| Unauthorized / not found | Show an ownership-safe Unauthorized state for a non-owned event; show Not Found only for an absent event within the customer's allowed scope. |
| Mobile | Each response is a tappable vertical card; submission time, attendance value, and identity label remain visible before the open action. |

Attendance summary uses only the optional designated Yes/No Attendance question. `Yes` increments Attending and `No` increments Declined; missing optional answers are excluded. Without this designation, do not show attendance totals or derive them from another answer.

#### Response Detail

Response Detail displays one submitted response that belongs to the current customer's event.

| Region | Content and behavior |
|---|---|
| Header | `Response {sequence number}`, submission date/time, the attendance result when configured, and `Back to Responses`. |
| Answers | A dynamic ordered list of each question that was visible at the time of submission. Show the saved question prompt followed by its human-readable answer. Multiple choices show each selected option; an unanswered optional visible question shows `No answer provided.` |
| Conditional context | Hidden conditional questions are not displayed as unanswered. If useful for interpretation, show the source answer that caused visible target questions to appear; do not expose internal rule identifiers. |
| Historical integrity | Render the prompt/type/option labels as submitted so a later draft edit, deletion, or republish does not make the response unintelligible. |
| Unavailable data | A value that can no longer be rendered is shown as `Answer unavailable`, with no technical details. |
| Loading/error | Use response-detail placeholders while loading; on failure show `We could not load this response. Try again.` with Retry and Back to Responses. |
| Access | A non-owner cannot resolve a response detail. Guests and public users have no response-detail route. |
| Mobile | Questions and answers stack vertically, preserve readable spacing for long answers, and do not require horizontal scrolling. |

Response management does not allow the customer to edit a guest's submitted answer in MVP. The customer may inspect the response only; any future correction workflow requires an explicitly approved product policy.

## Phase 5 acceptance checklist

- [x] Public RSVP entry, event information, dynamic form, submit, confirmation, and special states are defined.
- [x] Guest validation, stale-public-version handling, server retry, and duplicate-submission behavior are explicit.
- [x] Dashboard contents, statuses, actions, empty state, and mobile behavior are defined.
- [x] Response list and detail support dynamic questions, optional attendance, loading, empty, error, unauthorized, and not-found states.
- [x] Customer-only response access and immutable guest submission behavior are defined.

## 6. Cross-cutting states and mobile behavior

### 6.1 State framework

The following state definitions apply everywhere they are relevant. A state marked Not applicable in the screen matrix is intentional; it must not be invented by an implementation owner.

| State | Standard behavior |
|---|---|
| Loading | Keep stable page structure visible with contextual placeholders or in-control progress. Do not show a false empty state while data is loading. Disable only duplicate/conflicting actions and retain safe entered values. |
| Empty | Explain why no records/content exist, what the user can do next, and show the relevant creation, clear-filter, or retry action. Do not use fabricated data. |
| Error | Preserve safely loaded content and unsaved form values. Use plain language, offer Retry when meaningful, and do not expose internal errors. |
| Success | Confirm the completed action, state the meaningful next step, and provide the relevant destination/action. A success message never claims work completed until the server confirms it. |
| Validation | Identify the specific correction in an inline message and in the form error summary after attempted submission. Keep the user in context and preserve all valid values. |
| Disabled | Use only for an action with a visible unmet prerequisite or an action already in progress. State the reason in nearby text or accessible description. Do not use disabled controls as the only validation feedback. |
| Not Found | Explain that the requested public or customer-visible resource is unavailable. Do not reveal private data or whether inaccessible records exist. Offer the safe parent destination. |
| Unauthorized | Explain that access is unavailable without identifying the protected record. Authenticated customers are directed to Dashboard; unauthenticated people are directed to Login. |
| Closed | Explain that a published RSVP no longer accepts submissions because its deadline has passed. Do not render guest questions or submit actions. |

### 6.2 Major-screen state matrix

`N/A` means the state is not meaningful for that screen. All applicable states use the standard behavior in section 6.1 plus the screen-specific result below.

| Screen | Loading | Empty | Error | Success | Validation | Disabled | Not Found | Unauthorized | Closed |
|---|---|---|---|---|---|---|---|---|---|
| Public marketing pages | Page-content shell when approved content loads dynamically. | N/A. | `We could not load this page. Try again.` | N/A. | N/A. | N/A. | Public `Page not found` with Home. | N/A. | N/A. |
| Templates | Template-card placeholders. | `No templates are available right now.` with Retry/Custom RSVP. | Preserve filters; Retry. | N/A. | N/A. | Use Template unavailable only while selection/auth handoff is in progress. | Missing template opens `This template is no longer available.` with Back to Templates. | N/A for browse; Use Template directs to Login/Register. | N/A. |
| Custom RSVP Request | Submission progress in primary action. | N/A. | Preserve entries; Try again. | Request Confirmation. | Field summary and inline errors. | Submit only during request submission; explain progress. | N/A. | N/A. | N/A. |
| Login / Register | Auth-action progress. | N/A. | Explain auth service failure; Retry. | Return to safe intended destination or Dashboard. | Inline credential/account errors. | Submit while authentication request is active. | N/A. | Existing authenticated customer opening Login goes to Dashboard. | N/A. |
| Dashboard / Events | Event-record placeholders. | First-use `Create your first RSVP` state. | Preserve loaded events; Retry. | Draft saved/published status update after returning from a flow. | N/A. | Public RSVP action is unavailable for Draft with explanation. | N/A for owned list. | Redirect to Login if signed out. | Closed event remains listed with its status and public link. |
| Event Details | Initial-form shell if an existing draft loads. | N/A. | Preserve fields; Retry save/load. | Continue to Template or `Draft saved.` | Field summary/inline errors. | Continue/save only while saving; prior/future steps follow wizard prerequisites. | Owned missing draft: Not Found with Dashboard. | Non-owner: Unauthorized with Dashboard. | Existing closed event is editable as a draft; deadline change requires republish to reopen public access. |
| Template Selection | Card placeholders. | No matching results with Clear filters/Start Blank. | Preserve selected source and filters; Retry. | Continue to Configure / `Draft saved.` | N/A. | Continue until template or Start Blank is selected; explain selection requirement. | Missing saved source does not block existing copied draft; unavailable catalogue source shows Not Found. | Non-owner: Unauthorized with Dashboard. | N/A. |
| Configure RSVP | Builder placeholders. | No-question state with Add question. | Preserve question/rule edit; Retry. | Saved question/rule and Preview available. | Inline editor errors and publish-readiness guidance. | Item action while that item saves; Preview may remain enabled for incomplete draft. | Owned missing event/configuration: Not Found. | Non-owner: Unauthorized. | N/A; customer can still edit a draft for a closed published event. |
| Preview | Guest-preview shell. | No questions still shows event preview and readiness guidance. | Retry or Edit RSVP. | Local `Preview complete` only; no response is saved. | Simulated visible-question feedback. | Continue to Publish only while loading a preview transition. | Owned missing draft: Not Found. | Non-owner: Unauthorized. | Preview may show the current public version as closed when deadline has passed; customer can still edit a later draft. |
| Publish | Readiness-check progress / publishing progress. | N/A. | Retain draft and Retry; never claim publication. | First Publish or Republish success with stable public URL. | Structured blocker list and direct Fix actions. | Publish/Republish during validation or publishing; explain progress. | Owned missing draft: Not Found. | Non-owner: Unauthorized. | A closed published RSVP can be republished only after the customer changes the deadline to a valid future date. |
| Public guest RSVP | Guest-form shell. | N/A. | Preserve entered answers on retryable submit failure; Retry. | Confirmation after one accepted response. | Visible-question summary/inline errors. | Submit during submission only; explain `Submitting RSVP...`. | Invalid RSVP screen without private detail. | N/A. | Closed RSVP screen with no form. |
| Guest Confirmation / Duplicate | N/A. | N/A. | If confirmation cannot resolve, show safe server error with Retry. | Receipt/duplicate acknowledgement is the terminal state. | N/A. | No re-submit action. | Invalid public identifier resolves to Invalid RSVP. | N/A. | A later revisit after the deadline resolves to Closed RSVP. |
| Response List | Response-row placeholders. | `No responses yet.` with public-link guidance when available. | Preserve loaded rows; Retry. | N/A. | N/A. | N/A. | Owned missing event: Not Found. | Non-owner: Unauthorized; guest: no route. | Closed event shows historic responses normally. |
| Response Detail | Detail placeholders. | N/A. | Retry and Back to Responses. | N/A. | N/A. | N/A. | Missing response within owned event: Not Found. | Non-owner: Unauthorized; guest: no route. | Closed event shows historic response normally. |
| Account | Account-form shell. | N/A. | Preserve account entries; Retry. | `Account updated.` | Field summary/inline errors for account fields. | Save while saving. | N/A. | Redirect to Login if signed out. | N/A. |

### 6.3 State transitions that require special care

1. Never replace a loading state with an empty state until the load has completed successfully.
2. A save failure never resets a field, selected template, question editor, conditional rule, simulated preview answer, or guest form answer.
3. A guest form must recheck status at submission. A valid page that becomes Closed/Invalid before submit cannot accept an answer.
4. A customer must always see the previous published URL/content status while a later draft contains unpublished edits; `Changes not published` is not the same as an outage.
5. Not Found and Unauthorized are deliberately different only inside a customer's own permitted record scope. Outside it, use Unauthorized without confirming resource existence.
6. No error, empty, or success state may expose another customer's event name, guest identity, response count, question, or answer.

### 6.4 Responsive behavior baseline

Mobile applies below 768 CSS pixels, tablet from 768 through 1023 CSS pixels, and desktop at 1024 CSS pixels and above. These thresholds determine information arrangement, not feature availability: every critical action remains available on every viewport.

- Mobile uses a single primary content column with readable side padding. Tablet and desktop may use multiple columns only when each control remains usable.
- Interactive controls have touch-safe hit areas of at least 44 by 44 CSS pixels. No essential interaction relies on hover, drag alone, a tooltip alone, or a horizontal swipe without visible alternatives.
- Forms preserve entered data when the virtual keyboard opens, validation appears, orientation changes, or a server retry is needed. Focus moves predictably to the requested control.
- Tables are not allowed to force the page to horizontal-scroll. On mobile, convert tabular records to stacked labelled cards or use a contained horizontal region with visible labels and an equivalent card alternative.
- Long URLs, event names, questions, and answers wrap without truncating their meaning; action labels remain visible.

### 6.5 Mobile behavior matrix

| Area | Mobile behavior | Tablet / desktop behavior that remains available |
|---|---|---|
| Public navigation | Replace the full public link row with an accessible menu trigger. Keep Login and the primary public CTA reachable without opening a deeply nested menu. Close the menu after navigation and return focus to its trigger when it is dismissed. | Full public navigation may be shown inline. |
| Home and visitor paths | Stack the three primary paths vertically in their same priority order. Each CTA has its own full-width or clearly separated touch target. | Paths may sit side by side, with the same labels and destinations. |
| Templates | One card per row. Search is full-width; filters/sort use compact controls above results. Preview and Use Template are visible actions on each card. | Cards may form a responsive grid; search/filter state remains identical. |
| Template Preview | Preview artwork scales to container width. Use Template remains visible after description/content without requiring hover. Back to Templates keeps result state. | Preview may use a side-by-side content layout. |
| Login, Register, Custom RSVP, and Event Details | Inputs are one column in logical form order. Use email, telephone, number, date, and time input modes where available. Error summary appears before the form and inline errors remain next to their fields. | Related short inputs may share a row when labels and errors stay readable. |
| Creation wizard | Show compact step indicator with current step and total, plus an accessible list of completed steps. The primary action follows the current content; Back and Save for later are separate controls. | A full horizontal stepper may be used. |
| Template Selection | Keep Start Blank and selected-template state before or above long result lists. Selection has a clear non-hover state; Continue does not disappear below the list. | Results may use a multi-column grid. |
| Question builder | Questions are stacked cards. Add/Edit opens a full-width focused editor panel or page section. Reorder always includes Move up/Move down; delete/duplicate actions have text labels or accessible names. | Inline/side-panel editing and drag assistance may be added, but explicit controls remain. |
| Question options | Options are vertical rows with visible label, edit field, and reorder/delete actions. Do not place delete controls so close to option text that accidental taps are likely. | Options may use denser layouts while keeping the same action order. |
| Conditional Logic | Build the rule in the fixed source -> answer -> target sequence. Each select is full-width; unavailable downstream controls explain their prerequisite. The readable rule summary wraps before Save. | Controls may be arranged on one row only when every label and selected value is readable. |
| Preview | Select Mobile mode by default. The guest form fills the viewport width. Desktop mode is contained in a scrollable preview frame if needed, never making the document horizontally scroll. Edit and Publish actions are outside/after the frame. | Desktop mode may be the default and use a wider frame. |
| Publish | Put validation blockers before the publish CTA. Stack Copy link, Open RSVP, View responses, and Dashboard actions; the URL wraps/selects safely. | Actions may be inline after the URL. |
| Guest RSVP | Event details precede the form; each choice has a full-row tap target. Conditional questions appear in place without jumping focus away from the source answer. Submit follows all visible questions. | Controls can use wider guest-page layout but preserve order and conditional behavior. |
| Dashboard and event overview | Event records become labelled cards. Status, response count, and primary action appear first; remaining actions use a visible accessible menu or stacked actions. | Event information may use rows/columns with actions aligned to the record. |
| Response list and detail | Response rows become cards. In detail, each prompt/answer pair stacks; long text and multiple selections wrap. Back to Responses remains at the top and after long content when useful. | A denser list and two-column prompt/answer presentation may be used when readable. |

## Phase 6 acceptance checklist

- [x] Loading, empty, error, success, validation, disabled, not-found, unauthorized, and closed states are intentionally mapped for every major screen.
- [x] State transitions preserve data, avoid false empty states, and maintain ownership/privacy boundaries.
- [x] Mobile/tablet/desktop behavior is defined for navigation, forms, templates, builder, conditions, preview, publish, guest RSVP, dashboard, and responses.
- [x] Every critical action has an accessible non-hover, non-drag-only mobile path.
