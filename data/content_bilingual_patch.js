/* Authored supplements for existing lessons; source material is retained. */
(function(){
 'use strict';
 const notes={
 eng_lang_grammar:'Read the complete sentence and surrounding context before choosing a tense or linker. A past event before another past event may require the past perfect. Use because to introduce a reason and however to mark contrast. After choosing a form, check subject–verb agreement and whether every clause has a complete structure.',
 eng_exam_decoder:'Underline the command word and identify qualifiers such as main, best, except and not. Describe asks for features; explain requires a reason or causal link. Match the detail of the response to the task rather than reproducing every fact you know. Re-read the question after drafting your answer.',
 course_english_evidence:'Select evidence that serves the reader’s purpose. Keep relevant deadlines, costs and restrictions. An inference must be supported by a word, action or detail in the passage; distinguish a plausible suggestion from a proven fact. Use your own words where requested without changing meaning.',
 course_english_emailtask:'Plan an email around audience, purpose and the required points. Give each point enough detail and use a suitable opening and closing. For example, an invitation should state the activity, time and what the reader should do next. Check that the register stays consistent.',
 course_english_reporttask:'Organise a report under a clear purpose, findings and recommendations. Support recommendations with relevant observations rather than unexplained opinions. Use an appropriately formal register and acknowledge any limits in the available evidence.',
 course_english_revision:'Revise meaning and organisation before checking individual sentences. Check tense consistency, subject–verb agreement, articles and punctuation. Join ideas only when their logical relationship is clear. Replace a comma splice with a full stop, conjunction or suitable semicolon.'
 };
 const subjectNotes={
 math_geometry_01:'Angles on a straight line total 180 degrees; angles around a point total 360 degrees. The interior angles of a triangle total 180 degrees. For parallel lines, corresponding and alternate angles are equal, while co-interior angles total 180 degrees. Give the reason for each step in an angle calculation. For example, if two angles in a triangle are 48 and 67 degrees, the third is 180 - 48 - 67 = 65 degrees. A diagram is not necessarily drawn to scale.',
 math_trig_01:'For a right-angled triangle, label the hypotenuse opposite the right angle. Relative to the chosen acute angle, sine is opposite over hypotenuse, cosine is adjacent over hypotenuse, and tangent is opposite over adjacent. Identify the known sides before choosing a ratio. If opposite = 3 and hypotenuse = 5, the angle is inverse sine of 0.6, about 36.9 degrees. Use degree mode for angles in degrees and retain calculator precision until the final answer.',
 phy_energy_01:'Energy is conserved: it is transferred between stores or to the surroundings, rather than used up. Work done by a constant force acting along a displacement is force times distance, measured in joules. Power is energy transferred divided by time, measured in watts. Efficiency is useful output energy divided by total input energy; multiply by 100 for a percentage. A device transferring 600 J in 20 s has an average power of 30 W. Identify the system boundary before describing energy transfers.',
 phy_waves_01:'Wave speed equals frequency times wavelength. Frequency is measured in hertz, wavelength in metres and speed in metres per second. In a transverse wave the oscillations are perpendicular to the direction of energy transfer; in a longitudinal wave they are parallel. Sound is longitudinal and needs a medium. When a wave crosses a boundary its frequency stays the same, while speed and wavelength may change. A 5 Hz wave with wavelength 2 m travels at 10 m/s. Waves transfer energy without an overall transfer of matter.',
 chem_redox_01:'Oxidation is loss of electrons and reduction is gain of electrons. In oxygen-transfer reactions, oxidation can also be described as gaining oxygen and reduction as losing oxygen. A magnesium atom forming Mg2+ loses two electrons and is oxidised. An oxidising agent accepts electrons and is itself reduced. Write balanced half-equations to keep track of atoms and charge, and distinguish the substance undergoing oxidation from the oxidising agent. Both electron transfer processes occur together.',
 chem_periodic_01:'Elements are arranged in order of proton number. Elements in the same group have related chemical properties because they have the same number of outer-shell electrons. Across a period, proton number increases and electrons fill the same principal shell for the simple electronic structures used here. Group I metals form positive ions and react with water; their reactivity generally increases down the group. Group VII halogens form negative ions and become less reactive down the group. A more reactive halogen displaces a less reactive halogen from its halide solution.',
 bus_people:'Motivation can affect productivity, absence and staff retention. Financial methods include wages, salaries, bonuses and profit sharing; non-financial methods include job enrichment, recognition and opportunities for responsibility. A method should suit the worker and the business context. Piece-rate pay may encourage output but could reduce quality unless suitable checks exist. Training costs time and money initially but may improve skills and reduce errors. Evaluate a recommendation by explaining both the likely benefit and a relevant limitation.',
 bus_marketing:'Market segmentation groups customers with similar characteristics or needs. Primary research collects new information for a specific purpose; secondary research uses information already available. A sample must represent the intended target market, not just be large. The marketing mix combines product, price, place and promotion. These decisions should reinforce one another: a premium product needs distribution and promotion that support its positioning. Distinguish a rise in sales revenue from an increase in profit, since costs may also rise.',
 cs0478_1:'Binary uses base 2, denary base 10 and hexadecimal base 16. Each hexadecimal digit represents four binary bits. Uncompressed bitmap size in bits equals width times height times colour depth; divide by eight for bytes. For example, 800 by 600 pixels at 8 bits per pixel requires 3840000 bits before metadata. Increasing resolution or colour depth usually increases the uncompressed size. Lossless compression allows the original data to be reconstructed exactly; lossy compression discards some information.',
 cs0478_2:'Data may be transmitted serially, one bit at a time, or in parallel using multiple channels. Simplex is one-way communication; half-duplex permits both directions at different times; full-duplex permits simultaneous communication. Packet switching divides a message into packets that can take different routes and be reassembled at the destination. Error detection techniques identify certain transmission errors but do not guarantee detection of every possible error. A parity bit can detect an odd number of changed bits, while two changed bits can leave parity unchanged.',

 course_business_research:'Market research reduces uncertainty but does not remove it. Primary research collects new data for a specific purpose; secondary research reuses existing information. Select a sample relevant to the target population, avoid leading questions and compare response rates. A large sample can still be biased if it excludes important groups. For example, surveying only existing customers may miss reasons why other people avoid the product.',
 course_business_mix:'The marketing mix combines product, price, place and promotion. Decisions should suit the target market and reinforce each other. A low introductory price may encourage trial, but the business must consider costs, competitors and the risk that customers expect the low price to continue. Online distribution can broaden reach while creating delivery, return and security costs. Evaluate a recommendation using the specific business context.',
 course_math_bounds:'A value rounded to the nearest unit represents a half-open interval. If a length is 8 cm to the nearest centimetre, its true value is at least 7.5 cm and less than 8.5 cm. For positive quantities, maximise a ratio using the largest numerator and smallest denominator. State the bounds before substituting, and round only the final result. Do not confuse measurement precision with certainty about a calculated answer.',
 course_math_simultaneous:'Solve simultaneous linear equations by eliminating one variable or substituting an expression into the other equation. Apply the same operation to both sides, and track negative signs carefully. For 2x+y=11 and x-y=1, adding gives 3x=12, so x=4 and y=3. Check both original equations; checking only one equation is not enough.',
 course_physics_graphs:'On a distance–time graph, gradient gives speed. On a speed–time graph, gradient gives acceleration and area gives distance travelled. A horizontal line means different things on the two graphs: stationary on distance–time, constant speed on speed–time. Label units and use a large triangle when estimating gradient. A triangle under a speed–time graph has area one half times base times height.',
 course_physics_circuits:'Connect an ammeter in series and a voltmeter in parallel with the component being tested. For an ohmic conductor at constant temperature, V/I is constant. Heating a filament changes its resistance, so its current–voltage relationship is not a straight line. Limit heating when investigating a wire, record paired readings and distinguish random variation from systematic instrument error.',
 course_chemistry_limiting:'Use the balanced equation to identify reaction ratios. Divide each available amount in moles by its stoichiometric coefficient; the smaller result identifies the limiting reactant. Calculate theoretical product from that reactant. Percentage yield equals actual yield divided by theoretical yield times 100. For 2H2+O2 producing 2H2O, 0.30 mol H2 and 0.20 mol O2 can produce at most 0.30 mol water.',
 course_chemistry_chromatography:'A solvent carries soluble substances along a stationary phase. Draw the starting line in pencil, above the solvent level. Mark the solvent front before it evaporates. Rf is the distance travelled by a spot divided by the distance travelled by the solvent front, both measured from the starting line. Compare values only under the same conditions; matching Rf values alone do not conclusively prove identity.',
 course_computer_science_validation:'Validation checks whether data meets specified rules, not whether it is factually true. Use range, type, length or format checks as appropriate. Verification checks accurate copying, for example by double entry. Test valid normal data, valid boundary data and invalid values just beyond a boundary. A test plan needs inputs and expected outputs; actual outputs must come from a real execution or a clearly labelled manual trace.',
 course_computer_science_logic:'A truth table lists every input combination and the resulting Boolean output. For n Boolean inputs there are 2 to the power n rows. NOT reverses a truth value, AND requires both conditions, and OR requires at least one. Use brackets to make precedence explicit. Compare every row before claiming two expressions are equivalent; one matching row is insufficient.'
 };
 for(const topic of window.IGCSE_CATALOG.topics)if(subjectNotes[topic.topicId]&&!topic.knowledgeEn)topic.knowledgeEn=subjectNotes[topic.topicId];
 // Resolve by id; report unmatched keys in the offline audit rather than inventing coverage.
 for(const topic of window.IGCSE_CATALOG.topicsFor('english'))if(notes[topic.topicId]&&!topic.knowledgeEn)topic.knowledgeEn=notes[topic.topicId];
 const questionNotes={
 ext_math_1:['解英文题中的二次方程，找出所有根。','因式分解得 (x − 3)(x − 4) = 0，所以 x = 3 或 x = 4；将两根分别代回核对。'],
 ext_math_2:['袋中有 3 个红筹码和 5 个蓝筹码，随机抽一个。抽到红色的概率是多少？','共有 8 个等可能的筹码，其中 3 个红色，所以概率为 3/8。'],
 ext_phy_1_1_1:['物体两端在尺上的读数分别为 12 mm 和 47 mm。长度是多少？','长度是两端读数之差：47 − 12 = 35 mm，不能把两个读数相加。'],
 ext_phy_1_1_2:['说明测量十次振动总时间时，如何减小随机不确定度。','重复测量几组十次振动的总时间并取平均，再除以十得到周期。测多个周期可减小反应时间所占的比例。'],
 ext_chemistry_3:['11 g 二氧化碳含多少摩尔？已知 Mr(CO₂) = 44。','物质的量等于质量除以摩尔质量：11 ÷ 44 = 0.25 mol。'],
 ext_chemistry_4:['镁原子在反应中变成 Mg²⁺，发生了什么变化？','镁失去两个带负电的电子后形成 2+ 离子；失电子是氧化。原子核中的质子数没有改变。'],
 ext_business_7:['企业以每件 8 美元卖出 200 件产品，每件变动成本为 3 美元，固定成本 700 美元。利润是多少？','收入为 200 × 8 = 1600；总成本为 200 × 3 + 700 = 1300；利润为 300 美元。'],
 ext_business_8:['咖啡馆只询问常客对新产品的需求，这种抽样的主要问题是什么？','常客未必能代表潜在新客户，样本可能有偏差；单纯扩大同类样本也不一定消除偏差。'],
 cs1_q1:['哪一种进位制以 2 为基数？','二进制使用 0 和 1 两个数字，基数是 2。'],
 cs1_q2:['图像为 800 × 600 像素，色深为 8 bit。未压缩图像大小是多少 bit？','宽 × 高 × 每像素位数：800 × 600 × 8 = 3,840,000 bit。若换算为 byte，需再除以 8。'],
 ext_english_11:['阅读英文告示，判断周五发生了什么变化。','开门时间从 9 点改成 10 点，即晚一小时开门；告示没有说明关门时间变化。'],
 ext_english_12:['请求课程信息的正式邮件，应使用哪个开头？','正式称呼、礼貌表达和明确的写信目的适合给陌生机构写信。阅读英文选项判断语体。'],

 eng_r1:['阅读英文告示，图书馆为什么提前闭馆？','告示直接说明原因：工作人员需要参加培训。'],
 eng_r2:['根据英文句子的语境，exhausting 表示什么？','旅程让人感到疲惫，所以 exhausting 表示令人筋疲力尽。'],
 eng_w1:['给校长写正式邮件，哪种开头最恰当？','面对正式收件人，应使用恰当的正式称呼和语体。'],
 eng_w2:['哪个连接词最适合引出对比观点？','However 用于引出转折或对比。'],
 eng_l1:['请听音源，说话人最终使用了哪种交通方式？','in the end 表示最终选择；原先乘公交的计划是干扰信息，最终是开车。'],
 eng_s1:['哪个回答最充分地展开了“你喜欢什么爱好”这个问题？','完整回答不仅说明爱好，还提供理由并展开细节。'],
 eng_g1:['选择正确表达，补全英文句子。','一般现在时的第三人称单数主语 she 搭配 goes。'],
 eng_g2:['哪个短语是自然的词语搭配？','make a decision 是常用的标准搭配，表示作决定。'],
 eng_e1:['题目要求描述你最喜欢的地方时，主要应该做什么？','Describe 要求描述特征或情况，而不是仅解释历史或原因。'],
 eng_e2:['哪个限定词可能改变题目要求？','except、not、mainly、best 等词会限定应选答案的范围。'],
 eng_v1:['哪个短语动词表示“继续”？','carry on 表示继续；give up 表示放弃。'],
 eng_w3:['什么最能帮助较长的回答保持连贯？','清晰的段落安排与逻辑连接能帮助读者理解思路。'],
 eng_r3:['阅读英文段落，判断其主旨。','核心是把闲置停车场改为社区花园；志愿者、蔬菜和活动只是支持细节。'],
 eng_r4:['根据 Maya 的行为，可以作出什么合理推断？','查看天气、准备防水外套并移入室内，共同支持她预期会下雨的推断。'],
 eng_w4:['就学校参观向博物馆询问时，哪句话最适合正式邮件？','合适的正式表达应礼貌、准确、具体。'],
 eng_w5:['哪个段落开头最有助于进一步展开论证？','有立场、有理由并能衔接具体例子的开头，更便于展开论证。'],
 eng_l2:['请听音源，应该记录哪一天？','Tuesday 是原计划，has been moved to 之后的 Thursday 才是最终日期。'],
 eng_s2:['哪个回答最充分地展开了“未来想学什么”这个问题？','较完整的回答直接回应问题，说明理由，并补充具体例子。'],
 eng_g3:['选择最合适的表达，补全英文句子。','电影开始早于我们到达这件过去的事，因此用过去完成时 had started。'],
 eng_g4:['选择恰当的连接词补全英文句子。','旅程昂贵与大家仍认为值得形成对比，所以用 however。'],
 eng_e3:['英文问题中，哪个词最明确地限定了答案范围？','main 要求选择最主要的原因，而不是任意合理原因。'],
 eng_e4:['题目要求解释变化为何成功，哪个回答最充分？','Explain 要建立因果联系；仅重复“成功了”不能解释原因。']
 };
 for(const [id,pair] of Object.entries(questionNotes)){const q=window.IGCSE_CATALOG.question(id);if(q){if(!q.en)q.en=q.question;if(!q.zh)q.zh=pair[0];if(!q.explainZh)q.explainZh=pair[1];}}
 window.IGCSE_BILINGUAL_PATCH={notes,subjectNotes,questionNotes};
})();
