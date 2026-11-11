# Loop — Work, in harmony

[Explore the public demo](https://loop.vaddeynikhil.chatgpt.site)

A working, frontend-only prototype of a connected company workspace. The public-facing landing page and Loop demo share the Dusk Glass design system. Everything runs in the browser; no account, backend, database, API key, or AI subscription is required.

## Start locally

From this directory:

```sh
python3 -m http.server 5173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:5173. The landing page is `/`; the workspace starts at `/#app/home`. Use an HTTP server rather than opening `index.html` directly, because the application uses native JavaScript modules. There is no installation or build step. Any static host can serve the contents of `dist`.

With Node.js installed, run the focused model and waitlist adapter tests:

```sh
node --test tests/core.test.js
```

## Primary walkthrough

1. Choose **Explore the demo** on the landing page.
2. From Home, choose **Pick up the conversation** to open `#launch`.
3. On Maya’s onboarding-copy message, choose **Create task**. Edit its owner and due date; confirm.
4. Open Projects. The task retains its source message, owner, and date. Home shows Alex’s tasks under **My day** and everyone’s under **Team overview**.
5. Open Meetings → **Launch review**. Choose **Generate sample summary**, then **Review follow-up task** and confirm it.
6. Open Loop AI → **Find time for a launch review**. Review the date, time, attendees, and description before approving. The suggestion considers the copy task’s due date and local calendar conflicts.
7. Open Calendar to find the new event. Edit it; its linked meeting updates. Return to AI to see the actual confirmed event time.
8. Open Activity to see confirmed task and meeting actions. Mark them read.
9. Use the Loop mark to return to the landing page and open the waitlist form.

**Take a 2-minute tour** provides optional guidance without blocking free exploration. Cmd/Ctrl+K searches tasks, messages, documents, meetings, and people. Arrow keys select a result; Enter opens it; Escape closes the palette.

## What works locally

- Channel and direct-message navigation, message composition, per-channel drafts, reactions, saved messages, threaded replies, document/project links, and source-based task creation.
- Task creation/editing, assignees, dates, priorities, descriptions, statuses, comments, checklists, list/board views, search, filters, and task-derived project progress.
- Day/week/month calendars, navigation, calendar visibility, empty-slot creation, event editing, overlap validation, and linked meeting records.
- Document creation/renaming, favorites, search, comments, persistent rich text with headings, lists, quotes, links, bold/italic, and keyboard-operable checklists. The editor is deliberately focused and uses browser editing primitives.
- Meeting notes, linked documents, prepared summary generation with cancellation, review-before-creation follow-up tasks, and a simulated room with timer and local controls.
- Six distinct AI scenarios, source links, editable approvals, local posting of reviewed drafts, and duplicate prevention for applied actions.
- Read/unread activity, notification panel, profile display name, motion and notification preferences, connected-tool explanations, and confirmed demo reset.
- Responsive navigation, native focus-trapped dialogs, desktop task/thread inspectors, mobile sheets, and reduced-motion support.

## Connect a real waitlist destination

Edit `dist/config.js` and set `window.LOOP_WAITLIST_ENDPOINT` to the HTTPS endpoint you explicitly choose. Leave it empty for local preview behavior.

The endpoint must:

- Accept JSON POST requests and allow the site origin using CORS.
- Accept `email`, `name`, `company`, `teamSize`, `tools`, and `consent`.
- Return a successful HTTP response only when the entry has been accepted.
- Return HTTP 409 for an already-registered email, if duplicate handling is supported.

The adapter in `dist/waitlist.js` sends nothing unless an endpoint is configured. It shows genuine success only after a successful response; it handles network failures, timeouts, failed responses, duplicates, and unavailable local storage. There are no analytics events or email addresses in URL parameters. Do not place secrets in this browser-visible configuration. Real endpoint delivery and provider-specific spam protection must be tested when a destination is connected.

Unconfigured forms explicitly say **Preview**. Entries stay in `loop.waitlist.v1` in the current browser and never claim a genuine signup. Workspace reset intentionally does not delete those separate preview entries.

## Persistence and reset

Workspace data is stored under the versioned `loop.workspace.v3` key. Loading validates core records and recovers malformed data with a fresh seed. Each record uses a stable ID and linked records reference those IDs. The original seed date is the local day of first use; reset generates fresh dates around the current local day. The local browser time zone is displayed in the calendar and meeting forms.

Open **Settings → Reset demo data** and confirm to restore the original demonstration. No external data is affected. Task counts, project progress, the agenda, and read counts are derived from shared state. Document and conversation selection survives refresh.

## Structure

- `dist/index.html`: static entry point.
- `dist/styles.css`: material, typography, spacing, responsive, and motion rules.
- `dist/app.js`: reusable views, controls, routing, commands, dialogs, and interactions.
- `dist/state.js`: versioned seed, relationships, persistence, and domain mutations.
- `dist/icons.js`: consistent original SVG icon/brand assets.
- `dist/config.js`, `dist/waitlist.js`: explicit endpoint configuration and submission adapter.
- `tests/core.test.js`: model, recovery, and waitlist behavior checks.
- `VERIFICATION.md`: checks performed and their limits.

## Simulation and scope boundaries

This is a demonstration, not a production collaboration system. Accounts, teammate presence, integrations, AI, summaries, and meetings are simulated. The meeting summary is a labeled prepared example; it does not analyze arbitrary edited notes. AI supports six deterministic intents and explains unsupported prompts. There is no live model, transcription, camera, microphone, external availability check, authentication, or cross-device synchronization.

Dusk Glass is the completed theme; Pearl Glass is not included. Board and calendar edits use reliable forms rather than drag-and-drop. Documents use a lightweight editor rather than a full block database. Calendar events do not include recurrence or multi-day scheduling. Project names are seeded; project creation and permission administration are outside this prototype. Public-facing page content is implemented; the hosted site is publicly accessible. Loop is an independent project. Its people, company knowledge, and work items are fictional demo content, with no connection to another company, project, or data source.

The four referenced images were not attached; the visual treatment follows the written art direction. Fonts request DM Sans and Manrope from Google Fonts and fall back to the system interface font when unavailable. Avatars and all interface graphics are local SVG/initials assets.
