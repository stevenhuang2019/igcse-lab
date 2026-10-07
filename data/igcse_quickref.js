/* IGCSE 速查公式表（CIE 核心考点，KaTeX 渲染） */
window.IGCSE_QUICKREF = [
  {
    "subject": "math",
    "groups": [
      {
        "title": "代数与展开",
        "items": [
          { "formula": "$a(b+c)=ab+ac$", "note": "分配律：括号内每一项都要乘外面的因式" },
          { "formula": "$(a+b)^2=a^2+2ab+b^2$", "note": "完全平方和，别漏中间项 $2ab$" },
          { "formula": "$(a-b)^2=a^2-2ab+b^2$", "note": "完全平方差" },
          { "formula": "$(a+b)(a-b)=a^2-b^2$", "note": "平方差公式" },
          { "formula": "$(a+b)(c+d)=ac+ad+bc+bd$", "note": "FOIL 法展开双括号" }
        ]
      },
      {
        "title": "二次方程",
        "items": [
          { "formula": "$x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$", "note": "求根公式（$ax^2+bx+c=0$，$a\\ne0$）" },
          { "formula": "$\\Delta=b^2-4ac$", "note": "$\\Delta>0$ 两个不同实根；$\\Delta=0$ 重根；$\\Delta<0$ 无实根" },
          { "formula": "$x=-\\frac{b}{2a}$", "note": "抛物线对称轴" },
          { "formula": "$x_1+x_2=-\\frac{b}{a}$", "note": "两根之和（韦达定理）" },
          { "formula": "$x_1x_2=\\frac{c}{a}$", "note": "两根之积（韦达定理）" }
        ]
      },
      {
        "title": "直线图像",
        "items": [
          { "formula": "$y=mx+c$", "note": "$m$ 为斜率，$c$ 为 $y$ 轴截距" },
          { "formula": "$m=\\frac{y_2-y_1}{x_2-x_1}$", "note": "两点求斜率（纵差 ÷ 横差）" },
          { "formula": "$m_1=m_2$", "note": "斜率相等 ⇔ 两直线平行" },
          { "formula": "$m_1\\times m_2=-1$", "note": "斜率乘积为 $-1$ ⇔ 两直线垂直" }
        ]
      },
      {
        "title": "三角",
        "items": [
          { "formula": "$a^2+b^2=c^2$", "note": "勾股定理（$c$ 为直角三角形斜边）" },
          { "formula": "$\\sin\\theta=\\frac{\\text{对边}}{\\text{斜边}}$", "note": "SOH" },
          { "formula": "$\\cos\\theta=\\frac{\\text{邻边}}{\\text{斜边}}$", "note": "CAH" },
          { "formula": "$\\tan\\theta=\\frac{\\text{对边}}{\\text{邻边}}$", "note": "TOA" },
          { "formula": "$\\sin30°=\\frac{1}{2},\\ \\cos60°=\\frac{1}{2},\\ \\tan45°=1$", "note": "必背特殊角" }
        ]
      },
      {
        "title": "统计与概率",
        "items": [
          { "formula": "$\\bar{x}=\\frac{\\sum x}{n}$", "note": "平均数 = 总和 ÷ 个数" },
          { "formula": "$\\text{中位数}$", "note": "数据排序后最中间的数；偶数个取中间两数的平均" },
          { "formula": "$\\text{极差}=\\text{最大值}-\\text{最小值}$", "note": "数据的波动范围" },
          { "formula": "$P(A)=\\frac{\\text{有利结果数}}{\\text{总结果数}}$", "note": "概率定义（$0\\le P\\le1$）" },
          { "formula": "$P(A\\text{ 或 }B)=P(A)+P(B)$", "note": "互斥事件概率相加" }
        ]
      }
    ]
  },
  {
    "subject": "physics",
    "groups": [
      {
        "title": "运动学",
        "items": [
          { "formula": "$v=\\frac{s}{t}$", "note": "平均速度 = 路程 ÷ 时间" },
          { "formula": "$a=\\frac{\\Delta v}{t}=\\frac{v-u}{t}$", "note": "加速度 = 速度变化率" },
          { "formula": "$v=u+at$", "note": "匀加速直线运动" },
          { "formula": "$s=ut+\\frac{1}{2}at^2$", "note": "位移公式" },
          { "formula": "$v^2=u^2+2as$", "note": "不含时间的公式" },
          { "formula": "$1\\,m/s=3.6\\,km/h$", "note": "换算：km/h 换 m/s 除以 3.6" }
        ]
      },
      {
        "title": "力与牛顿定律",
        "items": [
          { "formula": "$F=ma$", "note": "牛顿第二定律（$F$ 必须是合力）" },
          { "formula": "$W=mg$", "note": "重力（$g\\approx10\\,m/s^2$）" },
          { "formula": "$p=mv$", "note": "动量" },
          { "formula": "$W=Fs$", "note": "功 = 力 × 沿力方向的距离" },
          { "formula": "$P=\\frac{W}{t}$", "note": "功率 = 做功的快慢" }
        ]
      },
      {
        "title": "电学",
        "items": [
          { "formula": "$V=IR$", "note": "欧姆定律" },
          { "formula": "$R=R_1+R_2$", "note": "串联总电阻" },
          { "formula": "$\\frac{1}{R}=\\frac{1}{R_1}+\\frac{1}{R_2}$", "note": "并联总电阻（总电阻比任一支路小）" },
          { "formula": "$P=VI$", "note": "电功率" },
          { "formula": "$E=Pt$", "note": "用电器消耗的电能" }
        ]
      },
      {
        "title": "能量与波",
        "items": [
          { "formula": "$KE=\\frac{1}{2}mv^2$", "note": "动能" },
          { "formula": "$GPE=mgh$", "note": "重力势能" },
          { "formula": "$\\text{效率}=\\frac{\\text{有用能量输出}}{\\text{总能量输入}}\\times100\\%$", "note": "实际效率总小于 100%" },
          { "formula": "$v=f\\lambda$", "note": "波速 = 频率 × 波长" }
        ]
      }
    ]
  },
  {
    "subject": "chemistry",
    "groups": [
      {
        "title": "摩尔计算",
        "items": [
          { "formula": "$n=\\frac{m}{M}$", "note": "物质的量 = 质量 ÷ 摩尔质量" },
          { "formula": "$m=M\\times n$", "note": "由摩尔数求质量" },
          { "formula": "$V_m\\approx24\\,dm^3$", "note": "r.t.p. 下 1 mol 气体体积" },
          { "formula": "$n=\\frac{V}{24}$", "note": "r.t.p. 下气体摩尔数（$V$ 单位 dm³）" },
          { "formula": "$c=\\frac{n}{V}$", "note": "溶液浓度（mol/dm³）" }
        ]
      },
      {
        "title": "酸碱与 pH",
        "items": [
          { "formula": "$\\text{pH}<7$ 酸性，$\\text{pH}=7$ 中性，$\\text{pH}>7$ 碱性", "note": "pH 范围判断" },
          { "formula": "$H^+ + OH^- \\rightarrow H_2O$", "note": "中和反应的本质" },
          { "formula": "$\\text{酸}+\\text{活泼金属}\\rightarrow\\text{盐}+H_2$", "note": "如锌 + 盐酸放出氢气" },
          { "formula": "$\\text{酸}+\\text{碳酸盐}\\rightarrow\\text{盐}+H_2O+CO_2$", "note": "放出 CO₂，可用石灰水检验" },
          { "formula": "$\\text{通用指示剂}$", "note": "酸中呈红/橙，中性绿，碱中蓝/紫" }
        ]
      },
      {
        "title": "常见反应式",
        "items": [
          { "formula": "$Mg+2HCl\\rightarrow MgCl_2+H_2\\uparrow$", "note": "金属 + 酸" },
          { "formula": "$CaCO_3+2HCl\\rightarrow CaCl_2+H_2O+CO_2\\uparrow$", "note": "碳酸盐 + 酸" },
          { "formula": "$NaOH+HCl\\rightarrow NaCl+H_2O$", "note": "中和滴定" },
          { "formula": "$2H_2+O_2\\rightarrow 2H_2O$", "note": "化合反应" }
        ]
      },
      {
        "title": "结构与周期律",
        "items": [
          { "formula": "$\\text{离子键}$", "note": "金属 + 非金属，电子转移形成阴阳离子" },
          { "formula": "$\\text{共价键}$", "note": "非金属之间共用电子对" },
          { "formula": "$\\text{同族元素}$", "note": "最外层电子数相同，化学性质相似" },
          { "formula": "$\\text{同位素}$", "note": "质子数相同、中子数不同的原子" },
          { "formula": "$K\\ Ca\\ Na\\ Mg\\ Al\\ Zn\\ Fe\\ Pb\\ (H)\\ Cu\\ Ag\\ Au$", "note": "金属活动性顺序，前面的可置换后面的" }
        ]
      }
    ]
  }
];
