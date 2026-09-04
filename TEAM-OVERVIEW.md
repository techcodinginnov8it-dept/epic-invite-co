# EPIC INVITE CO.
# TEAM OVERVIEW — PRODUCT OUTCOME

## THE OUTCOME WE WANT

Epic Invite Co. should let a customer create a polished RSVP page for any type of event, customize it to collect the information they need, publish it, share a public link, receive guest responses, and manage those responses from one dashboard.

The complete customer outcome is:

Customer logs in
-> Creates an event RSVP
-> Chooses or requests a design
-> Configures event details and questions
-> Adds conditional questions when needed
-> Previews the guest experience
-> Publishes the RSVP
-> Copies and shares the public link
-> Receives guest responses
-> Reviews response counts and individual answers
-> Updates the RSVP when necessary

Guests must be able to open the shared link and submit an RSVP without creating a customer account.

## WHO WE SERVE

### Customer

A person or organization planning an event. They need a simple way to create, customize, publish, and manage an RSVP without building a form themselves.

### Guest

An invitee responding to an event. They need a clear, mobile-friendly RSVP page that explains the event, asks only relevant questions, validates their answers, and confirms submission.

## CORE PRODUCT CAPABILITIES

1. Public website and template browsing.
2. Customer authentication and a private dashboard.
3. Event creation for any event type through one flexible system.
4. Template selection or a custom RSVP request.
5. Event details configuration.
6. Dynamic RSVP questions, options, required fields, and ordering.
7. Simple conditional logic: when one answer matches, show another question.
8. Guest-facing preview before publishing.
9. Server-validated publishing with a public RSVP URL.
10. Public guest RSVP submission without customer login.
11. Confirmation, validation, closed, invalid, loading, empty, and error states.
12. Response counts, response lists, and dynamic response details for event owners.
13. Secure customer data isolation and server-side authorization.
14. Reliable development, staging, deployment, monitoring, backup, and rollback practices.

## THE PRIMARY USER JOURNEY

### Customer

1. Visit the public website.
2. Browse templates, start an RSVP, or request a custom RSVP.
3. Log in or create an account when entering the customer workflow.
4. Create an event and enter its details.
5. Select a template or configure the RSVP.
6. Add, edit, delete, and reorder questions and choices.
7. Add simple conditional question rules when required.
8. Preview the guest-facing RSVP on desktop and mobile.
9. Fix any publishing validation problems.
10. Publish and receive the public RSVP URL.
11. Share the URL with guests.
12. Monitor response counts and inspect individual responses from the dashboard.

### Guest

1. Open the public RSVP URL.
2. Read the event information and invitation.
3. Complete the visible RSVP questions.
4. See conditional questions when their answers require them.
5. Submit valid answers without logging in.
6. Receive a confirmation.

## TEAM OWNERSHIP

### Sabel: UX

Defines what happens: journeys, screens, actions, navigation, validation behavior, states, mobile behavior, and handoffs.

### Lara: UI

Builds how the approved UX looks and behaves in the interface across mobile, tablet, and desktop. Connects the interface to the agreed API.

### Marie: Backend

Builds how data and APIs support the product: authentication, events, templates, RSVP configuration, dynamic questions, conditional logic, publishing, guest submissions, responses, permissions, and validation.

### Mc: DevOps

Makes the product developable, testable, deployable, and operable across development, staging, and production. Owns CI/CD, secrets, domains, logging, monitoring, backups, and rollback documentation.

## NON-NEGOTIABLE RULES

- The system must support many event types without separate implementations for each type.
- RSVP questions and answers must be dynamic; do not assume a fixed question set.
- Guests do not need customer accounts.
- Customers can access only their own events and responses.
- Public RSVP pages expose only information intended for guests.
- Publishing requires server-side validation of the event, RSVP, questions, options, and conditions.
- The original template is never modified when a customer uses it.
- Every major screen needs loading, empty, error, success, validation, and relevant unavailable states.
- The customer must always be able to understand what happens next.
- The full critical path must work: create -> publish -> share -> guest submits -> customer sees response.

## DEFINITION OF DONE

Epic Invite Co. is ready for the first complete product test when a customer can:

- Sign in.
- Create an RSVP for an arbitrary event type.
- Enter event details.
- Customize the RSVP questions.
- Add a valid conditional question.
- Preview the result.
- Publish successfully.
- Copy and share a public URL.

And when a guest can:

- Open that URL without signing in.
- See the correct event and questions.
- Complete conditional questions correctly.
- Submit a valid response.
- Receive confirmation.

And when the customer can:

- See the updated response count.
- Open the response list.
- View dynamic answers in response detail.
- Be prevented from accessing another customer's data.

The team must also have passing tests, documented API and UX handoffs, a working deployment path, secure environment configuration, and a verified production smoke test for the critical path.
