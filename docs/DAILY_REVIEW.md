# Daily review: November 2026 increment

The dashboard's **今日任务** view puts due vocabulary and writing recall before ordinary chapter tasks. Legacy chapter mistakes are also eligible for the existing SRS practice flow.

- Vocabulary: up to five due, unmastered words from subject and CET banks; the task opens a restricted arcade pool with full-bank distractors. **返回完整词库** exits this pool. Due dates and independently qualifying answers control completion. Matching, hints, wrong-answer correction and premature same-day retries do not finish an independent review task.
- Writing: explicitly requested AI grammar checks capture up to 20 short corrections per response, retained locally up to 100 items. Drafts are unchanged. The dashboard opens one typed correction at a time; showing a suggestion or correcting an error is assisted, so the item remains due. Independent success schedules 1/3/7/14-day intervals. Capitalization matters. AI suggestions still require learner judgment; exact-match recall is not a general writing assessment.
- Privacy: correction excerpts stay in the existing account-isolated browser storage. No new AI calls or cloud uploads were introduced. These review excerpts are not yet part of the portable backup; existing writing drafts and study state remain backed up as before.

## Content batch
Ten existing lessons gained original English explanations (two each in mathematics, physics, chemistry, business and computer science). Twelve existing questions gained Chinese task support and explanations, two in each of those subjects plus English. Original question text, answer keys, English stimuli, topic IDs and syllabus references are unchanged. D&T expansion is deferred.

This batch is not complete syllabus coverage. The field audit still reports the following missing English lesson notes / Chinese question support:

| Subject | English notes missing | Chinese question support missing |
| --- | ---: | ---: |
| Mathematics | 8 | 46 |
| Physics | 30 | 84 |
| Chemistry | 11 | 52 |
| Business | 30 | 32 |
| Computer science | 21 | 138 |
| English | 0 | 82 |

Run `node scripts/content_language_audit.cjs` to refresh. These counts measure populated fields, not translation quality, full syllabus coverage or learner mastery. Existing listening and speaking functionality is unchanged; Android audio still needs a real-device check.
