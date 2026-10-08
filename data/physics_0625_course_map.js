/* Cambridge IGCSE Physics 0625 — 2026–2028 course map
 * Original study metadata aligned to the official syllabus topic structure.
 * Content is intentionally concise/original; do not reproduce Cambridge copyrighted text.
 */
window.PHYSICS_0625_COURSE_MAP = [
["1.1","Length and time",["SI units and prefixes","measuring length","measuring time","scalar quantities and appropriate instruments"],["State","Describe","Determine"],"Measurement"],
["1.2","Motion",["speed","velocity","average speed","distance–time graphs","speed–time graphs","acceleration","deceleration","terminal velocity"],["Calculate","Describe","Explain","Sketch"],"Graph"],
["1.3","Mass and weight",["mass","weight","gravitational field strength","measuring mass and weight"],["Define","Calculate","Explain"],"Calculation"],
["1.4","Density",["density","mass–volume relationship","density of regular objects","density of irregular objects"],["Calculate","Describe","Determine"],"Practical"],
["1.5","Forces",["force and effects","turning effect","centre of mass","elastic deformation","friction and drag","resultant force"],["State","Describe","Explain","Calculate"],"Calculation"],
["1.6","Momentum",["momentum","conservation of momentum","force and change of momentum"],["Define","Calculate","Explain"],"Calculation"],
["1.7","Energy, work and power",["energy stores","energy transfer","work done","power","efficiency","energy resources"],["Calculate","Describe","Explain","Compare"],"Calculation"],
["1.8","Pressure",["pressure","pressure in liquids","pressure and depth","atmospheric pressure"],["Calculate","Explain","Describe"],"Calculation"],
["2.1","Kinetic particle model of matter",["states of matter","particle arrangement","particle motion","changes of state","Brownian motion"],["Describe","Explain","Compare"],"Explanation"],
["2.2","Thermal properties and temperature",["temperature","thermal expansion","specific heat capacity","specific latent heat"],["Define","Calculate","Explain"],"Calculation"],
["2.3","Transfer of thermal energy",["conduction","convection","radiation","thermal insulation","emission and absorption"],["Describe","Explain","Suggest"],"Practical"],
["3.1","General properties of waves",["wave terms","transverse and longitudinal waves","wave equation","reflection","refraction","diffraction"],["Define","Describe","Calculate","Explain"],"Graph"],
["3.2","Light",["reflection","refraction","refractive index","critical angle","lenses","dispersion"],["Describe","Calculate","Explain","Sketch"],"Graph"],
["3.3","Electromagnetic spectrum",["spectrum order","properties","uses","hazards"],["State","Describe","Compare","Explain"],"Knowledge"],
["3.4","Sound",["production of sound","longitudinal waves","speed of sound","frequency and pitch","amplitude and loudness","ultrasound"],["Describe","Explain","Calculate"],"Explanation"],
["4.1","Simple phenomena of magnetism",["magnetic poles","magnetic fields","induced magnetism","magnetic materials"],["State","Describe","Explain"],"Knowledge"],
["4.2","Electrical quantities",["charge","current","potential difference","resistance","electrical energy","electrical power"],["Define","Calculate","Explain"],"Calculation"],
["4.3","Electric circuits",["circuit symbols","series circuits","parallel circuits","resistance","I–V characteristics","potential dividers"],["Describe","Calculate","Sketch","Explain"],"Practical"],
["4.4","Electrical safety",["hazards","fuses","circuit breakers","earthing","double insulation"],["State","Explain","Suggest"],"Practical"],
["4.5","Electromagnetic effects",["electromagnetic force","motor effect","electromagnetic relays","loudspeakers"],["Describe","Explain","Predict"],"Explanation"],
["4.6","Electromagnetic induction",["electromagnetic induction","generators","transformers","transformer equation","power transmission"],["Describe","Explain","Calculate"],"Calculation"],
["5.1","The nuclear model of the atom",["atomic structure","nucleus","protons neutrons electrons","isotopes","nuclear notation"],["Define","State","Describe"],"Knowledge"],
["5.2","Radioactivity",["background radiation","alpha beta gamma","activity","half-life","penetration","ionisation","uses and safety"],["Identify","Describe","Explain","Calculate"],"Explanation"],
["6.1","Earth and the Solar System",["orbital motion","gravitational attraction","planets and satellites"],["Describe","Explain","Calculate"],"Explanation"],
["6.2","Stars and the Universe",["stellar evolution","galaxies","redshift","expansion of the universe"],["Describe","Explain"],"Explanation"]
].map(x=>({
  syllabus:"0625",syllabusYear:"2026-2028",subject:"physics",chapter:x[0]+" "+x[1],
  topicId:"phy0625_"+x[0].replace(".","_"),title:x[0]+" "+x[1],
  objectives:x[2],commandWords:x[3],examSkill:x[4],
  knowledge:"本主题学习目标： "+x[2].join("、")+"。建议学习顺序：概念理解 → 关键词汇 → 例题 → 实验/图像技能 → 考试题。",
  formulas:[],commonMistake:"先确认 command word，再选择知识点、公式或实验方法；最后检查单位、有效数字与答案表达。",
  vocabulary:x[2].map(v=>({en:v,zh:"待补充中文释义"}))
}));
