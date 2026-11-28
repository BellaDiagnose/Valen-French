#!/usr/bin/env python3
"""
生成 BELLA 助手 App 图标（1024×1024，无 alpha）

    python3 ios/Tools/make_appicon.py            # 写入 asset catalog
    python3 ios/Tools/make_appicon.py --preview  # 额外输出圆角预览图

设计：爱尔兰绿渐变底 + 白色三叶草（shamrock）+ BELLA 字标。
全部由代码矢量式绘制（4× 超采样后缩放），不依赖任何外部素材；
三叶草、字标、国旗色都由参数控制，改配色只需改常量。

依赖：Pillow、numpy；字体用系统 Avenir Next（macOS 自带）。
"""
import argparse
import math
import os
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFont

# ---------- 品牌常量 ----------
GREEN_TOP = (34, 172, 112)      # 爱尔兰国旗绿 #169B62 提亮
GREEN_BOTTOM = (5, 58, 40)      # 深绿
WHITE = (255, 255, 255)
FONT_PATH = '/System/Library/Fonts/Avenir Next.ttc'
FONT_HEAVY = 8                  # Avenir Next Heavy

S = 3072                        # 超采样画布
OUT = 1024

# 三叶草几何（相对画布，已调到最像真实 shamrock 的比例）
SHAMROCK = dict(leaf_len=0.262, width_ratio=0.95, gap=0.012,
                stem_w=0.105, stem_reach=1.05)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ICONSET = os.path.join(ROOT, 'ValenFrench/Assets.xcassets/AppIcon.appiconset')


# ---------- 基础绘制 ----------
def diag_gradient(size, c1, c2, angle=122):
    yy, xx = np.mgrid[0:size, 0:size].astype(np.float32)
    a = np.deg2rad(angle)
    p = xx * np.cos(a) + yy * np.sin(a)
    p = (p - p.min()) / (p.max() - p.min())
    p = p[..., None]
    arr = np.array(c1, np.float32) * (1 - p) + np.array(c2, np.float32) * p
    return Image.fromarray(arr.astype(np.uint8), 'RGB')


def glow(base, center, radius, color, peak):
    """径向柔光叠加（模拟左上角受光）"""
    size = base.size[0]
    yy, xx = np.mgrid[0:size, 0:size].astype(np.float32)
    d = np.sqrt((xx - center[0]) ** 2 + (yy - center[1]) ** 2) / radius
    a = np.clip(1 - d, 0, 1) ** 2 * peak
    layer = Image.new('RGB', base.size, color)
    base.paste(layer, (0, 0), Image.fromarray((a * 255).astype(np.uint8), 'L'))
    return base


# ---------- 三叶草 ----------
def _heart(n=200):
    """心形参数方程 → 归一化：叶尖 (0,0)，叶片沿 +y，高度 1、半宽 1"""
    pts = []
    for i in range(n):
        t = 2 * math.pi * i / n
        x = 16 * math.sin(t) ** 3
        y = 13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t)
        pts.append((x, y))
    ys = [p[1] for p in pts]
    xs = [p[0] for p in pts]
    ymin, ymax = min(ys), max(ys)
    h = ymax - ymin
    half_w = max(abs(min(xs)), abs(max(xs))) / h
    # 叶尖在 y=ymin，翻转 ny 使叶片沿 +y 生长
    return [((x / h) / half_w, (y - ymin) / h) for x, y in pts]


HEART = _heart()


def _leaf(draw, cx, cy, length, angle_deg, width_ratio):
    a = math.radians(angle_deg)
    ca, sa = math.cos(a), math.sin(a)
    half_w = length * width_ratio / 2
    poly = []
    for nx, ny in HEART:
        lx, ly = nx * half_w, ny * length
        poly.append((cx + lx * ca - ly * sa, cy + lx * sa + ly * ca))
    draw.polygon(poly, fill=255)


def shamrock_sprite(target_h, ss=4, **kw):
    """返回按内容裁切、高度恰为 target_h 的 (rgb, alpha)"""
    kw = {**SHAMROCK, **kw}
    W = int(target_h * ss)
    img = Image.new('L', (W, W), 0)
    d = ImageDraw.Draw(img)
    cx, cy = W / 2, W * 0.455
    L = W * kw['leaf_len']

    # 三片叶：上、左下、右下（120° 均分），叶尖汇于中心
    for ang in (-90, 30, 150):
        a = math.radians(ang)
        ox = cx + kw['gap'] * W * math.cos(a)
        oy = cy + kw['gap'] * W * math.sin(a)
        _leaf(d, ox, oy, L, ang - 90, kw['width_ratio'])

    # 茎：锥形收细，向下略弯
    if kw['stem_w'] > 0:
        w0 = L * kw['stem_w']
        y0, y1 = cy - L * 0.04, cy + L * kw['stem_reach']
        left, right = [], []
        steps = 28
        for i in range(steps + 1):
            t = i / steps
            y = y0 + (y1 - y0) * t
            x = cx + L * 0.035 * math.sin(t * math.pi)
            w = w0 * (1 - t * 0.42)
            left.append((x - w / 2, y))
            right.append((x + w / 2, y))
        d.polygon(left + right[::-1], fill=255)

    img = img.resize((target_h, target_h), Image.LANCZOS)
    bbox = img.getbbox()
    img = img.crop(bbox)
    pad = max(1, int(target_h * 0.01))
    padded = Image.new('L', (img.size[0] + pad * 2, img.size[1] + pad * 2), 0)
    padded.paste(img, (pad, pad))
    return Image.new('RGB', padded.size, WHITE), padded


