# Classroom arcade implementation plan

Approved scope: automatic speech, previous-word review, configurable rounds with bank-aware rotation; five students and one administrator; private real-time multiplayer rooms and administrator learning summaries. Free cloud statistics storage authorised. Existing account passwords and records must survive.

Architecture: existing Node private server owns authentication, roles, rooms, authoritative deadlines and scoring. Short authenticated polling supports up to six private members without a new websocket dependency. Supabase REST stores only bounded daily learning summaries; no recordings, documents or writing content. Database credentials stay server-side. Multiplayer rooms are ephemeral and explicitly close on server restart. Practice continues when cloud sync is unavailable.

- [x] 1. Write failing tests for selection rotation and round sizes. Implement pure planner, settings, autoplay with manual fallback, previous-answer review; matching paged boards.
- [x] 2. Write failing tests for private classroom role isolation, summary validation/store, authoritative room answers/deadlines and duplicate submissions. Implement API and Supabase schema/adapter.
- [x] 3. Add browser classroom panel, daily summary sync, multiplayer room/join/countdown/ranking and optional generated music. Test with independent authenticated sessions.
- [ ] 4. Prepare five student invitation records and administrator role without replacing existing credentials. Never commit secrets. Configure Supabase only after user login and required account consent.
- [ ] 5. Run unit/integration and browser suites, review diff, open PR, verify CI, merge/deploy existing private service and verify production assets and access boundaries.

Acceptance: word bank/chapter respected, no avoidable consecutive-round duplicates, insufficient pools honestly capped, spelling audio counts as assisted, no automatic speech in hidden page. Client cannot choose another user identity, submit a score, or fetch a future answer. Students cannot access admin summaries. Missing cloud configuration is visible and never falsely reported synced. No fees or public access expansion.

Review: independent reviewer found room reopen rendering and cycle exhaustion repeat bugs; both reproduced with failing tests and fixed. Offline invitations prepared (owner + learner1–5); Supabase project password creation awaits user, so cloud provisioning/online role changes remain incomplete.
