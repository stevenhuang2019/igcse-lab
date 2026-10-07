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
  },

  /* ============ 新增：数学补充 ============ */
  {
    "exam_board": "CIE", "subject": "math", "chapter": "Geometry", "topicId": "math_geometry_01",
    "title": "几何基础 Geometry",
    "knowledge": "三角形内角和恒为 180°；直角三角形中两直角边的平方和等于斜边平方，即勾股定理。n 边形内角和为 (n-2)×180°；圆的周长 C=2πr、面积 A=πr²，扇形可按圆心角比例计算。",
    "formulas": ["$$a^2+b^2=c^2$$", "$$(n-2)\\times 180^\\circ$$", "$$C=2\\pi r$$", "$$A=\\pi r^2$$"],
    "imageUrls": [],
    "commonMistake": "把勾股定理的 c 当成任意一边，忘记 c 是斜边。"
  },
  {
    "exam_board": "CIE", "subject": "math", "chapter": "Trigonometry", "topicId": "math_trig_01",
    "title": "三角函数 Trigonometry",
    "knowledge": "直角三角形中正弦、余弦、正切由 SOHCAHTOA 定义：sin=对边/斜边，cos=邻边/斜边，tan=对边/邻边。特殊角 30°、45°、60° 的函数值要熟记；解题前先确认计算器处于角度制（DEG）。",
    "formulas": ["$$\\sin\\theta=\\frac{opp}{hyp}$$", "$$\\cos\\theta=\\frac{adj}{hyp}$$", "$$\\tan\\theta=\\frac{opp}{adj}$$"],
    "imageUrls": [],
    "commonMistake": "计算器未切换到角度制（DEG）导致结果错误。"
  },
  {
    "exam_board": "CIE", "subject": "math", "chapter": "Statistics", "topicId": "math_stats_01",
    "title": "统计与概率 Statistics",
    "knowledge": "集中趋势用均值（所有数据之和除以个数）、中位数（排序后中间值）、众数（出现最多的值）描述，极差为最大值减最小值。概率 P(A)=事件 A 发生的结果数除以所有可能结果数，取值在 0 到 1 之间。",
    "formulas": ["$$\\bar{x}=\\frac{\\sum x}{n}$$", "$$P(A)=\\frac{n(A)}{n(S)}$$"],
    "imageUrls": [],
    "commonMistake": "求中位数时忘记先排序；概率分子分母颠倒。"
  },

  /* ============ 新增：物理补充 ============ */
  {
    "exam_board": "CIE", "subject": "physics", "chapter": "Energy", "topicId": "phy_energy_01",
    "title": "能量与功 Energy & work",
    "knowledge": "动能与速度平方成正比，重力势能与高度成正比；力沿位移方向做的功 W=Fs，功率是单位时间内做的功。能量守恒，效率 = 有用能量 ÷ 总输入能量，永远小于 100%。",
    "formulas": ["$$E_k=\\frac{1}{2}mv^2$$", "$$E_p=mgh$$", "$$W=Fs$$", "$$P=\\frac{W}{t}$$"],
    "imageUrls": [],
    "commonMistake": "把功 W 与功率 P 混淆，或算动能时忘记除以 2。"
  },
  {
    "exam_board": "CIE", "subject": "physics", "chapter": "Waves", "topicId": "phy_waves_01",
    "title": "波 Waves",
    "knowledge": "横波振动方向与传播方向垂直，纵波与之平行；波速、频率、波长满足 v=fλ。波遇到界面会反射，进入不同介质会折射，遇到障碍物会衍射。声波是纵波，可见光属于电磁波谱的一部分。",
    "formulas": ["$$v=f\\lambda$$"],
    "imageUrls": [],
    "commonMistake": "用 Hz 与 s 混算时忘记 1Hz=1/s 的换算；混淆横波纵波的振动方向。"
  },
  {
    "exam_board": "CIE", "subject": "physics", "chapter": "Electromagnetism", "topicId": "phy_electromag_01",
    "title": "电磁学 Electromagnetism",
    "knowledge": "通电导体在磁场中受力（电动机原理），导体切割磁感线产生感应电流（发电机/电磁感应原理）。变压器利用互感改变交流电压，电压比等于线圈匝数比。",
    "formulas": ["$$\\frac{V_s}{V_p}=\\frac{N_s}{N_p}$$"],
    "imageUrls": [],
    "commonMistake": "以为发电机与电动机原理相同无需能量转换；变压器只能用于交流电。"
  },

  /* ============ 新增：化学补充 ============ */
  {
    "exam_board": "CIE", "subject": "chemistry", "chapter": "Redox", "topicId": "chem_redox_01",
    "title": "氧化还原 Redox",
    "knowledge": "失去氧（或得到电子）是还原，得到氧（或失去电子）是氧化；被还原的物质是氧化剂，被氧化的物质是还原剂。根据金属活动性顺序（K Na Ca Mg Al Zn Fe Pb Cu Ag Au），活泼金属可置换较不活泼金属盐溶液中的金属，如锌置换铜。",
    "formulas": ["$$Zn + CuSO_4 \\rightarrow ZnSO_4 + Cu$$"],
    "imageUrls": [],
    "commonMistake": "把被还原的物质当成还原剂（被还原的是氧化剂）。"
  },
  {
    "exam_board": "CIE", "subject": "chemistry", "chapter": "Periodic table", "topicId": "chem_periodic_01",
    "title": "元素周期表 Periodic table",
    "knowledge": "周期表按原子序数（=质子数）递增排列，周期反映电子层数，族反映最外层电子数。IA 族碱金属从上到下更活泼，VIIA 族卤素从上到下活泼性减弱；0 族稀有气体化学性质稳定，表中还可分区金属与非金属。",
    "formulas": [],
    "imageUrls": [],
    "commonMistake": "以为同族元素化学性质完全不同；混淆原子序数与质量数。"
  },
  {
    "exam_board": "CIE", "subject": "chemistry", "chapter": "Organic chemistry", "topicId": "chem_organic_01",
    "title": "有机化学初步 Organic chemistry",
    "knowledge": "烷烃是饱和烃，通式 CₙH₂ₙ₊₂，不能使溴水褪色；烯烃含碳碳双键，通式 CₙH₂ₙ，能使溴水褪色（加成反应）。乙醇可由糖类发酵制得，常用作溶剂和燃料；烃完全燃烧生成二氧化碳和水，小分子可聚合成聚合物。",
    "formulas": [],
    "imageUrls": [],
    "commonMistake": "把烷烃与烯烃的通式记混；以为有机物都能溶于水。"
  },

  /* ============ 新增：设计 DT 补充 ============ */
  {
    "exam_board": "CIE", "subject": "dt", "chapter": "Manufacturing", "topicId": "dt_manufacture_01",
    "title": "制造工艺 Manufacturing",
    "knowledge": "木工与金属加工常用锯切、钻孔、打磨、车削、铣削等工艺；塑料可通过注射成型、吹塑、真空成型加工；金属可铸造、锻造、冲压。现代工艺包括 3D 打印与激光切割；零件装配时必须考虑公差（tolerance）。",
    "formulas": [],
    "imageUrls": [],
    "commonMistake": "把注射成型与吹塑成型的用途颠倒；忽略公差导致零件无法装配。"
  },
  {
    "exam_board": "CIE", "subject": "dt", "chapter": "Structures", "topicId": "dt_structures_01",
    "title": "结构与强度 Structures",
    "knowledge": "三角形具有天然稳定性，桁架（truss）利用三角形分散荷载；结构受力分为张力、压缩、弯曲和剪切。薄板可通过折边、卷边、加强筋提高刚度；重心越低、支撑面越大则越稳定。",
    "formulas": [],
    "imageUrls": [],
    "commonMistake": "把承受压力当成承受拉力；以为增加质量就能提高稳定性。"
  },

  /* ============ 新增：商业研究补充 ============ */
  {
    "exam_board": "CIE", "subject": "business", "chapter": "Operations", "topicId": "bus_operations_01",
    "title": "运营管理 Operations",
    "knowledge": "生产方法分为批量生产、流水线（大量）生产和订制生产；生产率 = 产出 ÷ 投入。质量控制（QC）关注成品检验，质量保证（QA）关注流程预防。精益生产与 JIT（准时制）减少库存，但要求供应链稳定，规模经济可降低单位成本。",
    "formulas": ["$$Productivity=\\frac{Output}{Input}$$"],
    "imageUrls": [],
    "commonMistake": "把质量控制 QC 与质量保证 QA 混为一谈；以为 JIT 零库存没有风险。"
  },
  {
    "exam_board": "CIE", "subject": "business", "chapter": "HR", "topicId": "bus_hr_01",
    "title": "人力资源管理 Human resources",
    "knowledge": "招聘分内部招聘（升职、调岗）与外部招聘（广告、猎头）；培训分在职培训（OJT）与脱产培训。激励包括金钱手段（工资、奖金）与非金钱手段（认可、晋升、工作丰富化）；组织结构有层级式与扁平式，并通过绩效考核评估员工。",
    "formulas": [],
    "imageUrls": [],
    "commonMistake": "把在职培训与脱产培训定义写反；以为加薪是唯一的激励手段。"
  },
  {
    "exam_board": "CIE", "subject": "business", "chapter": "Growth", "topicId": "bus_growth_01",
    "title": "增长战略 Business growth",
    "knowledge": "内部增长靠自身扩大产能与市场，外部增长通过合并或收购实现。横向一体化是收购同行，纵向一体化是收购供应链上下游，多元化则进入新业务领域。国际化可通过出口、外包、特许经营或合资进行，收益与风险并存。",
    "formulas": [],
    "imageUrls": [],
    "commonMistake": "把横向一体化（同行合并）与纵向一体化（供应链上下游）混淆。"
  }
];