# ---------- 字标 ----------
def _measure(draw, text, font, tracking):
    ws = []
    for ch in text:
        bb = draw.textbbox((0, 0), ch, font=font)
        ws.append(bb[2] - bb[0])
    return sum(ws) + tracking * (len(text) - 1), ws


def fit_font(text, index, max_w, tracking_ratio=0.030):
    probe = ImageDraw.Draw(Image.new('L', (8, 8)))
    lo, hi = 80, 1600
    while lo < hi:
        mid = (lo + hi + 1) // 2
        f = ImageFont.truetype(FONT_PATH, mid, index=index)
        w, _ = _measure(probe, text, f, int(mid * tracking_ratio))
        if w <= max_w:
            lo = mid
        else:
            hi = mid - 1
    return ImageFont.truetype(FONT_PATH, lo, index=index)


def cap_height(font):
    d = ImageDraw.Draw(Image.new('L', (8, 8)))
    bb = d.textbbox((0, 0), 'H', font=font)
    return bb[3] - bb[1]


def draw_text_centered(canvas, text, font, color, tracking, cx, cap_center_y):
    """按 cap height 的视觉中心定位（而不是基线），保证光学居中"""
    d = ImageDraw.Draw(canvas)
    total, _ = _measure(d, text, font, tracking)
    bb = d.textbbox((0, 0), 'H', font=font)
    x = cx - total / 2
    y = cap_center_y - (bb[3] - bb[1]) / 2 - bb[1]
    for ch in text:
        d.text((x, y), ch, font=font, fill=color)
        b = d.textbbox((0, 0), ch, font=font)
        x += (b[2] - b[0]) + tracking
    return canvas


# ---------- 合成 ----------
def build(content_scale=1.0):
    """content_scale < 1 时缩小主体图形，用于 maskable 图标的安全区"""
    base = diag_gradient(S, GREEN_TOP, GREEN_BOTTOM)
    base = glow(base, (S * 0.28, S * 0.16), S * 0.80, WHITE, 0.20)
    base = glow(base, (S * 0.88, S * 0.95), S * 0.55, (2, 30, 22), 0.26)

    sm_h = int(S * 0.320 * content_scale)
    sm_rgb, sm_a = shamrock_sprite(sm_h)

    f = fit_font('BELLA', FONT_HEAVY, S * 0.670 * content_scale)
    h = cap_height(f)
    gap = S * 0.052 * content_scale

    # 三叶草 + 字标作为一个整体垂直居中
    group = sm_h + gap + h
    top = (S - group) / 2

    base.paste(sm_rgb, (int(S / 2 - sm_a.size[0] / 2), int(top + (sm_h - sm_a.size[1]) / 2)), sm_a)
    draw_text_centered(base, 'BELLA', f, WHITE, int(f.size * 0.030), S / 2, top + sm_h + gap + h / 2)
    return base.resize((OUT, OUT), Image.LANCZOS)


def rounded_preview(icon, radius=232, bg=(236, 238, 245)):
    mask = Image.new('L', icon.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, icon.size[0] - 1, icon.size[1] - 1],
                                          radius=radius, fill=255)
    out = Image.new('RGB', icon.size, bg)
    out.paste(icon, (0, 0), mask)
    return out


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--preview', action='store_true', help='额外输出圆角预览图')
    args = parser.parse_args()

    icon = build()
    if icon.mode != 'RGB':
        icon = icon.convert('RGB')

    os.makedirs(ICONSET, exist_ok=True)
    target = os.path.join(ICONSET, 'AppIcon-1024.png')
    icon.save(target, format='PNG', optimize=True)

    if args.preview:
        p = os.path.join(ROOT, 'Design/appicon-preview.png')
        os.makedirs(os.path.dirname(p), exist_ok=True)
        rounded_preview(icon).save(p)
        print(f'preview → {p}')

    print(f'图标 → {target} ({icon.size[0]}×{icon.size[1]}, {os.path.getsize(target) // 1024}KB)')


if __name__ == '__main__':
    sys.exit(main())
