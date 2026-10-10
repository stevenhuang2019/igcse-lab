> 小范围免费部署请优先阅读 [FREE_PILOT_GUIDE.md](FREE_PILOT_GUIDE.md)：环境邀请名单、无需磁盘、保留 AI；内存额度重启会重置。以下持久磁盘方案仍为可选扩展。

# IGCSE Personal Learning OS

A static learning application with seven subject catalogues, topic practice, a shared local learner state, a daily plan and timed mock practice. Serve this directory over HTTP and open `index.html`. No account or backend is required.

[使用说明](USER_GUIDE.md) · [产品化验收范围](PRODUCT_ACCEPTANCE.md)

Start a local preview with `python3 scripts/preview.py` or double-click `start-local.command` on macOS. It uses a stable loopback origin at port 4173 and opens the Dashboard. Python 3 is required only for serving, not for application logic.

## Current coverage

- 1232 questions/tasks across 152 local topics (including retained legacy editions) and seven subjects.
- 62 new original questions: 50 Physics questions spanning 25 course-map sections, plus two each for Math, Chemistry, D&T, Business, CS and English.
- Every local topic has linked questions. This is **local catalogue coverage**, not proof of full official syllabus coverage, exam readiness or a predicted grade. CS and English still have comparatively shallow banks.
- The legacy `phy0625_4_6` ID is retained for saved progress, while its display/reference uses official 4.5 subdivisions (induction 4.5.1, generator 4.5.2, transformer 4.5.6), not a nonexistent official 4.6.
- Physics includes the Solar System and stars/universe sections. Question IDs link topic, chapter and objective metadata without changing legacy learner keys.
- Dashboard averages include unstarted topics. Unique-question practice coverage is based on explicit per-question records; historical topic aggregates remain preserved and are not fabricated into per-question history.
- Daily tasks complete after a matching answer event, not when a card is clicked. Learning state remains in this browser's local storage.

## Syllabus provenance and limits

Syllabus structure and original learning content are separate. Topic mapping does not certify that every objective is represented or that a practice question is an official past-paper question. Original additions have `source: original` and `pastPaper: false`.

Official references checked on 2026-10-09:

