# Visual learning workspaces

This release implements the eight agreed interface improvements using existing curriculum and learning records. It does not add curriculum content, cloud sync, an illustrated game world or a real-time physics simulator.

## Learner flow

- **Dashboard:** switch between Today's tasks, Seven-subject overview and Curriculum route/coverage. Continue learning returns to the last opened topic. Only the first three daily tasks are expanded. Other tasks remain available under the expansion control. Reading progress uses a part-of-whole donut; mastery estimates use independent subject progress bars.
- **Learning centre:** Today and Textbook entry points converge here. Select a subject, chapter or keyword; opening a topic hides the list and focuses the lesson. Returning retains filters. Materials, school pacing, advanced courses, writing and English skills remain accessible. Reading an already opened topic does not award additional reading XP.
- **Practice and assessment:** Diagnostic assessment is the first mode button. Chapter practice groups topics by curriculum chapter with school scope and search filters. Mistake review and mock exams retain their existing scoring and records. Changing subject clears an ordinary practice session; an active mock cannot be replaced by subject selection or assessment.
- **Quick reference:** seven subject controls, key-point group and keyword filters. Groups are collapsed until selected or searched. A subject without matching data shows an explicit empty state.
- **Vocabulary:** seven subjects or mixed mode, chapter and bilingual search. Games use the selected range, balance mixed subjects and stop after ten words. Feedback remains until Next; incorrect words are reviewed at the end and recorded by the existing vocabulary mistake mechanism.
- **Growth:** player summary followed by Subject progress, Assessment records and Badge collection. Seven-day charts use recorded activity only; badge requirements are expandable. Platform XP and assessment levels are not official grades.
- **Motion Lab:** compact status, selectable objective route and an active task workspace. Mobile route selection precedes the task. Topic practice matches the selected objective. Reading is rewarded once and does not increase answer mastery. Empty numeric input is rejected; a response is recorded once until the next task. Graph examples explain gradient and area with text equivalents.

## Compatibility

Old `#page-home` and `#page-assessment` bookmarks resolve to the learning centre and assessment mode within practice. Learning data retains the existing schema. Presentation preferences live separately in `igcseWorkspacePrefs` and are not imported as learning evidence. Motion's existing dedicated storage remains independent of the main subject statistics.

## Verification

The browser regression includes real learner operations at 1280, 768 and 390 pixel widths, chapter/topic scope, assessment visibility, old bookmark resolution, rereading XP, subject-isolated vocabulary filters, mixed ten-word games, profile sections, Motion reading/answer guards and overflow checks. Existing upload, writing, syllabus, school pacing, advanced study, exam timing/resumption/report and backup flows also run. Screenshots are written to `test-results` and published by the existing CI artifact step.

## Delivery

This UI branch builds on the still-open private-pilot PR #5. Keep its review separate by targeting that branch; validate this branch through the existing workflow's manual dispatch. Main-branch merge and changes to the live Render deployment are separate from opening the reviewable PR.
