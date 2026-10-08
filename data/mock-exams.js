/* IGCSE 双语仿真模拟卷数据（CIE 风格，5 科 14 套，约 280 题）
   每题自包含：en 英文题干 / zh 中文译文 / type / options / answer / explain */
window.MOCK_EXAMS = [
  /* ==================== 数学 Math ==================== */
  {
    "subject": "math",
    "name": "Mock Exam Paper 1",
    "questions": [
      {
        "en": "Expand (x + 4)(x + 7).",
        "zh": "展开 (x + 4)(x + 7)。",
        "type": "choice",
        "options": ["$x^2+11x+28$", "$x^2+28x+11$", "$x^2+11x+11$", "$x^2+4x+7$"],
        "answer": "$x^2+11x+28$",
        "explain": "FOIL：$x^2+7x+4x+28=x^2+11x+28$。"
      },
      {
        "en": "Expand (3x - 2)(2x + 5).",
        "zh": "展开 (3x - 2)(2x + 5)。",
        "type": "choice",
        "options": ["$6x^2+11x-10$", "$6x^2+19x-10$", "$6x^2+11x+10$", "$5x+3$"],
        "answer": "$6x^2+11x-10$",
        "explain": "$6x^2+15x-4x-10=6x^2+11x-10$。"
      },
      {
        "en": "Expand (2x - 5)^2.",
        "zh": "展开 (2x - 5)^2。",
        "type": "choice",
        "options": ["$4x^2-20x+25$", "$4x^2+25$", "$4x^2-10x+25$", "$4x^2-25$"],
        "answer": "$4x^2-20x+25$",
        "explain": "$(2x)^2-2\\cdot2x\\cdot5+5^2=4x^2-20x+25$，完全平方别漏中间项。"
      },
      {
        "en": "Simplify 3(2x - 4) + 2(5x + 1).",
        "zh": "化简 3(2x - 4) + 2(5x + 1)。",
        "type": "choice",
        "options": ["$16x-10$", "$16x-14$", "$11x-10$", "$16x+10$"],
        "answer": "$16x-10$",
        "explain": "$6x-12+10x+2=16x-10$。"
      },
      {
        "en": "Solve x^2 - 9x + 18 = 0.",
        "zh": "解方程 x^2 - 9x + 18 = 0。",
        "type": "choice",
        "options": ["$x=3,\\ x=6$", "$x=-3,\\ x=-6$", "$x=2,\\ x=9$", "$x=3,\\ x=-6$"],
        "answer": "$x=3,\\ x=6$",
        "explain": "因式分解 $(x-3)(x-6)=0$，所以 $x=3$ 或 $x=6$。"
      },
      {
        "en": "Solve 2x^2 + 5x - 3 = 0.",
        "zh": "解方程 2x^2 + 5x - 3 = 0。",
        "type": "choice",
        "options": ["$x=\\frac{1}{2},\\ x=-3$", "$x=-\\frac{1}{2},\\ x=3$", "$x=\\frac{1}{2},\\ x=3$", "$x=-2,\\ x=-3$"],
        "answer": "$x=\\frac{1}{2},\\ x=-3$",
        "explain": "$(2x-1)(x+3)=0$，所以 $x=\\frac{1}{2}$ 或 $x=-3$。"
      },
      {
        "en": "For x^2 - 6x + 12 = 0, the discriminant b^2 - 4ac equals?",
        "zh": "方程 x^2 - 6x + 12 = 0 的判别式 b^2 - 4ac 等于？",
        "type": "choice",
        "options": ["$-12$", "$12$", "$84$", "$6$"],
        "answer": "$-12$",
        "explain": "$a=1,b=-6,c=12$，$\\Delta=36-48=-12<0$，无实数根。"
      },
      {
        "en": "Find the gradient of the line through (1, 2) and (5, 10).",
        "zh": "求过点 (1, 2) 和 (5, 10) 的直线斜率。",
        "type": "choice",
        "options": ["$2$", "$\\frac{1}{2}$", "$8$", "$4$"],
        "answer": "$2$",
        "explain": "$m=\\frac{10-2}{5-1}=\\frac{8}{4}=2$。"
      },
      {
        "en": "What are the gradient and y-intercept of y = -3x + 7?",
        "zh": "直线 y = -3x + 7 的斜率和 y 截距分别是？",
        "type": "choice",
        "options": ["gradient -3, intercept 7", "gradient 7, intercept -3", "gradient 3, intercept 7", "gradient -3, intercept -7"],
        "answer": "gradient -3, intercept 7",
        "explain": "对照 $y=mx+c$：斜率 $m=-3$，截距 $c=7$。"
      },
      {
        "en": "A line parallel to y = (1/4)x - 2 has gradient?",
        "zh": "与直线 y = (1/4)x - 2 平行的直线斜率是？",
        "type": "choice",
        "options": ["$\\frac{1}{4}$", "$-4$", "$4$", "$-\\frac{1}{4}$"],
        "answer": "$\\frac{1}{4}$",
        "explain": "平行线斜率相等，所以斜率仍为 $\\frac{1}{4}$。"
      },
      {
        "en": "Find the interior angle of a regular hexagon.",
        "zh": "求正六边形的一个内角。",
        "type": "choice",
        "options": ["$120^\\circ$", "$60^\\circ$", "$108^\\circ$", "$135^\\circ$"],
        "answer": "$120^\\circ$",
        "explain": "正 n 边形内角 $=\\frac{(n-2)\\times180^\\circ}{n}=\\frac{4\\times180}{6}=120^\\circ$。"
      },
      {
        "en": "A right-angled triangle has legs 5 cm and 12 cm. Find the hypotenuse.",
        "zh": "直角三角形两条直角边分别为 5 cm 和 12 cm，求斜边。",
        "type": "choice",
        "options": ["$13\\,cm$", "$17\\,cm$", "$7\\,cm$", "$\\sqrt{119}\\,cm$"],
        "answer": "$13\\,cm$",
        "explain": "勾股定理 $c=\\sqrt{5^2+12^2}=\\sqrt{169}=13\\,cm$。"
      },
      {
        "en": "In a right-angled triangle, the side opposite angle theta is 3 cm and the hypotenuse is 5 cm. Find sin theta.",
        "zh": "在直角三角形中，角 θ 的对边为 3 cm，斜边为 5 cm，求 sin θ。",
        "type": "choice",
        "options": ["$\\frac{3}{5}$", "$\\frac{4}{5}$", "$\\frac{3}{4}$", "$\\frac{5}{3}$"],
        "answer": "$\\frac{3}{5}$",
        "explain": "SOH：$\\sin\\theta=\\frac{opp}{hyp}=\\frac{3}{5}$。"
      },
      {
        "en": "Find the mean of 4, 8, 6, 5, 7.",
        "zh": "求 4, 8, 6, 5, 7 的平均数。",
        "type": "choice",
        "options": ["$6$", "$5$", "$7$", "$30$"],
        "answer": "$6$",
        "explain": "均值 $=\\frac{4+8+6+5+7}{5}=\\frac{30}{5}=6$。"
      },
      {
        "en": "A fair six-sided die is rolled. What is the probability of getting an even number?",
        "zh": "掷一枚均匀的六面骰子，得到偶数的概率是？",
        "type": "choice",
        "options": ["$\\frac{1}{2}$", "$\\frac{1}{3}$", "$\\frac{1}{6}$", "$\\frac{2}{3}$"],
        "answer": "$\\frac{1}{2}$",
        "explain": "偶数有 2,4,6 共 3 个，$P=\\frac{3}{6}=\\frac{1}{2}$。"
      },
      {
        "en": "Solve x^2 - 4x - 7 = 0 using the quadratic formula. Give your answer in surd form.",
        "zh": "用求根公式解方程 x^2 - 4x - 7 = 0，结果保留根号。",
        "type": "essay",
        "options": [],
        "answer": "$a=1,b=-4,c=-7$，$x=\\frac{4\\pm\\sqrt{16+28}}{2}=\\frac{4\\pm\\sqrt{44}}{2}=\\frac{4\\pm2\\sqrt{11}}{2}=2\\pm\\sqrt{11}$。",
        "explain": "评分要点：正确写出 a,b,c 与 -b=4（1分）；判别式 $\\Delta=16+28=44$（2分）；化简 $\\sqrt{44}=2\\sqrt{11}$（1分）；结果 $2\\pm\\sqrt{11}$（1分）。"
      },
      {
        "en": "Find the equation of the straight line through (2, 3) and (6, 11).",
        "zh": "求过点 (2, 3) 和 (6, 11) 的直线方程。",
        "type": "essay",
        "options": [],
        "answer": "$m=\\frac{11-3}{6-2}=\\frac{8}{4}=2$；用点 $(2,3)$：$y-3=2(x-2)$，整理得 $y=2x-1$。",
        "explain": "评分要点：正确算斜率 $m=2$（2分）；用点斜式代入（2分）；整理得 $y=2x-1$（1分）。"
      },
      {
        "en": "A ladder of length 10 m leans against a wall and reaches 8 m up the wall. Find the angle the ladder makes with the ground, to 1 decimal place.",
        "zh": "一架 10 m 长的梯子斜靠墙上，顶端距地面 8 m，求梯子与地面的夹角（保留 1 位小数）。",
        "type": "essay",
        "options": [],
        "answer": "设夹角 $\\theta$，对边为墙高 8 m，斜边为梯长 10 m：$\\sin\\theta=\\frac{8}{10}=0.8$，$\\theta=\\sin^{-1}(0.8)=53.1^\\circ$。",
        "explain": "评分要点：正确选正弦关系 $\\sin\\theta=8/10$（2分）；识别斜边为梯长（1分）；用反三角算得 $53.1^\\circ$（2分）。"
      },
      {
        "en": "A circle has radius 7 cm. Calculate its circumference, taking pi = 22/7.",
        "zh": "一个圆的半径为 7 cm，取 π = 22/7，求它的周长。",
        "type": "essay",
        "options": [],
        "answer": "$C=2\\pi r=2\\times\\frac{22}{7}\\times7=44\\,cm$。",
        "explain": "评分要点：写出周长公式 $C=2\\pi r$（2分）；正确代入 $r=7$（1分）；算得 $44\\,cm$（2分）。"
      },
      {
        "en": "The ages of 5 children are 7, 12, 5, 9, 12. Find the median age and the mode.",
        "zh": "5 名儿童的年龄为 7, 12, 5, 9, 12，求中位数与众数。",
        "type": "essay",
        "options": [],
        "answer": "排序：5, 7, 9, 12, 12；中位数为中间的 9；众数为出现两次的 12。",
        "explain": "评分要点：先排序（1分）；中位数取中间值 9（2分）；众数为 12（2分）。"
      }
    ]
  },
  {
    "subject": "math",
    "name": "Mock Exam Paper 2",
    "questions": [
      {
        "en": "Expand (x - 6)(x + 3).",
        "zh": "展开 (x - 6)(x + 3)。",
        "type": "choice",
        "options": ["$x^2-3x-18$", "$x^2+3x-18$", "$x^2-3x+18$", "$x^2-9x-18$"],
        "answer": "$x^2-3x-18$",
        "explain": "$x^2+3x-6x-18=x^2-3x-18$。"
      },
      {
        "en": "Expand (4x + 1)(4x - 1).",
        "zh": "展开 (4x + 1)(4x - 1)。",
        "type": "choice",
        "options": ["$16x^2-1$", "$16x^2+1$", "$4x^2-1$", "$16x^2-8x-1$"],
        "answer": "$16x^2-1$",
        "explain": "平方差 $(4x)^2-1^2=16x^2-1$。"
      },
      {
        "en": "Expand (x + 8)^2.",
        "zh": "展开 (x + 8)^2。",
        "type": "choice",
        "options": ["$x^2+16x+64$", "$x^2+64$", "$x^2+8x+64$", "$x^2+16x+16$"],
        "answer": "$x^2+16x+64$",
        "explain": "$(x+8)^2=x^2+2\\cdot x\\cdot8+64=x^2+16x+64$。"
      },
      {
        "en": "Simplify 4(3x + 2) - 3(2x - 5).",
        "zh": "化简 4(3x + 2) - 3(2x - 5)。",
        "type": "choice",
        "options": ["$6x+23$", "$6x-7$", "$18x+23$", "$6x+8$"],
        "answer": "$6x+23$",
        "explain": "$12x+8-6x+15=6x+23$，注意 $-3(2x-5)=-6x+15$。"
      },
      {
        "en": "Solve x^2 + 4x - 12 = 0.",
        "zh": "解方程 x^2 + 4x - 12 = 0。",
        "type": "choice",
        "options": ["$x=-6,\\ x=2$", "$x=6,\\ x=-2$", "$x=3,\\ x=-4$", "$x=-3,\\ x=4$"],
        "answer": "$x=-6,\\ x=2$",
        "explain": "$(x+6)(x-2)=0$，所以 $x=-6$ 或 $x=2$。"
      },
      {
        "en": "Solve 3x^2 - 10x - 8 = 0.",
        "zh": "解方程 3x^2 - 10x - 8 = 0。",
        "type": "choice",
        "options": ["$x=-\\frac{2}{3},\\ x=4$", "$x=\\frac{2}{3},\\ x=-4$", "$x=\\frac{3}{2},\\ x=8$", "$x=-\\frac{4}{3},\\ x=2$"],
        "answer": "$x=-\\frac{2}{3},\\ x=4$",
        "explain": "$(3x+2)(x-4)=0$，所以 $x=-\\frac{2}{3}$ 或 $x=4$。"
      },
      {
        "en": "x^2 + kx + 16 = 0 has two equal roots. Find k.",
        "zh": "方程 x^2 + kx + 16 = 0 有两个相等实根，求 k。",
        "type": "choice",
        "options": ["$k=\\pm8$", "$k=8$", "$k=\\pm4$", "$k=\\pm16$"],
        "answer": "$k=\\pm8$",
        "explain": "重根要求 $\\Delta=k^2-64=0$，所以 $k=\\pm8$。"
      },
      {
        "en": "Find the gradient of the line through (-2, 5) and (4, -7).",
        "zh": "求过点 (-2, 5) 和 (4, -7) 的直线斜率。",
        "type": "choice",
        "options": ["$-2$", "$2$", "$-\\frac{1}{2}$", "$-12$"],
        "answer": "$-2$",
        "explain": "$m=\\frac{-7-5}{4-(-2)}=\\frac{-12}{6}=-2$。"
      },
      {
        "en": "Find the gradient of y = 5 - 4x.",
        "zh": "求直线 y = 5 - 4x 的斜率。",
        "type": "choice",
        "options": ["$-4$", "$4$", "$5$", "$-5$"],
        "answer": "$-4$",
        "explain": "写成 $y=-4x+5$，斜率 $m=-4$。"
      },
      {
        "en": "A line perpendicular to y = 5x + 2 has gradient?",
        "zh": "与直线 y = 5x + 2 垂直的直线斜率是？",
        "type": "choice",
        "options": ["$-\\frac{1}{5}$", "$\\frac{1}{5}$", "$-5$", "$5$"],
        "answer": "$-\\frac{1}{5}$",
        "explain": "垂直两直线斜率乘积为 -1：$m\\times5=-1$，得 $m=-\\frac{1}{5}$。"
      },
      {
        "en": "Find the interior angle of a regular pentagon.",
        "zh": "求正五边形的一个内角。",
        "type": "choice",
        "options": ["$108^\\circ$", "$72^\\circ$", "$120^\\circ$", "$135^\\circ$"],
        "answer": "$108^\\circ$",
        "explain": "$\\frac{(5-2)\\times180^\\circ}{5}=\\frac{540}{5}=108^\\circ$。"
      },
      {
        "en": "A right-angled triangle has legs 8 cm and 15 cm. Find the hypotenuse.",
        "zh": "直角三角形两条直角边分别为 8 cm 和 15 cm，求斜边。",
        "type": "choice",
        "options": ["$17\\,cm$", "$23\\,cm$", "$\\sqrt{161}\\,cm$", "$16\\,cm$"],
        "answer": "$17\\,cm$",
        "explain": "$c=\\sqrt{8^2+15^2}=\\sqrt{64+225}=\\sqrt{289}=17\\,cm$。"
      },
      {
        "en": "In a right-angled triangle, the adjacent side to angle theta is 9 cm and the hypotenuse is 15 cm. Find cos theta.",
        "zh": "在直角三角形中，角 θ 的邻边为 9 cm，斜边为 15 cm，求 cos θ。",
        "type": "choice",
        "options": ["$\\frac{3}{5}$", "$\\frac{4}{5}$", "$\\frac{5}{3}$", "$\\frac{3}{4}$"],
        "answer": "$\\frac{3}{5}$",
        "explain": "CAH：$\\cos\\theta=\\frac{adj}{hyp}=\\frac{9}{15}=\\frac{3}{5}$。"
      },
      {
        "en": "Find the median of 12, 4, 9, 6, 19.",
        "zh": "求 12, 4, 9, 6, 19 的中位数。",
        "type": "choice",
        "options": ["$9$", "$12$", "$6$", "$10$"],
        "answer": "$9$",
        "explain": "排序：4, 6, 9, 12, 19，中间值为 9。"
      },
      {
        "en": "A bag contains 3 red and 5 blue counters. One counter is taken at random. Find P(red).",
        "zh": "一个袋子里有 3 个红棋子和 5 个蓝棋子，随机取一个，求取到红色的概率。",
        "type": "choice",
        "options": ["$\\frac{3}{8}$", "$\\frac{5}{8}$", "$\\frac{3}{5}$", "$\\frac{1}{8}$"],
        "answer": "$\\frac{3}{8}$",
        "explain": "共 8 个棋子，红色 3 个，$P(red)=\\frac{3}{8}$。"
      },
      {
        "en": "Solve x^2 + 2x - 5 = 0 using the quadratic formula. Give your answer in surd form.",
        "zh": "用求根公式解方程 x^2 + 2x - 5 = 0，结果保留根号。",
        "type": "essay",
        "options": [],
        "answer": "$a=1,b=2,c=-5$，$x=\\frac{-2\\pm\\sqrt{4+20}}{2}=\\frac{-2\\pm\\sqrt{24}}{2}=\\frac{-2\\pm2\\sqrt{6}}{2}=-1\\pm\\sqrt{6}$。",
        "explain": "评分要点：正确写 a,b,c（1分）；判别式 $\\Delta=4+20=24$（2分）；化简 $\\sqrt{24}=2\\sqrt6$（1分）；结果 $-1\\pm\\sqrt6$（1分）。"
      },
      {
        "en": "Find the equation of the straight line through (1, 5) and (4, 14).",
        "zh": "求过点 (1, 5) 和 (4, 14) 的直线方程。",
        "type": "essay",
        "options": [],
        "answer": "$m=\\frac{14-5}{4-1}=\\frac{9}{3}=3$；用点 $(1,5)$：$y-5=3(x-1)$，整理得 $y=3x+2$。",
        "explain": "评分要点：正确算斜率 $m=3$（2分）；点斜式代入（2分）；整理得 $y=3x+2$（1分）。"
      },
      {
        "en": "The angle of elevation of the top of a tree from a point 20 m from its base is 35 degrees. Find the height of the tree, to 1 decimal place.",
        "zh": "从距树基 20 m 处测得树顶的仰角为 35°，求树高（保留 1 位小数）。",
        "type": "essay",
        "options": [],
        "answer": "$\\tan35^\\circ=\\frac{h}{20}$，$h=20\\tan35^\\circ=20\\times0.700=14.0\\,m$。",
        "explain": "评分要点：正确选正切关系（2分）；列式 $h=20\\tan35^\\circ$（2分）；算得 $14.0\\,m$（1分）。"
      },
      {
        "en": "A circle has radius 6 cm. Calculate its area, leaving your answer in terms of pi.",
        "zh": "一个圆的半径为 6 cm，求它的面积，结果保留 π。",
        "type": "essay",
        "options": [],
        "answer": "$A=\\pi r^2=\\pi\\times6^2=36\\pi\\,cm^2$。",
        "explain": "评分要点：写出面积公式 $A=\\pi r^2$（2分）；代入 $r=6$（1分）；结果 $36\\pi\\,cm^2$（2分）。"
      },
      {
        "en": "A spinner is numbered 1, 2, 3, 4. It is spun twice. Draw a sample space and find the probability that the sum of the two scores is 5.",
        "zh": "一个转盘标有 1, 2, 3, 4，转两次。列出样本空间并求两次数字之和为 5 的概率。",
        "type": "essay",
        "options": [],
        "answer": "共 $4\\times4=16$ 种等可能结果；和为 5 的有 (1,4),(2,3),(3,2),(4,1) 共 4 种；$P=\\frac{4}{16}=\\frac{1}{4}$。",
        "explain": "评分要点：总结果数 16（1分）；数出和为 5 的 4 种组合（2分）；概率 $\\frac{1}{4}$（2分）。"
      }
    ]
  },
  {
    "subject": "math",
    "name": "Mock Exam Paper 3",
    "questions": [
      {
        "en": "Expand (5x - 3)(2x + 7).",
        "zh": "展开 (5x - 3)(2x + 7)。",
        "type": "choice",
        "options": ["$10x^2+29x-21$", "$10x^2+35x-21$", "$10x^2+29x+21$", "$7x+4$"],
        "answer": "$10x^2+29x-21$",
        "explain": "$10x^2+35x-6x-21=10x^2+29x-21$。"
      },
      {
        "en": "Expand (3x + 4)^2.",
        "zh": "展开 (3x + 4)^2。",
        "type": "choice",
        "options": ["$9x^2+24x+16$", "$9x^2+16$", "$9x^2+12x+16$", "$9x^2+24x+8$"],
        "answer": "$9x^2+24x+16$",
        "explain": "$(3x)^2+2\\cdot3x\\cdot4+4^2=9x^2+24x+16$。"
      },
      {
        "en": "Expand (6x - 1)(6x + 1).",
        "zh": "展开 (6x - 1)(6x + 1)。",
        "type": "choice",
        "options": ["$36x^2-1$", "$36x^2+1$", "$6x^2-1$", "$36x^2-12x-1$"],
        "answer": "$36x^2-1$",
        "explain": "平方差 $(6x)^2-1^2=36x^2-1$。"
      },
      {
        "en": "Simplify 2(x^2 + 3x) - (x^2 - 5x).",
        "zh": "化简 2(x^2 + 3x) - (x^2 - 5x)。",
        "type": "choice",
        "options": ["$x^2+11x$", "$x^2+x$", "$3x^2+x$", "$x^2+6x$"],
        "answer": "$x^2+11x$",
        "explain": "$2x^2+6x-x^2+5x=x^2+11x$，注意去括号后 $-(-5x)=+5x$。"
      },
      {
        "en": "Solve x^2 - 11x + 28 = 0.",
        "zh": "解方程 x^2 - 11x + 28 = 0。",
        "type": "choice",
        "options": ["$x=4,\\ x=7$", "$x=-4,\\ x=-7$", "$x=2,\\ x=14$", "$x=4,\\ x=-7$"],
        "answer": "$x=4,\\ x=7$",
        "explain": "$(x-4)(x-7)=0$，所以 $x=4$ 或 $x=7$。"
      },
      {
        "en": "Solve 4x^2 - 9x - 9 = 0.",
        "zh": "解方程 4x^2 - 9x - 9 = 0。",
        "type": "choice",
        "options": ["$x=-\\frac{3}{4},\\ x=3$", "$x=\\frac{3}{4},\\ x=-3$", "$x=\\frac{4}{3},\\ x=9$", "$x=-\\frac{3}{4},\\ x=-3$"],
        "answer": "$x=-\\frac{3}{4},\\ x=3$",
        "explain": "$(4x+3)(x-3)=0$，所以 $x=-\\frac{3}{4}$ 或 $x=3$。"
      },
      {
        "en": "For x^2 - 2x + 5 = 0, the discriminant equals?",
        "zh": "方程 x^2 - 2x + 5 = 0 的判别式等于？",
        "type": "choice",
        "options": ["$-16$", "$16$", "$24$", "$4$"],
        "answer": "$-16$",
        "explain": "$\\Delta=(-2)^2-4\\cdot1\\cdot5=4-20=-16<0$，无实数根。"
      },
      {
        "en": "Find the gradient of the line through (0, -2) and (3, 7).",
        "zh": "求过点 (0, -2) 和 (3, 7) 的直线斜率。",
        "type": "choice",
        "options": ["$3$", "$\\frac{1}{3}$", "$-3$", "$9$"],
        "answer": "$3$",
        "explain": "$m=\\frac{7-(-2)}{3-0}=\\frac{9}{3}=3$。"
      },
      {
        "en": "What is the y-intercept of y = (2/3)x + 1?",
        "zh": "直线 y = (2/3)x + 1 的 y 截距是？",
        "type": "choice",
        "options": ["$1$", "$\\frac{2}{3}$", "$-1$", "$2$"],
        "answer": "$1$",
        "explain": "对照 $y=mx+c$，常数项 $c=1$。"
      },
      {
        "en": "The line x = -4 is:",
        "zh": "直线 x = -4 的图像是：",
        "type": "choice",
        "options": ["a vertical line", "a horizontal line", "a line with gradient -4", "a line through the origin"],
        "answer": "a vertical line",
        "explain": "$x$ 恒等于 -4，是垂直于 $x$ 轴的竖直线，斜率不存在。"
      },
      {
        "en": "Two angles of a triangle are 72 degrees and 59 degrees. Find the third angle.",
        "zh": "一个三角形的两个内角分别为 72° 和 59°，求第三个角。",
        "type": "choice",
        "options": ["$49^\\circ$", "$131^\\circ$", "$59^\\circ$", "$39^\\circ$"],
        "answer": "$49^\\circ$",
        "explain": "三角形内角和 $180^\\circ$，第三角 $=180-72-59=49^\\circ$。"
      },
      {
        "en": "A right-angled triangle has hypotenuse 25 cm and one leg 7 cm. Find the other leg.",
        "zh": "直角三角形斜边为 25 cm，一条直角边为 7 cm，求另一条直角边。",
        "type": "choice",
        "options": ["$24\\,cm$", "$18\\,cm$", "$\\sqrt{74}\\,cm$", "$32\\,cm$"],
        "answer": "$24\\,cm$",
        "explain": "$b=\\sqrt{25^2-7^2}=\\sqrt{625-49}=\\sqrt{576}=24\\,cm$。"
      },
      {
        "en": "In a right-angled triangle, the opposite side to angle theta is 12 cm and the adjacent side is 5 cm. Find tan theta.",
        "zh": "在直角三角形中，角 θ 的对边为 12 cm，邻边为 5 cm，求 tan θ。",
        "type": "choice",
        "options": ["$\\frac{12}{5}$", "$\\frac{5}{12}$", "$\\frac{12}{13}$", "$\\frac{5}{13}$"],
        "answer": "$\\frac{12}{5}$",
        "explain": "TOA：$\\tan\\theta=\\frac{opp}{adj}=\\frac{12}{5}$。"
      },
      {
        "en": "Find the range of 23, 14, 37, 29, 18.",
        "zh": "求 23, 14, 37, 29, 18 的极差。",
        "type": "choice",
        "options": ["$23$", "$37$", "$14$", "$29$"],
        "answer": "$23$",
        "explain": "极差 $=$ 最大值 $-$ 最小值 $=37-14=23$。"
      },
      {
        "en": "Two fair coins are tossed. Find the probability of getting two heads.",
        "zh": "掷两枚均匀硬币，求两枚都是正面的概率。",
        "type": "choice",
        "options": ["$\\frac{1}{4}$", "$\\frac{1}{2}$", "$\\frac{1}{3}$", "$\\frac{3}{4}$"],
        "answer": "$\\frac{1}{4}$",
        "explain": "样本空间 HH, HT, TH, TT 共 4 种，HH 仅 1 种，$P=\\frac{1}{4}$。"
      },
      {
        "en": "Solve 2x^2 - 6x + 1 = 0 using the quadratic formula. Give your answer in surd form.",
        "zh": "用求根公式解方程 2x^2 - 6x + 1 = 0，结果保留根号。",
        "type": "essay",
        "options": [],
        "answer": "$a=2,b=-6,c=1$，$x=\\frac{6\\pm\\sqrt{36-8}}{4}=\\frac{6\\pm\\sqrt{28}}{4}=\\frac{6\\pm2\\sqrt{7}}{4}=\\frac{3\\pm\\sqrt{7}}{2}$。",
        "explain": "评分要点：正确写 a=2,b=-6,c=1（1分）；判别式 $\\Delta=28$（2分）；化简 $\\sqrt{28}=2\\sqrt7$ 并约分（1分）；结果 $\\frac{3\\pm\\sqrt7}{2}$（1分）。"
      },
      {
        "en": "Find the equation of the straight line through (3, -1) and (5, 7).",
        "zh": "求过点 (3, -1) 和 (5, 7) 的直线方程。",
        "type": "essay",
        "options": [],
        "answer": "$m=\\frac{7-(-1)}{5-3}=\\frac{8}{2}=4$；用点 $(3,-1)$：$y+1=4(x-3)$，整理得 $y=4x-13$。",
        "explain": "评分要点：正确算斜率 $m=4$（2分）；点斜式代入（2分）；整理得 $y=4x-13$（1分）。"
      },
      {
        "en": "A ladder of length 12 m makes an angle of 60 degrees with the ground. How far up the wall does it reach? Give your answer in surd form.",
        "zh": "一架 12 m 长的梯子与地面成 60° 角，它能到达墙上多高？结果保留根号。",
        "type": "essay",
        "options": [],
        "answer": "高度 $h=12\\sin60^\\circ=12\\times\\frac{\\sqrt{3}}{2}=6\\sqrt{3}\\,m$。",
        "explain": "评分要点：正确选正弦（对边为墙高）（2分）；代入 $\\sin60^\\circ=\\frac{\\sqrt3}{2}$（2分）；结果 $6\\sqrt3\\,m$（1分）。"
      },
      {
        "en": "Calculate the sum of the interior angles of an octagon.",
        "zh": "求八边形的内角和。",
        "type": "essay",
        "options": [],
        "answer": "$(n-2)\\times180^\\circ=(8-2)\\times180^\\circ=6\\times180^\\circ=1080^\\circ$。",
        "explain": "评分要点：写出公式 $(n-2)\\times180^\\circ$（2分）；代入 $n=8$（1分）；结果 $1080^\\circ$（2分）。"
      },
      {
        "en": "The test marks of 6 students are 5, 8, 8, 6, 9, 4. Calculate the mean mark and state the mode.",
        "zh": "6 名学生的测验分数为 5, 8, 8, 6, 9, 4，求平均分并指出众数。",
        "type": "essay",
        "options": [],
        "answer": "总分 $=5+8+8+6+9+4=40$，均值 $=\\frac{40}{6}=6.67$（或 $\\frac{20}{3}$）；众数为出现两次的 8。",
        "explain": "评分要点：正确求总分 40（2分）；均值 $\\frac{40}{6}=6.67$（2分）；众数 8（1分）。"
      }
    ]
    },

  /* ==================== 物理 Physics ==================== */
  {
    "subject": "physics",
    "name": "Mock Exam Paper 1",
    "questions": [
      {
        "en": "A car travels 150 m in 10 s. What is its average speed?",
        "zh": "一辆汽车 10 秒行驶 150 米，求平均速度。",
        "type": "choice",
        "options": ["$15\\,m/s$", "$1500\\,m/s$", "$0.067\\,m/s$", "$15\\,km/h$"],
        "answer": "$15\\,m/s$",
        "explain": "$v=\\frac{s}{t}=\\frac{150}{10}=15\\,m/s$。"
      },
      {
        "en": "Which quantity is a vector?",
        "zh": "下列哪个物理量是矢量？",
        "type": "choice",
        "options": ["Velocity", "Speed", "Mass", "Temperature"],
        "answer": "Velocity",
        "explain": "速度既有大小又有方向，是矢量；速率、质量、温度只有大小，是标量。"
      },
      {
        "en": "A 2 kg object accelerates at 4 m/s^2. The resultant force is?",
        "zh": "质量为 2 kg 的物体以 4 m/s² 加速，合力为多少？",
        "type": "choice",
        "options": ["$8\\,N$", "$2\\,N$", "$0.5\\,N$", "$6\\,N$"],
        "answer": "$8\\,N$",
        "explain": "$F=ma=2\\times4=8\\,N$。"
      },
      {
        "en": "The weight of a 5 kg mass on Earth (g = 10 N/kg) is?",
        "zh": "质量 5 kg 的物体在地球上（g = 10 N/kg）重量是多少？",
        "type": "choice",
        "options": ["$50\\,N$", "$5\\,N$", "$0.5\\,N$", "$50\\,kg$"],
        "answer": "$50\\,N$",
        "explain": "$W=mg=5\\times10=50\\,N$，注意单位是牛顿不是千克。"
      },
      {
        "en": "What happens to the density of a pure metal block when it is cut in half?",
        "zh": "一块纯金属切一半后，密度如何变化？",
        "type": "choice",
        "options": ["Stays the same", "Doubles", "Halves", "Quadruples"],
        "answer": "Stays the same",
        "explain": "密度是物质的特性，$\\rho=m/V$ 同时减半，比值不变。"
      },
      {
        "en": "A 60 W bulb is switched on for 5 minutes. The energy transferred is?",
        "zh": "一个 60 W 的灯泡开 5 分钟，消耗多少电能？",
        "type": "choice",
        "options": ["$18\\,000\\,J$", "$300\\,J$", "$300\\,W$", "$12\\,J$"],
        "answer": "$18\\,000\\,J$",
        "explain": "$E=Pt=60\\times(5\\times60)=60\\times300=18\\,000\\,J$。"
      },
      {
        "en": "Which energy source is renewable and does not produce CO2?",
        "zh": "下列哪种能源是可再生的且不排放二氧化碳？",
        "type": "choice",
        "options": ["Hydroelectric", "Coal", "Natural gas", "Nuclear"],
        "answer": "Hydroelectric",
        "explain": "水力发电可再生；煤炭、天然气是化石燃料排 CO2；核能不排 CO2 但不可再生。"
      },
      {
        "en": "A force of 100 N moves an object 3 m in the direction of the force. The work done is?",
        "zh": "100 N 的力沿力的方向把物体推动 3 m，做功多少？",
        "type": "choice",
        "options": ["$300\\,J$", "$33.3\\,J$", "$100\\,J$", "$300\\,N$"],
        "answer": "$300\\,J$",
        "explain": "$W=Fs=100\\times3=300\\,J$。"
      },
      {
        "en": "The pressure exerted by a 200 N weight over an area of 0.5 m^2 is?",
        "zh": "200 N 的压力作用在 0.5 m² 面积上，压强是多少？",
        "type": "choice",
        "options": ["$400\\,Pa$", "$100\\,Pa$", "$0.0025\\,Pa$", "$400\\,N$"],
        "answer": "$400\\,Pa$",
        "explain": "$p=\\frac{F}{A}=\\frac{200}{0.5}=400\\,Pa$。"
      },
      {
        "en": "Which statement about momentum is correct?",
        "zh": "关于动量，下列哪句正确？",
        "type": "choice",
        "options": ["Momentum is conserved in a closed system", "Momentum is measured in joules", "Momentum is a scalar", "Momentum only depends on mass"],
        "answer": "Momentum is conserved in a closed system",
        "explain": "动量 $p=mv$，是矢量，单位 kg·m/s；封闭系统碰撞前后动量守恒。"
      },
      {
        "en": "A stone is dropped from rest. After 2 s, its speed (g = 10 m/s^2) is?",
        "zh": "一块石头由静止自由下落，2 秒后速度是多少（g = 10 m/s²）？",
        "type": "choice",
        "options": ["$20\\,m/s$", "$10\\,m/s$", "$5\\,m/s$", "$20\\,N$"],
        "answer": "$20\\,m/s$",
        "explain": "$v=u+gt=0+10\\times2=20\\,m/s$。"
      },
      {
        "en": "Hooke's law states that extension is proportional to...",
        "zh": "胡克定律说，伸长量与什么成正比？",
        "type": "choice",
        "options": ["The force applied, up to the limit of proportionality", "The square of the force", "The mass of the spring", "The length of the spring"],
        "answer": "The force applied, up to the limit of proportionality",
        "explain": "$F=kx$，在弹性限度（proportional limit）内成立。"
      },
      {
        "en": "Which type of lever has the effort between the fulcrum and the load?",
        "zh": "哪类杠杆的动力作用点在支点和阻力作用点之间？",
        "type": "choice",
        "options": ["Third class", "First class", "Second class", "Fourth class"],
        "answer": "Third class",
        "explain": "第三类杠杆：动力在中间，如镊子、手臂。"
      },
      {
        "en": "A machine has an efficiency of 25%. If the input energy is 800 J, useful output is?",
        "zh": "一台机器效率为 25%，输入 800 J，有用输出为多少？",
        "type": "choice",
        "options": ["$200\\,J$", "$400\\,J$", "$600\\,J$", "$3200\\,J$"],
        "answer": "$200\\,J$",
        "explain": "$\\eta=\\frac{W_{out}}{W_{in}}=0.25$，$W_{out}=0.25\\times800=200\\,J$。"
      },
      {
        "en": "The turning effect of a force is called?",
        "zh": "力的转动效应称为？",
        "type": "choice",
        "options": ["Moment of a force", "Momentum", "Pressure", "Stress"],
        "answer": "Moment of a force",
        "explain": "力矩 $\\tau=F\\times d$，单位 N·m。"
      },
      {
        "en": "Brownian motion provides evidence that...",
        "zh": "布朗运动证明了什么？",
        "type": "choice",
        "options": ["Molecules are in constant random motion", "Molecules have mass", "Molecules are charged", "Light is a wave"],
        "answer": "Molecules are in constant random motion",
        "explain": "花粉颗粒被看不见的空气分子不断撞击，做无规则运动。"
      },
      {
        "en": "Define acceleration and state its SI unit.",
        "zh": "定义加速度并写出它的国际单位。",
        "type": "essay",
        "options": [],
        "answer": "加速度是速度对时间的变化率：$a=\\frac{\\Delta v}{\\Delta t}$；国际单位是 $m/s^2$（米每二次方秒）。它是矢量。",
        "explain": "评分要点：说出「速度变化率」（2分）；写出公式 $a=\\Delta v/\\Delta t$（2分）；单位 $m/s^2$（1分）。"
      },
      {
        "en": "A 2 kg trolley moves at 3 m/s and collides with a stationary 1 kg trolley. They stick together. Calculate the final speed.",
        "zh": "一辆 2 kg 小车以 3 m/s 撞击静止的 1 kg 小车，两车粘在一起，求共同速度。",
        "type": "essay",
        "options": [],
        "answer": "碰撞前动量 $=2\\times3+1\\times0=6\\,kg\\cdot m/s$。碰撞后总质量 3 kg，由动量守恒 $6=3\\times v$，得 $v=2\\,m/s$。",
        "explain": "评分要点：写出动量守恒（2分）；碰撞前动量 6（1分）；碰撞后总质量 3 kg（1分）；结果 $2\\,m/s$（1分）。"
      },
      {
        "en": "Explain why a high-jumper lands on a thick foam mat, in terms of impulse.",
        "zh": "用冲量原理解释为什么跳高运动员要落在厚海绵垫上。",
        "type": "essay",
        "options": [],
        "answer": "落到垫子上时，速度从 v 减到 0 所需的动量变化 $\\Delta p$ 是固定的。由 $F\\Delta t=\\Delta p$，厚垫子延长了作用时间 $\\Delta t$，从而减小了平均作用力 F，避免受伤。",
        "explain": "评分要点：指出动量变化量相同（2分）；写出 $F\\Delta t=\\Delta p$（2分）；说明延长时间减小力（2分）。"
      },
      {
        "en": "State and explain the relationship between pressure and volume of a fixed mass of gas at constant temperature.",
        "zh": "说明一定质量气体在温度不变时，压强与体积的关系并解释。",
        "type": "essay",
        "options": [],
        "answer": "玻意耳定律：温度不变时，一定质量气体的压强与体积成反比，$pV=\\text{常数}$。体积减小，分子撞击器壁的频率增加，压强增大。",
        "explain": "评分要点：说出玻意耳定律（2分）；写出 $pV=$ 常数（2分）；用分子动理论解释（2分）。"
      }
    ]
  },
  {
    "subject": "physics",
    "name": "Mock Exam Paper 2",
    "questions": [
      {
        "en": "The unit of electrical charge is?",
        "zh": "电荷量的单位是？",
        "type": "choice",
        "options": ["Coulomb", "Volt", "Ampere", "Watt"],
        "answer": "Coulomb",
        "explain": "电荷单位库仑 C；电压 V；电流 A；功率 W。"
      },
      {
        "en": "A current of 2 A flows through a 10 ohm resistor. The potential difference is?",
        "zh": "2 A 电流流过 10 欧电阻，两端电压是多少？",
        "type": "choice",
        "options": ["$20\\,V$", "$5\\,V$", "$0.2\\,V$", "$12\\,V$"],
        "answer": "$20\\,V$",
        "explain": "$V=IR=2\\times10=20\\,V$（欧姆定律）。"
      },
      {
        "en": "Two 4 ohm resistors in parallel have a combined resistance of?",
        "zh": "两个 4 欧电阻并联，总电阻是多少？",
        "type": "choice",
        "options": ["$2\\,\\Omega$", "$8\\,\\Omega$", "$4\\,\\Omega$", "$0.5\\,\\Omega$"],
        "answer": "$2\\,\\Omega$",
        "explain": "$\\frac{1}{R}=\\frac{1}{4}+\\frac{1}{4}=\\frac{1}{2}$，所以 $R=2\\,\\Omega$。"
      },
      {
        "en": "In a series circuit, which statement is true?",
        "zh": "关于串联电路，下列哪句正确？",
        "type": "choice",
        "options": ["The current is the same everywhere", "The voltage is the same across each component", "Components can be switched independently", "If one bulb breaks, others stay on"],
        "answer": "The current is the same everywhere",
        "explain": "串联电流处处相等；电压分压；一处断开整路不通。"
      },
      {
        "en": "Which component is used to protect a circuit from overcurrent?",
        "zh": "哪个元件用于保护电路免受过载电流损害？",
        "type": "choice",
        "options": ["Fuse", "Diode", "LED", "LDR"],
        "answer": "Fuse",
        "explain": "保险丝电流过大时自身熔断，切断电路。"
      },
      {
        "en": "The direction of the magnetic field around a straight current-carrying wire is given by?",
        "zh": "通电直导线周围的磁场方向由什么定则判断？",
        "type": "choice",
        "options": ["Right-hand grip rule", "Left-hand rule", "Fleming's right-hand rule", "Lenz's law"],
        "answer": "Right-hand grip rule",
        "explain": "右手握住导线，拇指指向电流方向，四指环绕方向即磁场方向。"
      },
      {
        "en": "Electromagnetic induction occurs when...",
        "zh": "电磁感应发生在什么时候？",
        "type": "choice",
        "options": ["A coil experiences a changing magnetic field", "A current flows through a fixed coil", "A magnet is stationary inside a coil", "A battery is connected to a bulb"],
        "answer": "A coil experiences a changing magnetic field",
        "explain": "磁通量变化才能感应出电动势；静止不产生感应。"
      },
      {
        "en": "A step-up transformer increases...",
        "zh": "升压变压器升高什么？",
        "type": "choice",
        "options": ["Voltage", "Current", "Power", "Resistance"],
        "answer": "Voltage",
        "explain": "升压变压器升高电压、降低电流（功率不变 $P=IV$），用于远距离输电减少损耗。"
      },
      {
        "en": "The charge on an electron is?",
        "zh": "电子所带电荷是？",
        "type": "choice",
        "options": ["Negative", "Positive", "Neutral", "Variable"],
        "answer": "Negative",
        "explain": "电子带负电 $-1.6\\times10^{-19}\\,C$；质子带正电；中子不带电。"
      },
      {
        "en": "Which logic gate outputs 1 only when both inputs are 1?",
        "zh": "哪种逻辑门只有两个输入都为 1 时输出才是 1？",
        "type": "choice",
        "options": ["AND", "OR", "NOT", "NAND"],
        "answer": "AND",
        "explain": "AND 门：全 1 出 1；OR 门：有 1 出 1。"
      },
      {
        "en": "The power dissipated in a 6 ohm resistor carrying 3 A is?",
        "zh": "6 欧电阻通过 3 A 电流时，耗散功率是多少？",
        "type": "choice",
        "options": ["$54\\,W$", "$18\\,W$", "$2\\,W$", "$9\\,W$"],
        "answer": "$54\\,W$",
        "explain": "$P=I^2R=3^2\\times6=54\\,W$。"
      },
      {
        "en": "In a d.c. motor, the force on a coil is increased by...",
        "zh": "直流电动机线圈受力如何增大？",
        "type": "choice",
        "options": ["Using stronger magnets", "Reducing the current", "Using fewer turns", "Reducing the coil area"],
        "answer": "Using stronger magnets",
        "explain": "$F=BIL$：增大磁场 B、电流 I、导线长度 L 都能增大受力。"
      },
      {
        "en": "Which statement about a series circuit of resistors is correct?",
        "zh": "关于电阻串联，下列哪句正确？",
        "type": "choice",
        "options": ["Total resistance is the sum of individual resistances", "Total resistance is less than the smallest resistor", "Voltage across each resistor is equal", "Current is divided between resistors"],
        "answer": "Total resistance is the sum of individual resistances",
        "explain": "串联 $R_{total}=R_1+R_2+\\cdots$。"
      },
      {
        "en": "The mains supply voltage in the UK (and most IGCSE contexts) is?",
        "zh": "英国（多数 IGCSE 题设）市电电压是？",
        "type": "choice",
        "options": ["$230\\,V$ a.c.", "$230\\,V$ d.c.", "$12\\,V$ a.c.", "$120\\,V$ d.c."],
        "answer": "$230\\,V$ a.c.",
        "explain": "英国市电 230 V 交流，频率 50 Hz。"
      },
      {
        "en": "An LDR's resistance...",
        "zh": "光敏电阻（LDR）的电阻如何随光照变化？",
        "type": "choice",
        "options": ["Decreases as light intensity increases", "Increases as light intensity increases", "Stays constant", "Only changes with temperature"],
        "answer": "Decreases as light intensity increases",
        "explain": "光照越强，LDR 电阻越小；常用于自动路灯电路。"
      },
      {
        "en": "A thermistor (negative temperature coefficient) has resistance that...",
        "zh": "负温度系数热敏电阻的电阻如何随温度变化？",
        "type": "choice",
        "options": ["Decreases as temperature rises", "Increases as temperature rises", "Is independent of temperature", "Only changes below 0 °C"],
        "answer": "Decreases as temperature rises",
        "explain": "NTC 热敏电阻：温度升高，载流子增多，电阻下降。"
      },
      {
        "en": "Calculate the total resistance of a 3 ohm and a 6 ohm resistor connected in series, and then in parallel.",
        "zh": "计算 3 欧和 6 欧电阻分别串联和并联时的总电阻。",
        "type": "essay",
        "options": [],
        "answer": "串联：$R_s=3+6=9\\,\\Omega$。并联：$\\frac{1}{R_p}=\\frac{1}{3}+\\frac{1}{6}=\\frac{1}{2}$，所以 $R_p=2\\,\\Omega$。",
        "explain": "评分要点：串联公式正确得 9 Ω（2分）；并联倒数公式（2分）；结果 2 Ω（1分）。"
      },
      {
        "en": "Explain why electrical energy is transmitted at high voltage over long distances.",
        "zh": "解释为什么远距离输电要使用高压。",
        "type": "essay",
        "options": [],
        "answer": "输送功率 $P=IV$ 一定时，电压 V 越高，电流 I 越小。输电线损失功率 $P_{loss}=I^2R$，电流减小可大幅降低线路热损耗，提高输电效率。",
        "explain": "评分要点：写出 $P=IV$（2分）；高压意味着小电流（2分）；写出 $I^2R$ 损耗并说明减小（2分）。"
      },
      {
        "en": "A 240 V kettle uses a current of 5 A. Calculate its power and the energy transferred in 10 minutes.",
        "zh": "一个 240 V 电热水壶电流 5 A，求功率和 10 分钟消耗的电能。",
        "type": "essay",
        "options": [],
        "answer": "$P=IV=5\\times240=1200\\,W$。$E=Pt=1200\\times(10\\times60)=1200\\times600=720\\,000\\,J=7.2\\times10^5\\,J$（或 0.2 kWh）。",
        "explain": "评分要点：功率 1200 W（2分）；时间换算成秒 600 s（1分）；电能 $7.2\\times10^5\\,J$（2分）。"
      },
      {
        "en": "State two differences between a.c. and d.c.",
        "zh": "说出交流电和直流电的两点区别。",
        "type": "essay",
        "options": [],
        "answer": "① 直流（d.c.）电流方向不变，交流（a.c.）电流方向周期性改变；② 电池输出直流电，电网供电是交流电；③ 交流电可通过变压器升压/降压，直流电不能直接用变压器变换。（任意两点即可）",
        "explain": "评分要点：方向是否改变（2分）；来源举例电池 vs 市电（2分）；或变压器是否适用（2分，任答两点满分）。"
      }
    ]
  },
  {
    "subject": "physics",
    "name": "Mock Exam Paper 3",
    "questions": [
      {
        "en": "The speed of light in a vacuum is approximately?",
        "zh": "真空中光速约为？",
        "type": "choice",
        "options": ["$3\\times10^8\\,m/s$", "$3\\times10^6\\,m/s$", "$340\\,m/s$", "$3\\times10^{10}\\,m/s$"],
        "answer": "$3\\times10^8\\,m/s$",
        "explain": "光速 $c=3\\times10^8\\,m/s$；声速约 340 m/s。"
      },
      {
        "en": "Which colour has the longest wavelength in the visible spectrum?",
        "zh": "可见光谱中哪种色光波长最长？",
        "type": "choice",
        "options": ["Red", "Violet", "Green", "Blue"],
        "answer": "Red",
        "explain": "红橙黄绿蓝靛紫，波长递减、频率递增。"
      },
      {
        "en": "Sound cannot travel through...",
        "zh": "声音不能在什么中传播？",
        "type": "choice",
        "options": ["A vacuum", "Water", "Air", "Steel"],
        "answer": "A vacuum",
        "explain": "声音是机械波，需要介质；真空中没有介质，不能传播。"
      },
      {
        "en": "When light travels from air into glass, it...",
        "zh": "光从空气进入玻璃时会？",
        "type": "choice",
        "options": ["Bends towards the normal", "Bends away from the normal", "Does not bend", "Speeds up"],
        "answer": "Bends towards the normal",
        "explain": "从光疏介质进入光密介质，光速减小，折射角小于入射角，光线靠近法线。"
      },
      {
        "en": "The unit of frequency is?",
        "zh": "频率的单位是？",
        "type": "choice",
        "options": ["Hertz", "Metre", "Second", "Decibel"],
        "answer": "Hertz",
        "explain": "频率单位赫兹 Hz；分贝 dB 是声强级。"
      },
      {
        "en": "Which electromagnetic wave has the highest frequency?",
        "zh": "哪种电磁波频率最高？",
        "type": "choice",
        "options": ["Gamma rays", "Radio waves", "Visible light", "Microwaves"],
        "answer": "Gamma rays",
        "explain": "电磁波谱从低到高频率：无线电波、微波、红外线、可见光、紫外线、X 射线、γ 射线。"
      },
      {
        "en": "A convex (converging) lens causes parallel light rays to...",
        "zh": "凸透镜（会聚透镜）会使平行光线？",
        "type": "choice",
        "options": ["Converge at the principal focus", "Diverge", "Pass through without bending", "Reflect back"],
        "answer": "Converge at the principal focus",
        "explain": "凸透镜使平行主光轴的光线会聚到焦点。"
      },
      {
        "en": "The half-life of a radioactive isotope is 2 hours. What fraction remains after 6 hours?",
        "zh": "某放射性同位素半衰期为 2 小时，6 小时后剩余多少？",
        "type": "choice",
        "options": ["$\\frac{1}{8}$", "$\\frac{1}{4}$", "$\\frac{1}{2}$", "$\\frac{1}{16}$"],
        "answer": "$\\frac{1}{8}$",
        "explain": "6 小时 = 3 个半衰期：$(\\frac{1}{2})^3=\\frac{1}{8}$。"
      },
      {
        "en": "Alpha particles consist of...",
        "zh": "α 粒子由什么组成？",
        "type": "choice",
        "options": ["2 protons and 2 neutrons", "Fast-moving electrons", "High-energy photons", "A single proton"],
        "answer": "2 protons and 2 neutrons",
        "explain": "α 粒子就是氦核 $^4_2He$；β 是高速电子；γ 是光子。"
      },
      {
        "en": "Which type of radiation is most penetrating?",
        "zh": "哪种射线穿透能力最强？",
        "type": "choice",
        "options": ["Gamma", "Alpha", "Beta", "They are equal"],
        "answer": "Gamma",
        "explain": "穿透能力 γ > β > α；α 被纸挡住，β 被薄铝板挡住，γ 需要厚铅或混凝土。"
      },
      {
        "en": "The nuclear model of the atom was proposed by...",
        "zh": "原子的核式结构模型是由谁提出的？",
        "type": "choice",
        "options": ["Rutherford", "Dalton", "Bohr (only energy levels)", "Thomson"],
        "answer": "Rutherford",
        "explain": "卢瑟福 α 粒子散射实验提出原子核式结构。"
      },
      {
        "en": "Convection occurs in...",
        "zh": "对流发生在什么中？",
        "type": "choice",
        "options": ["Liquids and gases", "Solids only", "A vacuum", "Hard solids only"],
        "answer": "Liquids and gases",
        "explain": "对流靠流体（液体/气体）宏观流动传热；固体中主要是传导。"
      },
      {
        "en": "Which surface is the best absorber of infrared radiation?",
        "zh": "哪种表面对红外辐射吸收能力最强？",
        "type": "choice",
        "options": ["Matte black", "Shiny silver", "White", "Transparent"],
        "answer": "Matte black",
        "explain": "黑色粗糙表面吸收/辐射最强；银白色反射最强。"
      },
      {
        "en": "The specific heat capacity of water is 4200 J/(kg °C). To heat 2 kg of water by 10 °C, energy needed is?",
        "zh": "水的比热容 4200 J/(kg·°C)，把 2 kg 水升温 10 °C 需要多少能量？",
        "type": "choice",
        "options": ["$84\\,000\\,J$", "$840\\,J$", "$21\\,000\\,J$", "$42\\,000\\,J$"],
        "answer": "$84\\,000\\,J$",
        "explain": "$Q=mc\\Delta T=2\\times4200\\times10=84\\,000\\,J$。"
      },
      {
        "en": "During melting, the temperature of a pure substance...",
        "zh": "纯净物熔化过程中温度如何变化？",
        "type": "choice",
        "options": ["Stays constant", "Rises", "Falls", "Rises then falls"],
        "answer": "Stays constant",
        "explain": "晶体熔化时吸热但温度不变，全部用于破坏晶格。"
      },
      {
        "en": "The pitch of a sound depends on its...",
        "zh": "声音的音调取决于它的什么？",
        "type": "choice",
        "options": ["Frequency", "Amplitude", "Speed", "Wavelength only"],
        "answer": "Frequency",
        "explain": "频率决定音调；振幅决定响度。"
      },
      {
        "en": "A wave has a frequency of 5 Hz and a wavelength of 2 m. Calculate its wave speed.",
        "zh": "一列波频率 5 Hz，波长 2 m，求波速。",
        "type": "essay",
        "options": [],
        "answer": "$v=f\\lambda=5\\times2=10\\,m/s$。",
        "explain": "评分要点：写出公式 $v=f\\lambda$（2分）；代入数值（1分）；结果 10 m/s（2分）。"
      },
      {
        "en": "Uranium-238 decays by emitting an alpha particle. Write the resulting nuclide (atomic number of U is 92).",
        "zh": "铀-238 放出一个 α 粒子后变成什么核素？（铀原子序数为 92）",
        "type": "essay",
        "options": [],
        "answer": "α 粒子是 $^4_2He$，所以质量数减少 4，原子序数减少 2：$^{234}_{90}Th$（钍-234）。",
        "explain": "评分要点：α 粒子质量 4、电荷 2（2分）；质量数 238-4=234（2分）；原子序数 92-2=90（2分）。"
      },
      {
        "en": "Explain how a vacuum flask reduces heat transfer by conduction, convection and radiation.",
        "zh": "解释保温瓶如何通过真空层和镀银层减少传导、对流和辐射。",
        "type": "essay",
        "options": [],
        "answer": "双层玻璃间抽真空：消除传导和对流（真空没有介质可传热）。内壁镀银（亮面）：反射热辐射，减少以红外线形式的辐射散热。软木塞：减少瓶口处传导与对流。",
        "explain": "评分要点：真空消除传导/对流（2分）；镀银反射辐射（2分）；软木塞作用（2分）。"
      },
      {
        "en": "A 2 kg block of copper (c = 385 J/(kg °C)) absorbs 7700 J. Calculate its temperature rise.",
        "zh": "2 kg 铜块（比热容 385 J/(kg·°C)）吸收 7700 J，求温升。",
        "type": "essay",
        "options": [],
        "answer": "$Q=mc\\Delta T$，$\\Delta T=\\frac{Q}{mc}=\\frac{7700}{2\\times385}=\\frac{7700}{770}=10\\,^\\circ C$。",
        "explain": "评分要点：写出 $Q=mc\\Delta T$（2分）；代入数值（2分）；结果 10 °C（1分）。"
      }
    ]
  },

  /* ==================== 化学 Chemistry ==================== */
  {
    "subject": "chemistry",
    "name": "Mock Exam Paper 1",
    "questions": [
      {
        "en": "Which separation method is used to obtain salt from salty water?",
        "zh": "从盐水中得到食盐用哪种分离方法？",
        "type": "choice",
        "options": ["Evaporation", "Filtration", "Distillation", "Chromatography"],
        "answer": "Evaporation",
        "explain": "蒸发掉水留下食盐；蒸馏用于得到溶剂（水）。"
      },
      {
        "en": "The chemical symbol for sodium is?",
        "zh": "钠的化学符号是？",
        "type": "choice",
        "options": ["Na", "S", "So", "Nd"],
        "answer": "Na",
        "explain": "Na 来自拉丁文 natrium；不要和 S（硫）混淆。"
      },
      {
        "en": "The number of protons in an atom of $^{23}_{11}Na$ is?",
        "zh": "$^{23}_{11}Na$ 原子中的质子数是多少？",
        "type": "choice",
        "options": ["11", "12", "23", "34"],
        "answer": "11",
        "explain": "左下标是原子序数 = 质子数 = 11；中子数 = 23-11 = 12。"
      },
      {
        "en": "Isotopes of an element have the same number of...",
        "zh": "同一元素的同位素含有相同数目的？",
        "type": "choice",
        "options": ["Protons", "Neutrons", "Nucleons", "Electrons and neutrons"],
        "answer": "Protons",
        "explain": "同位素质子数相同、中子数不同，因此质量数不同。"
      },
      {
        "en": "The bond formed when electrons are shared between two non-metals is called?",
        "zh": "两种非金属之间通过共用电子形成的化学键叫？",
        "type": "choice",
        "options": ["Covalent bond", "Ionic bond", "Metallic bond", "Hydrogen bond"],
        "answer": "Covalent bond",
        "explain": "非金属-非金属：共价键；金属-非金属：离子键；金属内部：金属键。"
      },
      {
        "en": "The formula of magnesium chloride is?",
        "zh": "氯化镁的化学式是？",
        "type": "choice",
        "options": ["$MgCl_2$", "$MgCl$", "$Mg_2Cl$", "$MgCl_4$"],
        "answer": "$MgCl_2$",
        "explain": "镁 $Mg^{2+}$，氯 $Cl^-$，需 2 个 $Cl^-$ 配平电荷。"
      },
      {
        "en": "Which type of structure has a high melting point and conducts electricity only when molten or dissolved?",
        "zh": "哪种结构熔点高、只在熔融或溶于水时导电？",
        "type": "choice",
        "options": ["Giant ionic lattice", "Simple molecular", "Giant covalent", "Metallic"],
        "answer": "Giant ionic lattice",
        "explain": "离子晶体：固态离子不能自由移动不导电，熔融/溶解后离子自由移动导电。"
      },
      {
        "en": "Diamond does not conduct electricity because...",
        "zh": "金刚石不导电是因为？",
        "type": "choice",
        "options": ["All four outer electrons of each carbon are used in bonding", "It is too hard", "It contains no carbon", "It has free electrons"],
        "answer": "All four outer electrons of each carbon are used in bonding",
        "explain": "金刚石中每个 C 与 4 个 C 成键，没有自由电子；石墨层内有自由电子所以导电。"
      },
      {
        "en": "The relative formula mass of water ($H_2O$, H=1, O=16) is?",
        "zh": "水 $H_2O$ 的相对分子质量是多少（H=1, O=16）？",
        "type": "choice",
        "options": ["18", "16", "20", "17"],
        "answer": "18",
        "explain": "$2\\times1+16=18$。"
      },
      {
        "en": "How many moles are in 22 g of carbon dioxide ($CO_2$, Mr = 44)?",
        "zh": "22 g 二氧化碳（$CO_2$，Mr = 44）是多少摩尔？",
        "type": "choice",
        "options": ["0.5 mol", "1 mol", "2 mol", "0.25 mol"],
        "answer": "0.5 mol",
        "explain": "$n=\\frac{m}{M_r}=\\frac{22}{44}=0.5\\,mol$。"
      },
      {
        "en": "Group 1 elements react with water to produce...",
        "zh": "第 1 族元素与水反应生成什么？",
        "type": "choice",
        "options": ["A metal hydroxide and hydrogen", "A metal oxide and hydrogen", "A salt and oxygen", "Nothing"],
        "answer": "A metal hydroxide and hydrogen",
        "explain": "$2Na+2H_2O\\to2NaOH+H_2\\uparrow$。"
      },
      {
        "en": "Which halogen is a liquid at room temperature?",
        "zh": "哪种卤素在室温下是液体？",
        "type": "choice",
        "options": ["Bromine", "Chlorine", "Iodine", "Fluorine"],
        "answer": "Bromine",
        "explain": "F、Cl 是气体；Br 是红棕色液体；I 是紫黑色固体。"
      },
      {
        "en": "The most reactive element in Group 1 is...",
        "zh": "第 1 族中最活泼的元素是？",
        "type": "choice",
        "options": ["Francium", "Lithium", "Sodium", "Potassium"],
        "answer": "Francium",
        "explain": "第 1 族活泼性从上到下递增，钫最活泼（但有放射性，常用钾演示）。"
      },
      {
        "en": "Transition metals, unlike Group 1 metals, typically...",
        "zh": "过渡金属与第 1 族金属相比，典型特点是？",
        "type": "choice",
        "options": ["Form coloured compounds", "Have low melting points", "Are very soft", "Have only one oxidation state"],
        "answer": "Form coloured compounds",
        "explain": "过渡金属：高熔点、硬、可催化、形成有色化合物、有多种氧化态。"
      },
      {
        "en": "The charge on the nitride ion is...",
        "zh": "氮离子（nitride）的电荷是？",
        "type": "choice",
        "options": ["$N^{3-}$", "$N^{2-}$", "$N^-$", "$N^{3+}$"],
        "answer": "$N^{3-}$",
        "explain": "第 15 族非金属得 3 电子达到八隅体，形成 $N^{3-}$。"
      },
      {
        "en": "Which gas makes up about 78% of clean, dry air?",
        "zh": "干燥清洁空气中约 78% 是什么气体？",
        "type": "choice",
        "options": ["Nitrogen", "Oxygen", "Carbon dioxide", "Argon"],
        "answer": "Nitrogen",
        "explain": "氮气 78%、氧气 21%、氩气 0.9%、CO2 0.04%。"
      },
      {
        "en": "Balance the equation: $Fe + O_2 \\to Fe_2O_3$.",
        "zh": "配平方程式：$Fe + O_2 \\to Fe_2O_3$。",
        "type": "essay",
        "options": [],
        "answer": "$4Fe+3O_2\\to2Fe_2O_3$。",
        "explain": "评分要点：Fe 配平 4（2分）；O2 配平 3（2分）；Fe2O3 系数 2（1分）。"
      },
      {
        "en": "Calculate the percentage by mass of oxygen in $H_2SO_4$ (H=1, S=32, O=16).",
        "zh": "计算 $H_2SO_4$ 中氧的质量分数（H=1, S=32, O=16）。",
        "type": "essay",
        "options": [],
        "answer": "$M_r=2\\times1+32+4\\times16=98$。氧的质量 $=4\\times16=64$。氧的质量分数 $=\\frac{64}{98}\\times100\\%=65.3\\%$。",
        "explain": "评分要点：Mr = 98（2分）；氧总质量 64（2分）；百分比 65.3%（1分）。"
      },
      {
        "en": "Explain why ionic compounds have high melting points.",
        "zh": "解释为什么离子化合物熔点高。",
        "type": "essay",
        "options": [],
        "answer": "离子化合物由正负离子交替排列成巨大的晶格（giant ionic lattice）。离子之间存在强烈的静电吸引（离子键），要破坏这些键需要大量能量，因此熔点高。",
        "explain": "评分要点：提到巨大晶格（2分）；提到强静电引力/离子键（2分）；需要大量能量（2分）。"
      },
      {
        "en": "Describe a test to show that a given colourless liquid is pure water.",
        "zh": "描述一个实验证明某无色液体是纯水。",
        "type": "essay",
        "options": [],
        "answer": "测量其沸点：在标准大气压下纯水在 100 °C 沸腾且温度保持恒定；也可测凝固点 0 °C。还可用蓝色氯化钴试纸：遇水由蓝变粉红（辅助）。",
        "explain": "评分要点：测沸点 100 °C（3分）；说明纯净物沸点固定（2分）；其他辅助测试（1分）。"
      }
    ]
  },
  {
    "subject": "chemistry",
    "name": "Mock Exam Paper 2",
    "questions": [
      {
        "en": "Which pH value is typical of a strong acid?",
        "zh": "强酸的典型 pH 值是？",
        "type": "choice",
        "options": ["1", "7", "9", "14"],
        "answer": "1",
        "explain": "pH<7 酸性；pH=7 中性；pH>7 碱性。强酸 pH 接近 0-2。"
      },
      {
        "en": "The products of the reaction between an acid and a metal carbonate are...",
        "zh": "酸与金属碳酸盐反应的产物是？",
        "type": "choice",
        "options": ["Salt + water + carbon dioxide", "Salt + hydrogen", "Salt + water", "Salt + oxygen"],
        "answer": "Salt + water + carbon dioxide",
        "explain": "$HCl+Na_2CO_3\\to NaCl+H_2O+CO_2\\uparrow$。"
      },
      {
        "en": "Which gas relights a glowing splint?",
        "zh": "哪种气体会使带火星的木条复燃？",
        "type": "choice",
        "options": ["Oxygen", "Hydrogen", "Carbon dioxide", "Nitrogen"],
        "answer": "Oxygen",
        "explain": "氧气助燃；氢气点燃有爆鸣声；CO2 使石灰水变浑浊。"
      },
      {
        "en": "Hydrogen gas is tested with...",
        "zh": "氢气用什么方法检验？",
        "type": "choice",
        "options": ["A lighted splint gives a 'squeaky pop'", "Limewater turns milky", "Damp red litmus turns blue", "Glowing splint relights"],
        "answer": "A lighted splint gives a 'squeaky pop'",
        "explain": "氢气点燃发出「噗」的爆鸣声。"
      },
      {
        "en": "An exothermic reaction is one in which...",
        "zh": "放热反应是指？",
        "type": "choice",
        "options": ["Heat is given out to the surroundings", "Heat is taken in from the surroundings", "Temperature falls", "Energy is created"],
        "answer": "Heat is given out to the surroundings",
        "explain": "放热反应 $\\Delta H<0$，体系放热、温度升高；中和、燃烧都是放热。"
      },
      {
        "en": "In terms of bond breaking and making, an exothermic reaction occurs when...",
        "zh": "从化学键断裂和形成的角度，放热反应发生在什么时候？",
        "type": "choice",
        "options": ["Energy released forming new bonds is greater than energy absorbed breaking bonds", "Energy absorbed breaking bonds is greater", "No bonds are broken", "Bonds are only broken"],
        "answer": "Energy released forming new bonds is greater than energy absorbed breaking bonds",
        "explain": "$\\Delta H=$（断键吸热）-（成键放热）；成键放热 > 断键吸热则放热。"
      },
      {
        "en": "A catalyst speeds up a reaction by...",
        "zh": "催化剂通过什么方式加快反应？",
        "type": "choice",
        "options": ["Lowering the activation energy", "Increasing the activation energy", "Increasing the energy of the products", "Being used up in the reaction"],
        "answer": "Lowering the activation energy",
        "explain": "催化剂提供另一条低活化能路径，反应前后自身不变。"
      },
      {
        "en": "Increasing the temperature of a reaction usually increases the rate because...",
        "zh": "升高温度通常加快反应速率，是因为？",
        "type": "choice",
        "options": ["More particles have energy greater than the activation energy", "Particles get bigger", "Concentration increases", "Pressure decreases"],
        "answer": "More particles have energy greater than the activation energy",
        "explain": "温度升高，粒子平均动能增大，有效碰撞次数增多。"
      },
      {
        "en": "Which metal is extracted by electrolysis of its molten ore?",
        "zh": "哪种金属通过电解熔融矿石提取？",
        "type": "choice",
        "options": ["Aluminium", "Iron", "Copper", "Zinc"],
        "answer": "Aluminium",
        "explain": "铝太活泼，必须电解（冰晶石熔融）；铁用高炉还原。"
      },
      {
        "en": "The main reducing agent in the blast furnace for iron extraction is...",
        "zh": "高炉炼铁的主要还原剂是？",
        "type": "choice",
        "options": ["Carbon monoxide", "Carbon dioxide", "Oxygen", "Limestone"],
        "answer": "Carbon monoxide",
        "explain": "$Fe_2O_3+3CO\\to2Fe+3CO_2$；焦炭先燃烧生成 CO 再还原矿石。"
      },
      {
        "en": "Which metal is malleable, conducts electricity and is used for electrical wiring?",
        "zh": "哪种金属有延展性、导电，用作电线？",
        "type": "choice",
        "options": ["Copper", "Sodium", "Mercury", "Gold"],
        "answer": "Copper",
        "explain": "铜导电性好、延展性好、价格适中，是最常用电线材料。"
      },
      {
        "en": "Rusting of iron requires...",
        "zh": "铁生锈需要什么？",
        "type": "choice",
        "options": ["Oxygen and water", "Only water", "Only oxygen", "Carbon dioxide and water"],
        "answer": "Oxygen and water",
        "explain": "铁同时接触氧气和水才生锈；刷漆/涂油隔绝二者即可防锈。"
      },
      {
        "en": "The Haber process makes ammonia from...",
        "zh": "哈伯法用什么原料合成氨？",
        "type": "choice",
        "options": ["Nitrogen and hydrogen", "Nitrogen and oxygen", "Hydrogen and oxygen", "Ammonium nitrate"],
        "answer": "Nitrogen and hydrogen",
        "explain": "$N_2+3H_2\\rightleftharpoons2NH_3$，铁催化剂，约 450 °C、200 atm。"
      },
      {
        "en": "In the Haber process, increasing pressure shifts the equilibrium...",
        "zh": "哈伯反应中增大压强使平衡如何移动？",
        "type": "choice",
        "options": ["To the right (more ammonia)", "To the left (more reactants)", "No change", "Stops the reaction"],
        "answer": "To the right (more ammonia)",
        "explain": "勒夏特列原理：增大压强，平衡向气体分子数少的一侧移动（右：4 mol → 2 mol）。"
      },
      {
        "en": "The acid used in the laboratory preparation of carbon dioxide is...",
        "zh": "实验室制 CO2 用什么酸？",
        "type": "choice",
        "options": ["Dilute hydrochloric acid", "Dilute sulfuric acid", "Dilute nitric acid", "Concentrated sulfuric acid"],
        "answer": "Dilute hydrochloric acid",
        "explain": "稀盐酸 + 大理石/石灰石；硫酸会生成微溶的 CaSO4 覆盖在矿石表面阻止反应。"
      },
      {
        "en": "Which salt is soluble in water?",
        "zh": "哪种盐可溶于水？",
        "type": "choice",
        "options": ["Sodium nitrate", "Barium sulfate", "Silver chloride", "Lead iodide"],
        "answer": "Sodium nitrate",
        "explain": "所有钠盐、硝酸盐都可溶；硫酸盐除 Ba、Pb、Ca 外可溶；氯化物除 Ag、Pb 外可溶。"
      },
      {
        "en": "Neutralise 25.0 cm^3 of 0.10 mol/dm^3 HCl requires how many moles of NaOH?",
        "zh": "中和 25.0 cm³、0.10 mol/dm³ 的 HCl 需要多少摩尔 NaOH？",
        "type": "essay",
        "options": [],
        "answer": "$n(HCl)=cV=0.10\\times\\frac{25.0}{1000}=0.0025\\,mol$。反应 $HCl+NaOH\\to NaCl+H_2O$ 摩尔比 1:1，所以 $n(NaOH)=0.0025\\,mol$。",
        "explain": "评分要点：换算 cm³→dm³（2分）；$n=cV$ 得 0.0025（2分）；1:1 比例（1分）。"
      },
      {
        "en": "Explain, using collision theory, why increasing the concentration of a reactant increases the rate of reaction.",
        "zh": "用碰撞理论解释为什么增大反应物浓度会加快反应。",
        "type": "essay",
        "options": [],
        "answer": "浓度增大，单位体积内反应物粒子数增多，粒子间碰撞频率增大，单位时间内有效碰撞（能量超过活化能）次数增多，因此反应速率加快。",
        "explain": "评分要点：单位体积内粒子数增多（2分）；碰撞频率增大（2分）；有效碰撞增多（2分）。"
      },
      {
        "en": "Write the word equation for the reaction between magnesium and dilute hydrochloric acid, and name the gas produced.",
        "zh": "写出镁与稀盐酸反应的文字方程式，并指出生成的气体。",
        "type": "essay",
        "options": [],
        "answer": "镁 + 盐酸 → 氯化镁 + 氢气。生成的气体是氢气（$H_2$）。",
        "explain": "评分要点：反应物正确（1分）；产物氯化镁（1分）；产物氢气（2分）；气体检验/名称正确（1分）。"
      },
      {
        "en": "State two advantages and two disadvantages of recycling metals.",
        "zh": "说出回收金属的两个优点和两个缺点。",
        "type": "essay",
        "options": [],
        "answer": "优点：节约有限的金属矿石资源；减少采矿对环境的破坏；回收冶炼能耗远低于从矿石提取（如铝节能 95%）；减少垃圾填埋。缺点：回收收集、运输、分类成本高；部分金属回收时质量下降；需要垃圾分类意识和基础设施。（任答两点优点+两点缺点）",
        "explain": "评分要点：每点合理优点 1 分（最多 2 分）；每点合理缺点 1 分（最多 2 分）；言之有理可酌情给分。"
      }
    ]
  },
  {
    "subject": "chemistry",
    "name": "Mock Exam Paper 3",
    "questions": [
      {
        "en": "The first alkane in the homologous series is...",
        "zh": "同系物中第一个烷烃是？",
        "type": "choice",
        "options": ["Methane", "Ethane", "Ethene", "Methanol"],
        "answer": "Methane",
        "explain": "烷烃通式 $C_nH_{2n+2}$，n=1 即甲烷 $CH_4$。"
      },
      {
        "en": "The general formula for alkenes is...",
        "zh": "烯烃的通式是？",
        "type": "choice",
        "options": ["$C_nH_{2n}$", "$C_nH_{2n+2}$", "$C_nH_{2n-2}$", "$C_nH_n$"],
        "answer": "$C_nH_{2n}$",
        "explain": "烯烃含一个 C=C 双键：$C_nH_{2n}$；烷烃 $C_nH_{2n+2}$。"
      },
      {
        "en": "Bromine water is used to test for...",
        "zh": "溴水用来检验什么？",
        "type": "choice",
        "options": ["Alkenes (C=C double bond)", "Alkanes", "Alcohols", "Carboxylic acids"],
        "answer": "Alkenes (C=C double bond)",
        "explain": "烯烃使橙红色溴水褪色（加成反应）；烷烃不反应。"
      },
      {
        "en": "Ethene undergoes addition polymerisation to form...",
        "zh": "乙烯加聚生成什么？",
        "type": "choice",
        "options": ["Poly(ethene)", "Nylon", "Protein", "Poly(chloroethene)"],
        "answer": "Poly(ethene)",
        "explain": "$nCH_2=CH_2\\to[-CH_2-CH_2-]_n$，即聚乙烯。"
      },
      {
        "en": "The functional group of an alcohol is...",
        "zh": "醇的官能团是？",
        "type": "choice",
        "options": ["-OH", "-COOH", "-CHO", "-C=O"],
        "answer": "-OH",
        "explain": "醇：羟基 -OH；羧酸：-COOH；醛：-CHO。"
      },
      {
        "en": "Ethanol can be made by fermentation. Which condition is NOT required?",
        "zh": "乙醇可由发酵制得，下列哪个条件不需要？",
        "type": "choice",
        "options": ["High pressure", "Yeast", "Warm temperature (~30-40 °C)", "Anaerobic conditions"],
        "answer": "High pressure",
        "explain": "发酵：酵母、30-40 °C、无氧、水溶液；高压是乙烯水合法的条件。"
      },
      {
        "en": "The products of complete combustion of a hydrocarbon are...",
        "zh": "烃完全燃烧的产物是？",
        "type": "choice",
        "options": ["Carbon dioxide and water", "Carbon monoxide and water", "Carbon and water", "Methane and oxygen"],
        "answer": "Carbon dioxide and water",
        "explain": "完全燃烧：$CO_2+H_2O$；不完全燃烧产生 CO 甚至炭黑。"
      },
      {
        "en": "Which polymer is natural, not synthetic?",
        "zh": "下列哪种聚合物是天然的？",
        "type": "choice",
        "options": ["Protein", "Poly(ethene)", "Nylon", "Poly(vinyl chloride)"],
        "answer": "Protein",
        "explain": "蛋白质、淀粉、纤维素、橡胶是天然聚合物；其余是合成塑料/纤维。"
      },
      {
        "en": "Fractional distillation of crude oil works because fractions have different...",
        "zh": "原油分馏是依据各馏分的什么不同？",
        "type": "choice",
        "options": ["Boiling points", "Colours", "Masses of atoms", "Solubilities in water"],
        "answer": "Boiling points",
        "explain": "分馏塔底部热、顶部冷；沸点低的小分子上升到塔顶冷凝。"
      },
      {
        "en": "Which fraction from crude oil has the longest chain length?",
        "zh": "原油各馏分中链最长的是？",
        "type": "choice",
        "options": ["Bitumen", "Petrol", "Kerosine", "Refinery gases"],
        "answer": "Bitumen",
        "explain": "塔底渣油/沥青链最长、沸点最高；塔顶炼厂气最短。"
      },
      {
        "en": "Cracking is used to...",
        "zh": "裂解（cracking）的目的是？",
        "type": "choice",
        "options": ["Break long-chain hydrocarbons into smaller, more useful molecules", "Join small molecules into long chains", "Remove impurities", "Separate crude oil"],
        "answer": "Break long-chain hydrocarbons into smaller, more useful molecules",
        "explain": "把重质长链裂化为短链烯烃和汽油馏分，并获得制造塑料的原料烯烃。"
      },
      {
        "en": "The test for carbon dioxide gas is...",
        "zh": "检验二氧化碳气体用什么方法？",
        "type": "choice",
        "options": ["Limewater turns milky", "Relights a glowing splint", "Squeaky pop with a splint", "Damp blue litmus turns red"],
        "answer": "Limewater turns milky",
        "explain": "$CO_2+Ca(OH)_2\\to CaCO_3\\downarrow+H_2O$，碳酸钙沉淀使石灰水变浑浊。"
      },
      {
        "en": "Which ion gives a brick-red flame test?",
        "zh": "哪种离子的焰色反应呈砖红色？",
        "type": "choice",
        "options": ["Calcium", "Sodium", "Potassium", "Copper"],
        "answer": "Calcium",
        "explain": "钙：砖红；钠：亮黄；钾：淡紫（透过钴玻璃）；铜：蓝绿。"
      },
      {
        "en": "A white precipitate insoluble in dilute nitric acid forms when silver nitrate is added. The ion present is...",
        "zh": "加硝酸银生成不溶于稀硝酸的白色沉淀，说明存在什么离子？",
        "type": "choice",
        "options": ["Chloride", "Sulfate", "Iodide", "Nitrate"],
        "answer": "Chloride",
        "explain": "$AgCl$ 白色沉淀；$AgBr$ 淡黄；$AgI$ 黄。"
      },
      {
        "en": "Which gas causes acid rain?",
        "zh": "哪种气体导致酸雨？",
        "type": "choice",
        "options": ["Sulfur dioxide", "Oxygen", "Nitrogen", "Argon"],
        "answer": "Sulfur dioxide",
        "explain": "$SO_2$ 和氮氧化物溶于雨水形成硫酸/硝酸型酸雨；主要来自含硫煤燃烧和汽车尾气。"
      },
      {
        "en": "Global warming is mainly caused by increasing atmospheric concentrations of...",
        "zh": "全球变暖主要由大气中哪种气体浓度升高引起？",
        "type": "choice",
        "options": ["Carbon dioxide", "Oxygen", "Nitrogen", "Argon"],
        "answer": "Carbon dioxide",
        "explain": "$CO_2$ 是最主要的温室气体；燃烧化石燃料大量排放。"
      },
      {
        "en": "Draw the displayed (full structural) formula of ethane and state its molecular formula.",
        "zh": "画出乙烷的展示式（完整结构式），并写出分子式。",
        "type": "essay",
        "options": [],
        "answer": "分子式 $C_2H_6$。结构式：两个 C 单键相连，每个 C 上各连 3 个 H：$H_3C-CH_3$。",
        "explain": "评分要点：分子式 $C_2H_6$（2分）；C-C 单键（1分）；每个 C 连 3 个 H（2分）。"
      },
      {
        "en": "Describe how you would carry out a titration to find the concentration of a dilute hydrochloric acid using standard sodium hydroxide.",
        "zh": "描述如何用标准 NaOH 溶液滴定稀盐酸，测其浓度。",
        "type": "essay",
        "options": [],
        "answer": "① 用移液管取已知体积（如 25.0 cm³）盐酸放入锥形瓶；② 加几滴指示剂（如酚酞）；③ 把已知浓度 NaOH 装入滴定管，记录初始读数；④ 逐滴加入 NaOH，边滴边摇，直到溶液恰好变色且 30 秒不退色，记录终点读数；⑤ 重复至获得两组一致数据；⑥ 用 $c_1V_1=c_2V_2$ 计算。",
        "explain": "评分要点：移液管取酸（1分）；加指示剂（1分）；滴定管装 NaOH 记录初读数（1分）；滴至终点（1分）；重复平行实验（1分）；计算（1分）。"
      },
      {
        "en": "Ethanol reacts with ethanoic acid to form an ester. Name the ester and write the word equation.",
        "zh": "乙醇与乙酸反应生成酯，写出酯的名称和文字方程式。",
        "type": "essay",
        "options": [],
        "answer": "乙醇 + 乙酸 ⇌ 乙酸乙酯 + 水。（浓硫酸催化、加热）酯名为乙酸乙酯（ethyl ethanoate）。",
        "explain": "评分要点：反应物正确（1分）；酯名乙酸乙酯（2分）；水作为产物（1分）；可逆反应/催化条件（2分）。"
      },
      {
        "en": "Explain why recycling of metals is important, giving two reasons.",
        "zh": "解释为什么回收金属重要，给出两个理由。",
        "type": "essay",
        "options": [],
        "answer": "① 金属矿石是有限的不可再生资源，回收可延长资源寿命；② 回收冶炼能耗远低于从矿石提取（如铝节能约 95%），减少 $CO_2$ 排放；③ 减少采矿造成的环境破坏和垃圾填埋体积。",
        "explain": "评分要点：节约矿产资源（2分）；节能/减排（2分）；减少环境破坏（2分，任答两点满分）。"
      }
    ]
  },

  /* ==================== 商务 Business Studies ==================== */
  {
    "subject": "business",
    "name": "Mock Exam Paper 1",
    "questions": [
      {
        "en": "Which of the following is NOT a factor of production?",
        "zh": "下列哪项不是生产要素？",
        "type": "choice",
        "options": ["Money", "Land", "Labour", "Capital"],
        "answer": "Money",
        "explain": "生产要素包括土地、劳动、资本、企业家才能；货币本身不是生产要素，只是交换媒介。"
      },
      {
        "en": "A business owned and run by one person has unlimited liability. This means...",
        "zh": "独资企业主承担无限责任，这意味着？",
        "type": "choice",
        "options": ["The owner's personal assets can be used to pay business debts", "The owner loses only the money invested", "The business has no debts", "Shareholders are protected"],
        "answer": "The owner's personal assets can be used to pay business debts",
        "explain": "无限责任：企业债务 = 个人债务，房子、存款都可能被追偿。"
      },
      {
        "en": "Which is an advantage of a franchise?",
        "zh": "特许经营的一个优点是？",
        "type": "choice",
        "options": ["Proven business model and brand recognition", "Complete independence in decision-making", "No royalties to pay", "No need to follow procedures"],
        "answer": "Proven business model and brand recognition",
        "explain": "加盟商获得成熟品牌和经营系统，但要交特许权使用费并受总部约束。"
      },
      {
        "en": "The primary sector involves...",
        "zh": "第一产业（primary sector）从事什么活动？",
        "type": "choice",
        "options": ["Extracting natural resources", "Manufacturing goods", "Providing services", "Selling products"],
        "answer": "Extracting natural resources",
        "explain": "第一产业：采矿、农业、渔业；第二产业：制造；第三产业：服务。"
      },
      {
        "en": "A mission statement describes...",
        "zh": "使命宣言（mission statement）描述什么？",
        "type": "choice",
        "options": ["The business's core purpose and values", "The annual sales target", "The share price", "The number of employees"],
        "answer": "The business's core purpose and values",
        "explain": "使命宣言说明企业存在的根本目的和价值观，是长期方向。"
      },
      {
        "en": "Which business objective is most likely for a new start-up in its first year?",
        "zh": "新创企业第一年最可能的经营目标是？",
        "type": "choice",
        "options": ["Survival", "Profit maximisation", "Market leadership", "Dividend growth"],
        "answer": "Survival",
        "explain": "初创企业首要目标是生存（cash flow 为正、活过第一年）。"
      },
      {
        "en": "Economies of scale refer to...",
        "zh": "规模经济指的是？",
        "type": "choice",
        "options": ["Average cost falling as output increases", "Average cost rising as output increases", "Fixed costs falling to zero", "Revenue rising with price"],
        "answer": "Average cost falling as output increases",
        "explain": "大规模生产使单位平均成本下降：采购、技术、管理、财务等经济。"
      },
      {
        "en": "Which of the following is a non-financial objective?",
        "zh": "下列哪项是非财务目标？",
        "type": "choice",
        "options": ["Good reputation for ethical trading", "Maximising profit", "Increasing dividend per share", "Raising sales revenue by 20%"],
        "answer": "Good reputation for ethical trading",
        "explain": "伦理声誉、员工福利、环保属于非财务目标；其他都是财务目标。"
      },
      {
        "en": "Span of control refers to...",
        "zh": "控制幅度（span of control）指的是？",
        "type": "choice",
        "options": ["The number of subordinates directly managed by one superior", "The height of the organisation chart", "The total number of employees", "The salary range"],
        "answer": "The number of subordinates directly managed by one superior",
        "explain": "一个上级直接管辖的下属人数；幅度宽=扁平结构，幅度窄=高耸结构。"
      },
      {
        "en": "Which leadership style involves delegating most decisions to employees?",
        "zh": "哪种领导风格把大多数决策权下放给员工？",
        "type": "choice",
        "options": ["Laissez-faire", "Autocratic", "Authoritarian", "Directive"],
        "answer": "Laissez-faire",
        "explain": "放任式（laissez-faire）：员工自主决策；专制式（autocratic）：老板一人决定。"
      },
      {
        "en": "A trade union is...",
        "zh": "工会（trade union）是什么？",
        "type": "choice",
        "options": ["An organisation of workers that negotiates with employers", "A government department", "A type of business partner", "A group of shareholders"],
        "answer": "An organisation of workers that negotiates with employers",
        "explain": "工会代表工人就工资、工时、工作条件与集体雇主谈判。"
      },
      {
        "en": "Off-the-job training means...",
        "zh": "脱产培训（off-the-job training）指的是？",
        "type": "choice",
        "options": ["Training away from the normal workplace", "Training at the workplace while working", "No training at all", "Training only by watching videos at home"],
        "answer": "Training away from the normal workplace",
        "explain": "脱产：课堂、外部机构；在职（on-the-job）：师傅带徒弟、边干边学。"
      },
      {
        "en": "A job description should include...",
        "zh": "岗位说明书应包括什么？",
        "type": "choice",
        "options": ["Main duties, responsibilities and position in the organisation", "The candidate's exam results", "The candidate's salary expectations", "The company's share price"],
        "answer": "Main duties, responsibilities and position in the organisation",
        "explain": "岗位说明书描述岗位本身的职责；person specification 才是对任职者的要求。"
      },
      {
        "en": "Which is a benefit of good employee motivation?",
        "zh": "员工激励好的一个好处是？",
        "type": "choice",
        "options": ["Higher labour productivity and lower absenteeism", "Higher wage costs only", "Lower product quality", "Higher staff turnover"],
        "answer": "Higher labour productivity and lower absenteeism",
        "explain": "激励好→生产率高、缺勤率低、离职率低、质量好。"
      },
      {
        "en": "Herzberg's two-factor theory distinguishes between...",
        "zh": "赫茨伯格双因素理论区分了什么？",
        "type": "choice",
        "options": ["Hygiene factors and motivators", "Wages and salaries", "Managers and workers", "Short-term and long-term goals"],
        "answer": "Hygiene factors and motivators",
        "explain": "保健因素（工资、条件）只能消除不满；激励因素（成就、认可、责任）才能真正提升满意。"
      },
      {
        "en": "A grievance procedure is...",
        "zh": "申诉程序（grievance procedure）是什么？",
        "type": "choice",
        "options": ["A formal process for employees to raise complaints", "A way to dismiss workers quickly", "A method of setting wages", "A type of training"],
        "answer": "A formal process for employees to raise complaints",
        "explain": "正式申诉渠道，按层级解决员工不满，避免直接冲突或罢工。"
      },
      {
        "en": "Explain two reasons why a new business might choose to become a private limited company (Ltd).",
        "zh": "解释一家新企业选择成为私人有限公司（Ltd）的两个原因。",
        "type": "essay",
        "options": [],
        "answer": "① 股东承担有限责任，个人财产与企业债务分离，降低创业风险；② 可以向更多私人投资者出售股份筹资，比独资资金更充裕；③ 企业具有独立法人地位， continuity（存续性）不受股东变动影响。（任答两点）",
        "explain": "评分要点：每点合理原因 3 分（说明 + 解释），最多 6 分。"
      },
      {
        "en": "Define 'stakeholder' and give two examples of internal stakeholders.",
        "zh": "定义「利益相关者」，并举出两个内部利益相关者的例子。",
        "type": "essay",
        "options": [],
        "answer": "利益相关者是指任何受企业活动影响、或能影响企业的个人或群体。内部利益相关者例如：员工、管理人员、股东/所有者。（外部例子：顾客、供应商、政府、社区）。",
        "explain": "评分要点：定义正确（2分）；两个内部例子各 2 分（共 4 分）。"
      },
      {
        "en": "Discuss whether a large supermarket chain should always aim for profit maximisation.",
        "zh": "讨论大型连锁超市是否应始终以利润最大化为目标。",
        "type": "essay",
        "options": [],
        "answer": "支持：为股东提供回报、再投资资金、企业生存。反对：过分追求短期利润可能牺牲员工待遇、顾客服务质量、社区关系和长期可持续增长；大型企业常需兼顾社会责任、长期市场份额和员工激励。结论：在竞争激烈的零售行业，长期利润与顾客/员工满意度密不可分，不能只看短期利润。",
        "explain": "评分要点：正面论点（3分）；反面论点（3分）；结论/平衡判断（2分）。"
      },
      {
        "en": "Explain how a wide span of control might affect the way a manager works.",
        "zh": "解释控制幅度宽（下属多）会如何影响经理的工作方式。",
        "type": "essay",
        "options": [],
        "answer": "幅度宽意味着经理直接管辖很多下属：① 经理必须更多授权，无法事事亲自监督；② 沟通和协调成本上升；③ 对下属自我管理能力要求高；④ 组织结构扁平，决策可能更快，但经理负荷重、容易失控。",
        "explain": "评分要点：授权增多（2分）；沟通/协调挑战（2分）；扁平结构/决策速度（2分）。"
      }
    ]
  },
  {
    "subject": "business",
    "name": "Mock Exam Paper 2",
    "questions": [
      {
        "en": "The marketing mix consists of...",
        "zh": "营销组合（4P）包括什么？",
        "type": "choice",
        "options": ["Product, Price, Place, Promotion", "Product, Profit, People, Place", "Price, Profit, Promotion, Product", "Place, People, Profit, Product"],
        "answer": "Product, Price, Place, Promotion",
        "explain": "4P：产品、价格、渠道、促销。"
      },
      {
        "en": "Market segmentation means...",
        "zh": "市场细分指的是？",
        "type": "choice",
        "options": ["Dividing a total market into groups of customers with similar needs", "Selling to everyone in the same way", "Setting one price for all", "Reducing production costs"],
        "answer": "Dividing a total market into groups of customers with similar needs",
        "explain": "按人口、地理、心理、行为等变量把大市场切成若干子市场，分别营销。"
      },
      {
        "en": "Which pricing strategy involves setting a high initial price for a new, innovative product?",
        "zh": "对创新新产品最初定高价的策略叫？",
        "type": "choice",
        "options": ["Price skimming", "Penetration pricing", "Cost-plus pricing", "Predatory pricing"],
        "answer": "Price skimming",
        "explain": "撇脂定价：先高后低，赚早期愿意付高价的顾客；渗透定价：先低价抢份额。"
      },
      {
        "en": "A logo is part of a firm's...",
        "zh": "标志（logo）属于企业的什么？",
        "type": "choice",
        "options": ["Branding", "Costs", "Production", "Auditing"],
        "answer": "Branding",
        "explain": "品牌包括名称、标志、设计、声誉，帮助顾客识别并建立忠诚度。"
      },
      {
        "en": "Primary market research includes...",
        "zh": "一手市场调研包括？",
        "type": "choice",
        "options": ["Questionnaires and focus groups", "Government statistics", "Published trade journals", "Internet reports"],
        "answer": "Questionnaires and focus groups",
        "explain": "一手：自己收集（问卷、访谈、焦点小组、观察）；二手：已发表资料。"
      },
      {
        "en": "Which stage of the product life cycle is characterised by falling sales and falling profits?",
        "zh": "产品生命周期哪个阶段销量和利润都在下降？",
        "type": "choice",
        "options": ["Decline", "Introduction", "Growth", "Maturity"],
        "answer": "Decline",
        "explain": "衰退期：市场饱和、替代品出现，销量利润下滑，企业考虑退市或改良。"
      },
      {
        "en": "Batch production is...",
        "zh": "批量生产（batch production）是什么？",
        "type": "choice",
        "options": ["Producing a group of identical products at one time, then switching to another product", "Producing one product at a time to order", "Continuous 24-hour production of one standard item", "Making unique one-off items"],
        "answer": "Producing a group of identical products at one time, then switching to another product",
        "explain": "批量：一批一批（面包、杂志）；单件（job）：定制；流水线/连续（flow）：化工、汽车。"
      },
      {
        "en": "Which is an advantage of flow (mass) production?",
        "zh": "流水线/大规模生产的优点是？",
        "type": "choice",
        "options": ["Low unit cost due to high volume and automation", "High product variety", "Flexibility to change designs quickly", "Low initial capital cost"],
        "answer": "Low unit cost due to high volume and automation",
        "explain": "大批量 + 自动化 → 单位成本低；但初期投资大、产品品种少、改线不灵活。"
      },
      {
        "en": "Quality control differs from quality assurance in that QC...",
        "zh": "质量控制（QC）与质量保证（QA）的区别在于 QC？",
        "type": "choice",
        "options": ["Inspects finished products to remove defects", "Builds quality into the production process", "Involves all workers", "Prevents defects from happening"],
        "answer": "Inspects finished products to remove defects",
        "explain": "QC：事后检验、剔除次品；QA/TQM：全过程预防、全员参与。"
      },
      {
        "en": "Lean production aims to...",
        "zh": "精益生产的目标是？",
        "type": "choice",
        "options": ["Eliminate waste and reduce inventory", "Maximise inventory levels", "Increase all types of cost", "Produce more than demand"],
        "answer": "Eliminate waste and reduce inventory",
        "explain": "精益生产消灭 7 种浪费（库存、等待、过量生产等）；JIT（准时制）是其代表。"
      },
      {
        "en": "Which factor would most likely cause a business to locate production near its raw materials?",
        "zh": "哪个因素最可能促使企业把工厂设在靠近原料产地？",
        "type": "choice",
        "options": ["The raw material loses weight or bulk during processing", "The product is fragile", "Labour is cheap near customers", "The product is heavy to transport"],
        "answer": "The raw material loses weight or bulk during processing",
        "explain": "原料失重/增重型工业（如炼铝、制糖）靠近原料；成品运输昂贵则靠近市场。"
      },
      {
        "en": "Productivity can be measured as...",
        "zh": "生产率可以怎么衡量？",
        "type": "choice",
        "options": ["Output per worker (or per hour worked)", "Total revenue", "Number of workers", "Total units produced"],
        "answer": "Output per worker (or per hour worked)",
        "explain": "劳动生产率 = 总产出 / 劳动投入；生产率提高意味着单位成本下降。"
      },
      {
        "en": "Which is an example of 'offshoring'?",
        "zh": "下列哪个是「离岸外包（offshoring）」的例子？",
        "type": "choice",
        "options": ["Moving a call centre from the home country to another country", "Hiring temporary staff", "Buying from a local supplier", "Selling goods abroad"],
        "answer": "Moving a call centre from the home country to another country",
        "explain": "offshoring 把业务搬到国外；outsourcing 是外包给第三方，不一定出国。"
      },
      {
        "en": "A Gantt chart is used in operations to...",
        "zh": "甘特图在运营管理中用于？",
        "type": "choice",
        "options": ["Plan and schedule tasks over time", "Calculate profit", "Measure customer satisfaction", "Design products"],
        "answer": "Plan and schedule tasks over time",
        "explain": "甘特图以条形图显示各任务的起止时间和进度，用于项目排程。"
      },
      {
        "en": "Which is a benefit to a business of selling through e-commerce?",
        "zh": "电子商务对企业的一个好处是？",
        "type": "choice",
        "options": ["Access to a global market with lower shop-floor costs", "Higher rent costs", "Fewer customer data", "Physical shop premises required"],
        "answer": "Access to a global market with lower shop-floor costs",
        "explain": "电商无地域限制、店面成本低、可收集客户数据；但物流、网站维护成本高。"
      },
      {
        "en": "A product in the 'maturity' stage of its life cycle should be marketed by...",
        "zh": "处于成熟期的产品应如何营销？",
        "type": "choice",
        "options": ["Differentiating the brand and modifying the product to defend market share", "Withdrawing all advertising", "Raising the price sharply", "Stopping production immediately"],
        "answer": "Differentiating the brand and modifying the product to defend market share",
        "explain": "成熟期竞争激烈、销量见顶：靠品牌差异化、产品改良、促销守住份额。"
      },
      {
        "en": "Explain two reasons why a small bakery might choose batch production rather than flow production.",
        "zh": "解释一家小面包店为什么选择批量生产而非流水线生产。",
        "type": "essay",
        "options": [],
        "answer": "① 小店产量小，流水线需要巨额投资，不经济；② 顾客需要多种品种（面包、蛋糕、点心），批量可换产；③ 批量生产更灵活，能根据当日需求调整。",
        "explain": "评分要点：每点合理原因 3 分（含解释），最多 6 分。"
      },
      {
        "en": "Define 'market segmentation' and outline two ways a sportswear shop could segment its market.",
        "zh": "定义「市场细分」，并说明一家运动用品店可以如何细分市场（两种方式）。",
        "type": "essay",
        "options": [],
        "answer": "市场细分：把整体市场按相似需求划分为若干子群体。运动店可：① 按人口/年龄（青少年 vs 中年人跑步）；② 按行为/用途（专业运动员 vs 周末休闲健身）；③ 按地理（本地居民 vs 旅游顾客）；④ 按心理（追求潮流 vs 追求性价比）。",
        "explain": "评分要点：定义正确（2分）；两种细分方式各 2 分（共 4 分）。"
      },
      {
        "en": "Discuss whether a luxury watch maker should use psychological pricing rather than competitive pricing.",
        "zh": "讨论奢侈手表制造商应该使用心理定价还是竞争定价。",
        "type": "essay",
        "options": [],
        "answer": "支持心理/高价：奢侈品靠高价传递身份和品质感，与品牌定位一致，不能跟随对手降价。反对：竞争定价可保持销量、避免被新品牌夺走市场；但降价会损害奢侈形象。结论：奢侈品通常应维持高价位和心理定价（如尾数 9999 强化价值感），因为品牌资产比短期销量更重要。",
        "explain": "评分要点：支持心理定价论点（3分）；反面/竞争定价论点（3分）；结论（2分）。"
      },
      {
        "en": "Explain two benefits to a car factory of using just-in-time (JIT) stock control.",
        "zh": "解释汽车厂使用准时制（JIT）库存控制的两个好处。",
        "type": "essay",
        "options": [],
        "answer": "① 大幅降低原材料和在制品库存，减少仓储成本和资金占用；② 库存少意味着陈旧/过时风险低；③ 问题零件立即被发现，强制提高质量。缺点是一旦供应链中断就停产，对供应商可靠性要求高。",
        "explain": "评分要点：每点合理好处 3 分（含解释），最多 6 分。"
      }
    ]
  },
  {
    "subject": "business",
    "name": "Mock Exam Paper 3",
    "questions": [
      {
        "en": "Cash flow is...",
        "zh": "现金流（cash flow）指的是？",
        "type": "choice",
        "options": ["The timing of cash inflows and outflows of a business", "Total profit earned", "Total sales revenue", "The value of shares issued"],
        "answer": "The timing of cash inflows and outflows of a business",
        "explain": "现金流关心钱什么时候进来、什么时候出去；利润是会计概念，二者不同。"
      },
      {
        "en": "Which of the following is a fixed cost?",
        "zh": "下列哪项是固定成本？",
        "type": "choice",
        "options": ["Factory rent", "Raw materials", "Packaging", "Piece-rate wages"],
        "answer": "Factory rent",
        "explain": "租金不随产量变化；原料、包装、计件工资随产量变动，是变动成本。"
      },
      {
        "en": "Break-even point is where...",
        "zh": "盈亏平衡点（break-even point）是？",
        "type": "choice",
        "options": ["Total revenue equals total costs", "Profit is maximised", "Sales are zero", "Fixed costs are zero"],
        "answer": "Total revenue equals total costs",
        "explain": "盈亏平衡：总收入 = 总成本，利润为 0；BEP = 固定成本 /（单价 - 单位变动成本）。"
      },
      {
        "en": "A loan that must be repaid over more than one year is called...",
        "zh": "需要一年以上偿还的贷款叫？",
        "type": "choice",
        "options": ["Long-term liability", "Current asset", "Revenue", "Overdraft"],
        "answer": "Long-term liability",
        "explain": "长期负债：银行贷款、债券；短期（流动负债）：透支、应付账款。"
      },
      {
        "en": "Which source of finance is most suitable for a small shop buying a new delivery van?",
        "zh": "小商店买一辆送货货车，最合适的融资方式是？",
        "type": "choice",
        "options": ["Bank loan (medium-term)", "Trade credit", "Overdraft", "Issuing shares on the stock exchange"],
        "answer": "Bank loan (medium-term)",
        "explain": "长期资产用中长期贷款或租赁匹配；小商店不能上市发股票；透支只适合短期。"
      },
      {
        "en": "Gross profit margin is calculated as...",
        "zh": "毛利率怎么算？",
        "type": "choice",
        "options": ["(Gross profit / Revenue) × 100%", "(Net profit / Revenue) × 100%", "(Revenue - Expenses)", "Fixed cost / Variable cost"],
        "answer": "(Gross profit / Revenue) × 100%",
        "explain": "毛利 = 营收 - 销售成本；毛利率 = 毛利 / 营收 ×100%。"
      },
      {
        "en": "Which internal source of finance involves using profits kept in the business?",
        "zh": "哪种内部融资方式使用企业留存的利润？",
        "type": "choice",
        "options": ["Retained profit", "Bank loan", "Share issue", "Debenture"],
        "answer": "Retained profit",
        "explain": "留存利润：税后利润不全部分红，留在企业再投资；无利息、不稀释股权。"
      },
      {
        "en": "A budget is...",
        "zh": "预算（budget）是什么？",
        "type": "choice",
        "options": ["A financial plan for future income and expenditure", "A record of last year's actual profit", "A type of loan", "A shareholder meeting"],
        "answer": "A financial plan for future income and expenditure",
        "explain": "预算是未来收支计划，用于控制成本、设定目标。"
      },
      {
        "en": "Inflation means...",
        "zh": "通货膨胀指的是？",
        "type": "choice",
        "options": ["A sustained rise in the general price level", "A fall in prices", "A rise in the exchange rate", "A rise in unemployment"],
        "answer": "A sustained rise in the general price level",
        "explain": "通胀是物价普遍持续上涨，货币购买力下降；对企业成本和定价都有影响。"
      },
      {
        "en": "Which of the following is likely to happen if a country's interest rates rise?",
        "zh": "如果一个国家利率上升，下列哪项最可能发生？",
        "type": "choice",
        "options": ["Consumer borrowing and spending fall", "Business investment becomes cheaper", "Inflation automatically falls to zero", "Export sales always rise"],
        "answer": "Consumer borrowing and spending fall",
        "explain": "加息：储蓄更划算、借贷成本上升，消费和投资降温，央行用来压通胀。"
      },
      {
        "en": "A tariff on imported goods...",
        "zh": "对进口商品征收关税会？",
        "type": "choice",
        "options": ["Raises the price of imports and protects domestic producers", "Lowers the price of imports", "Increases free trade", "Has no effect on consumers"],
        "answer": "Raises the price of imports and protects domestic producers",
        "explain": "关税=进口税，提高进口品价格，保护本国产业；但消费者要付更高价。"
      },
      {
        "en": "Demography (e.g. ageing population) affects business because...",
        "zh": "人口结构（如老龄化）为什么影响企业？",
        "type": "choice",
        "options": ["It changes the size and needs of different customer groups and the labour supply", "It has no impact on business", "It only affects farmers", "It sets interest rates"],
        "answer": "It changes the size and needs of different customer groups and the labour supply",
        "explain": "老龄化→医疗/养老产品需求上升、年轻劳动力减少、招工成本上升。"
      },
      {
        "en": "Ethical decision-making in business means...",
        "zh": "企业道德决策意味着？",
        "type": "choice",
        "options": ["Doing what is morally right even if it costs more", "Maximising profit regardless of consequences", "Breaking laws to save money", "Ignoring customers"],
        "answer": "Doing what is morally right even if it costs more",
        "explain": "道德经营：公平工资、不污染、不做误导广告；短期可能贵，但长期建声誉。"
      },
      {
        "en": "Which is an advantage of operating as a multinational company (MNC)?",
        "zh": "作为跨国公司（MNC）的一个优点是？",
        "type": "choice",
        "options": ["Access to new markets and lower-cost labour", "No competition anywhere", "No need to manage different countries", "Lower transport costs always"],
        "answer": "Access to new markets and lower-cost labour",
        "explain": "MNC 利用各国市场和廉价劳动力；但要面对汇率、政治、文化差异。"
      },
      {
        "en": "The external business environment includes all of the following EXCEPT...",
        "zh": "下列哪项不属于企业外部环境？",
        "type": "choice",
        "options": ["The company's internal employee handbook", "Economic recession", "New government regulations", "Changes in social attitudes"],
        "answer": "The company's internal employee handbook",
        "explain": "外部环境：经济、政治法律、社会文化、技术、环境、国际；员工手册是内部。"
      },
      {
        "en": "A rise in the exchange rate of the home currency makes...",
        "zh": "本币汇率上升会使？",
        "type": "choice",
        "options": ["Exports more expensive abroad and imports cheaper", "Exports cheaper abroad", "Imports more expensive", "No difference to trade"],
        "answer": "Exports more expensive abroad and imports cheaper",
        "explain": "本币升值：外国买本国货更贵（出口难），本国人买外国货更便宜（进口增加）。"
      },
      {
        "en": "A firm sells 1000 units at $5 each. Fixed costs are $2000 and variable cost per unit is $3. Calculate the break-even output.",
        "zh": "某企业以每件 5 美元卖 1000 件，固定成本 2000 美元，单位变动成本 3 美元，求盈亏平衡产量。",
        "type": "essay",
        "options": [],
        "answer": "单位贡献毛利 = 单价 - 单位变动成本 = 5 - 3 = $2。BEP = 固定成本 / 单位贡献 = 2000 / 2 = 1000 件。",
        "explain": "评分要点：单位贡献 2 美元（2分）；公式 BEP = FC / 贡献（2分）；结果 1000 件（1分）。"
      },
      {
        "en": "Explain two reasons why a business might experience cash flow problems even if it is profitable.",
        "zh": "解释为什么企业即使盈利也可能出现现金流问题（两个原因）。",
        "type": "essay",
        "options": [],
        "answer": "① 销售已确认但客户账期长（应收账款多），钱还没收到；② 大量现金用于购置固定资产或囤积库存；③ 大额贷款分期还款集中到期；④ 给客户太多赊销而自己向供应商现款采购。利润是权责发生制，现金是收付实现制。",
        "explain": "评分要点：每点合理原因 3 分（含解释），最多 6 分。"
      },
      {
        "en": "Discuss whether a government should impose a minimum wage.",
        "zh": "讨论政府是否应该设立最低工资。",
        "type": "essay",
        "options": [],
        "answer": "支持：保障低薪工人基本生活、减少贫困、提高士气和生产率。反对：抬高企业成本，可能导致小企业裁员或失业；尤其对劳动密集行业冲击大；可能助长非正规经济。结论：合理水平的最低工资可保护劳动者，但过高会反伤害就业，需配合经济水平调整。",
        "explain": "评分要点：支持论点（3分）；反对论点（3分）；平衡结论（2分）。"
      },
      {
        "en": "Outline two reasons why a country's government might want to encourage entrepreneurs.",
        "zh": "概述一国政府为什么鼓励创业（两个理由）。",
        "type": "essay",
        "options": [],
        "answer": "① 创业者开办新企业创造就业，降低失业率；② 新企业带来创新和竞争，提高整体经济效率；③ 增加税收基数；④ 减少对大型企业/外资的依赖。",
        "explain": "评分要点：每点合理理由 3 分（含解释），最多 6 分。"
      }
    ]
  },

  /* ==================== 设计与技术 Design & Technology ==================== */
  {
    "subject": "dt",
    "name": "Mock Exam Paper 1",
    "questions": [
      {
        "en": "The first step in the design process is usually...",
        "zh": "设计流程的第一步通常是？",
        "type": "choice",
        "options": ["Identifying a design need / research", "Making a prototype", "Choosing colours", "Pricing the product"],
        "answer": "Identifying a design need / research",
        "explain": "设计流程：需求调研 → 设计规范（spec）→ 构思 → 开发 → 原型 → 测试 → 生产。"
      },
      {
        "en": "A design specification should include...",
        "zh": "设计规范（design specification）应包括？",
        "type": "choice",
        "options": ["Performance, size, materials, safety and cost requirements", "Only the colour of the product", "The designer's name", "The factory address"],
        "answer": "Performance, size, materials, safety and cost requirements",
        "explain": "spec 是「设计必须满足的要求清单」：功能、尺寸、材料、安全、成本、环保等。"
      },
      {
        "en": "Which type of timber comes from a coniferous tree and is cheap and easy to work?",
        "zh": "哪种木材来自针叶树，便宜易加工？",
        "type": "choice",
        "options": ["Softwood (e.g. pine)", "Hardwood (e.g. oak)", "Medium-density fibreboard", "Plywood only"],
        "answer": "Softwood (e.g. pine)",
        "explain": "软木（松木、杉木）生长快、便宜、用于建筑和家具；硬木（橡木、胡桃木）致密昂贵。"
      },
      {
        "en": "Plywood is made by...",
        "zh": "胶合板（plywood）是怎么制成的？",
        "type": "choice",
        "options": ["Gluing thin veneers together with alternating grain directions", "Compressing wood fibres with resin", "Melting plastic", "Cutting solid wood into planks"],
        "answer": "Gluing thin veneers together with alternating grain directions",
        "explain": "单板交叉叠压：各层木纹方向垂直，减少翘曲、强度高。"
      },
      {
        "en": "Which polymer is thermosoftening?",
        "zh": "哪种聚合物是热塑性的？",
        "type": "choice",
        "options": ["Poly(ethene)", "Bakelite", "Melamine formaldehyde", "Epoxy resin once cured"],
        "answer": "Poly(ethene)",
        "explain": "热塑性（如 PE、PP、PVC）可反复加热软化；热固性（如电木、密胺）一次成型不能再熔。"
      },
      {
        "en": "An advantage of using a thermosetting polymer for a kettle handle is...",
        "zh": "水壶把手用热固性塑料的优点是？",
        "type": "choice",
        "options": ["It does not soften or melt when heated", "It can be remoulded easily", "It is transparent", "It is always soft"],
        "answer": "It does not soften or melt when heated",
        "explain": "热固塑料交联结构，加热不熔，适合耐热部件如锅柄、电插头。"
      },
      {
        "en": "Aluminium is suitable for drink cans because it is...",
        "zh": "铝适合做饮料罐，因为它？",
        "type": "choice",
        "options": ["Lightweight, malleable and resistant to corrosion", "Very brittle", "Magnetic", "A poor conductor of heat"],
        "answer": "Lightweight, malleable and resistant to corrosion",
        "explain": "铝密度小、延展性好、表面自然氧化膜防锈；可回收再利用。"
      },
      {
        "en": "Steel is an alloy of...",
        "zh": "钢是哪两种主要元素的合金？",
        "type": "choice",
        "options": ["Iron and carbon", "Copper and zinc", "Copper and tin", "Aluminium and copper"],
        "answer": "Iron and carbon",
        "explain": "钢=铁+碳（<2%）；黄铜=铜+锌；青铜=铜+锡。"
      },
      {
        "en": "A composite material...",
        "zh": "复合材料是？",
        "type": "choice",
        "options": ["Combines two or more materials to get better properties", "Is a pure metal", "Is always transparent", "Cannot be recycled"],
        "answer": "Combines two or more materials to get better properties",
        "explain": "如玻璃钢（玻璃纤维+树脂）：纤维提供强度，树脂提供粘结和形状。"
      },
      {
        "en": "Ergonomics in design is concerned with...",
        "zh": "设计中的工效学（人机工程学）关注？",
        "type": "choice",
        "options": ["How a product fits the human body and how it is used", "The price of the product", "The factory location", "The colour of the product"],
        "answer": "How a product fits the human body and how it is used",
        "explain": "工效学研究人体尺寸、姿势、发力、感官，让产品舒适安全好用。"
      },
      {
        "en": "Aesthetics in design refers to...",
        "zh": "设计中的美学（aesthetics）指？",
        "type": "choice",
        "options": ["The visual appeal, shape, colour and texture of the product", "How heavy the product is", "The cost of the product", "The function of the product"],
        "answer": "The visual appeal, shape, colour and texture of the product",
        "explain": "美学：产品看起来/摸起来好不好看；与功能、成本并列。"
      },
      {
        "en": "Which is an example of a smart material?",
        "zh": "下列哪个是智能材料？",
        "type": "choice",
        "options": ["Shape-memory alloy", "Solid oak", "Plain glass", "Ordinary paper"],
        "answer": "Shape-memory alloy",
        "explain": "记忆合金（如 Nitinol）受热可恢复形状；温致变色、光致变色也是智能材料。"
      },
      {
        "en": "Sustainable design aims to...",
        "zh": "可持续设计的目标是？",
        "type": "choice",
        "options": ["Reduce environmental impact across the product life cycle", "Maximise short-term profit", "Use as much energy as possible", "Make products impossible to repair"],
        "answer": "Reduce environmental impact across the product life cycle",
        "explain": "从原料、制造、运输、使用到回收全过程减少能耗和废弃物。"
      },
      {
        "en": "A prototype is...",
        "zh": "原型（prototype）是什么？",
        "type": "choice",
        "options": ["A working version of a product used to test ideas before full production", "The final product sold in shops", "A marketing poster", "A type of machine tool"],
        "answer": "A working version of a product used to test ideas before full production",
        "explain": "原型用来检验尺寸、装配、功能、外观，避免直接开模的巨大风险。"
      },
      {
        "en": "When choosing materials, a designer must balance...",
        "zh": "设计师选择材料时要权衡？",
        "type": "choice",
        "options": ["Cost, properties, aesthetics and environmental impact", "Only the cheapest option", "Only the strongest option", "Colour only"],
        "answer": "Cost, properties, aesthetics and environmental impact",
        "explain": "材料选择是多目标权衡：性能、成本、外观、环境、可加工性。"
      },
      {
        "en": "Which safety item should always be worn when cutting wood on a bench saw?",
        "zh": "台锯切木料时必须佩戴什么防护装备？",
        "type": "choice",
        "options": ["Safety goggles", "Jewellery", "Loose long sleeves", "Bare hands"],
        "answer": "Safety goggles",
        "explain": "护目镜防木屑；扎起长发、不戴手套操作旋转锯、穿合脚鞋。"
      },
      {
        "en": "Describe three important factors a designer should consider when designing a school chair for 11-year-old students.",
        "zh": "为 11 岁学生设计课桌椅时，设计师应考虑哪三个重要因素？",
        "type": "essay",
        "options": [],
        "answer": "① 尺寸/工效学：椅高、桌高适合该年龄段身高，支撑腰背；② 安全：圆角、稳固结构、材料无毒；③ 耐用/易清洁：学生使用强度大，表面耐脏易擦；④ 成本：学校批量采购预算有限；⑤ 外观/色彩：吸引学生但不分散注意力。",
        "explain": "评分要点：每点合理因素 2 分（含解释），最多 6 分。"
      },
      {
        "en": "Explain why MDF (medium-density fibreboard) is widely used for flat-pack furniture.",
        "zh": "解释为什么中密度纤维板（MDF）被广泛用于平板包装家具。",
        "type": "essay",
        "options": [],
        "answer": "① MDF 表面平整光滑，易贴木纹贴面或喷漆；② 尺寸稳定，不易翘曲开裂；③ 价格比实木便宜；④ 易于裁切加工成各种板件。缺点：怕潮、不能外露螺丝、切割粉尘有害需戴口罩。",
        "explain": "评分要点：每点合理优点 2 分，最多 6 分。"
      },
      {
        "en": "Discuss whether disposable plastic water bottles should be banned.",
        "zh": "讨论是否应该禁止一次性塑料水瓶。",
        "type": "essay",
        "options": [],
        "answer": "支持禁止：塑料瓶大量进入垃圾填埋和海洋，污染环境、威胁野生动物；回收系统不完善。反对：塑料瓶便宜、卫生、便携，在紧急救援和无净水地区不可替代；替代物（玻璃瓶、不锈钢）更重、运输能耗更高。结论：更可行的是征税、押金返还、提高回收率，而非一刀切禁止。",
        "explain": "评分要点：正面论点（3分）；反面论点（3分）；平衡结论（2分）。"
      },
      {
        "en": "Outline the main stages of the design process, from need to final product.",
        "zh": "概述从需求到最终产品的设计流程主要阶段。",
        "type": "essay",
        "options": [],
        "answer": "① 调研/识别需求（research）；② 写设计规范（specification）；③ 产生多个方案（generate ideas / sketching）；④ 筛选并发展最佳方案（developing design）；⑤ 制作原型/模型（prototyping）；⑥ 测试与评估（testing against spec）；⑦ 修改并准备生产（manufacture）。",
        "explain": "评分要点：每阶段 1 分，写出 6 阶段以上满分 6 分。"
      }
    ]
  },
  {
    "subject": "dt",
    "name": "Mock Exam Paper 2",
    "questions": [
      {
        "en": "Which mechanism changes the direction of a turning motion through 90 degrees?",
        "zh": "哪种机构把转动方向改变 90°？",
        "type": "choice",
        "options": ["Bevel gears", "Spur gears", "Chain and sprocket", "Pulley and belt"],
        "answer": "Bevel gears",
        "explain": "伞齿轮（bevel gears）交轴 90° 传动；正齿轮（spur）平行轴；链/皮带平行轴。"
      },
      {
        "en": "In a gear train, the driven gear has 40 teeth and the driver has 10 teeth. The speed multiplier is?",
        "zh": "齿轮组中，从动轮 40 齿，主动轮 10 齿，速度倍率是？",
        "type": "choice",
        "options": ["1/4 (driven turns slower)", "4", "40", "10"],
        "answer": "1/4 (driven turns slower)",
        "explain": "传动比 = 主动齿/从动齿 = 10/40 = 1/4，大轮带小轮才加速。"
      },
      {
        "en": "A lever system has the load 2 m from the fulcrum and the effort 6 m from the fulcrum. The mechanical advantage is?",
        "zh": "杠杆阻力臂 2 m，动力臂 6 m，机械利益是？",
        "type": "choice",
        "options": ["3", "1/3", "4", "8"],
        "answer": "3",
        "explain": "机械利益 = 动力臂 / 阻力臂 = 6/2 = 3。"
      },
      {
        "en": "A structure that relies on its shape to carry load is called...",
        "zh": "依靠自身形状承受载荷的结构叫？",
        "type": "choice",
        "options": ["A shell structure", "A frame structure", "A solid structure", "A load structure"],
        "answer": "A shell structure",
        "explain": "壳体结构（鸡蛋壳、易拉罐）靠薄壳形状传力；框架结构（铁塔）靠杆件。"
      },
      {
        "en": "Triangulation is used in frame structures because triangles are...",
        "zh": "框架结构中使用三角形是因为三角形？",
        "type": "choice",
        "options": ["Rigid and do not distort under load", "Easy to paint", "Lightweight only", "Always hollow"],
        "answer": "Rigid and do not distort under load",
        "explain": "三角形几何不变；四边形是几何可变，需要加斜撑变成三角形。"
      },
      {
        "en": "Which electronic component is used to store charge?",
        "zh": "哪个电子元件用来储存电荷？",
        "type": "choice",
        "options": ["Capacitor", "Resistor", "LED", "Switch"],
        "answer": "Capacitor",
        "explain": "电容储存电荷；电阻限流；LED 发光；开关通断。"
      },
      {
        "en": "An AND gate has inputs A = 1 and B = 0. Its output is...",
        "zh": "AND 门输入 A=1, B=0，输出是？",
        "type": "choice",
        "options": ["0", "1", "Undefined", "Depends on temperature"],
        "answer": "0",
        "explain": "AND 门：全 1 出 1，否则 0。"
      },
      {
        "en": "Which component allows current to flow in only one direction?",
        "zh": "哪个元件只允许电流单向流动？",
        "type": "choice",
        "options": ["Diode", "Resistor", "Lamp", "Battery"],
        "answer": "Diode",
        "explain": "二极管单向导电；LED 是会发光的二极管。"
      },
      {
        "en": "Batch production is most suitable when...",
        "zh": "批量生产最适合什么情况？",
        "type": "choice",
        "options": ["A moderate variety of products is needed in moderate volumes", "One unique custom item", "Mass-market identical products", "No production at all"],
        "answer": "A moderate variety of products is needed in moderate volumes",
        "explain": "批量：中等品种、中等产量（面包、杂志、服装批次）。"
      },
      {
        "en": "Which is a benefit of using CNC (computer numerical control) machines?",
        "zh": "使用 CNC（计算机数控）机床的好处是？",
        "type": "choice",
        "options": ["High accuracy and repeatability for complex parts", "Very low initial cost", "No need for skilled programmers", "Only one item can be made"],
        "answer": "High accuracy and repeatability for complex parts",
        "explain": "CNC 精度高、可重复、能加工复杂形状；但初期设备和编程成本高。"
      },
      {
        "en": "Quality assurance differs from quality control in that QA...",
        "zh": "质量保证（QA）与质量控制（QC）的不同在于 QA？",
        "type": "choice",
        "options": ["Builds quality into the process to prevent defects", "Only inspects finished goods", "Is done at the end", "Is carried out by customers"],
        "answer": "Builds quality into the process to prevent defects",
        "explain": "QA 全过程预防；QC 事后检验剔除次品。"
      },
      {
        "en": "Which joining method is permanent?",
        "zh": "哪种连接方式是永久性的？",
        "type": "choice",
        "options": ["Welding", "Screwing", "Bolting", "Snap fit that can be released"],
        "answer": "Welding",
        "explain": "焊接、铆接、粘接多为永久；螺钉、螺栓、卡扣可拆卸。"
      },
      {
        "en": "A 'fail-safe' design means...",
        "zh": "「失效安全」（fail-safe）设计指？",
        "type": "choice",
        "options": ["If a part fails, the product moves to a safe state", "The product can never fail", "Failure is always catastrophic", "No safety testing is needed"],
        "answer": "If a part fails, the product moves to a safe state",
        "explain": "如电梯钢缆断裂时安全钳自动夹轨、汽车红灯自动亮起。"
      },
      {
        "en": "Which material property describes how well a material resists scratching?",
        "zh": "材料抵抗划伤的能力叫？",
        "type": "choice",
        "options": ["Hardness", "Tensile strength", "Density", "Elasticity"],
        "answer": "Hardness",
        "explain": "硬度：抗划伤/压入；抗拉强度：抗拉断；弹性：变形后恢复。"
      },
      {
        "en": "Tensile strength is...",
        "zh": "抗拉强度是？",
        "type": "choice",
        "options": ["The maximum stress a material can withstand before breaking under pulling force", "The weight of the material", "The colour fastness", "The resistance to bending"],
        "answer": "The maximum stress a material can withstand before breaking under pulling force",
        "explain": "抗拉强度 = 拉断前最大应力（N/m²）。"
      },
      {
        "en": "Which is a disadvantage of using injection moulding for plastic parts?",
        "zh": "注射成型塑料件的一个缺点是？",
        "type": "choice",
        "options": ["High initial cost of the mould", "Very slow production", "Poor surface finish", "Not suitable for mass production"],
        "answer": "High initial cost of the mould",
        "explain": "模具昂贵，但单件成本极低，适合大批量；小批量不划算。"
      },
      {
        "en": "A gear train has a driver gear of 15 teeth turning at 30 rpm, and a driven gear of 60 teeth. Calculate the speed of the driven gear.",
        "zh": "齿轮组主动轮 15 齿、转速 30 rpm，从动轮 60 齿，求从动轮转速。",
        "type": "essay",
        "options": [],
        "answer": "传动比 = 主动齿 / 从动齿 = 15 / 60 = 1/4。从动轮转速 = 30 × (15/60) = 30 × 0.25 = 7.5 rpm。",
        "explain": "评分要点：传动比公式（2分）；代入（1分）；结果 7.5 rpm（2分）。"
      },
      {
        "en": "Explain why triangulation is used in the design of a steel electricity pylon.",
        "zh": "解释为什么高压电塔的设计使用三角形结构。",
        "type": "essay",
        "options": [],
        "answer": "三角形是几何不变形状，受外力时不会像四边形那样变形或坍塌；通过斜撑把框架分成多个三角形，可以用较少的钢材承受高压输电线的重量和风载，结构轻而坚固。",
        "explain": "评分要点：三角形几何不变（3分）；抗风/承重（2分）；节省材料（1分）。"
      },
      {
        "en": "Discuss whether a local furniture maker should use batch production or one-off (job) production.",
        "zh": "讨论本地家具作坊应该用批量生产还是单件定制生产。",
        "type": "essay",
        "options": [],
        "answer": "支持单件定制：本地作坊规模小、可按客户尺寸和风格定制，卖高价、体现工艺；但每件成本高、产量低。支持批量：若干相同款（如餐椅）批量做可降低单位成本、提高效率；但灵活性低、库存风险。结论：本地小作坊适合以单件/小批量定制为主，标准件（如椅子腿）可小批量备料，兼顾溢价和效率。",
        "explain": "评分要点：单件生产利弊（3分）；批量生产利弊（3分）；结论（2分）。"
      },
      {
        "en": "Outline three health and safety rules that should be followed in a school workshop when using electric saws.",
        "zh": "列出学校工坊使用电锯时应遵守的三条安全规则。",
        "type": "essay",
        "options": [],
        "answer": "① 戴护目镜，穿合身衣服、扎起长发、不戴手套操作旋转锯；② 使用推料棒推送小工件，手远离锯片；③ 开工前检查锯片紧固、防护罩完好；④ 一个人操作，不聊天分心；⑤ 用完立即断电、等锯片停转再离开。（任答三点）",
        "explain": "评分要点：每点合理安全规则 2 分，最多 6 分。"
      }
    ]
  }
];
