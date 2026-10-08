# IGCSE Personal Learning OS

A static learning application with seven subject catalogues, topic practice, a shared local learner state, a daily plan and timed mock practice. Serve this directory over HTTP and open `index.html`. No account or backend is required.

## Current coverage

- 980 questions across 86 local topics and seven subjects.
- 62 new original questions: 50 Physics questions spanning 25 course-map sections, plus two each for Math, Chemistry, D&T, Business, CS and English.
- Every local topic has linked questions. This is **local catalogue coverage**, not proof of full official syllabus coverage, exam readiness or a predicted grade. CS and English still have comparatively shallow banks.
- Physics includes the Solar System and stars/universe sections. Question IDs link topic, chapter and objective metadata without changing legacy learner keys.
- Dashboard averages include unstarted topics. Unique-question practice coverage is based on explicit per-question records; historical topic aggregates remain preserved and are not fabricated into per-question history.
- Daily tasks complete after a matching answer event, not when a card is clicked. Learning state remains in this browser's local storage.

## Syllabus provenance and limits

Syllabus structure and original learning content are separate. Topic mapping does not certify that every objective is represented or that a practice question is an official past-paper question. Original additions have `source: original` and `pastPaper: false`.

Official references checked on 2026-10-09:

- [Physics 0625](https://www.cambridgeinternational.org/Images/697209-2026-2028-syllabus.pdf): course-map section references target examinations in 2026–2028. The concise original objectives and two-question minimum do not provide full depth for every objective or Core/Supplement distinction.
- [Business Studies 0450](https://www.cambridgeinternational.org/programmes-and-qualifications/view/cambridge-igcse-business-studies-0450/): legacy catalogue targets 2026. From 2027 the qualification is Business 0264; a full content migration has not been certified.
- [Design & Technology 0445](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-design-and-technology-0445/): 2024–2026, 2027 and 2028–2030 are separate versions. The existing bank is not labelled as covering a nonexistent 2026–2028 version.
- [Computer Science 0478](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-computer-science-0478/): existing metadata targets 2026–2028, not the revised 2029–2031 curriculum.

## Traceable outline audit

The Dashboard includes a source-linked construction checklist for all seven subjects. `data/syllabus_registry.js` stores original concise labels, official section/assessment-objective identifiers, source PDF, edition and explicit local topic links. This is an outline, not an exhaustive transcription or a completed objective audit. `data/syllabus_audit.js` counts samples only when the question explicitly names the reference **and** matches the syllabus code and edition. Legacy questions without references are not silently credited. Status distinguishes sample practice, preparation only, content association and a construction gap; no percentage claims full official coverage.

The additional 118 authored questions comprise 76 CS questions and 42 English questions. Answer positions are rotated and all prompts, answers and rationales are distinct. The 0510 English references R1–R4, W1–W4, L1–L4 and S1–S4 are tracked separately. English writing strategy, transcript and speaking-planning choices are labelled preparation, not evidence of full writing, auditory comprehension or oral performance. English 0511 is not independently audited. CS digital currency (5.2) and file handling (8.3), for example, currently have content associations but no explicitly mapped sample questions.

## Mock practice

Quick mocks use up to 30 multiple-choice questions, spread across available topics, for a 30-minute session. The preparation screen shows actual counts. Answers are revealed after submission. A refresh offers resumption using the original start time; an expired resumed session is submitted with unanswered questions in the denominator. Submitted reports include per-topic gaps, answer review and practice links. Recent reports can be reopened. Structured legacy papers can include essay self-assessment and are not equivalent to externally marked examination results.

The browser must retain local storage to resume a session. Browser/device sync is not implemented. Existing optional KaTeX resources use a CDN; core app startup and tests work without that CDN, with formulas shown as source text if it is unavailable.

## Development and validation

Use Node.js 20 or newer.

```sh
npm ci --ignore-scripts
npm test
npm run build:css
npx playwright install chromium
npm run test:browser
```

`node scripts/validate.js` is a compatibility entry point for syntax, catalogue and behavioural tests. No tests exempt browser assets from syntax checking.

Browser tests use isolated Chromium contexts at 1280, 768 and 390 px, block optional external resources, fail on application exceptions or missing local assets, and exercise Dashboard, all seven subject maps, task completion, persisted records, dynamic navigation/history, mock submission, refresh/resumption, timeouts and report repair links. Screenshots go to ignored `test-results/` and are uploaded by CI. Set `CHROME_PATH` to test with a locally installed Chrome instead of Playwright Chromium.

Tailwind styles are precompiled and committed as `data/tailwind.css`. CI rebuilds and checks for drift. The runtime no longer downloads or executes the Tailwind compiler. Catalogue maps index question lookups and topic membership.

## Remaining product depth

Bullet-level official-objective audits for all seven subjects, further CS/English depth, authentic listening/speaking assessment, and externally marked full-paper mocks remain content/product work. Current automated tests establish the implemented local learning flows, not pedagogical validation of every legacy question or official assessment equivalence.
