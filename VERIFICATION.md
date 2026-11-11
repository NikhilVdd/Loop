# Verification — November 11, 2026

## Automated checks

`node --check dist/app.js` passed. Seven Node test cases passed:

1. Seeded relationships resolve and the seed calendar contains the current demo day.
2. Message-derived task ownership/date persist; completion adds one activity entry, without re-adding on an unchanged Done state.
3. New events create linked meeting records and activity entries.
4. Malformed JSON, incomplete schemas, and invalid meetings recover safely.
5. Unconfigured waitlist entries remain local and duplicate entries are detected without a network request.
6. Configured waitlist success waits for a successful response; JSON body is used without an email in the URL or local signup storage.
7. Failed responses, duplicates, invalid email/consent, network errors, insecure endpoint configuration, and storage failure are handled.

The endpoint tests use injected test responses; no real form destination has been configured or contacted.

## Browser checks performed

Using the actual local prototype in the in-app browser:

- Landing page → Home → Maya’s source message → prefilled task form.
- Changed owner to Maya and due date to November 13; confirmed the task appeared in Projects and Home Team overview.
- Generated the prepared launch review summary and approved a follow-up; checked the shared task count and activity.
- Reviewed and approved an AI scheduling suggestion; checked the Calendar event, edited its time, and checked the assistant’s Applied result used the changed event time.
- Confirmed the applied AI action no longer exposes its Review button.
- Edited document content and reloaded; created a new document, applied bold formatting, reopened it, and confirmed its selected page persisted across refresh.
- Toggled a document checklist with the keyboard and confirmed the checked state persisted after reload.
- Searched for the newly created task, navigated with arrow keys, and used Enter to open its inspector.
- Sent a channel message and replied to a thread; both appeared in the local timeline/thread.
- Marked all activity read and observed `Unread · 0`.
- Opened the simulated meeting room, changed its local mic state, and left without requesting device permissions.
- Verified reset shows a confirmation and restores the original task/meeting counts and briefing.
- Submitted an empty waitlist form to check required validation; submitted a test email with consent and observed the explicit local-only success; resubmitted and observed the duplicate message.
- Checked browser error logs after the main workflow and document formatting: no application console errors were reported.

## Visual inspection

- **1440×900:** Home, Projects, and core desktop workflow.
- **1280×800:** Home and week Calendar; event titles/times remain legible.
- **1024×800:** Projects and Meetings; secondary navigation is collapsed.
- **390×844:** Home, landing page, waitlist, and default day Calendar; no page-level horizontal overflow in checked views.

The earlier visual pass used seeded records; the landing-page preview is rendered from the actual Home component. Historical captures were archived outside the standalone project after its branding was updated.

## Limits of verification

This was a focused interaction and visual pass, not an exhaustive accessibility, browser-compatibility, security, or performance audit. No production service integrations, real authentication, external waitlist delivery, media infrastructure, or live AI behavior were tested because they are intentionally absent. Hosted deployment validation is reported separately in the delivery response.
