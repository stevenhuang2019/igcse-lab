# 我的教材与作业

七个科目均可从「我的教材与作业」或 Dashboard 的「上传与查看本科目资料」进入。先在顶部选择科目，再选择教材 / 作业并上传。

## 已可使用

- PDF、DOCX、TXT、Markdown、PNG、JPEG、WebP，每份最多 10 MB；PDF 最多 100 页，文字最多 12 万字符。长教材请按章节拆分。
- PDF 本地读取并保留页码；DOCX 提取纯文字，不提供虚构页码。图片与扫描件可预览、下载，并粘贴识别文字。公式、表格和特殊字体的读取可能不完整，请核对原文件。
- 每科独立保存、教材 / 作业筛选、下载原文件、删除单份资料、刷新恢复。
- 勾选资料实际涉及的章节，保存后进入对应课程与现有题库练习。不会自动把教材转换为已审核题库。
- 上传、阅读、章节关联及 AI 分析不增加掌握度；真实作答仍通过原学习记录流程计入。

资料保存在当前浏览器的 IndexedDB。换设备或浏览器不会自动同步，清理浏览器数据会删除资料；请保留原文件。「学习备份」仅导出学习记录，不包含这些附件。

## AI 分析服务

已提供服务端接口和结构化章节建议。普通 Python 预览与纯静态托管可以使用上述本地资料功能；AI 功能需要额外启动本机 Node.js 服务并配置服务端凭据。

1. 在项目目录之外创建私有配置文件，例如项目同级目录 `.private/igcse-ai.env`；目录权限设为 700，文件权限设为 600。不要将密钥写入网页、浏览器存储或 Git，也不要发送到聊天中。
2. DeepSeek 配置如下；将占位文字在本机替换为你自己的密钥：

   ```env
   IGCSE_AI_PROVIDER=deepseek
   DEEPSEEK_API_KEY=你的密钥
   IGCSE_AI_MODEL=deepseek-flash
   ```

   OpenAI 可改为 `IGCSE_AI_PROVIDER=openai`、`OPENAI_API_KEY=你的密钥`、`IGCSE_AI_MODEL=gpt-5-mini`。不同服务需要各自平台的 API 密钥；订阅 ChatGPT 不等于配置了 API 额度。
3. 关闭此前的 4173 预览，双击 `start-ai.command`。需要 Node.js 22 或更新版本；默认读取 `../.private/igcse-ai.env`，其他位置可通过 `IGCSE_AI_ENV_FILE` 指定。也可运行 `node --env-file=/私有配置路径 server/material_ai.cjs`。打开 `http://127.0.0.1:4173/#page-materials`。
4. 打开资料，页面显示服务商和模型。点击「发送这份资料进行 AI 分析」才会发送请求，可能产生 API 费用。DeepSeek 的 PDF / Word 使用已读取的文字；扫描 PDF 需要先补充文字或改为上传图片。图片分析使用 `deepseek-flash`；`deepseek-v4-pro` 可用于文字分析。DeepSeek 不直接接收 PDF / Word 文件输入，公式和图表未必包含在提取文字里。OpenAI 路径继续使用文件或图片输入。
5. 核对摘要、引用、页码与章节。匹配本地提取文字的引用显示「文字引用已匹配」，其余需人工核对。勾选建议后仍须点击「保存章节关联」。AI 不代替考纲核对或教师批改，不直接增加掌握度。

2026-10-09 已完成 DeepSeek `deepseek-flash` 真实 TXT 调用及浏览器端上传→分析→引用匹配→人工确认验证。PDF / Word 请求构造与扫描件拒绝路径通过自动测试；真实图片、扫描件和完整教材的模型效果尚未验收。密钥仅存本机私有文件，CI 与交付 ZIP 不包含密钥。接口成功不等于教材内容或教学效果已验收。

服务默认仅绑定本机地址，并限制同源请求、文件大小与并发。它是个人本机预览服务，公共网站启用前还需部署带账户鉴权、配额和私有附件访问的后端；不应直接对公网开放此预览服务。

官方接口参考：[DeepSeek Responses 与文件输入限制](https://api-docs.deepseek.com/api/create-response/)、[文件输入](https://developers.openai.com/api/docs/guides/file-inputs)、[结构化输出](https://developers.openai.com/api/docs/guides/structured-outputs)。

## 开发验证

`npm ci --ignore-scripts` 后运行 `node scripts/build_material_assets.cjs`、`npm test`、`npm run build:css` 和 `npm run test:browser`。GitHub 源码需要先构建读取组件；交付 ZIP 和 CI 的 learner-preview 附件已包含组件。固定版本与校验摘要保存在仓库中，构建时核对后生成本地组件。文档读取库仅在上传 PDF / DOCX 时加载，不增加首页启动下载。

依赖审计目前报告已有 Tailwind 构建依赖及 Mammoth CLI 的间接依赖告警。浏览器只使用 Mammoth 的纯文字读取包，没有调用其 CLI；不能据此声称整个依赖树无漏洞。升级构建链应单独验证兼容性。

## 资料联动每日计划

保存章节关联后，每日计划增加最多两项资料任务（优先最近上传的资料，重复章节只安排一次）。点击任务先进入章节学习；可查看来源资料，再点击「下一步：资料练习」。完成一次对应主题作答后计入当日任务完成，答错后可通过「复习资料章节错题」继续巩固。上传、AI 建议或仅阅读不会完成练习任务，也不会直接提高掌握度。取消关联或删除资料会移除相关任务，保留真实作答历史。旧资料在打开新版时会重新整理已确认关联。

资料页面会显示 AI 服务是否已配置；没有凭据时禁用发送按钮。配置完成后，可在项目目录运行 `node scripts/verify_live_material_ai.cjs --file /你的资料路径 --subject math`；DeepSeek 验证命令需加 `node --env-file=/私有配置路径`，CLI 文字验证使用 TXT / Markdown（科目值为 math / physics / chemistry / dt / business / computer_science / english）对选中的真实文件进行一次接口验证。该操作会发送文件并可能计费。报告只保存验证统计，不记录密钥或教材原文。PDF、扫描件和 Word 的引用仍须人工核对；接口响应成功不等于教材内容与教学效果已验收。

本机 DeepSeek 已配置并完成测试资料真实验证；公共部署、真实教材教学效果和设备同步仍需后续建设。
