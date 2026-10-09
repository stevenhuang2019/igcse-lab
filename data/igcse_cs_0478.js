/* Cambridge IGCSE Computer Science 0478 — 2026–2028
 * Original learning metadata aligned to the official 10-topic structure.
 */
window.IGCSE_CS_CONTENT = [
{topicId:"cs0478_1",chapter:"1",title:"1 Data representation",objectives:["Number systems","Text, sound and images","Data storage and compression"],commandWords:["State","Describe","Explain","Calculate","Compare"],examSkill:"Data representation",knowledge:"理解二进制、十六进制、字符集、声音采样、图像像素与数据压缩；能够进行基础转换和文件大小计算。",formulas:["Image file size ≈ resolution × colour depth","Sound file size ≈ sample rate × sample resolution × duration"],commonMistake:"不要混淆 bit/byte、sample rate/sample resolution、resolution/colour depth；计算时按题目指定单位。",vocabulary:[["binary","二进制"],["hexadecimal","十六进制"],["character set","字符集"],["sample rate","采样率"],["colour depth","色深"],["compression","压缩"]] },
{topicId:"cs0478_2",chapter:"2",title:"2 Data transmission",objectives:["Packets and packet switching","Transmission methods","Error detection","Encryption"],commandWords:["Describe","Explain","Compare","Suggest"],examSkill:"Transmission and security",knowledge:"掌握 packet、packet switching、serial/parallel、simplex/duplex、parity、checksum、ARQ，以及 symmetric/asymmetric encryption。",formulas:[],commonMistake:"把 error detection 与 error correction 混淆；解释加密时要说明目的与 key 的作用。",vocabulary:[["packet","数据包"],["payload","有效载荷"],["parity check","奇偶校验"],["checksum","校验和"],["encryption","加密"],["public key","公钥"]] },
{topicId:"cs0478_3",chapter:"3",title:"3 Hardware",objectives:["Computer architecture","Input and output devices","Storage devices","Network hardware"],commandWords:["Identify","Describe","Explain","Compare","Suggest"],examSkill:"Systems knowledge",knowledge:"理解 CPU、memory、storage、输入输出设备及网络硬件的功能、适用场景和性能权衡。",formulas:[],commonMistake:"回答设备题时不要只写名称，要说明它如何工作以及为什么适合该场景。",vocabulary:[["processor","处理器"],["register","寄存器"],["RAM","随机存取存储器"],["ROM","只读存储器"],["sensor","传感器"],["actuator","执行器"]] },
{topicId:"cs0478_4",chapter:"4",title:"4 Software",objectives:["Operating systems","Utility software","Programming language translators"],commandWords:["State","Describe","Explain","Compare"],examSkill:"Software concepts",knowledge:"理解操作系统管理文件、内存、进程和硬件的作用；区分 utility software、compiler、interpreter、assembler。",formulas:[],commonMistake:"compiler 与 interpreter 的区别不能只写“一次/逐行”，要联系执行方式、错误反馈和生成结果。",vocabulary:[["operating system","操作系统"],["utility software","实用程序"],["compiler","编译器"],["interpreter","解释器"],["assembler","汇编器"],["process","进程"]] },
{topicId:"cs0478_5",chapter:"5",title:"5 The internet and its uses",objectives:["Internet and WWW","Web technologies","Cyber security","Digital impacts"],commandWords:["Describe","Explain","Compare","Evaluate","Suggest"],examSkill:"Internet and evaluation",knowledge:"理解互联网、WWW、URL、DNS、web technologies、cyber security threats 与防护，以及数字技术的社会影响。",formulas:[],commonMistake:"Internet 不等于 WWW；网络安全答案要把威胁、漏洞和防护措施对应起来。",vocabulary:[["internet","互联网"],["World Wide Web","万维网"],["URL","统一资源定位符"],["DNS","域名系统"],["malware","恶意软件"],["phishing","网络钓鱼"]] },
{topicId:"cs0478_6",chapter:"6",title:"6 Automated and emerging technologies",objectives:["Automated systems","Robotics","Artificial intelligence","Machine learning","Emerging technologies"],commandWords:["Describe","Explain","Discuss","Evaluate","Suggest"],examSkill:"Technology evaluation",knowledge:"理解传感器—处理器—执行器的自动化系统，机器人、AI、机器学习及新兴技术的应用、优势、风险和伦理影响。",formulas:[],commonMistake:"AI、machine learning、automation 不是同义词；评价题必须同时考虑 benefits、risks 和 context。",vocabulary:[["automation","自动化"],["artificial intelligence","人工智能"],["machine learning","机器学习"],["robotics","机器人技术"],["sensor","传感器"],["ethical","伦理的"]] },
{topicId:"cs0478_7",chapter:"7",title:"7 Algorithm design and problem-solving",objectives:["Decomposition","Abstraction","Flowcharts","Algorithm tracing","Algorithm testing"],commandWords:["Describe","Explain","Design","Trace","Test"],examSkill:"Computational thinking",knowledge:"建立 decomposition、abstraction、algorithm design、flowchart、trace table 与 testing 思维；能够把问题拆成可执行步骤。",formulas:[],commonMistake:"trace table 要逐步更新变量；testing 要区分 normal、boundary、invalid data。",vocabulary:[["algorithm","算法"],["decomposition","分解"],["abstraction","抽象"],["flowchart","流程图"],["trace table","跟踪表"],["boundary value","边界值"]] },
{topicId:"cs0478_8",chapter:"8",title:"8 Programming",objectives:["Variables and data types","Selection","Iteration","Subroutines","Arrays","File handling","Testing and debugging"],commandWords:["Write","Describe","Explain","Trace","Test","Debug"],examSkill:"Programming",knowledge:"掌握 IGCSE Paper 2 的算法与编程要求；考试编码题以 pseudocode 为核心，15 分 scenario question 可使用 Python、Visual Basic 或 Java。平台练习优先提供 Python 实践，同时训练 pseudocode、测试与调试。",formulas:[],commonMistake:"先理解题意再写代码；不要忽略 data type、loop condition、initialisation 和 boundary condition。",vocabulary:[["variable","变量"],["integer","整数"],["string","字符串"],["selection","选择结构"],["iteration","迭代/循环"],["debug","调试"]] },
{topicId:"cs0478_9",chapter:"9",title:"9 Databases",objectives:["Database concepts","Tables and fields","Primary keys","Queries","Validation"],commandWords:["Define","Identify","Describe","Explain","Design"],examSkill:"Database reasoning",knowledge:"理解 database、table、record、field、primary key、foreign key、validation 与 query；能够读懂并设计基础数据库结构。",formulas:[],commonMistake:"field 是列、record 是行；primary key 必须能够唯一识别 record。",vocabulary:[["database","数据库"],["table","表"],["record","记录"],["field","字段"],["primary key","主键"],["validation","验证"]] },
{topicId:"cs0478_10",chapter:"10",title:"10 Boolean logic",objectives:["Logic gates","Truth tables","Boolean expressions","Logic circuits"],commandWords:["State","Complete","Draw","Explain","Evaluate"],examSkill:"Logic",knowledge:"掌握 AND、OR、NOT 及常见组合逻辑门，能够完成 truth table、Boolean expression 和 logic circuit 的相互转换。",formulas:["AND: A·B","OR: A+B","NOT: ¬A"],commonMistake:"先逐行建立 truth table，再计算组合逻辑；不要凭直觉判断复杂电路。",vocabulary:[["Boolean logic","布尔逻辑"],["logic gate","逻辑门"],["truth table","真值表"],["Boolean expression","布尔表达式"],["AND gate","与门"],["OR gate","或门"] ]}
].map(x=>({
 syllabus:"0478",syllabusYear:"2026-2028",subject:"computer_science",chapter:x.chapter+" "+x.title,
 title:x.title,topicId:x.topicId,objectives:x.objectives,commandWords:x.commandWords,
 examSkill:x.examSkill,knowledge:x.knowledge,formulas:x.formulas,commonMistake:x.commonMistake,
 vocabulary:x.vocabulary.map(v=>({en:v[0],zh:v[1]}))
}));
/* Focused original lessons for previously unpractised outline sections. */
window.IGCSE_CS_CONTENT.push(...[
  {
    "topicId": "cs0478_5_currency",
    "chapter": "5 The internet and its uses",
    "title": "5.2 Digital currency · 数字货币",
    "objectives": [
      "Electronic value and payment",
      "Timestamped transaction records",
      "Linked blocks and detectable tampering"
    ],
    "knowledge": "数字货币用电子记录表示和转移价值，不是通过网络传送实物硬币。区块链把交易按时间记录，并使后续区块依赖前面区块的信息；修改早期记录会破坏这些关联，因此可被发现。它不保证价格稳定、绝对隐私或每个收款方都可信。学习时区分电子支付、交易记录与区块链机制。",
    "commonMistake": "数字货币不等于所有电子数据；区块链也不等于价格稳定或绝对匿名。",
    "vocabulary": [
      {
        "en": "digital currency",
        "zh": "数字货币"
      },
      {
        "en": "transaction",
        "zh": "交易"
      },
      {
        "en": "blockchain",
        "zh": "区块链"
      },
      {
        "en": "timestamp",
        "zh": "时间戳"
      }
    ],
    "subject": "computer_science",
    "syllabus": "0478",
    "syllabusYear": "2026-2028",
    "commandWords": [
      "Explain",
      "Trace",
      "Write"
    ],
    "examSkill": "Systems and programming",
    "formulas": []
  },
  {
    "topicId": "cs0478_8_files",
    "chapter": "8 Programming",
    "title": "8.3 File handling · 文件操作",
    "objectives": [
      "Persist results between runs",
      "Open for reading or writing",
      "Read and write text items",
      "Close files after use"
    ],
    "knowledge": "变量通常只在程序运行期间保存数据；文件可在程序结束后继续保留结果。Cambridge 伪代码：OPENFILE \"scores.txt\" FOR READ，然后 READFILE \"scores.txt\", Score，最后 CLOSEFILE \"scores.txt\"。写入时用 FOR WRITE 和 WRITEFILE；WRITE 会建立新文件或覆盖已有内容，不能用它读取需要保留的数据。连续读取会取得后续项目或文本行。先确认打开模式、读取顺序和关闭步骤，再跟踪变量值。",
    "commonMistake": "不要用 WRITE 模式打开待保留的旧结果；它可能覆盖文件。READFILE 的后一次赋值会替换同一变量的先前值。",
    "vocabulary": [
      {
        "en": "persistent storage",
        "zh": "持久存储"
      },
      {
        "en": "read mode",
        "zh": "读取模式"
      },
      {
        "en": "write mode",
        "zh": "写入模式"
      },
      {
        "en": "file handle",
        "zh": "文件句柄"
      }
    ],
    "subject": "computer_science",
    "syllabus": "0478",
    "syllabusYear": "2026-2028",
    "commandWords": [
      "Explain",
      "Trace",
      "Write"
    ],
    "examSkill": "Systems and programming",
    "formulas": []
  }
]);
