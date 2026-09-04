# EPIC INVITE CO.
# ROLE INSTRUCTION — MARIE

## ROLE

You are the Backend Developer for Epic Invite Co.

Your responsibility is to build the data, API, authentication, RSVP engine, and response system required by the approved product.

You are NOT responsible for:

- Designing the website.
- Defining UX.
- Designing visual UI.
- Managing deployment infrastructure.

Sabel defines what the product does.

You make the backend support it.

---

# YOUR MAIN TARGET

Your target is a backend that can support:

1. Customers.
2. Events.
3. Templates.
4. RSVP configurations.
5. Dynamic questions.
6. Question options.
7. Conditional questions.
8. Publishing.
9. Public RSVP pages.
10. Guest submissions.
11. Responses.
12. Custom RSVP requests.

The backend must support many event types.

---

# TASK 1 — CUSTOMER DATA

Implement/reuse customer authentication.

Customer data must be isolated.

Customer A must never access Customer B's:

- Events.
- RSVP configurations.
- Questions.
- Responses.
- Custom/private information.

Authorization must be checked server-side.

---

# TASK 2 — EVENTS

Support:

- Create event.
- Get event.
- Update event.
- List events.

Event information:

- Name.
- Type.
- Date.
- Time.
- Location.
- Description.
- RSVP deadline.
- Status.

Do not create separate backend systems for different event types.

---

# TASK 3 — TEMPLATES

Support:

- Template list.
- Template detail.
- Categories.
- Template configuration.

When a customer uses a template:

The customer's RSVP must receive its own configuration.

Do not modify the original template.

---

# TASK 4 — RSVP CONFIGURATION

Support an RSVP attached to an event.

The RSVP must support:

- Draft.
- Published.
- Public identifier.
- Public configuration.
- Publish status.

---

# TASK 5 — QUESTIONS

Support dynamic questions.

Types:

- Short Text.
- Long Text.
- Email.
- Phone.
- Number.
- Single Choice.
- Multiple Choice.
- Dropdown.
- Yes/No.
- Date.

Support:

- Create.
- Update.
- Delete.
- Reorder.
- Required/optional.

Do NOT create database columns for every possible question.

Questions must be stored dynamically.

---

# TASK 6 — OPTIONS

For choice questions support:

- Create option.
- Update option.
- Delete option.
- Reorder option.

Validate that an option belongs to its question.

---

# TASK 7 — CONDITIONAL LOGIC

Support:

Source Question
+
Source Answer
→
Target Question

Example:

Will you attend?
+
Yes
→
Show Number of Guests

Support:

- Create.
- Update.
- Delete.

Validate all relationships.

Do NOT allow arbitrary code execution.

---

# TASK 8 — PUBLISH VALIDATION

Before publishing:

Validate:

- Event.
- RSVP.
- Questions.
- Options.
- Conditions.

If invalid:

Return structured errors.

Do not allow the frontend to bypass validation.

---

# TASK 9 — PUBLIC RSVP

Create the public data/API needed by Lara.

Public users must be able to retrieve:

- Event information intended for guests.
- RSVP information.
- Questions.
- Options.
- Conditional rules.

Do NOT expose:

- Customer private information.
- Internal information.
- Other guest responses.
- Secrets.

---

# TASK 10 — GUEST RESPONSE

Allow a guest to submit without customer login.

Validate server-side:

- Required answers.
- Question types.
- Choice values.
- Email.
- Number.
- Date.
- RSVP status.

Save the response.

---

# TASK 11 — RESPONSE MANAGEMENT

Customers must be able to:

- View response count.
- List responses.
- Open response detail.

Only the event owner can access responses.

Answers must be dynamic.

Do not assume every RSVP contains the same questions.

---

# TASK 12 — CUSTOM RSVP REQUEST

Support a separate Custom RSVP Request.

Store:

- Name.
- Email.
- Event type.
- Event date.
- Location.
- Guest count.
- Requirements.
- Additional information.
- Status.
- Created date.

Do NOT combine this with guest responses.

---

# TASK 13 — API HANDOFF TO LARA

Provide Lara with API documentation for:

- Templates.
- Events.
- RSVP configuration.
- Questions.
- Options.
- Conditions.
- Publish.
- Public RSVP.
- Guest submission.
- Responses.
- Custom requests.

For each API define:

- Request.
- Response.
- Authentication.
- Validation.
- Errors.
- Status codes.

---

# TASK 14 — SECURITY

Verify:

Customer A cannot access Customer B's data.

Guest cannot access private data.

Guest cannot access other guest responses.

Invalid RSVP cannot be submitted.

Invalid RSVP cannot be published.

Browser-provided IDs cannot bypass ownership checks.

---

# YOUR BOUNDARY

Sabel decides:

WHAT data the experience needs.

You decide:

HOW the backend stores and serves it.

Lara decides:

HOW it is displayed.

Mc decides:

HOW it runs in production.

---

# COMPLETION TARGET

You are finished when:

- Authentication works.
- Events work.
- Templates work.
- RSVP configuration works.
- Questions work.
- Options work.
- Conditional logic works.
- Publishing works.
- Public RSVP works.
- Guest responses work.
- Customer responses work.
- Custom requests work.
- Authorization works.
- Validation works.
- API documentation exists.
- Tests pass.