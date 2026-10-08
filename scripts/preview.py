#!/usr/bin/env python3
"""Launch the standalone learner preview on a stable, loopback-only origin."""
import argparse
import http.server
import pathlib
import sys
import webbrowser

parser = argparse.ArgumentParser()
parser.add_argument('--no-browser', action='store_true')
args = parser.parse_args()
root = pathlib.Path(__file__).resolve().parents[1]
handler = lambda *a, **kw: http.server.SimpleHTTPRequestHandler(*a, directory=str(root), **kw)
try:
    server = http.server.ThreadingHTTPServer(('127.0.0.1', 4173), handler)
except OSError:
    print('本机预览端口 4173 正在使用。请关闭之前的预览窗口后重试。', file=sys.stderr)
    sys.exit(1)
url = 'http://127.0.0.1:4173/#page-dashboard'
print('IGCSE LAB 已启动：' + url, flush=True)
print('请保留此窗口；关闭窗口会停止本机预览。学习记录保存在此浏览器中。', flush=True)
if not args.no_browser:
    webbrowser.open(url)
try:
    server.serve_forever()
except KeyboardInterrupt:
    pass
finally:
    server.server_close()
