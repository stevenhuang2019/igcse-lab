/* Original introductory units aligned to selected official objectives. */
window.IGCSE_ADVANCED_CONTENT=[
 {
  "id": "as_derivative",
  "subject": "math",
  "stage": "AS",
  "code": "9709",
  "startYear": 2026,
  "endYear": 2027,
  "edition": "2026-2027",
  "title": "Derivatives and tangents",
  "syllabusRef": "1.7",
  "sourcePage": 22,
  "sourceUrl": "https://www.cambridgeinternational.org/Images/697427-2026-2027-syllabus.pdf",
  "source": "original",
  "scope": "selected-introductory-unit",
  "foundationTopic": "math_algebra_01",
  "objectives": [
   "Differentiate powers and sums",
   "Use a gradient at a point",
   "Distinguish gradient from y-coordinate"
  ],
  "notes": [
   "For y = ax^n, dy/dx = anx^(n−1). Differentiate each term of a sum; a constant contributes zero. This rule applies to rational powers where the expression is defined.",
   "A derivative is a local rate of change. To find a tangent at x=a, first calculate y(a), then m=y'(a), and use y−y(a)=m(x−a). A stationary point has zero first derivative, but needs further classification."
  ],
  "workedExample": "For y=x^3−4x at x=2: y=0 and dy/dx=3x^2−4=8. The tangent is y=8(x−2).",
  "questions": [
   {
    "type": "number",
    "question": "For y=2x^3−5x, enter dy/dx at x=2.",
    "answer": "19",
    "explain": "dy/dx=6x^2−5; substitute x=2 to get 19.",
    "tolerance": 1e-05,
    "id": "as_derivative_1",
    "marks": 1
   },
   {
    "type": "number",
    "question": "For y=x^2+3 at x=2, enter the intercept c of the tangent y=4x+c.",
    "answer": "-1",
    "explain": "Point (2,7), slope 4. 7=8+c gives c=−1.",
    "tolerance": 1e-05,
    "id": "as_derivative_2",
    "marks": 1
   },
   {
    "type": "essay",
    "question": "Explain why the gradient at x=2 and the value of y at x=2 are different quantities.",
    "answer": "The gradient measures local change of y per unit x. The y-value specifies the point on the curve.",
    "rubric": [
     "Identify local rate of change",
     "Identify point coordinate",
     "Avoid treating dy/dx as y"
    ],
    "explain": "Compare your reasoning with the reference. This response is saved without an automatic mark.",
    "id": "as_derivative_3",
    "marks": 0
   }
  ]
 },
 {
  "id": "al_ode",
  "subject": "math",
  "stage": "A Level",
  "code": "9709",
  "startYear": 2026,
  "endYear": 2027,
  "edition": "2026-2027",
  "title": "Separable differential equations",
  "syllabusRef": "3.8",
  "sourcePage": 30,
  "sourceUrl": "https://www.cambridgeinternational.org/Images/697427-2026-2027-syllabus.pdf",
  "source": "original",
  "scope": "selected-introductory-unit",
  "foundationTopic": "math_algebra_01",
  "objectives": [
   "Separate variables",
   "Integrate both sides",
   "Use an initial condition"
  ],
  "notes": [
   "An equation dy/dx=f(x)g(y) can be rearranged as dy/g(y)=f(x)dx when g(y) is nonzero. Integrate both sides and include an integration constant. Division by g(y) may omit constant solutions, so check these against the original equation.",
   "For dy/dx=ky, a nonzero solution satisfies ln|y|=kx+C, so y=Ae^(kx). The initial condition fixes A. A mathematical growth model requires assumptions about the time range and environment."
  ],
  "workedExample": "Solve dy/dx=2xy, y(0)=3: dy/y=2x dx; ln|y|=x^2+C; y=3e^(x^2).",
  "questions": [
   {
    "type": "number",
    "question": "For dy/dx=2x and y(0)=3, enter y(2).",
    "answer": "7",
    "explain": "Integrating gives y=x^2+C; C=3, hence y(2)=7.",
    "tolerance": 1e-05,
    "id": "al_ode_1",
    "marks": 1
   },
   {
    "type": "choice",
    "question": "Which also solves dy/dx=3y?",
    "options": [
     "y=0",
     "y=x+3",
     "y=3x",
     "y=x^2"
    ],
    "answer": "y=0",
    "explain": "Both sides are zero. This solution can be lost by dividing by y.",
    "id": "al_ode_2",
    "marks": 1
   },
   {
    "type": "essay",
    "question": "Solve dy/dx=y with y(0)=2, showing separation and the initial condition.",
    "answer": "dy/y=dx; ln|y|=x+C; y=Ae^x; A=2, so y=2e^x.",
    "rubric": [
     "Separate and integrate",
     "Include a constant",
     "Use y(0)=2"
    ],
    "explain": "Compare your reasoning with the reference. This response is saved without an automatic mark.",
    "id": "al_ode_3",
    "marks": 0
   }
  ]
 },
 {
  "id": "as_uncertainty",
  "subject": "physics",
  "stage": "AS",
  "code": "9702",
  "startYear": 2025,
  "endYear": 2027,
  "edition": "2025-2027",
  "title": "Measurement uncertainties",
  "syllabusRef": "1.3",
  "sourcePage": 16,
  "sourceUrl": "https://www.cambridgeinternational.org/Images/664565-2025-2027-syllabus.pdf",
  "source": "original",
  "scope": "selected-introductory-unit",
  "foundationTopic": "phy0625_1_2",
  "objectives": [
   "Separate random and systematic errors",
   "Propagate absolute and percentage uncertainties",
   "Report units and justified precision"
  ],
  "notes": [
   "Random variation creates scatter; repeated measurements can help estimate and reduce uncertainty in a mean. A systematic offset shifts measurements in one direction and is not removed merely by averaging. Check calibration and zero readings.",
   "For addition or subtraction, combine absolute uncertainties by addition in the syllabus worst-case method. For multiplication or division, add percentage uncertainties; a power multiplies percentage uncertainty by the absolute exponent. Distinguish uncertainty from a known mistake."
  ],
  "workedExample": "Length 5.0±0.1 cm and width 4.0±0.1 cm give area 20.0 cm². Percentage uncertainty is 2%+2.5%=4.5%, giving absolute uncertainty 0.9 cm².",
  "questions": [
   {
    "type": "number",
    "question": "Two lengths are added: 3.0±0.2 cm and 4.0±0.1 cm. Enter the absolute uncertainty of the sum in cm.",
    "answer": "0.3",
    "explain": "Add absolute uncertainties: 0.2+0.1=0.3 cm.",
    "tolerance": 1e-05,
    "id": "as_uncertainty_1",
    "marks": 1
   },
   {
    "type": "number",
    "question": "A length has 2% uncertainty. Enter the percentage uncertainty in its square.",
    "answer": "4",
    "explain": "A power of 2 multiplies percentage uncertainty by 2.",
    "tolerance": 1e-05,
    "id": "as_uncertainty_2",
    "marks": 1
   },
   {
    "type": "essay",
    "question": "A balance consistently reads 0.5 g when empty. Explain how to improve the measurement.",
    "answer": "Treat this as a zero offset. Tare or calibrate the balance, or subtract the measured offset; repeating alone does not remove it.",
    "rubric": [
     "Identify systematic zero error",
     "Describe correction",
     "Explain why averaging is insufficient"
    ],
    "explain": "Compare your reasoning with the reference. This response is saved without an automatic mark.",
    "id": "as_uncertainty_3",
    "marks": 0
   }
  ]
 },
 {
  "id": "al_shm",
  "subject": "physics",
  "stage": "A Level",
  "code": "9702",
  "startYear": 2025,
  "endYear": 2027,
  "edition": "2025-2027",
  "title": "Simple harmonic motion",
  "syllabusRef": "17.1",
  "sourcePage": 29,
  "sourceUrl": "https://www.cambridgeinternational.org/Images/664565-2025-2027-syllabus.pdf",
  "source": "original",
  "scope": "selected-introductory-unit",
  "foundationTopic": "phy0625_1_2",
  "objectives": [
   "Relate acceleration to displacement",
   "Connect angular frequency and period",
   "Interpret restoring acceleration"
  ],
  "notes": [
   "Simple harmonic motion has acceleration proportional to displacement from equilibrium and directed toward equilibrium: a=−ω²x. The minus sign describes the restoring direction; ω is in rad s−1. A periodic motion alone is not enough to establish SHM.",
   "For an ideal oscillator T=2π/ω and f=1/T. At equilibrium the speed is greatest and acceleration zero; at an extreme speed is zero and the acceleration magnitude is greatest. Real damping reduces amplitude and requires additional modelling."
  ],
  "workedExample": "With ω=4 rad s−1 and x=+0.05 m, a=−16×0.05=−0.8 m s−2. The period is 2π/4≈1.571 s.",
  "questions": [
   {
    "type": "number",
    "question": "An SHM oscillator has ω=3 rad s−1 and x=+0.2 m. Enter acceleration in m s−2.",
    "answer": "-1.8",
    "explain": "a=−ω²x=−9×0.2=−1.8.",
    "tolerance": 1e-05,
    "id": "al_shm_1",
    "marks": 1
   },
   {
    "type": "choice",
    "question": "Where is acceleration zero in ideal SHM?",
    "options": [
     "At equilibrium",
     "At the positive extreme",
     "At the negative extreme",
     "Everywhere"
    ],
    "answer": "At equilibrium",
    "explain": "x=0 gives a=0, while speed is maximum.",
    "id": "al_shm_2",
    "marks": 1
   },
   {
    "type": "essay",
    "question": "Why does a=−5x establish SHM, whereas a constant negative acceleration does not?",
    "answer": "The first equation has acceleration proportional to displacement and opposite in direction. A constant acceleration does not depend on displacement from equilibrium.",
    "rubric": [
     "Proportionality",
     "Restoring direction",
     "Compare dependence on displacement"
    ],
    "explain": "Compare your reasoning with the reference. This response is saved without an automatic mark.",
    "id": "al_shm_3",
    "marks": 0
   }
  ]
 },
 {
  "id": "as_stoichiometry",
  "subject": "chemistry",
  "stage": "AS",
  "code": "9701",
  "startYear": 2025,
  "endYear": 2027,
  "edition": "2025-2027",
  "title": "Reacting quantities",
  "syllabusRef": "2.4",
  "sourcePage": 19,
  "sourceUrl": "https://www.cambridgeinternational.org/Images/664563-2025-2027-syllabus.pdf",
  "source": "original",
  "scope": "selected-introductory-unit",
  "foundationTopic": "course_chemistry_moles",
  "objectives": [
   "Convert mass to moles",
   "Use balanced mole ratios",
   "Identify the limiting reagent"
  ],
  "notes": [
   "Convert mass to amount with n=m/M, using compatible units. Coefficients in a balanced equation give mole ratios, not directly mass ratios. For a solution, n=cV with V in dm³; 1000 cm³ equals 1 dm³.",
   "A limiting reagent is consumed first and controls the maximum theoretical yield. Compare each available amount after division by its stoichiometric coefficient. Excess reagent can remain even when the limiting reagent has reacted completely."
  ],
  "workedExample": "For 2H2+O2→2H2O, 0.30 mol H2 and 0.10 mol O2 are available. O2 limits the reaction, producing 0.20 mol H2O and leaving 0.10 mol H2.",
  "questions": [
   {
    "type": "number",
    "question": "Enter moles in 5.0 g of CaCO3, using M=100 g mol−1.",
    "answer": "0.05",
    "explain": "n=5.0/100=0.050 mol.",
    "tolerance": 1e-05,
    "id": "as_stoichiometry_1",
    "marks": 1
   },
   {
    "type": "number",
    "question": "Enter moles in 250 cm³ of a 0.20 mol dm−3 solution.",
    "answer": "0.05",
    "explain": "250 cm³=0.250 dm³; n=0.20×0.250=0.050 mol.",
    "tolerance": 1e-05,
    "id": "as_stoichiometry_2",
    "marks": 1
   },
   {
    "type": "essay",
    "question": "For 2H2+O2→2H2O, identify the limiting reagent when 0.40 mol H2 reacts with 0.30 mol O2.",
    "answer": "H2 is limiting: 0.40 mol needs only 0.20 mol O2. The maximum water amount is 0.40 mol and 0.10 mol O2 remains.",
    "rubric": [
     "Compare balanced amounts",
     "Identify H2",
     "Calculate remaining O2"
    ],
    "explain": "Compare your reasoning with the reference. This response is saved without an automatic mark.",
    "id": "as_stoichiometry_3",
    "marks": 0
   }
  ]
 },
 {
  "id": "al_ph",
  "subject": "chemistry",
  "stage": "A Level",
  "code": "9701",
  "startYear": 2025,
  "endYear": 2027,
  "edition": "2025-2027",
  "title": "Acid equilibria and pH",
  "syllabusRef": "25.1",
  "sourcePage": 42,
  "sourceUrl": "https://www.cambridgeinternational.org/Images/664563-2025-2027-syllabus.pdf",
  "source": "original",
  "scope": "selected-introductory-unit",
  "foundationTopic": "course_chemistry_moles",
  "objectives": [
   "Calculate pH for a strong acid",
   "Separate strength from concentration",
   "State assumptions for weak-acid estimates"
  ],
  "notes": [
   "pH=−log10[H+] using hydrogen-ion concentration in mol dm−3. A dilute monoprotic strong acid is treated as fully dissociated; for 0.0010 mol dm−3 HCl, [H+]≈0.0010 and pH≈3.00. Very dilute solutions need the contribution of water to be considered.",
   "For HA⇌H++A−, Ka=[H+][A−]/[HA]. If dissociation is small and the water contribution negligible, [H+]≈√(Ka c). Check that this estimate is small compared with c. Strength describes extent of dissociation; concentration describes amount per volume."
  ],
  "workedExample": "For c=0.10 mol dm−3 and Ka=1.0×10−5 mol dm−3, [H+]≈√(10−6)=0.0010 and pH≈3.00. Estimated dissociation is 1%, consistent with the small-dissociation approximation.",
  "questions": [
   {
    "type": "number",
    "question": "Enter pH of 0.010 mol dm−3 HCl under the usual dilute strong-acid approximation.",
    "answer": "2",
    "explain": "−log10(0.010)=2.00.",
    "tolerance": 1e-05,
    "id": "al_ph_1",
    "marks": 1
   },
   {
    "type": "number",
    "question": "A weak acid has c=0.10 and Ka=1.0×10−5. Using the stated approximation, enter [H+] in mol dm−3.",
    "answer": "0.001",
    "explain": "√(Ka c)=√(10−6)=0.0010.",
    "tolerance": 1e-05,
    "id": "al_ph_2",
    "marks": 1
   },
   {
    "type": "essay",
    "question": "Explain why a dilute strong acid is not the same as a concentrated weak acid.",
    "answer": "Dilute/concentrated describe amount per volume. Strong/weak describe extent of dissociation; these properties are independent.",
    "rubric": [
     "Define concentration",
     "Define acid strength",
     "Avoid equating strength with concentration"
    ],
    "explain": "Compare your reasoning with the reference. This response is saved without an automatic mark.",
    "id": "al_ph_3",
    "marks": 0
   }
  ]
 },
 {
  "id": "as_cashflow",
  "subject": "business",
  "stage": "AS",
  "code": "9609",
  "startYear": 2026,
  "endYear": 2028,
  "edition": "2026-2028",
  "title": "Cash-flow forecasting",
  "syllabusRef": "5.3",
  "sourcePage": 23,
  "sourceUrl": "https://www.cambridgeinternational.org/Images/697371-2026-2028-syllabus.pdf",
  "source": "original",
  "scope": "selected-introductory-unit",
  "foundationTopic": "course_business_finance",
  "objectives": [
   "Calculate net and closing cash",
   "Distinguish profit from liquidity",
   "Evaluate a cash-flow response in context"
  ],
  "notes": [
   "Net cash flow equals cash received minus cash paid during a period. Closing cash equals opening cash plus net cash flow, and becomes next period’s opening balance. Record when money changes hands: a credit sale may count as revenue before the customer pays.",
   "A forecast helps identify a cash shortfall early. Accelerating receipts, delaying an agreed payment or arranging short-term finance may help, but consider customer relationships, supplier reliability, finance cost and whether the problem will recur."
  ],
  "workedExample": "Opening cash $800, receipts $2200 and payments $3400 give net cash −$1200 and closing cash −$400. A $600 overdraft covers the forecast deficit but adds interest and does not fix ongoing negative cash flow.",
  "questions": [
   {
    "type": "number",
    "question": "Opening cash is $900, receipts $1600 and payments $2100. Enter closing cash.",
    "answer": "400",
    "explain": "900+1600−2100=400.",
    "tolerance": 1e-05,
    "id": "as_cashflow_1",
    "marks": 1
   },
   {
    "type": "choice",
    "question": "Which transaction delays a cash receipt despite recording a sale?",
    "options": [
     "A credit sale",
     "A cash sale",
     "Paying wages",
     "Buying equipment for cash"
    ],
    "answer": "A credit sale",
    "explain": "The customer pays later; revenue and cash receipt occur at different times.",
    "id": "as_cashflow_2",
    "marks": 1
   },
   {
    "type": "essay",
    "question": "A shop forecasts a $400 cash deficit next month. Evaluate asking customers to pay earlier.",
    "answer": "Earlier collection may cover the temporary gap without borrowing, but customers may resist or require a discount. Check how much is collectible and whether future months also show deficits.",
    "rubric": [
     "Apply the $400 context",
     "Explain a benefit and tradeoff",
     "Give a conditional judgement"
    ],
    "explain": "Compare your reasoning with the reference. This response is saved without an automatic mark.",
    "id": "as_cashflow_3",
    "marks": 0
   }
  ]
 },
 {
  "id": "al_investment",
  "subject": "business",
  "stage": "A Level",
  "code": "9609",
  "startYear": 2026,
  "endYear": 2028,
  "edition": "2026-2028",
  "title": "Investment appraisal",
  "syllabusRef": "10.3",
  "sourcePage": 34,
  "sourceUrl": "https://www.cambridgeinternational.org/Images/697371-2026-2028-syllabus.pdf",
  "source": "original",
  "scope": "selected-introductory-unit",
  "foundationTopic": "course_business_finance",
  "objectives": [
   "Calculate simple payback and NPV",
   "Interpret discounting",
   "Combine numerical and qualitative judgement"
  ],
  "notes": [
   "Payback measures how long cumulative net cash inflows take to recover the initial investment. For uniform annual inflows it is initial cost divided by annual inflow. It ignores cash after recovery and, in its simple form, the time value of money.",
   "NPV is the sum of discounted net cash flows including the initial outflow: NPV=Σ Ct/(1+r)^t. A positive value supports investment at the chosen discount rate, but forecasts and the rate may be uncertain. Consider strategic fit, implementation and environmental consequences as well as numbers."
  ],
  "workedExample": "An initial $1000 cost followed by $600 after one year and $600 after two years at 10% gives NPV=−1000+600/1.10+600/1.10²≈$41.32. Simple payback is 1+400/600≈1.67 years if second-year cash arrives evenly.",
  "questions": [
   {
    "type": "number",
    "question": "An investment costs $12000 and returns uniform net cash of $3000 each year. Enter simple payback in years.",
    "answer": "4",
    "explain": "12000/3000=4 years.",
    "tolerance": 1e-05,
    "id": "al_investment_1",
    "marks": 1
   },
   {
    "type": "number",
    "question": "Cost now is $1000. A single net receipt of $1210 occurs after two years at 10%. Enter NPV in dollars.",
    "answer": "0",
    "explain": "1210/(1.1²)−1000=0.",
    "tolerance": 1e-05,
    "id": "al_investment_2",
    "marks": 1
   },
   {
    "type": "essay",
    "question": "Explain why a positive forecast NPV does not guarantee the project will succeed.",
    "answer": "Actual receipts and costs may differ from forecasts; timing and discount-rate assumptions matter. Capacity, execution, regulation and strategic fit may change the decision.",
    "rubric": [
     "Link NPV to forecasts",
     "Explain uncertainty",
     "Identify a contextual qualitative factor"
    ],
    "explain": "Compare your reasoning with the reference. This response is saved without an automatic mark.",
    "id": "al_investment_3",
    "marks": 0
   }
  ]
 },
 {
  "id": "as_functions",
  "subject": "computer_science",
  "stage": "AS",
  "code": "9618",
  "startYear": 2027,
  "endYear": 2029,
  "edition": "2027-2029",
  "title": "Procedures, functions and parameters",
  "syllabusRef": "11.3",
  "sourcePage": 30,
  "sourceUrl": "https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf",
  "source": "original",
  "scope": "selected-introductory-unit",
  "foundationTopic": "cs0478_8",
  "objectives": [
   "Use a returned value in an expression",
   "Trace value and reference parameters",
   "Explain modular program design"
  ],
  "notes": [
   "A function returns a value that can replace its call in an expression. A procedure performs a named operation. An argument is the actual value or variable supplied; a parameter is the named input declared in the subprogram interface. Specify the intended interface clearly.",
   "Passing by value gives the subprogram a local copy; assigning to that local parameter does not change the caller’s variable. Passing by reference gives access to the caller’s variable. Small subprograms can isolate repeated logic, but must be tested for normal and boundary inputs."
  ],
  "workedExample": "FUNCTION Double(n) RETURNS INTEGER: RETURN 2*n. If score=5, result=Double(score)+1 sets result to 11 and leaves score unchanged. A by-reference procedure that assigns score←2*score would change score itself.",
  "questions": [
   {
    "type": "number",
    "question": "Double(n) returns 2*n. Enter Double(4)+3.",
    "answer": "11",
    "explain": "Double(4)=8, so 8+3=11.",
    "tolerance": 1e-05,
    "id": "as_functions_1",
    "marks": 1
   },
   {
    "type": "choice",
    "question": "A local by-value parameter is assigned 9. What happens to the caller’s original variable?",
    "options": [
     "It stays unchanged",
     "It always becomes 9",
     "It is deleted",
     "The program must stop"
    ],
    "answer": "It stays unchanged",
    "explain": "The assignment affects the local copy.",
    "id": "as_functions_2",
    "marks": 1
   },
   {
    "type": "essay",
    "question": "Design a function Square(n), and explain how a caller uses it in an expression.",
    "answer": "FUNCTION Square(n) RETURNS INTEGER: RETURN n*n. A caller can write total←Square(3)+1, obtaining 10.",
    "rubric": [
     "Declare a parameter and return type",
     "Return n*n",
     "Show using the returned value"
    ],
    "explain": "Compare your reasoning with the reference. This response is saved without an automatic mark.",
    "id": "as_functions_3",
    "marks": 0
   }
  ]
 },
 {
  "id": "al_recursion",
  "subject": "computer_science",
  "stage": "A Level",
  "code": "9618",
  "startYear": 2027,
  "endYear": 2029,
  "edition": "2027-2029",
  "title": "Recursive tracing",
  "syllabusRef": "19.2",
  "sourcePage": 37,
  "sourceUrl": "https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf",
  "source": "original",
  "scope": "selected-introductory-unit",
  "foundationTopic": "cs0478_8",
  "objectives": [
   "Identify a base case",
   "Trace smaller recursive calls",
   "Describe the call stack"
  ],
  "notes": [
   "A recursive subprogram calls itself, directly or indirectly. It needs a terminating base case and progress toward that case. For factorial of a nonnegative integer, fact(0)=1 and fact(n)=n*fact(n−1) for n>0. Validate the input domain.",
   "Each active call preserves its own local context and return location on a call stack. Calls first descend to the base case, then return in reverse order. Excessive depth can exhaust stack resources; an iterative version may be more suitable for some inputs."
  ],
  "workedExample": "fact(3) waits for fact(2), then fact(1), then fact(0). Returns are 1, 1, 2, 6. Four calls are active at the deepest point, including the base case.",
  "questions": [
   {
    "type": "number",
    "question": "Using fact(0)=1 and fact(n)=n*fact(n−1), enter fact(4).",
    "answer": "24",
    "explain": "4×3×2×1=24.",
    "tolerance": 1e-05,
    "id": "al_recursion_1",
    "marks": 1
   },
   {
    "type": "number",
    "question": "How many calls, including the base case, are made by fact(3)?",
    "answer": "4",
    "explain": "fact(3), fact(2), fact(1), fact(0).",
    "tolerance": 1e-05,
    "id": "al_recursion_2",
    "marks": 1
   },
   {
    "type": "essay",
    "question": "Why does calling this factorial routine with a negative integer fail to reach its base case?",
    "answer": "Repeatedly subtracting one from a negative value moves farther from zero. Reject negative input or define a suitable different domain before recursing.",
    "rubric": [
     "Trace decreasing negative input",
     "Explain unreachable base case",
     "Propose input validation"
    ],
    "explain": "Compare your reasoning with the reference. This response is saved without an automatic mark.",
    "id": "al_recursion_3",
    "marks": 0
   }
  ]
 },
 {
  "id": "as_textanalysis",
  "subject": "english",
  "stage": "AS",
  "code": "9093",
  "startYear": 2027,
  "endYear": 2028,
  "edition": "2027-2028",
  "title": "Analysing form, audience and language",
  "syllabusRef": "Paper 1",
  "sourcePage": 12,
  "sourceUrl": "https://www.cambridgeinternational.org/Images/721359-2027-2028-syllabus.pdf",
  "source": "original",
  "scope": "selected-introductory-unit",
  "foundationTopic": "course_english_evidence",
  "objectives": [
   "Link textual evidence to effect",
   "Identify audience and purpose",
   "Construct an analytical paragraph"
  ],
  "notes": [
   "Begin with the situation: who addresses whom, through what form, and with what purpose? Select a short precise feature and explain how it helps the writer address that audience. A feature list without effects is weaker than a reasoned interpretation.",
   "Analyse patterns across structure, tone and language rather than guessing the author’s private intention. Support a possible effect with the actual wording and context, and allow a reasonable alternative reading. This introductory practice does not reproduce a full examination task."
  ],
  "workedExample": "Original notice: “Bring one book. Leave with a new idea.” The paired short imperatives make participation seem manageable and rewarding; the shift from a concrete book to an abstract idea frames the event as an exchange of learning.",
  "questions": [
   {
    "type": "essay",
    "question": "Analyse the effect of the paired imperatives in the original notice “Bring one book. Leave with a new idea.”",
    "answer": "The parallel short commands create a clear two-step invitation. Their concrete-to-abstract contrast presents a modest contribution as a route to an intellectual reward.",
    "rubric": [
     "Select precise evidence",
     "Link form to audience/purpose",
     "Explain a plausible effect"
    ],
    "explain": "Compare your reasoning with the reference. This response is saved without an automatic mark.",
    "id": "as_textanalysis_1",
    "marks": 0
   },
   {
    "type": "essay",
    "question": "Write a welcoming 40–60-word introduction for a school book exchange.",
    "answer": "Welcome to our book exchange. Bring a book you enjoyed and share a short reason for recommending it. You can discover a new author, meet another reader and take home a different book. Join us in the library on Friday after lessons.",
    "rubric": [
     "Use an appropriate welcoming register",
     "Include practical context",
     "Keep to the requested length"
    ],
    "explain": "Compare your reasoning with the reference. This response is saved without an automatic mark.",
    "id": "as_textanalysis_2",
    "marks": 0
   },
   {
    "type": "essay",
    "question": "Explain one language choice in your introduction and how it suits students.",
    "answer": "Inclusive “our” presents the event as a shared activity; direct invitations help students understand what they can do and what they may gain.",
    "rubric": [
     "Refer to your own wording",
     "Explain the audience connection",
     "Avoid unsupported claims"
    ],
    "explain": "Compare your reasoning with the reference. This response is saved without an automatic mark.",
    "id": "as_textanalysis_3",
    "marks": 0
   }
  ]
 },
 {
  "id": "al_globalenglish",
  "subject": "english",
  "stage": "A Level",
  "code": "9093",
  "startYear": 2027,
  "endYear": 2028,
  "edition": "2027-2028",
  "title": "English in the world: evidence and judgement",
  "syllabusRef": "Paper 4: English in the world",
  "sourcePage": 17,
  "sourceUrl": "https://www.cambridgeinternational.org/Images/721359-2027-2028-syllabus.pdf",
  "source": "original",
  "scope": "selected-introductory-unit",
  "foundationTopic": "course_english_evidence",
  "objectives": [
   "Compare language contexts",
   "Evaluate evidence rather than stereotypes",
   "Build a qualified argument"
  ],
  "notes": [
   "English is used across different communities and purposes. Distinguish an individual’s register choice from a broad claim about a whole variety or country. A prestigious variety is not automatically the best choice for every audience and situation.",
   "A developed argument weighs evidence, context and counterarguments. A small classroom survey may reveal perceptions but cannot establish how an entire population uses English. Explain sampling limits and separate attitudes toward language from linguistic description."
  ],
  "workedExample": "In an original fictional survey, 8 of 10 classmates prefer formal English for a university application. This supports a claim about those students’ expectations in that context, not a claim that every English variety is unsuitable for all formal communication.",
  "questions": [
   {
    "type": "essay",
    "question": "Evaluate the claim: “One variety of English is always best for every international audience.”",
    "answer": "Suitability depends on shared understanding, purpose and audience expectations. A common standard may help in some formal settings, while other varieties can express local identity and work effectively in their communities. “Always” overstates the evidence.",
    "rubric": [
     "Define relevant context",
     "Develop an argument and counterargument",
     "Give a qualified judgement"
    ],
    "explain": "Compare your reasoning with the reference. This response is saved without an automatic mark.",
    "id": "al_globalenglish_1",
    "marks": 0
   },
   {
    "type": "essay",
    "question": "A survey of 10 classmates finds 8 favour formal English in applications. What can and cannot be concluded?",
    "answer": "The result describes the sampled classmates’ stated preference for this task. The small, local sample cannot establish actual usage or preferences across countries, ages or contexts.",
    "rubric": [
     "Describe the evidence accurately",
     "Explain sample limitations",
     "Distinguish preference from actual usage"
    ],
    "explain": "Compare your reasoning with the reference. This response is saved without an automatic mark.",
    "id": "al_globalenglish_2",
    "marks": 0
   },
   {
    "type": "essay",
    "question": "Write a thesis and two-point plan about how audience affects language choices.",
    "answer": "Thesis: effective language choices respond to audience expectations while preserving clarity and identity. Point 1: shared conventions support understanding in formal contexts. Point 2: community varieties and register shifts can support relationships and identity. Evaluate where these priorities compete.",
    "rubric": [
     "Provide a debatable qualified thesis",
     "Organise two distinct points",
     "Include an evaluative direction"
    ],
    "explain": "Compare your reasoning with the reference. This response is saved without an automatic mark.",
    "id": "al_globalenglish_3",
    "marks": 0
   }
  ]
 }
];
