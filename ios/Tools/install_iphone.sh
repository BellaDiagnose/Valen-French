#!/bin/sh
# 取 GitHub Release 里最新的 unsigned ipa，用本机 Apple ID 签名并装到已连接的 iPhone。
#
# 用法：
#   ./ios/Tools/install_iphone.sh                # 自动选第一台 USB 设备
#   ./ios/Tools/install_iphone.sh <udid>         # 指定设备
#
# 前置：xtool auth login 已登录（免费 Apple ID 可用，证书 7 天有效，过期后重跑本脚本）。
set -eu

REPO="BellaDiagnose/Valen-French"
ASSET="ValenFrench-unsigned.ipa"
XT_BIN="${XT_BIN:-/Applications/xtool.app/Contents/Resources/bin/xtool}"
OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/build-out"
API="https://api.github.com/repos/${REPO}/releases"

[ -x "$XT_BIN" ] || { echo "找不到 xtool：$XT_BIN" >&2; exit 1; }

UDID="${1:-}"
if [ -z "$UDID" ]; then
  UDID="$("$XT_BIN" devices --usb --no-wait | head -1 | awk -F': ' '{print $2}')"
  [ -n "$UDID" ] || { echo "没有检测到 USB 连接的 iPhone（需解锁并信任本机）" >&2; exit 1; }
fi
echo "→ 设备 $UDID"

# 取最新的、带 ipa 附件的 release（tag 形如 ios-v0.1.1）
url=$(curl -s "$API" | python3 -c '
import sys, json
data = json.load(sys.stdin)
for rel in data:                       # API 已按创建时间倒序
    for a in rel.get("assets", []):
        if a["name"] == "'"$ASSET"'":
            print(a["url"]); raise SystemExit
raise SystemExit("no ipa asset found")
') || { echo "Release 里找不到 $ASSET" >&2; exit 1; }

mkdir -p "$OUT_DIR"
echo "→ 下载 $ASSET"
curl -sL -H "Accept: application/octet-stream" -o "$OUT_DIR/$ASSET" "$url"
ls -lh "$OUT_DIR/$ASSET" | awk '{print "  " $5, $9}'

echo "→ 签名并安装"
"$XT_BIN" install --udid "$UDID" "$OUT_DIR/$ASSET"
