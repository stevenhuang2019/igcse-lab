/* IGCSE 教材知识点数据（CIE 大纲示例版） */
window.IGCSE_CONTENT = [
  /* ============ 数学 Math ============ */
  {
    "exam_board": "CIE", "subject": "math", "chapter": "Algebra", "topicId": "math_algebra_01",
    "title": "括号展开 Expanding brackets",
    "knowledge": "展开括号是代数运算的基础：一个括号乘以外面的数或代数式时，括号内每一项都要分别相乘，再把结果合并。常见的三种形式：单括号分配律、双括号逐项相乘（FOIL）、完全平方。",
    "formulas": ["$$a(b+c) = ab+ac$$", "$$(a+b)(c+d) = ac+ad+bc+bd$$", "$$(a+b)^2 = a^2+2ab+b^2$$"],
    "imageUrls": [],
    "commonMistake": "很多同学只对第一项相乘，忘记乘第二项（例如把 $2(x+3)$ 写成 $2x+3$）；做完全平方时漏掉中间的 $2ab$ 项。"
  },
  {
    "exam_board": "CIE", "subject": "math", "chapter": "Algebra", "topicId": "math_algebra_02",
    "title": "二次方程求解 Quadratic equations",
    "knowledge": "解二次方程 $ax^2+bx+c=0$ 的三种方法：因式分解（能分解时最快）、配方法、求根公式。求解后建议代回原方程检验。注意判别式 $b^2-4ac$ 决定根的个数。",
    "formulas": ["$$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$", "$$\\Delta = b^2-4ac$$"],
    "imageUrls": [],
    "commonMistake": "用求根公式时忘记负号：$-b$ 的负号最容易漏；$b^2$ 若 $b$ 为负数也要先平方再取正值。"
  },
  {
    "exam_board": "CIE", "subject": "math", "chapter": "Graphs", "topicId": "math_graphs_01",
    "title": "直线图像 Linear graphs",
    "knowledge": "直线方程一般写成 $y=mx+c$，其中 $m$ 是斜率（gradient），$c$ 是 $y$ 截距。斜率 = 纵坐标变化量 / 横坐标变化量，正斜率向右上升，负斜率向右下降。两条平行线斜率相等。",
    "formulas": ["$$y = mx+c$$", "$$m = \\frac{y_2-y_1}{x_2-x_1}$$"],
    "imageUrls": [],
    "commonMistake": "把 $c$ 当成 $x$ 截距；算斜率时分子分母写反（应先算纵差再算横差）。"
  },

  /* ============ 物理 Physics ============ */
  {
    "exam_board": "CIE", "subject": "physics", "chapter": "Mechanics", "topicId": "phy_mechanics_01",
    "title": "直线运动 Kinematics",
    "knowledge": "匀加速直线运动用四个基本公式描述，注意正方向约定与单位换算（km/h 换 m/s 除以 3.6）。速度-时间图像的面积表示位移，斜率表示加速度。",
    "formulas": ["$$v = u+at$$", "$$s = ut+\\frac{1}{2}at^2$$", "$$v^2 = u^2+2as$$"],
    "imageUrls": [],
    "commonMistake": "公式代入前不统一单位；加速度与初速度方向相反（减速运动）时忘记把 $a$ 取负。"
  },
  {
    "exam_board": "CIE", "subject": "physics", "chapter": "Mechanics", "topicId": "phy_mechanics_02",
    "title": "力与牛顿定律 Forces and Newton's laws",
    "knowledge": "牛顿第二定律 $F=ma$ 中 $F$ 是合力。重量 $W=mg$（$g\\approx 10\\,m/s^2$）。分析受力时先画受力图，再沿运动方向列合力方程。",
    "formulas": ["$$F = ma$$", "$$W = mg$$"],
    "imageUrls": [],
    "commonMistake": "把单个力当成合力代入 $F=ma$；物体在斜面上时忘记把重力分解为沿斜面与垂直斜面的分量。"
  },
  {
    "exam_board": "CIE", "subject": "physics", "chapter": "Electricity", "topicId": "phy_electricity_01",
    "title": "电路基础 Electric circuits",
    "knowledge": "欧姆定律 $V=IR$；串联电路中电流处处相等、电压按电阻分配；并联电路中各支路电压相等、电流按电阻反比分配。电阻串联相加、并联用倒数相加。",
    "formulas": ["$$V = IR$$", "$$R_{series} = R_1+R_2+\\cdots$$", "$$\\frac{1}{R_{parallel}} = \\frac{1}{R_1}+\\frac{1}{R_2}+\\cdots$$"],
    "imageUrls": [],
    "commonMistake": "并联总电阻算成平均值；串联中电流分流（串联电流相同不分流）；单位混淆 mA 与 A。"
  },

  /* ============ 化学 Chemistry ============ */
  {
    "exam_board": "CIE", "subject": "chemistry", "chapter": "Bonding", "topicId": "chem_bonding_01",
    "title": "化学键 Chemical bonding",
    "knowledge": "离子键由金属与非金属间电子转移形成（阴阳离子静电吸引）；共价键由非金属间共用电子对形成。金属键是金属阳离子与自由电子海之间的引力。",
    "formulas": [],
    "imageUrls": [],
    "commonMistake": "把 NaCl 写成共价化合物；以为离子键是共用电子对；混淆离子化合物熔沸点与共价化合物的导电性。"
  },
  {
    "exam_board": "CIE", "subject": "chemistry", "chapter": "Moles", "topicId": "chem_moles_01",
    "title": "摩尔与化学计量 Moles",
    "knowledge": "摩尔是物质的量单位：$n = m/M$（质量除以摩尔质量）。气体摩尔体积在标准状况下约 24 dm³/mol。配平方程式后，系数比即摩尔比。",
    "formulas": ["$$n = \\frac{m}{M}$$", "$$n = \\frac{V}{24\\,dm^3/mol}$$"],
    "imageUrls": [],
    "commonMistake": "摩尔质量单位用 g 而不是 g/mol；忘记把质量单位统一为 g；化学计量比用错（系数是摩尔比不是质量比）。"
  },
  {
    "exam_board": "CIE", "subject": "chemistry", "chapter": "Acids", "topicId": "chem_acids_01",
    "title": "酸碱与 pH Acids, bases and pH",
    "knowledge": "pH 小于 7 为酸性，等于 7 中性，大于 7 碱性。酸与碱中和生成盐和水：$H^+ + OH^- \\rightarrow H_2O$。pH 试纸 / 万能指示剂可测酸碱度。",
    "formulas": ["$$H^+ + OH^- \\rightarrow H_2O$$"],
    "imageUrls": [],
    "commonMistake": "把 pH 值当成浓度；以为中和反应一定放热才叫中和；混淆酸/碱与酸性/碱性氧化物。"
  },

  /* ============ 设计 DT ============ */
  {
    "exam_board": "CIE", "subject": "dt", "chapter": "Design process", "topicId": "dt_process_01",
    "title": "设计流程 Design process",
    "knowledge": "完整设计流程：识别需求/问题 → 调研（用户访谈、问卷、现有产品分析）→ 需求规格（design specification）→ 构思方案（sketching、brainstorm）→ 评估筛选 → 制作原型 → 测试与迭代。每一步都要有用户反馈支撑。",
    "formulas": [],
    "imageUrls": [],
    "commonMistake": "跳过调研直接画方案；把最终设计当成一步到位（迭代和用户测试是关键）；规格书写愿望不写可测指标。"
  },
  {
    "exam_board": "CIE", "subject": "dt", "chapter": "Materials", "topicId": "dt_materials_01",
    "title": "材料特性 Materials and properties",
    "knowledge": "选材要考虑物理与机械性能：强度（strength）、硬度（hardness）、韧性（toughness）、延展性（ductility）、密度、导电性、耐腐蚀性、可持续性等。木材、金属、塑料、复合材料各有适用场景。",
    "formulas": [],
    "imageUrls": [],
    "commonMistake": "把硬度当强度；不考虑加工成本与环保回收；韧性（吸收冲击）与脆性混为一谈。"
  },

  /* ============ 商业研究 Business ============ */
  {
    "exam_board": "CIE", "subject": "business", "chapter": "Marketing", "topicId": "bus_market_01",
    "title": "市场与营销 Marketing mix",
    "knowledge": "营销组合 4P：产品（Product）、价格（Price）、渠道（Place）、促销（Promotion）。营销前先做市场细分（segmentation），确定目标市场（target market）与定位（positioning）。",
    "formulas": [],
    "imageUrls": [],
    "commonMistake": "把促销（promotion）当营销全部；混淆目标市场与市场细分；忽略定价策略（撇脂/渗透）与成本的关系。"
  },
  {
    "exam_board": "CIE", "subject": "business", "chapter": "Finance", "topicId": "bus_finance_01",
    "title": "财务基础 Business finance",
    "knowledge": "核心财务概念：收入（revenue）、成本（固定/变动）、利润 = 收入 - 成本、盈亏平衡点 = 固定成本 ÷（单价 - 单位变动成本）。现金流与利润不同，关注营运资本。",
    "formulas": ["$$Profit = Revenue - Total\\,Costs$$", "$$BEP = \\frac{Fixed\\,Costs}{Price - Variable\\,Cost\\,per\\,unit}$$"],
    "imageUrls": [],
    "commonMistake": "把利润当现金流；盈亏平衡点公式分子分母颠倒；变动成本按总量而不是按单位计算。"
  }
];
