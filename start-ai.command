#!/bin/sh
cd "$(dirname "$0")" || exit 1
AI_ENV_FILE="${IGCSE_AI_ENV_FILE:-../.private/igcse-ai.env}"
if ! command -v node >/dev/null 2>&1; then
  echo '请安装 Node.js 22 或更新版本后再启动 AI 服务。'
  exit 1
fi
if [ ! -f "$AI_ENV_FILE" ]; then
  echo '尚未找到私有 AI 配置。请按 MATERIALS_GUIDE.md 配置仓库之外的环境文件。'
  exit 1
fi
exec node --env-file="$AI_ENV_FILE" server/material_ai.cjs
