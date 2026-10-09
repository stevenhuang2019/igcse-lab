# 免费邀请版：本人和 1–2 位学员

提供同一个 HTTPS 网址，每人使用独立邀请账号登录；没有公开注册，也不以秘密网址代替登录。AI 保留并默认启用，配置有效服务端密钥后可用；没有密钥时 AI 显示未启用，其余学习功能正常。未购买托管服务，尚无线上地址。

## 无持久磁盘的配置

Render 免费 Node Web Service，无磁盘、无数据库。账号名单保存在平台私有环境变量 IGCSE_PILOT_USERS_JSON，只含加盐密码哈希；部署启动直接加载，不写临时名单文件。盐、哈希和密钥不得加入源码或网页。启动时检查名单，格式无效则不开放服务。

账号、学习记录、写作草稿和上传教材仍按账号分开保存在各自浏览器。服务重启不会清除浏览器记录，但会退出登录；不同设备不自动同步，清理浏览器数据会丢失未备份记录。建议各自使用独立浏览器档案并定期导出学习备份。

## 账号准备

管理员在本机私有目录使用 scripts/pilot_users.cjs 创建 owner、learner01、learner02。命令示例中的路径须替换为应用之外的真实私有路径：

```sh
node scripts/pilot_users.cjs add owner /私有目录/pilot/users.json
node scripts/pilot_users.cjs add learner01 /私有目录/pilot/users.json
node scripts/pilot_users.cjs add learner02 /私有目录/pilot/users.json
```

生成的 users.json 内容完整复制到 Render 的私有环境变量 IGCSE_PILOT_USERS_JSON。密码只存在本机各账号的 .invite 文件，管理员通过认可的私密渠道交给对方；不发送到 GitHub，不使用共享账号或把密码放进网址。当前没有自动发送邀请功能。

撤销时运行 disable 命令，将更新后的 users.json 复制回平台并重新部署。免费配置模式的撤销在新部署生效后完成，旧会话随服务替换失效；不能收回已经阅读或下载的资料。更换密码可在名单中更新该账号的盐和哈希，保留原 ID 以保留本机学习记录。

## Render 上线步骤

1. 登录自己的 Render 账号，连接 GitHub 仓库。选择 Node Web Service 和 Free 方案，不添加磁盘、数据库、付费实例或自定义域名。也可用根目录 render.yaml Blueprint；文件显式指定 free。
2. 使用包含本轮改动的分支／提交。构建命令为 npm ci --ignore-scripts && node scripts/build_material_assets.cjs，启动命令为 node server/private_pilot.cjs，Node 22。Blueprint 中的私有变量在平台填写，不能提交真实值。
3. 按 deploy/free-pilot.env.example 配置。Render 会自动提供 RENDER_EXTERNAL_URL；当 RENDER=true 且未设置 IGCSE_PUBLIC_ORIGIN 时直接使用该地址，无需猜测网址。自定义域名则填写精确 HTTPS origin，无路径和结尾斜杠。不要扩大 Host 校验来绕过。依据：https://render.com/docs/environment-variables 。
4. IGCSE_PILOT_STORAGE=environment；填完整邀请名单、IGCSE_PILOT_AI_ENABLED=true、IGCSE_AI_PROVIDER=deepseek、私有 DEEPSEEK_API_KEY。可选 IGCSE_AI_MODEL 对应已有供应商适配。不要把密钥填进前端，未执行任何真实 AI 付费调用。
5. 使用一个小型合成练习材料完成管理员 AI 验收，再将网址及个人账号交给学员。核实未登录不能加载课程／AI，账号记录不串用，手机上传／阅读、模拟考恢复、重启后重新登录及浏览器学习记录仍在。线上验收尚待实际账号和服务。

## 免费版限制与 AI 费用

Render 免费服务 15 分钟无访问会休眠，下次访问等待唤醒；临时文件会在重启／部署后丢失。因此本模式不依赖临时文件保存名单。官方说明：https://render.com/docs/free 。私有配置说明：https://render.com/docs/configure-environment-variables 。Blueprint 说明：https://render.com/docs/blueprint-spec 。免费政策以平台当前页面为准，不承诺永久免费或在线可用率。

AI 请求数保存在服务内存，默认每人 20、全站 60；在每个 UTC 新日和服务重启时重置。它是单实例当前运行期间的限制，不是可靠的持久每日额度，也不是金额上限。页面明确显示“本次运行可用（重启会重置）”。管理员应在供应商后台使用可接受的有限余额／可用预算控制，不依赖这里的计数控制资金。免费托管不免除供应商模型调用费用。需要严格跨重启配额时再接免费额度数据库，当前不声称已实现。

本轮只是部署候选配置；Render 账号连接、真实 HTTPS 地址、平台配置及真实 AI 验收需要在用户自己的账号中完成。没有购买任何资源。
