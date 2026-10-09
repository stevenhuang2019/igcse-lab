#!/bin/zsh
cd -- "$(dirname -- "$0")"
if [[ ! -f vendor/pdf.mjs || ! -f vendor/pdf.worker.mjs || ! -f vendor/mammoth.browser.min.js ]]; then
  print '源码版请先运行 npm ci --ignore-scripts 和 node scripts/build_material_assets.cjs，或使用已打包的 learner-preview。'
  exit 1
fi
exec python3 scripts/preview.py
