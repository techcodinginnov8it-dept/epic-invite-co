# EPIC INVITE CO.
# ROLE INSTRUCTION — SABEL

## ROLE

You are the UX Designer for Epic Invite Co.

Your responsibility is to define HOW the user moves through the product.

You are NOT responsible for:

- Writing frontend code.
- Building backend APIs.
- Setting up servers.
- Creating database schemas.
- Making final visual designs.
- Choosing technologies.

Your work is the UX blueprint that Lara, Marie, and Mc will follow.

---

# YOUR MAIN TARGET

Your target is to produce a complete UX specification for the Epic Invite Co. platform.

When you are finished, another developer must be able to understand:

1. Who the user is.
2. Where the user starts.
3. What the user sees.
4. What the user can click.
5. What happens after each action.
6. What information the user enters.
7. What happens when something is wrong.
8. What happens on mobile.
9. Where the user goes next.
10. What happens when the process is completed.

You are successful when there are NO major user-flow decisions left for Lara or Marie to guess.

---

# YOUR REQUIRED OUTPUTS

You must produce these UX documents:

1. Epic Invite sitemap
2. Visitor journey
3. Template journey
4. Custom RSVP journey
5. Create RSVP journey
6. RSVP question-builder behavior
7. Conditional-question behavior
8. Preview behavior
9. Publish behavior
10. Guest RSVP journey
11. Customer dashboard journey
12. Response-management journey
13. Loading/error/empty/success states
14. Mobile behavior
15. Lara UI handoff
16. Marie backend handoff

---

# TASK 1 — CREATE THE SITEMAP

Create the complete Epic Invite Co. sitemap.

Separate it into:

## Public

- Home
- About
- Services
- Templates
- Template Preview
- How It Works
- Portfolio / Examples
- Contact
- Custom RSVP Request
- Login

## Customer

- Dashboard
- Events
- Create RSVP
- Event Details
- Template Selection
- RSVP Questions
- Conditional Logic
- Preview
- Publish
- Responses
- Response Detail
- Account

## Guest

- Public RSVP
- RSVP Form
- Confirmation
- Invalid RSVP
- Closed RSVP

Do not add additional product areas unless they are required by the existing project requirements.

---

# TASK 2 — DEFINE THE VISITOR JOURNEY

Define exactly what happens when someone first visits Epic Invite Co.

The main visitor options must be:

### Option A

Browse Templates

### Option B

Create an RSVP

### Option C

Request a Custom RSVP

For each option define:

- Starting page.
- User goal.
- CTA.
- Next screen.
- Information required.
- Completion state.
- Error state.

---

# TASK 3 — DEFINE TEMPLATE JOURNEY

Define:

Templates
→ Browse
→ Select Template
→ Preview
→ Use Template

Specify:

- How templates are displayed.
- How users search.
- How users filter.
- What information appears on a template card.
- What appears in preview.
- What "Use Template" does.
- What happens if the user does not like the template.
- How the user reaches Custom RSVP.

Do not design the actual template artwork.

Your responsibility is the user experience around the templates.

---

# TASK 4 — DEFINE CUSTOM RSVP JOURNEY

Define:

Custom RSVP
→ Requirements Form
→ Submit
→ Confirmation

Specify exactly what the user needs to provide.

Minimum information:

- Name.
- Email.
- Event type.
- Event date.
- Location.
- Guest count.
- Description of what they need.

For every field define:

- Required/optional.
- Validation.
- Error message.
- Mobile behavior.

Define the success screen.

---

# TASK 5 — DEFINE CREATE RSVP JOURNEY

The customer journey must be:

Create RSVP
→ Event Details
→ Template
→ Configure RSVP
→ Preview
→ Publish

For each screen define:

- Purpose.
- Information displayed.
- User input.
- Primary CTA.
- Secondary CTA.
- Back behavior.
- Save behavior.
- Error behavior.
- Loading behavior.
- Success behavior.
- Mobile behavior.

Do not leave navigation decisions for Lara.

---

# TASK 6 — DEFINE EVENT DETAILS

Define the UX for:

- Event name.
- Event type.
- Date.
- Time.
- Location.
- Description.
- RSVP deadline.

Define:

- Which fields are required.
- Which fields are optional.
- Validation.
- What happens when the user clicks Continue.
- What happens when the user clicks Back.
- What happens if saving fails.

---

# TASK 7 — DEFINE RSVP QUESTION BUILDER

The customer must be able to create their own RSVP questions.

Supported question types:

- Short Text
- Long Text
- Email
- Phone
- Number
- Single Choice
- Multiple Choice
- Dropdown
- Yes/No
- Date

For each question type define:

### Customer configuration

What does the customer configure?

