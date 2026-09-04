# Marie Backend Handoff

## Authority and backend boundary

`SABEL-UX-SPEC.md` defines product behavior; `SABEL-IMPLEMENTATION-PLAN.md` section Phase 0 defines the conceptual domain schema. This handoff identifies the information, permissions, validation, and results the backend must support. Choose storage, API shape, authentication mechanism, transactions, and deployment architecture independently.

All ownership and public/private boundaries below are server-enforced. Never trust browser-provided ownership, publishability, question visibility, or response validity.

## Flow contracts

| Flow | Collect / save | Retrieve | Validation and permission | Success / error result |
|---|---|---|---|---|
| Authentication | Customer account identity and credentials. | Safe session/customer identity and account data. | Authenticate securely; intended return route must be safe and owned. | Authenticated customer returns to requested safe route/Dashboard; invalid credentials and service failures are distinguishable without leaking account data. |
| Templates | Template catalogue metadata and reusable configuration; customer-selected template ID. | Public available templates and safe template detail. | Only available templates can be selected. A customer never edits source-template records. | Return filtered/sorted catalogue/detail; unavailable template returns not-found; selection is retained until saved into draft configuration. |
| Custom RSVP Request | Name, email, event type/detail, event date, location, guest count, description, timestamp/status. | Operational/private request record only. | Apply field rules in UX 2.4; public submit needs no account; rate-limit/abuse-protect without changing UX. | Persist a separate Custom RSVP Request and return confirmation; validation errors are field-addressable; retryable failure preserves client data. |
| Event draft and details | Customer ID, name, type/detail, date, time, location, description, deadline, draft/published state and timestamps. | Customer's own event/draft and guest-safe published event fields. | Owner only; enforce date/deadline rules; protect cross-customer IDs. | Create/update saved draft, return current state; invalid fields structured by field; owner-missing not found; non-owner unauthorized. |
| Template selection / blank setup | Selected template reference or blank choice; independent draft RSVP configuration. | Current selection/configuration for event owner. | Owner only; copying must be transactional and never mutate template; replacement requires client confirmation but backend may reject unsafe stale replacement. | Return copied/blank configuration; save failure leaves prior valid config intact. |
| Questions and options | Dynamic question type, prompt, help, required, order, attendance designation; type-specific constraints; option label/value/order. | Owned draft questions/options; sanitized published questions/options. | Enforce supported types, prompt/constraint rules, option count/uniqueness, parent ownership, order scope, one attendance designation, and historic response integrity. | Return saved dynamic config; field/item errors structured by question/option; reject cross-event edits. |
| Conditional rules | Configuration ID, source question, triggering option/answer, target question, state. | Owned draft rules; sanitized valid published rules. | Same configuration; source must be Single Choice/Dropdown/Yes-No; answer belongs to source; target distinct/active; one rule per target; no chain/cycle/duplicate. | Return readable references or IDs needed by UI; invalid/dependent changes return actionable structured issues. |
| Preview | No durable guest input. | Latest saved owned draft event/config/questions/options/rules. | Owner only; preview must not invoke guest-response persistence or publish. | Return preview-safe draft representation; missing/non-owner errors as UX specifies. |
| Publish / republish | Publish request for saved event/configuration. Persist stable public ID, published snapshot/version, publish timestamps/status. | Publish readiness issues; success public URL/status. | Owner only. Revalidate event, at least one question, all types/options/rules, deadline, and ownership server-side. Preserve last published snapshot on failed republish. | Structured blockers with field/question/rule location; on success return stable URL and status; retryable failure must not claim publish. |
| Public RSVP retrieval | No customer data collected. | Only current published snapshot's guest-safe event details, questions/options, and valid rules by public ID. | No auth. Resolve unknown/unpublished as invalid; deadline-past as closed; never expose drafts, internal IDs, customer details, or responses. | Return open form, invalid, closed, or retryable service failure status. |
| Guest RSVP submission | Public ID, visible answers, idempotency submission identity/token; normalized email when an active Email question exists. Persist response, answers, timestamps, immutable question/option labels as needed. | Only confirmation result; no response records publicly. | Re-read current published/open snapshot; evaluate conditions server-side; validate only visible required answers/types/options; enforce email-based duplicate policy and idempotency; no auth. | Return accepted confirmation, duplicate acknowledgement, validation errors, stale-version reload signal, closed/invalid, or retryable error. |
| Dashboard / events | No new flow-specific data. | Current customer's event list, statuses, counts, attendance totals where configured, public-link availability. | Authenticated owner only; count only accepted responses. | Return owned records ordered most-recently-updated; empty is valid; partial/fetch failure is retryable. |
| Responses | No edits in MVP. | Owned event response count, ordered list, dynamic detail, historic prompts/answers, configured attendance summary. | Customer must own event and response. Guests/no-owner get no data. Do not assume email/name/attendance exists. | Return dynamic list/detail; owned missing is not-found; non-owner unauthorized; empty list is valid. |
| Account | Approved account-profile fields only. | Current customer's own account data. | Authenticated customer only; validate supplied fields. | Return updated account or field/retryable errors. |

## Public/private data contract

| Data | Public guest retrieval | Customer owner retrieval | Other customer / guest response access |
|---|---|---|---|
| Event name/date/time/location/description/deadline | Yes, only in open/closed published context as UX allows. | Yes. | No. |
| Draft configuration, source template reference, publish issues | No. | Yes. | No. |
| Published questions/options/valid rules | Yes, without internal implementation details. | Yes. | No. |
| Customer identity/account data | No. | Own data only. | No. |
| Guest responses and answers | No. | Event owner only. | No. |
| Custom RSVP requests | No. | Operational access only; not a guest/customer event response endpoint. | No. |

## Required structured error outcomes

Return machine-addressable errors for field validation, question/option validation, conditional-rule invalidity, publish blockers, ownership/authorization, not-found, invalid public ID, closed RSVP, duplicate guest response, stale public version, and retryable service failure. The UI needs the affected step/item/field and a safe message category; it must not infer errors from text.

## Critical security and integrity checks

1. Derive customer ownership from authenticated identity on every private request.
2. Verify all nested resources belong to the same owned event/configuration before read or write.
3. Create copied template configurations rather than linking customer writes to templates.
4. Publish a guest-safe snapshot/version and preserve historic response readability through later edits.
5. On guest submit, evaluate conditional visibility and validation server-side against the published version, not browser flags.
6. Do not expose response existence/data through public URLs, duplicate checks, authorization responses, logs, or errors.
7. Enforce idempotency and normalized-email duplicate policy exactly as UX 5.1 specifies.

## Verification checklist

- [ ] Customer A cannot retrieve or mutate Customer B's event, configuration, question, rule, response, or public-management data.
- [ ] A template use creates an independent copy.
- [ ] Invalid questions/options/rules cannot be published.
- [ ] A public request exposes only the published guest snapshot.
- [ ] Closed/invalid/stale/duplicate guest submissions do not create incorrect responses.
- [ ] Dynamic response detail remains readable after later configuration changes.
