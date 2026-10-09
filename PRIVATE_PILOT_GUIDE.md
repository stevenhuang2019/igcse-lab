# 邀请制私人测试版：部署与验收

代码仓库仍使用 GitHub；私人服务需要支持 Node.js 22、HTTPS 与持久磁盘的托管环境。本轮提供邀请登录与部署候选配置，尚无实际线上地址。GitHub Pages 是静态托管；组织的私有 Pages 需要 GitHub Enterprise Cloud，不适合作为这个个人仓库的普通服务端 AI 入口。依据：https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages 和 https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site 。

## 已实现的访问规则

管理员维护最多 20 个邀请账号；未登录只能访问登录页和健康检查，课程页面、脚本、阅读器和 AI 接口均检查登录。没有公开注册，陌生人知道网址也不能直接进入服务。密码采用独立盐的 scrypt 哈希，登录 Cookie 为 HttpOnly、Secure、SameSite=Strict，八小时过期；服务器重启后需重新登录。

停用名单中的账号后，已存在的会话在下一次请求即失效。页面每分钟检查会话。撤销不回收用户已经看到或下载的内容。仓库是否公开属于 GitHub 的独立设置，本轮没有改变仓库权限。

每个账号的学习状态、恢复快照、写作草稿和 IndexedDB 教材使用独立的浏览器存储前缀。旧本机版本记录不会自动移入新账户，可通过学习 JSON 恢复；附件仍须保留原文件重新上传。共享浏览器中的本机资料不是加密保险箱，持有本机权限的人可查看浏览器数据；建议使用各自浏览器档案。没有新增云端教材存储或跨设备同步。

## 管理邀请名单

在管理员自己的终端运行；不要把真实名单、邀请文件或密钥加入 Git。文件路径必须是应用目录之外的绝对私有路径。下面是占位示例，替换为实际路径：

```sh
node scripts/pilot_users.cjs add learner01 /私有目录/pilot/users.json
node scripts/pilot_users.cjs init-quota /私有目录/pilot/usage.json
```

第一个命令生成账号和随机邀请密码，密码只写到同目录的 learner01.invite 文件（600 权限），不会打印到终端。管理员通过自己认可的私密渠道交给用户。没有发邮件或短信的自动流程。名单只保存哈希。第二个命令只初始化一次持久配额文件，已有文件不会覆盖。

撤销账号：

```sh
node scripts/pilot_users.cjs disable learner01 /私有目录/pilot/users.json
```

将名单与配额文件放到服务器持久磁盘，例如 /data/pilot；目录设为 700，文件为 600，运行服务的用户需具备读写权限。名单和配额必须在应用静态目录之外，缺失或损坏时服务拒绝启动；禁止放入网页资源目录。备份私有配置和配额；不要在每日部署时重新初始化额度。当前仅支持单个实例，一个持久磁盘，不适用多个实例共享该 JSON 文件。

## 服务配置与 AI 限额

参考 deploy/pilot.env.example，在托管平台的私有环境设置中配置：

- IGCSE_PUBLIC_ORIGIN：最终完整 HTTPS 地址，仅 origin，不带路径或结尾斜杠。
- IGCSE_PILOT_USERS_FILE／IGCSE_PILOT_USAGE_FILE：私有持久文件。
- IGCSE_PILOT_AI_ENABLED：默认 false，管理员配置供应商密钥后才改为 true。
- IGCSE_PILOT_USER_DAILY_LIMIT：默认每个账号每日 20 次，最大 100。
- IGCSE_PILOT_GLOBAL_DAILY_LIMIT：默认全站每日 100 次，最大 1000。

额度按 UTC 日期重置，接受的 AI 请求先占用一次额度；上游失败、忙碌或输入无效仍可能占用，防止反复请求绕过限制。计数在调用前持久保存，重启不会清零。这里控制请求次数，**不是精确金额上限**；供应商后台仍需配置预算或保留有限充值额度。旧有输入大小和上游超时限制继续使用。

AI 配置使用已有 IGCSE_AI_PROVIDER、对应平台 API_KEY 和 IGCSE_AI_MODEL，全部放在服务端私有环境中。关闭 AI 时课程、上传、手动章节关联和练习仍可用。状态栏显示当前账号可用次数。没有新付费调用；自动测试全部使用模拟 AI。

## 启动与部署

Node.js 22 环境：先安装锁定依赖并构建本地阅读器，然后用私有环境启动：

```sh
npm ci --ignore-scripts
node scripts/build_material_assets.cjs
node --env-file=/私有目录/pilot/pilot.env server/private_pilot.cjs
```

或采用 Dockerfile 构建镜像；镜像不包含私有账号或密钥。运行用户为 node（UID 1000），挂载的私有目录必须授予该用户权限。当前本机没有 Docker，容器构建仍需在最终托管环境验证；Node 服务及浏览器流程独立验收。

HTTPS 必须由可信托管入口／反向代理提供，将正确的外部 Host 传给服务。后端端口只对托管入口开放，不以裸 HTTP 对外发布。不要信任客户端传入的 X-Forwarded-Host 来绕过地址检查。/healthz 健康检查也需使用配置的 Host。首次部署先关闭 AI，只邀请管理员与少量测试用户；账号不授予 GitHub 仓库权限。

## 最终线上验收与回滚

在最终 HTTPS 地址核实：未登录访问课程和 AI 被阻止；受邀登录、密码错误及尝试次数限制；撤销账号与八小时过期；两账号的教材／草稿／记录不串用；手机上传与阅读、章节关联、模拟考计时及恢复；学习 JSON 导出、恢复与撤销；AI 关闭、限额与错误提示；部署重启后额度仍保留。

真实线上 AI 验证使用一份管理员确认的合成材料，确认费用范围后再执行；本轮没有发送真实教材或学生资料。核对 TLS、持久磁盘、秘密配置与访问日志不记录请求正文。完整验收通过后记录部署提交、地址和结果。回滚固定版本时保留用户文件与额度；紧急停用可将 IGCSE_PILOT_AI_ENABLED=false，或停用用户。不得以回滚为由清空学习资料或私有配额。
