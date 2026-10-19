/* Original additional contexts for selected audited objectives; not exhaustive coverage. */
(function(){
 'use strict';
 const questions=[
 {
  "id": "release_business_1",
  "subject": "business",
  "topicId": "course_business_mix",
  "objectiveAuditId": "business_price",
  "syllabusRef": "3.3.2",
  "objectiveRefs": [
   "3.3.2"
  ],
  "type": "choice",
  "question": "A new café wants rapid market entry in an area with many established rivals. Which pricing approach uses a deliberately low initial price?",
  "answer": "Penetration",
  "explain": "Penetration aims to attract customers initially; check contribution and whether the price can be sustained.",
  "options": [
   "Penetration",
   "Skimming",
   "Charging every buyer a different random amount",
   "Removing all prices"
  ]
 },
 {
  "id": "release_business_2",
  "subject": "business",
  "topicId": "course_business_mix",
  "objectiveAuditId": "business_price",
  "syllabusRef": "3.3.2",
  "objectiveRefs": [
   "3.3.2"
  ],
  "type": "number",
  "question": "Unit cost is $8. A retailer adds 25% of cost. Enter the selling price in dollars.",
  "answer": "10",
  "explain": "Cost-plus price = 8 × 1.25 = 10; markup uses cost, unlike profit margin based on revenue."
 },
 {
  "id": "release_business_3",
  "subject": "business",
  "topicId": "course_business_ratios",
  "objectiveAuditId": "business_profitability",
  "syllabusRef": "5.5.1",
  "objectiveRefs": [
   "5.5.1"
  ],
  "type": "number",
  "question": "Profit rises from $12000 to $15000 while revenue rises from $60000 to $100000. Enter the new profit margin as a percentage.",
  "answer": "15",
  "explain": "15000/100000 × 100 = 15%; previous margin was 20%. Higher absolute profit need not mean higher margin."
 },
 {
  "id": "release_business_4",
  "subject": "business",
  "topicId": "course_business_ratios",
  "objectiveAuditId": "business_users",
  "syllabusRef": "5.5.3",
  "objectiveRefs": [
   "5.5.3"
  ],
  "type": "choice",
  "question": "A supplier offers 60 days of trade credit. Which additional evidence is most relevant to repayment?",
  "answer": "Cash forecasts and expected receipt dates",
  "explain": "A supplier needs to assess whether cash is available when invoices fall due. Historic profit alone is insufficient.",
  "options": [
   "Cash forecasts and expected receipt dates",
   "Only the logo colour",
   "The number of social posts alone",
   "Assume every profitable firm has enough cash"
  ]
 },
 {
  "id": "release_business_5",
  "subject": "business",
  "topicId": "course_business_mix",
  "objectiveAuditId": "business_lifecycle",
  "syllabusRef": "3.3.1",
  "objectiveRefs": [
   "3.3.1"
  ],
  "type": "choice",
  "question": "Monthly sales are 100, 180, 310 and 490 units. Which phase is most consistent with this trend, assuming a newly launched product?",
  "answer": "Growth",
  "explain": "Rising sales after launch are consistent with growth; a short series alone cannot establish the whole life cycle.",
  "options": [
   "Growth",
   "Confirmed decline",
   "Permanent zero demand",
   "Maturity is guaranteed"
  ]
 },
 {
  "id": "release_math_1",
  "subject": "math",
  "topicId": "math_number_01",
  "objectiveAuditId": "math_surds",
  "syllabusRef": "E1.18.2",
  "objectiveRefs": [
   "E1.18.2"
  ],
  "type": "choice",
  "question": "Which expression equals 6/√3 after rationalising the denominator?",
  "answer": "2√3",
  "explain": "Multiply numerator and denominator by √3: 6√3/3 = 2√3.",
  "options": [
   "2√3",
   "6√3",
   "2/√3",
   "√3/6"
  ]
 },
 {
  "id": "release_math_2",
  "subject": "math",
  "topicId": "math_number_01",
  "objectiveAuditId": "math_surds",
  "syllabusRef": "E1.18.2",
  "objectiveRefs": [
   "E1.18.2"
  ],
  "type": "choice",
  "question": "Which expression equals 1/(2+√3)?",
  "answer": "2−√3",
  "explain": "Multiply by the conjugate 2−√3; denominator 4−3 = 1.",
  "options": [
   "2−√3",
   "2+√3",
   "1/5",
   "√3−2"
  ]
 },
 {
  "id": "release_math_3",
  "subject": "math",
  "topicId": "course_math_reverse",
  "objectiveAuditId": "math_reverse",
  "syllabusRef": "E1.13.5",
  "objectiveRefs": [
   "E1.13.5"
  ],
  "type": "number",
  "question": "After a 10% rise and then a 20% discount a price is $88. Enter the original price.",
  "answer": "100",
  "explain": "The multiplier is 1.10 × 0.80 = 0.88; original = 88/0.88 = 100."
 },
 {
  "id": "release_math_4",
  "subject": "math",
  "topicId": "course_math_reverse",
  "objectiveAuditId": "math_interest",
  "syllabusRef": "E1.13.4",
  "objectiveRefs": [
   "E1.13.4"
  ],
  "type": "number",
  "question": "An investment grows from $500 to $605 at 10% compound interest annually. Enter the number of years.",
  "answer": "2",
  "explain": "500 × 1.10² = 605; repeated multiplication gives two years."
 },
 {
  "id": "release_math_5",
  "subject": "math",
  "topicId": "course_math_bounds",
  "objectiveAuditId": "math_bounds",
  "syllabusRef": "E1.10.2",
  "objectiveRefs": [
   "E1.10.2"
  ],
  "type": "number",
  "question": "Mass 10.0 g and volume 2.0 cm³ are each rounded to the nearest 0.1. Enter the upper bound for density to 4 decimal places.",
  "answer": "5.153846153846154",
  "explain": "For positive mass/volume use mass upper bound 10.05 and volume lower bound 1.95: 5.153846… g/cm³."
 },
 {
  "id": "release_physics_1",
  "subject": "physics",
  "topicId": "course_physics_heat",
  "objectiveAuditId": "physics_solid",
  "syllabusRef": "2.2.2.4",
  "objectiveRefs": [
   "2.2.2.4"
  ],
  "type": "number",
  "question": "A 0.50 kg block absorbs 4500 J and warms by 20 °C. Enter specific heat capacity in J/(kg °C).",
  "answer": "450",
  "explain": "c=E/(mΔθ)=4500/(0.50×20)=450. Use temperature change, not final temperature."
 },
 {
  "id": "release_physics_2",
  "subject": "physics",
  "topicId": "course_physics_heat",
  "objectiveAuditId": "physics_liquid",
  "syllabusRef": "2.2.2.4",
  "objectiveRefs": [
   "2.2.2.4"
  ],
  "type": "number",
  "question": "A 0.40 kg liquid warms by 5 °C. Electrical input is 10000 J, but 2000 J heats the container or escapes. Enter the liquid specific heat capacity in J/(kg °C).",
  "answer": "4000",
  "explain": "Liquid energy=8000 J; c=8000/(0.40×5)=4000. Using all input would give 5000, an overestimate."
 },
 {
  "id": "release_physics_3",
  "subject": "physics",
  "topicId": "phy0625_4_6",
  "objectiveAuditId": "physics_loss",
  "syllabusRef": "4.5.6.8",
  "objectiveRefs": [
   "4.5.6.8"
  ],
  "type": "number",
  "question": "A 12000 W load receives power at 600 V. Cable resistance is 0.5 Ω. Ignore voltage drop when calculating current. Enter cable loss in W.",
  "answer": "200",
  "explain": "I=P/V=20 A; cable loss I²R=200 W."
 },
 {
  "id": "release_physics_4",
  "subject": "physics",
  "topicId": "phy0625_4_6",
  "objectiveAuditId": "physics_loss",
  "syllabusRef": "4.5.6.8",
  "objectiveRefs": [
   "4.5.6.8"
  ],
  "type": "number",
  "question": "For the same transmitted power and cable resistance, voltage is doubled. What fraction of the original cable power loss remains? Enter a decimal.",
  "answer": "0.25",
  "explain": "Current halves; I²R becomes one quarter. This comparison assumes the same transmitted power and resistance."
 },
 {
  "id": "release_physics_5",
  "subject": "physics",
  "topicId": "phy0625_4_6",
  "objectiveAuditId": "physics_transformer",
  "syllabusRef": "4.5.6.3",
  "objectiveRefs": [
   "4.5.6.3"
  ],
  "type": "number",
  "question": "An ideal transformer has 1000 primary turns, 200 secondary turns and 230 V primary voltage. Enter secondary voltage in V.",
  "answer": "46",
  "explain": "Vs/Vp=Ns/Np; Vs=230×200/1000=46 V. An alternating input is needed."
 },
 {
  "id": "release_chemistry_1",
  "subject": "chemistry",
  "topicId": "course_chemistry_moles",
  "objectiveAuditId": "chemistry_gas",
  "syllabusRef": "3.3.4",
  "objectiveRefs": [
   "3.3.4"
  ],
  "type": "number",
  "question": "2H2 + O2 → 2H2O. At room temperature and pressure, what volume of H2 in dm³ reacts with 1.2 dm³ O2?",
  "answer": "2.4",
  "explain": "Gas volumes at the same conditions follow the 2:1 mole ratio."
 },
 {
  "id": "release_chemistry_2",
  "subject": "chemistry",
  "topicId": "course_chemistry_moles",
  "objectiveAuditId": "chemistry_solution",
  "syllabusRef": "3.3.5",
  "objectiveRefs": [
   "3.3.5"
  ],
  "type": "number",
  "question": "250 cm³ of 0.200 mol/dm³ solution is diluted to 500 cm³. Enter new concentration in mol/dm³.",
  "answer": "0.1",
  "explain": "Moles remain 0.0500; divide by 0.500 dm³ to obtain 0.100."
 },
 {
  "id": "release_chemistry_3",
  "subject": "chemistry",
  "topicId": "course_chemistry_moles",
  "objectiveAuditId": "chemistry_titration",
  "syllabusRef": "3.3.6",
  "objectiveRefs": [
   "3.3.6"
  ],
  "type": "number",
  "question": "H2SO4 + 2NaOH → Na2SO4 + 2H2O. 25.0 cm³ acid reacts with 20.0 cm³ of 0.100 mol/dm³ NaOH. Enter acid concentration in mol/dm³.",
  "answer": "0.04",
  "explain": "NaOH 0.00200 mol; acid half that =0.00100 mol; divide by 0.0250 dm³ =0.0400."
 },
 {
  "id": "release_chemistry_4",
  "subject": "chemistry",
  "topicId": "course_chemistry_moles",
  "objectiveAuditId": "chemistry_formula",
  "syllabusRef": "3.3.7",
  "objectiveRefs": [
   "3.3.7"
  ],
  "type": "choice",
  "question": "A compound has empirical formula CH2 and Mr=56. Use Ar(C)=12 and Ar(H)=1. Which molecular formula fits?",
  "answer": "C4H8",
  "explain": "Empirical formula mass 14; multiplier 56/14=4.",
  "options": [
   "C4H8",
   "CH2",
   "C2H4",
   "C4H4"
  ]
 },
 {
  "id": "release_chemistry_5",
  "subject": "chemistry",
  "topicId": "course_chemistry_moles",
  "objectiveAuditId": "chemistry_solution",
  "syllabusRef": "3.3.5",
  "objectiveRefs": [
   "3.3.5"
  ],
  "type": "number",
  "question": "5.85 g NaCl (Mr=58.5) is dissolved to make 200 cm³ solution. Enter concentration in mol/dm³.",
  "answer": "0.5",
  "explain": "n=5.85/58.5=0.100 mol; V=0.200 dm³; c=0.500 mol/dm³."
 },
 {
  "id": "release_computer_science_1",
  "subject": "computer_science",
  "topicId": "cs0478_9",
  "objectiveAuditId": "computer_science_sql",
  "syllabusRef": "9.4",
  "objectiveRefs": [
   "9.4"
  ],
  "type": "choice",
  "question": "Table Students has Name and Score. Which query returns names scoring at least 70?",
  "answer": "SELECT Name FROM Students WHERE Score >= 70;",
  "explain": "SELECT chooses the field; FROM names the table; WHERE filters rows, including exactly 70.",
  "options": [
   "SELECT Name FROM Students WHERE Score >= 70;",
   "SELECT Score WHERE Students >= 70;",
   "DELETE FROM Students;",
   "SELECT Name FROM Students WHERE Score > 70;"
  ]
 },
 {
  "id": "release_computer_science_2",
  "subject": "computer_science",
  "topicId": "cs0478_9",
  "objectiveAuditId": "computer_science_sql",
  "syllabusRef": "9.4",
  "objectiveRefs": [
   "9.4"
  ],
  "type": "number",
  "question": "Scores are 65, 70, 80 and 90. How many rows satisfy WHERE Score >= 70 AND Score < 90?",
  "answer": "2",
  "explain": "70 and 80 satisfy both conditions; 90 is excluded."
 },
 {
  "id": "release_computer_science_3",
  "subject": "computer_science",
  "topicId": "cs0478_8",
  "objectiveAuditId": "computer_science_array",
  "syllabusRef": "8.2.3",
  "objectiveRefs": [
   "8.2.3"
  ],
  "type": "number",
  "question": "A 2×3 array contains rows [2,4,6] and [1,3,5]. Enter the total obtained by visiting every element once.",
  "answer": "21",
  "explain": "Two nested loops visit six entries: 2+4+6+1+3+5=21."
 },
 {
  "id": "release_computer_science_4",
  "subject": "computer_science",
  "topicId": "course_computer_science_filetask",
  "objectiveAuditId": "computer_science_read",
  "syllabusRef": "8.3.2",
  "objectiveRefs": [
   "8.3.2"
  ],
  "type": "choice",
  "question": "Why check NOT EOF before reading the next record?",
  "answer": "To avoid reading beyond the last record",
  "explain": "EOF marks that no next record remains; it does not validate the data type.",
  "options": [
   "To avoid reading beyond the last record",
   "To encrypt the file",
   "To ensure every value is positive",
   "To overwrite all records"
  ]
 },
 {
  "id": "release_computer_science_5",
  "subject": "computer_science",
  "topicId": "cs0478_9",
  "objectiveAuditId": "computer_science_sql",
  "syllabusRef": "9.4",
  "objectiveRefs": [
   "9.4"
  ],
  "type": "essay",
  "question": "Write SQL to return Name and Score from Students for Score >= 70, sorted by Score descending. Explain why SELECT * may expose unnecessary fields.",
  "answer": "SELECT Name, Score FROM Students WHERE Score >= 70 ORDER BY Score DESC; Selecting only required columns avoids returning unrelated fields.",
  "explain": "Manual query construction; this platform does not execute SQL.",
  "assessmentMode": "self-assessment",
  "rubric": [
   "使用题目证据",
   "展示推理或步骤",
   "说明结论与限制"
  ]
 },
 {
  "id": "release_english_1",
  "subject": "english",
  "topicId": "course_english_evidence",
  "objectiveAuditId": "english_select",
  "syllabusRef": "R3",
  "objectiveRefs": [
   "R3"
  ],
  "type": "choice",
  "question": "Notice: Workshops start at 09:30; registration closes at 09:10; bring a notebook. What is the latest listed registration time?",
  "answer": "09:10",
  "explain": "Select the registration deadline, not the starting time.",
  "options": [
   "09:10",
   "09:30",
   "10:30",
   "No time is stated"
  ]
 },
 {
  "id": "release_english_2",
  "subject": "english",
  "topicId": "course_english_evidence",
  "objectiveAuditId": "english_infer",
  "syllabusRef": "R4",
  "objectiveRefs": [
   "R4"
  ],
  "type": "choice",
  "question": "Original text: \"Jules reread the invitation twice before finally pressing send.\" Which inference is most cautious?",
  "answer": "Jules wanted to check the invitation before sending it",
  "explain": "Rereading supports checking; it does not prove fear, a particular error or dislike.",
  "options": [
   "Jules wanted to check the invitation before sending it",
   "Jules certainly deleted the invitation",
   "Jules refused to send it",
   "Jules never read it"
  ]
 },
 {
  "id": "release_english_3",
  "subject": "english",
  "topicId": "course_english_revision",
  "objectiveAuditId": "english_revision",
  "syllabusRef": "W3",
  "objectiveRefs": [
   "W3"
  ],
  "type": "choice",
  "question": "Which sentence maintains a completed past-time narrative?",
  "answer": "We checked the route before we left.",
  "explain": "Both clauses use past tense for completed events.",
  "options": [
   "We checked the route before we left.",
   "We check the route yesterday.",
   "We checked the route before we leaves.",
   "We was checking yesterday."
  ]
 },
 {
  "id": "release_english_4",
  "subject": "english",
  "topicId": "course_english_emailtask",
  "objectiveAuditId": "english_register",
  "syllabusRef": "W4",
  "objectiveRefs": [
   "W4"
  ],
  "type": "essay",
  "question": "Rewrite \"Send it now!\" as a polite request to a teacher and explain how the audience affects your wording.",
  "answer": "Could you please send the assignment instructions when you have time? A polite modal and specific purpose are appropriate to a teacher.",
  "explain": "Self-review of register and task clarity; no official writing score.",
  "assessmentMode": "preparation",
  "rubric": [
   "使用题目证据",
   "展示推理或步骤",
   "说明结论与限制"
  ]
 },
 {
  "id": "release_english_5",
  "subject": "english",
  "topicId": "course_english_revision",
  "objectiveAuditId": "english_revision",
  "syllabusRef": "W3",
  "objectiveRefs": [
   "W3"
  ],
  "type": "essay",
  "question": "Correct \"My friends was tired, they goes home\" for a completed past event, and explain both verb changes and the sentence boundary.",
  "answer": "My friends were tired, so they went home. Plural friends requires were; went is past tense; so links two clauses rather than a comma splice.",
  "explain": "Compare the original meaning and each correction; more than one punctuation solution may be valid.",
  "assessmentMode": "preparation",
  "rubric": [
   "使用题目证据",
   "展示推理或步骤",
   "说明结论与限制"
  ]
 }
],notes={"math_number_01": ["分母有理化：6/√3 乘以 √3/√3 得 2√3。遇到 1/(2+√3)，用共轭 2−√3，使分母成为 4−3；不要只乘分母。"], "course_business_ratios": ["跨期比较先统一口径。利润从 12000 增至 15000，但收入从 60000 增至 100000，利润率从 20% 降至 15%。供应商提供赊销时还应查收款时间、现金预测与已有债务。"], "course_chemistry_moles": ["非 1:1 滴定先按方程换算。H2SO4 与 NaOH 比为 1:2，20.0 cm³、0.100 mol/dm³ 碱对应 0.00100 mol 酸；25.0 cm³ 酸浓度为 0.0400 mol/dm³。稀释保持溶质 mol 不变。"], "phy0625_4_6": ["固定输送功率 P 和电阻 R 下，I=P/V、损耗=I²R；电压加倍使电流减半、损耗降至四分之一。比例推理要说明固定条件，不能把它当作任意电路的结论。"], "cs0478_9": ["完整 SQL 查询应包含选择字段、表名、筛选条件与需要的排序。例如 SELECT Name, Score FROM Students WHERE Score >= 70 ORDER BY Score DESC。这里只练习手工构建与追踪，不执行数据库命令。"]};
 const editions={business:['0264','2027-2029'],math:['0580','2025-2027'],physics:['0625','2026-2028'],chemistry:['0620','2026-2028'],computer_science:['0478','2026-2028'],english:['0510','2027-2029']};
 const topics=[].concat(window.IGCSE_CONTENT||[],window.IGCSE_EXPANSION_CONTENT||[],window.IGCSE_CS_CONTENT||[],window.PHYSICS_0625_COURSE_MAP||[],window.IGCSE_FOUNDATION_CONTENT||[],window.IGCSE_ENGLISH_CONTENT||[],window.IGCSE_CS_DEEP_CONTENT||[],window.IGCSE_ENGLISH_DEEP_CONTENT||[]);
 for(const q of questions){q.syllabusRef=q.subject==='math'?q.syllabusRef.replace(/^E/,'').split('.')[0]:q.subject==='chemistry'?q.syllabusRef.split('.')[0]:q.subject==='business'?q.syllabusRef.split('.').slice(0,2).join('.'):q.subject==='computer_science'?(q.syllabusRef.startsWith('9')?'9':q.syllabusRef.split('.').slice(0,2).join('.')):q.subject==='physics'?(q.syllabusRef.startsWith('4.5.6')?'4.5.6':'2.2'):q.syllabusRef;const t=topics.find(t=>t.topicId===q.topicId&&t.subject===q.subject);if(!t)throw Error('Missing release lesson '+q.topicId);const [code,year]=editions[q.subject];Object.assign(q,{syllabus:code,syllabusYear:year,tier:q.subject==='math'?'Extended':q.subject==='physics'&&q.objectiveAuditId==='physics_transformer'?'Core':['physics','chemistry'].includes(q.subject)?'Supplement':'unclassified',source:'original',pastPaper:false,alignmentLevel:'selected-objective-sample',practiceLevel:'integrated',difficulty:3,marks:q.type==='essay'?0:1,xpReward:q.type==='essay'?0:10,tolerance:0.0001,skill:q.type==='number'?'calculation':'application'});if(q.subject==='english')q.assessmentMode='preparation';}
 for(const [id,lines] of Object.entries(notes)){const t=topics.find(t=>t.topicId===id);t.depthNotes=(t.depthNotes||[]).concat(lines);}
 window.IGCSE_RELEASE_DEPTH_QUESTIONS=questions;
})();
