# Daily review and bilingual content implementation plan

> **For agentic workers:** Use executing-plans, task by task.

**Goal:** Surface due vocabulary and writing corrections alongside chapter/SRS tasks, and extend six-subject bilingual learning support without changing answers or claiming complete official coverage.

**Architecture:** A small local review module owns due-item selection and a correction practice panel. Existing arcade outcomes and explicit writing feedback supply events. Dashboard tasks route to targeted review; opening a page or applying an AI suggestion never completes independent review. Writing excerpts remain in account-isolated browser storage and never enter cloud summaries.

**Tech Stack:** Existing plain JavaScript, browser storage, Node tests, Playwright.

## Constraints
- D&T expansion deferred. Preserve existing curriculum mapping, question IDs and answer keys.
- No new AI requests, dependencies or fees; only explicit existing coaching requests capture corrections.
- Review wrong/hinted answers separately from independent success. Due dates use timestamps, daily completion uses local date.
- Review remains accessible even for untaught topics; school status is advisory for revision.
- Keep startup asset budget and all existing privacy boundaries.

## Tasks
- [x] Add failing review selection / correction retention / assisted-completion tests.
- [x] Add local review model and dashboard tasks; targeted arcade routes with explicit exit from review scope.
- [x] Add writing correction capture and typed recall practice with answer reveal tracked as assisted.
- [x] Add ten topic English supplements and twelve question Chinese prompts/explanations across six subjects; preserve original English assessment stimuli.
- [ ] Test content invariants, real browser interactions and regression suite. Record measured remaining gaps.
- [ ] Independent review, commit, PR/CI and existing private deployment if available; report only verified results.
