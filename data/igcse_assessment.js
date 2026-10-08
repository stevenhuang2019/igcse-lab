/* IGCSE 测评分级数据 */
window.IGCSE_ASSESSMENT = {
  papers: {
    math: ["math_q001", "math_q002", "math_q011", "math_q014", "math_q005", "math_q008", "math_q051", "math_q092", "math_q123", "math_q134", "math_q139", "math_q145"],
    physics: ["phy_q001", "phy_q002", "phy_q009", "phy_q013", "phy_q004", "phy_q005", "phy_q006", "phy_q007", "phy_q121", "phy_q132", "phy_q144", "phy_q148"],
    chemistry: ["chem_q001", "chem_q002", "chem_q012", "chem_q015", "chem_q004", "chem_q005", "chem_q007", "chem_q008", "chem_q121", "chem_q125", "chem_q131", "chem_q141"],
    dt: ["dt_q001", "dt_q002", "dt_q006", "dt_q010", "dt_q004", "dt_q005", "dt_q043", "dt_q053", "dt_q081", "dt_q083", "dt_q091", "dt_q094"],
    business: ["bus_q001", "bus_q002", "bus_q007", "bus_q013", "bus_q004", "bus_q005", "bus_q044", "bus_q048", "bus_q081", "bus_q087", "bus_q095", "bus_q103"],
    computer_science: ["cs1_q1","cs1_q2","cs2_q1","cs3_q1","cs4_q1","cs5_q1","cs6_q1","cs7_q1","cs8_q1","cs8_q2","cs9_q1","cs9_q2"],
    english: ["eng_r1","eng_r2","eng_w1","eng_w2","eng_l1","eng_s1","eng_g1","eng_g2","eng_e1","eng_e2","eng_v1","eng_w3"]
  },
  levels: [
    { "level": 1, "title": "初识入门", "comment": "你刚接触 IGCSE 内容，对各科基础概念还在建立印象。", "advice": "先从每科第一个主题看起，把最基本的定义和公式弄懂，不急于做难题。" },
    { "level": 2, "title": "基础萌芽", "comment": "你已经认识了一些基本概念，但运用起来还不够熟练。", "advice": "重点练习直接代入公式的基础题，把每科第一个主题的例题做熟。" },
    { "level": 3, "title": "起步阶段", "comment": "你能解决部分简单题，但遇到稍需转一步的题目就容易卡住。", "advice": "开始接触计算与应用题，做题时先写出公式再代数，注意单位统一。" },
    { "level": 4, "title": "基础巩固", "comment": "你已掌握各科核心基础题，成绩处于合格线附近。", "advice": "把已经学过的主题系统过一遍，整理笔记，争取基础题少失分。" },
    { "level": 5, "title": "稳步提升", "comment": "你能稳定完成基础与常见应用题，整体达到中等水平。", "advice": "向后学习新主题，同时每周回顾一次旧错题，把知识连成体系。" },
    { "level": 6, "title": "进阶之路", "comment": "你已经覆盖大部分大纲主题，具备一定的综合解题能力。", "advice": "开始接触跨知识点的综合题，有意识训练审题与步骤书写。" },
    { "level": 7, "title": "良好水平", "comment": "你的基础扎实、计算稳定，已达到 B 档左右的水平。", "advice": "针对高频易错点做专项训练，减少非知识性失误，冲击更高分。" },
    { "level": 8, "title": "优秀水平", "comment": "你大部分题目都能拿下，只有少数进阶题会出错。", "advice": "集中攻克压轴与综合应用题，总结题型套路，向 A 档迈进。" },
    { "level": 9, "title": "拔尖水平", "comment": "你已经非常接近 A*/A，知识掌握全面且灵活。", "advice": "做整套真题限时训练，查漏补缺，把错题本反复复盘。" },
    { "level": 10, "title": "冲刺满分", "comment": "你已具备冲击满分的实力，只剩细节与心态需要打磨。", "advice": "回归教材与错题，保持手感，注意答题规范与时间分配。" }
  ],
  paths: [
    { "level": 1, "goal": "建立各科最基础的概念框架，入门 IGCSE 五大学科。", "topics": [
      { "subject": "math", "topicId": "math_algebra_01", "note": "掌握括号展开与分配律，避免漏乘第二项。" },
      { "subject": "physics", "topicId": "phy_mechanics_01", "note": "熟记匀加速直线运动三个基本公式。" },
      { "subject": "chemistry", "topicId": "chem_bonding_01", "note": "会区分离子键、共价键与金属键。" },
      { "subject": "dt", "topicId": "dt_process_01", "note": "熟悉从识别问题到测试迭代的设计流程。" },
      { "subject": "business", "topicId": "bus_understanding", "note": "认识商业活动目的与个体/合伙/有限公司的区别。" },
      { "subject": "english", "topicId": "eng_esl_reading", "note": "训练阅读定位、推断和上下文词义。" }
    ] },
    { "level": 2, "goal": "在入门之上，掌握各科核心计算工具与基本概念。", "topics": [
      { "subject": "math", "topicId": "math_algebra_02", "note": "学会用因式分解解简单二次方程。" },
      { "subject": "physics", "topicId": "phy_mechanics_02", "note": "理解 F=ma，先画受力图再列合力。" },
      { "subject": "chemistry", "topicId": "chem_moles_01", "note": "会用 n=m/M 做质量与摩尔换算。" },
      { "subject": "dt", "topicId": "dt_materials_01", "note": "分清硬度、强度、韧性三个概念。" },
      { "subject": "business", "topicId": "bus_finance", "note": "理解固定成本与变动成本的区别。" },
      { "subject": "english", "topicId": "eng_esl_writing", "note": "掌握 purpose、audience、register 与 paragraph organisation。" }
    ] },
    { "level": 3, "goal": "进入图像、电路与反应规律，练习直接应用类题目。", "topics": [
      { "subject": "math", "topicId": "math_graphs_01", "note": "读懂 y=mx+c 的斜率与截距含义。" },
      { "subject": "physics", "topicId": "phy_electricity_01", "note": "会用欧姆定律 V=IR 分析串并联。" },
      { "subject": "chemistry", "topicId": "chem_acids_01", "note": "掌握 pH 判断与酸碱中和反应。" },
      { "subject": "dt", "topicId": "dt_manufacture_01", "note": "了解注射、吹塑、真空成型等工艺。" },
      { "subject": "business", "topicId": "bus_operations", "note": "区分批量、流水线与单件生产方式。" }
    ] },
    { "level": 4, "goal": "巩固已学内容并拓展到几何、能量、结构等新主题。", "topics": [
      { "subject": "math", "topicId": "math_geometry_01", "note": "会用勾股定理与多边形内角和公式。" },
      { "subject": "physics", "topicId": "phy_energy_01", "note": "理解功、功率与能量守恒关系。" },
      { "subject": "chemistry", "topicId": "chem_redox_01", "note": "会判断氧化还原与金属置换顺序。" },
      { "subject": "dt", "topicId": "dt_structures_01", "note": "认识三角形桁架与拉压弯剪受力。" },
      { "subject": "business", "topicId": "bus_people", "note": "了解招聘、培训与金钱和非金钱激励。" }
    ] },
    { "level": 5, "goal": "稳步推进，接触三角函数、波动与周期表等进阶主题。", "topics": [
      { "subject": "math", "topicId": "math_trig_01", "note": "熟记 SOHCAHTOA 与 30/45/60 特殊角。" },
      { "subject": "physics", "topicId": "phy_waves_01", "note": "掌握波速、频率、波长关系 v=fλ。" },
      { "subject": "chemistry", "topicId": "chem_periodic_01", "note": "理解族与周期的递变规律及同位素。" },
      { "subject": "business", "topicId": "bus_marketing", "note": "掌握市场调研、市场细分与营销组合 4P。" }
    ] },
    { "level": 6, "goal": "完成大纲剩余主题，具备跨章节综合解题能力。", "topics": [
      { "subject": "math", "topicId": "math_stats_01", "note": "会算均值、中位数、众数与简单概率。" },
      { "subject": "physics", "topicId": "phy_electromag_01", "note": "理解变压器匝数比与电动机原理。" },
      { "subject": "chemistry", "topicId": "chem_organic_01", "note": "区分烷烃与烯烃通式及溴水检验。" },
      { "subject": "dt", "topicId": "dt_manufacture_01", "note": "综合运用公差与成型工艺做方案评估。" }
    ] },
    { "level": 7, "goal": "系统复习高频考点，把基础题的失误降到最低。", "topics": [
      { "subject": "math", "topicId": "math_algebra_02", "note": "复习判别式与求根公式，注意负号。" },
      { "subject": "physics", "topicId": "phy_electricity_01", "note": "复习串并联电阻与电压电流分配。" },
      { "subject": "chemistry", "topicId": "chem_moles_01", "note": "复习化学计量比与限量试剂判断。" },
      { "subject": "business", "topicId": "bus_finance", "note": "复习盈亏平衡销量与安全边际计算。" }
    ] },
    { "level": 8, "goal": "攻克进阶与综合题，向 A 档冲刺。", "topics": [
      { "subject": "math", "topicId": "math_trig_01", "note": "复习仰角俯角的实际应用题。" },
      { "subject": "physics", "topicId": "phy_mechanics_02", "note": "复习牛顿第二定律的多力综合题。" },
      { "subject": "chemistry", "topicId": "chem_acids_01", "note": "复习不同盐的制备方法选择。" },
      { "subject": "dt", "topicId": "dt_materials_01", "note": "复习选材权衡与表面处理的作用。" }
    ] },
    { "level": 9, "goal": "拔尖拔高，精练压轴题与真题套卷。", "topics": [
      { "subject": "math", "topicId": "math_stats_01", "note": "复习概率互斥事件与相对频率。" },
      { "subject": "physics", "topicId": "phy_electromag_01", "note": "复习变压器电压匝数比与左手法则。" },
      { "subject": "chemistry", "topicId": "chem_organic_01", "note": "复习发酵制乙醇与聚合物单体。" },
      { "subject": "business", "topicId": "bus_external", "note": "复习政府政策、一体化与全球化风险。" }
    ] },
    { "level": 10, "goal": "考前冲刺，回归错题与教材细节，打磨答题规范。", "topics": [
      { "subject": "math", "topicId": "math_algebra_01", "note": "错题复盘括号展开与完全平方中间项。" },
      { "subject": "physics", "topicId": "phy_mechanics_01", "note": "错题复盘匀加速公式与单位换算。" },
      { "subject": "chemistry", "topicId": "chem_bonding_01", "note": "错题复盘三种化学键的判断依据。" },
      { "subject": "dt", "topicId": "dt_process_01", "note": "梳理设计流程的迭代与用户测试环节。" },
      { "subject": "business", "topicId": "bus_marketing", "note": "复盘撇脂渗透定价与产品生命周期。" }
    ] }
  ]
};
