/* Selected objective audit and original practice. Never a full syllabus inventory. */
(function(){
 'use strict';
 const rows=[
 {
  "id": "business_lifecycle",
  "subject": "business",
  "ref": "3.3.1",
  "label": "生命周期判断与延伸决策",
  "tier": "unclassified",
  "page": 16,
  "topicId": "course_business_mix",
  "remaining": "仍需图像解释、品牌与包装及不同市场案例",
  "questionIds": [
   "objective_business_cycle",
   "objective_business_extension"
  ]
 },
 {
  "id": "business_price",
  "subject": "business",
  "ref": "3.3.2",
  "label": "按需求选择定价方法",
  "tier": "unclassified",
  "page": 16,
  "topicId": "course_business_mix",
  "remaining": "仍需五种方法的多情境比较",
  "questionIds": [
   "objective_business_dynamic"
  ]
 },
 {
  "id": "business_profitability",
  "subject": "business",
  "ref": "5.5.1",
  "label": "利润率及 ROCE 计算与解读",
  "tier": "unclassified",
  "page": 21,
  "topicId": "course_business_ratios",
  "remaining": "仍需同行与跨期比较及数据限制",
  "questionIds": [
   "objective_business_profitmargin",
   "course_business_ratios_depth_2"
  ]
 },
 {
  "id": "business_users",
  "subject": "business",
  "ref": "5.5.3",
  "label": "账户使用者与信息限制",
  "tier": "unclassified",
  "page": 21,
  "topicId": "course_business_ratios",
  "remaining": "开放回答需独立评价；需扩展供应商及员工案例",
  "questionIds": [
   "course_business_ratios_structured"
  ]
 },
 {
  "id": "math_reverse",
  "subject": "math",
  "ref": "E1.13.5",
  "label": "从变化后数值反求原值",
  "tier": "Extended",
  "page": 35,
  "topicId": "course_math_reverse",
  "remaining": "仍需盈亏、连续变化等更多情境",
  "questionIds": [
   "objective_math_reverse2",
   "course_math_reverse_structured"
  ]
 },
 {
  "id": "math_interest",
  "subject": "math",
  "ref": "E1.13.4",
  "label": "复利的逐期乘数",
  "tier": "Extended",
  "page": 35,
  "topicId": "course_math_reverse",
  "remaining": "仍需单利对比及未知期限情境",
  "questionIds": [
   "objective_math_compound"
  ]
 },
 {
  "id": "math_bounds",
  "subject": "math",
  "ref": "E1.10.2",
  "label": "乘除计算的上下界",
  "tier": "Extended",
  "page": 34,
  "topicId": "course_math_bounds",
  "remaining": "仍需误差与有效数字的混合问题",
  "questionIds": [
   "objective_math_boundarea",
   "objective_math_boundspeed",
   "course_math_bounds_structured"
  ]
 },
 {
  "id": "math_surds",
  "subject": "math",
  "ref": "E1.18.2",
  "label": "分母有理化",
  "tier": "Extended",
  "page": 36,
  "topicId": "math_number_01",
  "remaining": "该细目尚无经本轮核对的讲解或样题",
  "questionIds": []
 },
 {
  "id": "physics_solid",
  "subject": "physics",
  "ref": "2.2.2.4",
  "label": "固体比热容实验",
  "tier": "Supplement",
  "page": 20,
  "topicId": "course_physics_heat",
  "remaining": "需测量数据分析及真实实验反馈",
  "questionIds": [
   "course_physics_heat_structured"
  ]
 },
 {
  "id": "physics_liquid",
  "subject": "physics",
  "ref": "2.2.2.4",
  "label": "液体比热容实验",
  "tier": "Supplement",
  "page": 20,
  "topicId": "course_physics_heat",
  "remaining": "仍需实际实验及容器热容修正训练",
  "questionIds": [
   "objective_physics_liquidc",
   "objective_physics_liquidexperiment"
  ]
 },
 {
  "id": "physics_transformer",
  "subject": "physics",
  "ref": "4.5.6.3",
  "label": "匝数与电压比例",
  "tier": "Core",
  "page": 33,
  "topicId": "phy0625_4_6",
  "remaining": "仍需结构、交流与工作原理的审核",
  "questionIds": [
   "objective_physics_turns"
  ]
 },
 {
  "id": "physics_loss",
  "subject": "physics",
  "ref": "4.5.6.8",
  "label": "输电电缆功率损耗",
  "tier": "Supplement",
  "page": 33,
  "topicId": "phy0625_4_6",
  "remaining": "仍需固定传输功率下电压变化的多步题",
  "questionIds": [
   "objective_physics_cableloss"
  ]
 },
 {
  "id": "chemistry_gas",
  "subject": "chemistry",
  "ref": "3.3.4",
  "label": "常温常压气体体积",
  "tier": "Supplement",
  "page": 16,
  "topicId": "course_chemistry_moles",
  "remaining": "仍需反应系数与混合气体情境",
  "questionIds": [
   "objective_chemistry_gasvolume"
  ]
 },
 {
  "id": "chemistry_solution",
  "subject": "chemistry",
  "ref": "3.3.5",
  "label": "溶液浓度与体积单位",
  "tier": "Supplement",
  "page": 16,
  "topicId": "course_chemistry_moles",
  "remaining": "仍需质量浓度与稀释计算",
  "questionIds": [
   "objective_chemistry_concentration"
  ]
 },
 {
  "id": "chemistry_titration",
  "subject": "chemistry",
  "ref": "3.3.6",
  "label": "滴定数据的物质的量比",
  "tier": "Supplement",
  "page": 16,
  "topicId": "course_chemistry_moles",
  "remaining": "仍需非 1:1 方程及实验读数误差",
  "questionIds": [
   "objective_chemistry_titration"
  ]
 },
 {
  "id": "chemistry_formula",
  "subject": "chemistry",
  "ref": "3.3.7",
  "label": "由组成求最简式",
  "tier": "Supplement",
  "page": 16,
  "topicId": "course_chemistry_moles",
  "remaining": "仍需分子式与非整数比练习",
  "questionIds": [
   "objective_chemistry_empirical"
  ]
 },
 {
  "id": "computer_science_read",
  "subject": "computer_science",
  "ref": "8.3.2",
  "label": "文件读取、结束与关闭",
  "tier": "unclassified",
  "page": 29,
  "topicId": "course_computer_science_filetask",
  "remaining": "仍需执行与错误处理验证",
  "questionIds": [
   "objective_computer_science_eof",
   "course_computer_science_filetask_structured"
  ]
 },
 {
  "id": "computer_science_write",
  "subject": "computer_science",
  "ref": "8.3.2",
  "label": "逐行写入与关闭文件",
  "tier": "unclassified",
  "page": 29,
  "topicId": "course_computer_science_filetask",
  "remaining": "手工参考尚不能证明程序执行正确",
  "questionIds": [
   "objective_computer_science_writefile"
  ]
 },
 {
  "id": "computer_science_array",
  "subject": "computer_science",
  "ref": "8.2.3",
  "label": "遍历一维与二维数组",
  "tier": "unclassified",
  "page": 29,
  "topicId": "cs0478_8",
  "remaining": "仍需独立编写及实际运行验证",
  "questionIds": [
   "objective_computer_science_arraytrace",
   "objective_computer_science_array2d"
  ]
 },
 {
  "id": "computer_science_sql",
  "subject": "computer_science",
  "ref": "9.4",
  "label": "编写完整查询",
  "tier": "unclassified",
  "page": 30,
  "topicId": "cs0478_9",
  "remaining": "现有概念题尚未按本细目审核，需完成 SQL 编写与查询验证",
  "questionIds": []
 },
 {
  "id": "english_select",
  "subject": "english",
  "ref": "R3",
  "label": "按阅读目的选取信息",
  "tier": "unclassified",
  "page": 10,
  "topicId": "course_english_evidence",
  "remaining": "短文本样例；仍需更长文本与笔记任务",
  "questionIds": [
   "objective_english_purpose"
  ]
 },
 {
  "id": "english_infer",
  "subject": "english",
  "ref": "R4",
  "label": "从语言线索推断态度",
  "tier": "unclassified",
  "page": 10,
  "topicId": "course_english_evidence",
  "remaining": "仍需完整篇章与多种隐含意义",
  "questionIds": [
   "objective_english_inference"
  ]
 },
 {
  "id": "english_register",
  "subject": "english",
  "ref": "W4",
  "label": "写作目的、受众与语体",
  "tier": "unclassified",
  "page": 10,
  "topicId": "course_english_emailtask",
  "remaining": "需要完整作文及独立评价",
  "questionIds": [
   "objective_english_register",
   "objective_english_audience",
   "course_english_emailtask_structured"
  ]
 },
 {
  "id": "english_listen",
  "subject": "english",
  "ref": "L1",
  "label": "从真实录音听取事实信息",
  "tier": "unclassified",
  "page": 10,
  "topicId": "eng_esl_listening",
  "remaining": "尚未提供本细目的真实音频与听力作答证据",
  "questionIds": []
 }
], questions=[
 {
  "id": "objective_business_cycle",
  "subject": "business",
  "topicId": "course_business_mix",
  "syllabusRef": "3.3",
  "objectiveRefs": [
   "3.3"
  ],
  "tier": "unclassified",
  "type": "choice",
  "question": "A product has falling sales after several years of stable sales. Which life-cycle stage best fits this evidence?",
  "answer": "Decline",
  "explain": "Falling sales after maturity suggest decline; confirm trends rather than assuming every temporary fall proves a stage.",
  "options": [
   "Growth",
   "Introduction",
   "Decline",
   "Maturity"
  ]
 },
 {
  "id": "objective_business_extension",
  "subject": "business",
  "topicId": "course_business_mix",
  "syllabusRef": "3.3",
  "objectiveRefs": [
   "3.3"
  ],
  "tier": "unclassified",
  "type": "essay",
  "question": "An established juice brand has declining sales. Recommend one extension strategy, compare an alternative and state evidence needed before spending on it.",
  "answer": "Adapt packaging to an underserved customer group after testing demand. Compare entering a new market; research customer needs, costs and competitors before deciding.",
  "explain": "Use this reference for self-review; no official score.",
  "rubric": [
   "将延伸策略与情境连接",
   "比较替代方案和成本",
   "说明需要的市场证据"
  ],
  "assessmentMode": "self-assessment"
 },
 {
  "id": "objective_business_dynamic",
  "subject": "business",
  "topicId": "course_business_mix",
  "syllabusRef": "3.3",
  "objectiveRefs": [
   "3.3"
  ],
  "tier": "unclassified",
  "type": "choice",
  "question": "A cinema changes ticket prices according to real-time demand. Which pricing method is this?",
  "answer": "Dynamic pricing",
  "explain": "Dynamic pricing responds to demand; customers may perceive unfairness and demand estimates may be unreliable.",
  "options": [
   "Penetration",
   "Dynamic pricing",
   "Skimming",
   "Cost-plus"
  ]
 },
 {
  "id": "objective_business_profitmargin",
  "subject": "business",
  "topicId": "course_business_ratios",
  "syllabusRef": "5.5",
  "objectiveRefs": [
   "5.5"
  ],
  "tier": "unclassified",
  "type": "number",
  "question": "Revenue is $150000, cost of sales $90000 and other expenses $42000. Enter the profit margin as a percentage without %.",
  "answer": "12",
  "explain": "Profit = 150000−90000−42000 = 18000; 18000/150000 ×100 =12%."
 },
 {
  "id": "objective_math_reverse2",
  "subject": "math",
  "topicId": "course_math_reverse",
  "syllabusRef": "1",
  "objectiveRefs": [
   "1"
  ],
  "tier": "Extended",
  "type": "number",
  "question": "A bicycle costs $234 after a 10% reduction. Enter its original price in dollars.",
  "answer": "260",
  "explain": "0.90x=234; x=234/0.90=260."
 },
 {
  "id": "objective_math_compound",
  "subject": "math",
  "topicId": "course_math_reverse",
  "syllabusRef": "1",
  "objectiveRefs": [
   "1"
  ],
  "tier": "Extended",
  "type": "number",
  "question": "An investment of $500 grows by 4% per year for two years. Enter its final value in dollars.",
  "answer": "540.8",
  "explain": "500 ×1.04²=540.80; the second increase applies to the updated balance."
 },
 {
  "id": "objective_math_boundarea",
  "subject": "math",
  "topicId": "course_math_bounds",
  "syllabusRef": "1",
  "objectiveRefs": [
   "1"
  ],
  "tier": "Extended",
  "type": "number",
  "question": "A rectangle is 6.0 cm by 4.0 cm, each rounded to 0.1 cm. Enter the upper bound of its area in cm².",
  "answer": "24.5025",
  "explain": "Use 6.05 ×4.05 =24.5025 cm²; the endpoint is a bound, not an attained maximum."
 },
 {
  "id": "objective_math_boundspeed",
  "subject": "math",
  "topicId": "course_math_bounds",
  "syllabusRef": "1",
  "objectiveRefs": [
   "1"
  ],
  "tier": "Extended",
  "type": "number",
  "question": "Distance 10.0 m and time 2.0 s are rounded to 0.1. Enter the lower bound of speed to 3 decimal places in m/s.",
  "answer": "4.854",
  "explain": "Smallest distance / largest time =9.95/2.05=4.853658…; round only at the end."
 },
 {
  "id": "objective_physics_liquidc",
  "subject": "physics",
  "topicId": "course_physics_heat",
  "syllabusRef": "2.2",
  "objectiveRefs": [
   "2.2"
  ],
  "tier": "Supplement",
  "type": "number",
  "question": "A liquid of mass 0.25 kg absorbs 5250 J and warms by 5 °C. Enter its specific heat capacity in J/(kg °C).",
  "answer": "4200",
  "explain": "c=E/(mΔθ)=5250/(0.25×5)=4200. Here E is energy absorbed by the liquid, not total heater input."
 },
 {
  "id": "objective_physics_liquidexperiment",
  "subject": "physics",
  "topicId": "course_physics_heat",
  "syllabusRef": "2.2",
  "objectiveRefs": [
   "2.2"
  ],
  "tier": "Supplement",
  "type": "essay",
  "question": "Plan an electrical-heating experiment for a liquid’s specific heat capacity. Include mass, mixing, container heating, energy measurement and safety.",
  "answer": "Weigh liquid by difference; measure temperatures and input energy; stir gently for uniform temperature. Insulate, consider energy warming the container and lost to surroundings, use repeats; avoid hot liquid and keep electrical connections dry.",
  "explain": "Reference guidance only; container heating and heat loss can overestimate c if all input energy is assigned to the liquid.",
  "rubric": [
   "测量质量、温升与能量并使用公式",
   "解释容器吸热、搅拌与热损失",
   "提出安全措施与测量改进"
  ],
  "assessmentMode": "self-assessment"
 },
 {
  "id": "objective_physics_turns",
  "subject": "physics",
  "topicId": "phy0625_4_6",
  "syllabusRef": "4.5.6",
  "objectiveRefs": [
   "4.5.6"
  ],
  "tier": "Core",
  "type": "number",
  "question": "A transformer has 500 primary turns and 100 secondary turns. Primary voltage is 230 V. Enter secondary voltage in V.",
  "answer": "46",
  "explain": "Vs=Vp×Ns/Np=230×100/500=46 V; this is step-down."
 },
 {
  "id": "objective_physics_cableloss",
  "subject": "physics",
  "topicId": "phy0625_4_6",
  "syllabusRef": "4.5.6",
  "objectiveRefs": [
   "4.5.6"
  ],
  "tier": "Supplement",
  "type": "number",
  "question": "A cable has resistance 0.5 Ω and current 20 A. Enter its heating power loss in W.",
  "answer": "200",
  "explain": "P=I²R=20²×0.5=200 W. At the same transmitted power, a higher voltage reduces current and cable losses."
 },
 {
  "id": "objective_chemistry_gasvolume",
  "subject": "chemistry",
  "topicId": "course_chemistry_moles",
  "syllabusRef": "3",
  "objectiveRefs": [
   "3"
  ],
  "tier": "Supplement",
  "type": "number",
  "question": "At r.t.p., molar gas volume is 24 dm³/mol. Enter the volume in dm³ of 0.15 mol of gas.",
  "answer": "3.6",
  "explain": "V=n×24=0.15×24=3.6 dm³=3600 cm³."
 },
 {
  "id": "objective_chemistry_concentration",
  "subject": "chemistry",
  "topicId": "course_chemistry_moles",
  "syllabusRef": "3",
  "objectiveRefs": [
   "3"
  ],
  "tier": "Supplement",
  "type": "number",
  "question": "A solution contains 0.02 mol in 250 cm³. Enter concentration in mol/dm³.",
  "answer": "0.08",
  "explain": "250 cm³=0.250 dm³; concentration=0.02/0.250=0.08 mol/dm³."
 },
 {
  "id": "objective_chemistry_titration",
  "subject": "chemistry",
  "topicId": "course_chemistry_moles",
  "syllabusRef": "3",
  "objectiveRefs": [
   "3"
  ],
  "tier": "Supplement",
  "type": "number",
  "question": "25.0 cm³ of HCl is neutralised by 20.0 cm³ of 0.100 mol/dm³ NaOH. HCl + NaOH → NaCl + H2O. Enter HCl concentration in mol/dm³.",
  "answer": "0.08",
  "explain": "NaOH moles=0.0200×0.100=0.00200; 1:1 gives equal acid moles; concentration=0.00200/0.0250=0.0800."
 },
 {
  "id": "objective_chemistry_empirical",
  "subject": "chemistry",
  "topicId": "course_chemistry_moles",
  "syllabusRef": "3",
  "objectiveRefs": [
   "3"
  ],
  "tier": "Supplement",
  "type": "choice",
  "question": "A compound contains 2.4 g carbon and 0.4 g hydrogen. Ar(C)=12, Ar(H)=1. Which empirical formula fits?",
  "answer": "CH2",
  "explain": "Moles C=0.2, H=0.4; ratio 1:2, hence CH2; a molecular formula also needs molar mass.",
  "options": [
   "C2H",
   "CH2",
   "CH4",
   "C2H2"
  ]
 },
 {
  "id": "objective_computer_science_writefile",
  "subject": "computer_science",
  "topicId": "course_computer_science_filetask",
  "syllabusRef": "8.3",
  "objectiveRefs": [
   "8.3"
  ],
  "tier": "unclassified",
  "type": "essay",
  "question": "Write pseudocode to save the strings Red and Blue as separate lines to a new text file colours.txt, then close it. State what to check before using WRITE on an existing file.",
  "answer": "OPENFILE \"colours.txt\" FOR WRITE; WRITEFILE \"colours.txt\", \"Red\"; WRITEFILE \"colours.txt\", \"Blue\"; CLOSEFILE \"colours.txt\". WRITE may replace existing contents: check requirements and preserve needed data before writing.",
  "explain": "Review manually; the platform does not execute this pseudocode.",
  "rubric": [
   "先打开文件并指定 WRITE",
   "两项文本分别写入并关闭",
   "说明覆盖已有资料的风险"
  ],
  "assessmentMode": "self-assessment"
 },
 {
  "id": "objective_computer_science_eof",
  "subject": "computer_science",
  "topicId": "course_computer_science_filetask",
  "syllabusRef": "8.3",
  "objectiveRefs": [
   "8.3"
  ],
  "tier": "unclassified",
  "type": "number",
  "question": "A file contains three records. A loop checks NOT EOF before every READFILE and increments count once per read. What is the final count?",
  "answer": "3",
  "explain": "Exactly three records are read; checking EOF before reading prevents reading beyond the last record."
 },
 {
  "id": "objective_computer_science_arraytrace",
  "subject": "computer_science",
  "topicId": "cs0478_8",
  "syllabusRef": "8.2",
  "objectiveRefs": [
   "8.2"
  ],
  "tier": "unclassified",
  "type": "number",
  "question": "A[1:3]=[2,4,6]. total starts at 0. FOR i←1 TO 3: total←total+A[i]. Enter total.",
  "answer": "12",
  "explain": "Read each indexed value once: 2+4+6=12; the declared lower bound is 1."
 },
 {
  "id": "objective_computer_science_array2d",
  "subject": "computer_science",
  "topicId": "cs0478_8",
  "syllabusRef": "8.2",
  "objectiveRefs": [
   "8.2"
  ],
  "tier": "unclassified",
  "type": "number",
  "question": "Scores is ARRAY[1:2,1:3] OF INTEGER. How many elements does it contain?",
  "answer": "6",
  "explain": "2 rows ×3 columns=6; nested loops can visit each pair of indexes."
 },
 {
  "id": "objective_english_purpose",
  "subject": "english",
  "topicId": "course_english_evidence",
  "syllabusRef": "R3",
  "objectiveRefs": [
   "R3"
  ],
  "tier": "unclassified",
  "type": "choice",
  "question": "Library notice: Quiet study upstairs; group tables downstairs; printing by reception. You need to discuss a project with friends. Which location fits?",
  "answer": "Downstairs group tables",
  "explain": "Select the information matching the purpose: discussion belongs at group tables, not the quiet area.",
  "options": [
   "Upstairs quiet study",
   "Downstairs group tables",
   "Printing desk",
   "No location is stated"
  ]
 },
 {
  "id": "objective_english_inference",
  "subject": "english",
  "topicId": "course_english_evidence",
  "syllabusRef": "R4",
  "objectiveRefs": [
   "R4"
  ],
  "tier": "unclassified",
  "type": "choice",
  "question": "Mina says, \"I thought the talk would drag, but I forgot to check the time.\" What does this imply?",
  "answer": "She found it engaging",
  "explain": "The contrast with expecting boredom and losing track of time suggests engagement; it does not establish an exact duration.",
  "options": [
   "She found it engaging",
   "She certainly lost her watch",
   "The talk was cancelled",
   "She knows the exact duration"
  ]
 },
 {
  "id": "objective_english_register",
  "subject": "english",
  "topicId": "course_english_emailtask",
  "syllabusRef": "W4",
  "objectiveRefs": [
   "W4"
  ],
  "tier": "unclassified",
  "type": "choice",
  "question": "Which request best suits a formal email to a teacher?",
  "answer": "Could you please confirm the meeting time?",
  "explain": "A polite, clear request suits the purpose and audience. A sentence-choice task is preparation, not evidence of full writing competence.",
  "options": [
   "Hey, tell me now!",
   "Could you please confirm the meeting time?",
   "Whatever, forget it.",
   "Yo teacher, hurry!"
  ],
  "assessmentMode": "preparation"
 },
 {
  "id": "objective_english_audience",
  "subject": "english",
  "topicId": "course_english_emailtask",
  "syllabusRef": "W4",
  "objectiveRefs": [
   "W4"
  ],
  "tier": "unclassified",
  "type": "essay",
  "question": "Revise \"Yo teacher, gimme the details!\" into a polite request for project instructions. Explain one change in register.",
  "answer": "Could you please send me the project instructions? A polite modal request and specific noun suit a teacher better than slang and an imperative.",
  "explain": "Preparation guidance only; not an official writing score.",
  "assessmentMode": "preparation",
  "rubric": [
   "请求内容明确",
   "语体适合老师",
   "解释一项语言选择"
  ]
 }
], notes={
 "course_business_mix": [
  "生命周期判断要结合销售趋势：介绍、增长、成熟、衰退。短期下降不能单独证明衰退。延伸可寻找新市场、新用途、调整产品或包装及推广，但应比较成本和需求证据。",
  "影院动态定价随需求变化，不能与新品撇脂混淆；需考虑顾客公平感、数据可靠性和竞争。"
 ],
 "course_math_reverse": [
  "复利每期乘同一因子。例如 500 元年增 4%，两年为 500×1.04²=540.80；不要直接加 8%。逆百分数先辨认变化后的基数，再除以乘数。"
 ],
 "course_physics_heat": [
  "液体实验称量空容器与装液体容器，差值为液体质量。轻轻搅拌使温度均匀；记录能量输入和温升。容器吸热及环境热损失意味着输入并非全由液体吸收，直接使用总输入常高估比热容。保持电路干燥，避免烫伤。"
 ],
 "course_chemistry_moles": [
  "常温常压取气体摩尔体积 24 dm³/mol：0.15 mol 为 3.6 dm³。溶液 c=n/V 必须先将 cm³ 除以 1000 变成 dm³。",
  "滴定先从已知浓度和体积求 mol，再使用配平方程系数比求另一物质的 mol，最后除其体积。25.0 cm³ 盐酸与 20.0 cm³、0.100 mol/dm³ NaOH 恰好反应，酸浓度为 0.0800 mol/dm³。",
  "最简式：各元素质量除以相对原子质量，再将 mol 比除以最小值；需要分子式时还须使用相对分子质量。"
 ],
 "course_computer_science_filetask": [
  "逐行写入前使用 OPENFILE ... FOR WRITE，分别 WRITEFILE，再 CLOSEFILE。WRITE 可能覆盖原资料，先确认任务需求；需要保留旧资料时不要直接覆盖。这里是手工算法练习，没有执行学生代码。"
 ],
 "course_english_evidence": [
  "按目的阅读先确定需要查找的信息，再选择支持该目的的原文细节。推断用词语和转折作依据；不要加入文中没有的信息。"
 ]
};
 const editions={business:['0264','2027-2029'],math:['0580','2025-2027'],physics:['0625','2026-2028'],chemistry:['0620','2026-2028'],computer_science:['0478','2026-2028'],english:['0510','2027-2029']};
 const topics=[].concat(window.IGCSE_EXPANSION_CONTENT||[],window.IGCSE_CS_CONTENT||[],window.PHYSICS_0625_COURSE_MAP||[]);
 for(const q of questions){if(!topics.some(t=>t.topicId===q.topicId&&t.subject===q.subject))throw new Error('Missing objective lesson '+q.topicId);const [code,year]=editions[q.subject];Object.assign(q,{syllabus:code,syllabusYear:year,source:'original',pastPaper:false,alignmentLevel:'selected-objective-sample',difficulty:2,practiceLevel:'application',skill:q.type==='number'?'calculation':'application',marks:q.type==='essay'?0:1,xpReward:q.type==='essay'?0:10,tolerance:q.id==='objective_math_boundspeed'?0.0005:0.00001});}
 for(const [id,lines] of Object.entries(notes)){const t=topics.find(t=>t.topicId===id);t.depthNotes=(t.depthNotes||[]).concat(lines);}
 window.IGCSE_OBJECTIVE_QUESTIONS=questions;
 window.getIGCSEObjectiveAudit=function(subject){
  const registry=window.getIGCSERegistry?.(subject),edition=editions[subject];
  if(!registry||!edition||registry.code!==edition[0]||registry.year!==edition[1])return null;
  return {subject,code:edition[0],year:edition[1],sourceUrl:registry.sourceUrl,checkedOn:'2026-10-09',scope:'selected-priority-objectives-not-full-inventory',fullInventoryReviewed:false,rows:rows.filter(r=>r.subject===subject).map(r=>{
   const extra=(window.IGCSE_GAP_DEPTH?.questions||[]).filter(q=>q.topicId===r.topicId&&q.objectiveAuditIds?.includes(r.id)).map(q=>q.id);
   const evidence=r.questionIds.concat(extra,(window.IGCSE_RELEASE_DEPTH_QUESTIONS||[]).filter(q=>q.objectiveAuditId===r.id).map(q=>q.id)).map(id=>window.IGCSE_CATALOG.question(id)).filter(q=>q&&q.subject===subject&&q.syllabus===edition[0]&&q.syllabusYear===edition[1]);
   const objective=evidence.filter(q=>q.type!=='essay'&&q.assessmentMode!=='preparation'),open=evidence.filter(q=>q.type==='essay'),preparation=evidence.filter(q=>q.assessmentMode==='preparation');
   return {...r,remaining:r.id==='math_surds'&&objective.length?'已补有理化讲解与两道样题；仍需更多根式组合及独立解答':r.id==='computer_science_sql'&&evidence.length?'已补筛选、排序与完整手工查询；真实 SQL 执行验证仍待建设':r.remaining,questionIds:evidence.map(q=>q.id),objectiveCount:objective.length,openCount:open.length,preparationCount:preparation.length,status:objective.length?'partial':evidence.length?'preparation':'gap'};
  })};
 };
})();