- [Physics 0625](https://www.cambridgeinternational.org/Images/697209-2026-2028-syllabus.pdf): course-map section references target examinations in 2026–2028. The concise original objectives and two-question minimum do not provide full depth for every objective or Core/Supplement distinction.
- [Business Studies 0450](https://www.cambridgeinternational.org/programmes-and-qualifications/view/cambridge-igcse-business-studies-0450/): legacy catalogue targets 2026 and remains accessible under its own profile. Business 0264 2027–2029 now has 29 original subsection lessons and 58 checks/open tasks; complete official bullet coverage has not been certified.
- [Design & Technology 0445](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-design-and-technology-0445/): 2024–2026, 2027 and 2028–2030 are separate versions. The existing bank is not labelled as covering a nonexistent 2026–2028 version.
- [Computer Science 0478](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-computer-science-0478/): existing metadata targets 2026–2028, not the revised 2029–2031 curriculum.

## Traceable outline audit

The Dashboard includes a source-linked construction checklist for all seven subjects. `data/syllabus_registry.js` stores original concise labels, official section/assessment-objective identifiers, source PDF, edition and explicit local topic links. This is an outline, not an exhaustive transcription or a completed objective audit. `data/syllabus_audit.js` counts samples only when the question explicitly names the reference **and** matches the syllabus code and edition. Legacy questions without references are not silently credited. Status distinguishes sample practice, preparation only, content association and a construction gap; no percentage claims full official coverage.

The additional 118 authored questions comprise 76 CS questions and 42 English questions. Answer positions are rotated and all prompts, answers and rationales are distinct. The 0510 English references R1–R4, W1–W4, L1–L4 and S1–S4 are tracked separately. English writing strategy, transcript and speaking-planning choices are labelled preparation, not evidence of full writing, auditory comprehension or oral performance. English 0511 is not independently audited. A further 16 original questions and two focused CS lessons cover digital currency (5.2), file handling (8.3) and Physics electromagnetic subsections. CS now has 114 questions, Physics 208 and English 66. The 24 registered CS sections and 29 registered Physics entries each have a referenced sample; this is still an outline, not proof of exhaustive bullet-level coverage.

The checklist has section-specific learning and practice actions, filters for missing samples or preparation-only items, and persisted unique-question completion counts. Repeated attempts count once in section completion. Preparation records remain separate from sample practice. Starting a section exercise while a mock is active returns to the existing mock instead of replacing it.

## Learning and mastery UX

The default landing page is the Dashboard. A new Progress page explains the five base weights (20/30/20/20/10), normalises only observed dimensions and keeps unmeasured evidence null. Legacy inferred SRS and past-paper defaults are excluded without deleting answer history. Actual review events control retention; ordinary practice scheduling cannot overwrite it. An initial assessment uses its score rather than a binary pass/fail proxy. High scores remain provisional until enough distinct objective items and attempts exist; preparation and self-assessed attempts are disclosed separately.

The 42 original foundation questions supply two explicit chapter samples for each of nine Math and twelve Chemistry outline entries, alongside nine new lessons. This is chapter-level coverage, not a Core/Extended or bullet-level completion claim. Correct feedback now remains until the learner explicitly proceeds. Daily activity starts with this version; no historical daily activity is fabricated. Learning data can be exported locally as JSON; import and device sync are not implemented.

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

Browser tests use isolated Chromium contexts at 1280, 768 and 390 px, block optional external resources, fail on application exceptions or missing local assets, and exercise Dashboard, all seven subject maps, task completion, persisted records, dynamic navigation/history, mock submission, refresh/resumption, timeouts and report repair links. The suite also checks Progress filters and history, backup download content, foundation lesson-to-practice flows and explicit progression after feedback. It records DOM-ready timing and decoded local asset bytes, with regression budgets of 5 seconds and 3 MiB; these local controlled measurements are not public-network or Lighthouse scores. Screenshots and performance records go to ignored `test-results/` and are uploaded by CI. Set `CHROME_PATH` to test with a locally installed Chrome instead of Playwright Chromium.

Tailwind styles are precompiled and committed as `data/tailwind.css`. CI rebuilds and checks for drift. The runtime no longer downloads or executes the Tailwind compiler. Catalogue maps index question lookups and topic membership.

## Remaining product depth

Bullet-level official-objective audits for all seven subjects, further CS/English depth, authentic listening/speaking assessment, and externally marked full-paper mocks remain content/product work. Current automated tests establish the implemented local learning flows, not pedagogical validation of every legacy question or official assessment equivalence.


教材与作业：七个科目均可在「我的教材与作业」上传资料、读取文字、保存章节关联并进入练习。详见 [资料库与 AI 使用说明](MATERIALS_GUIDE.md)。资料附件保存在浏览器中，不包含于学习记录备份。AI 分析需要配置服务端凭据。

英语写作：五类 ESL 原创范文、提纲、写作提示和逐条语法修改，见 [写作学习说明](WRITING_GUIDE.md)。

Six-subject content expansion: 55 original worked lessons and 110 checks/open tasks, with Business 0264 edition isolation and reviewed Math/Physics/Chemistry objective references. See [CONTENT_EXPANSION_GUIDE.md](CONTENT_EXPANSION_GUIDE.md). D&T expansion is paused.

Add 48 staged checks and advisory prerequisites, with school-scoped, resumable sample diagnostics and first-response isolation. These are partial sample checks, not formal examinations; English checks remain preparation. See [LEARNING_PATH_GUIDE.md](LEARNING_PATH_GUIDE.md).

Six-subject structured practice mixes numerical/choice checks and saved open responses. Mock reports exclude preparation and self-assessment from objective accuracy. Learning JSON restoration validates and previews records, protects active exams, retains a recovery snapshot and preserves separate material/draft stores. See [RELEASE_GUIDE.md](RELEASE_GUIDE.md) and [ROADMAP_STATUS.md](ROADMAP_STATUS.md).

Private invited pilot deployment: see PRIVATE_PILOT_GUIDE.md. Uses server-side authentication and persistent daily AI request quotas; not deployed by enabling GitHub Pages.