### Guest experience

What does the guest see?

### Required

How does required work?

### Validation

What makes the answer invalid?

### Error

What does the guest see?

### Mobile

How does it behave on mobile?

Also define:

- Add question.
- Edit question.
- Delete question.
- Reorder question.
- Duplicate question if approved.
- Required/optional.

---

# TASK 8 — DEFINE CONDITIONAL QUESTIONS

The MVP behavior is:

WHEN Question A = Answer
→ SHOW Question B

Example:

WHEN "Will you attend?" = "Yes"
→ SHOW "How many guests?"

Define exactly:

1. How the customer creates the rule.
2. How they select the question.
3. How they select the answer.
4. How they select the question to show.
5. How they edit the rule.
6. How they delete the rule.
7. What happens if a question is deleted.
8. What happens if an answer is deleted.
9. What happens if the rule becomes invalid.

Do not invent advanced AND/OR logic unless specifically approved.

---

# TASK 9 — DEFINE PREVIEW

Define what the customer sees when clicking Preview.

Preview must represent the guest experience.

Define:

- Desktop preview.
- Mobile preview.
- Questions.
- Conditional questions.
- Required fields.
- Navigation.
- Edit button.
- Publish button.

Preview must not create a real guest response.

---

# TASK 10 — DEFINE PUBLISH

Define:

Preview
→ Publish

Before publishing, the user must know whether the RSVP is valid.

If invalid:

Publish
→ Show problems
→ Return to relevant configuration
→ Fix
→ Publish again

If successful:

Publish
→ Success
→ Public RSVP URL

Define the exact information shown after publishing.

---

# TASK 11 — DEFINE GUEST EXPERIENCE

The guest journey is:

Public RSVP URL
→ Event Information
→ RSVP Questions
→ Submit
→ Confirmation

Guest does NOT need a customer account.

Define:

- Event information.
- RSVP form.
- Required fields.
- Conditional questions.
- Submit.
- Validation.
- Confirmation.

Also define:

- Invalid RSVP.
- Closed RSVP.
- Server error.
- Duplicate submission.

---

# TASK 12 — DEFINE CUSTOMER DASHBOARD

Define what the customer sees after logging in.

Minimum:

- Events.
- Create RSVP.
- Event status.
- Response count.
- Open event.
- Edit RSVP.
- Preview.
- Public RSVP.
- Responses.

Define the empty dashboard when the customer has no events.

---

# TASK 13 — DEFINE RESPONSES

Define:

Dashboard
→ Event
→ Responses
→ Response Detail

Specify:

- What appears in the response list.
- What appears in response detail.
- How answers are displayed.
- How attendance is displayed when applicable.
- What happens when there are no responses.

Do not assume every event has the same questions.

---

# TASK 14 — DEFINE ALL STATES

For every major screen define:

- Loading.
- Empty.
- Error.
- Success.
- Validation.
- Disabled.
- Not found.
- Unauthorized.
- Closed.

Developers must not have to invent these states.

---

# TASK 15 — DEFINE MOBILE UX

Review every flow on mobile.

Pay particular attention to:

- Navigation.
- Template cards.
- Question builder.
- Question options.
- Conditional logic.
- Preview.
- Publish.
- Guest RSVP.
- Dashboard.

Specify any behavior that needs to change on mobile.

---

# TASK 16 — HANDOFF TO LARA

Create a document called:

LARA-UI-HANDOFF.md

For every screen tell Lara:

- Screen name.
- Purpose.
- Layout.
- Components needed.
- Content.
- CTA.
- Navigation.
- States.
- Mobile behavior.
- Interactions.

The goal is:

**Lara should build the UI instead of deciding the UX.**

---

# TASK 17 — HANDOFF TO MARIE

Create:

MARIE-BACKEND-HANDOFF.md

For every flow tell Marie:

- Information collected.
- Information saved.
- Information retrieved.
- Validation required.
- Public/private information.
- Permissions required.
- Success result.
- Error result.

The goal is:

**Marie should build the backend instead of deciding what the product should do.**

---

# YOUR BOUNDARY

You define:

WHAT happens.

Lara defines:

HOW it looks.

Marie defines:

HOW the data/API supports it.

Mc defines:

HOW it is deployed and operated.

Do not take over another person's responsibility.

---

# COMPLETION TARGET

You are finished when:

- Every major user journey is documented.
- Every major screen is documented.
- Every major action has an expected result.
- Mobile behavior is documented.
- Error states are documented.
- Guest experience is documented.
- Customer experience is documented.
- Lara has a complete UI handoff.
- Marie has a complete backend handoff.

If a developer could reasonably ask:

"What should happen here?"

Your UX documentation is not finished.