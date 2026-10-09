/* Keep 0450 evidence and content separate from the new 0264 section samples. */
(function(){
 const registry=window.IGCSE_SYLLABUS_REGISTRY,content=window.IGCSE_EXPANSION_CONTENT||[];
 window.IGCSE_SYLLABUS_EDITIONS={business:{'0450':registry.business}};
 const business=content.filter(t=>t.subject==='business');
 registry.business={code:'0264',year:'2027-2029',sourceUrl:business[0].sourceUrl,checkedOn:'2026-10-09',scope:'section-samples',note:'29 个新版小节已有原创讲解、案例、检查题与自评任务。尚未逐条覆盖所有考纲细目；旧版 0450 题目不计入新版覆盖。',sections:business.map(t=>({ref:t.syllabusRef,label:t.title,topicIds:[t.topicId]}))};
 window.IGCSE_SYLLABUS_EDITIONS.business['0264']=registry.business;
 for(const t of content.filter(t=>t.subject!=='business')){const section=registry[t.subject]?.sections.find(s=>s.ref===t.syllabusRef);if(!section)throw new Error('Missing expansion section '+t.topicId);section.topicIds.push(t.topicId);}
 window.getIGCSERegistry=subject=>subject==='business'&&window.userState?.curriculum?.subjects?.business?.code==='0450'?window.IGCSE_SYLLABUS_EDITIONS.business['0450']:registry[subject];
})();
