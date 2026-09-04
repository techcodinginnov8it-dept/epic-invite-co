# EPIC INVITE CO.
# CORE

## THE CORE LOOP

Customer creates an RSVP
→ Publishes it
→ Shares a public link
→ Guest opens the link, no account needed
→ Guest submits a response
→ Customer sees the response

Everything else in the project exists to make this loop work, reliably, for any type of event.

---

# THE ONE SENTENCE VERSION

Let a customer build a custom RSVP page for any event, publish it as a public link, and collect guest responses — without either side needing technical effort.

---

# THE THREE ZONES

## 1. Public Website (the front door)

Home, About, Services, Templates, How It Works, Portfolio, Contact.

Job: get a visitor to do one of three things.

- Browse Templates
- Create an RSVP
- Request a Custom RSVP

Not the core product. It exists to funnel people into the core loop.

## 2. RSVP Creation (the core product, behind login)

Create RSVP
→ Event Details
→ Template or Configure
→ Questions
→ Conditional Logic
→ Preview
→ Publish

This is where almost all product complexity lives. Question builder and conditional logic are the hardest parts.

## 3. Guest RSVP (public, but generated per event)

Not part of the marketing site. Each publish action creates a brand-new public page at a unique URL.

Public RSVP URL
→ Event Info
→ Questions (including conditional ones)
→ Submit
→ Confirmation

No customer login required, ever.

---

# THE TWO RULES THAT MAKE THIS HARD

## Rule 1 — One flexible system, not one per event type

Wedding, birthday, corporate event — same data model, same code paths. No special-casing by event type. Questions are stored dynamically, not as fixed database columns.

## Rule 2 — Strict data isolation

- Customer A never sees Customer B's events, questions, or responses.
- Guests never see other guests' responses.
- Publishing a template never modifies the original — only a copy is customized.
- All of this is enforced server-side, never trusted from the browser.

---

# THE CRITICAL PATH (this is what "done" means)

Login
→ Create RSVP
→ Configure questions + at least one conditional rule
→ Preview
→ Publish
→ Guest opens public URL
→ Guest submits
→ Customer sees the response count and detail

If this single path works end-to-end, on staging and production, the product works. Everything else — mobile polish, extra states, monitoring, backups — supports this path, but this path is the definition of done.

---

# WHO OWNS WHAT

| Zone | Owner |
|---|---|
| What happens (journeys, screens, states) | Sabel |
| How it looks and behaves | Lara |
| How data/API supports it | Marie |
| How it runs in dev/staging/production | Mc |

---

# WHAT IS NOT CORE

Useful, but secondary to the loop above:

- Pricing, testimonials, awards on the marketing site (explicitly not to be invented)
- Advanced conditional logic (AND/OR) — MVP is single condition only
- Anything beyond the 10 supported question types
- Anything that assumes a fixed question set anywhere in the system
