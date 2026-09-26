import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def build_all_assets():
    orig = Image.open('reference/invite.jpg').convert('RGBA')
    w, h = orig.size

    # Patch 1: Date text (x: 42 to 245, y: 390 to 442)
    x1_min, x1_max = 42, 245
    y1_min, y1_max = 390, 442
    w1, h1 = x1_max - x1_min, y1_max - y1_min
    p1 = Image.new('RGBA', (w1, h1))
    top1 = [orig.getpixel((x1_min + x, y1_min - 4)) for x in range(w1)]
    bot1 = [orig.getpixel((x1_min + x, y1_max + 4)) for x in range(w1)]
    for y in range(h1):
        ty = y / float(h1 - 1)
        for x in range(w1):
            c_top, c_bot = top1[x], bot1[x]
            r = int(c_top[0]*(1-ty) + c_bot[0]*ty)
            g = int(c_top[1]*(1-ty) + c_bot[1]*ty)
            b = int(c_top[2]*(1-ty) + c_bot[2]*ty)
            dist = min(x, y, h1 - 1 - y, (w1 - 1 - x) // 2)
            alpha = min(255, int(255 * (dist / 8.0))) if dist < 8 else 255
            p1.putpixel((x, y), (r, g, b, alpha))
    orig.paste(p1, (x1_min, y1_min), p1)

    # Patch 2: Venue text (x: 42 to 185, y: 456 to 514)
    x2_min, x2_max = 42, 185
    y2_min, y2_max = 456, 514
    w2, h2 = x2_max - x2_min, y2_max - y2_min
    p2 = Image.new('RGBA', (w2, h2))
    top2 = [orig.getpixel((x2_min + x, y2_min - 4)) for x in range(w2)]
    bot2 = [orig.getpixel((x2_min + x, y2_max + 4)) for x in range(w2)]
    for y in range(h2):
        ty = y / float(h2 - 1)
        for x in range(w2):
            c_top, c_bot = top2[x], bot2[x]
            r = int(c_top[0]*(1-ty) + c_bot[0]*ty)
            g = int(c_top[1]*(1-ty) + c_bot[1]*ty)
            b = int(c_top[2]*(1-ty) + c_bot[2]*ty)
            dist = min(x, y, h2 - 1 - y, (w2 - 1 - x))
            alpha = min(255, int(255 * (dist / 8.0))) if dist < 8 else 255
            p2.putpixel((x, y), (r, g, b, alpha))
    orig.paste(p2, (x2_min, y2_min), p2)

    draw = ImageDraw.Draw(orig)

    text_color = (52, 26, 23, 255)
    sub_color = (92, 52, 46, 235)
    icon_color = (68, 34, 30, 255)

    font_date = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 14)
    font_sub = ImageFont.truetype('C:/Windows/Fonts/georgia.ttf', 11)
    font_small = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 9)
    font_venue = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 11)

    # 1. Calendar Icon at (x=48, y=405)
    ix = 48
    iy = 405
    draw.rounded_rectangle([ix, iy+3, ix+20, iy+21], radius=3, outline=icon_color, width=2)
    draw.rectangle([ix, iy+3, ix+20, iy+8], fill=icon_color)
    draw.rectangle([ix+3, iy, ix+5, iy+5], fill=icon_color)
    draw.rectangle([ix+15, iy, ix+17, iy+5], fill=icon_color)
    draw.text((ix+4, iy+9), "24", fill=text_color, font=font_small)

    # Date Text
    draw.text((ix + 28, iy + 0), "24 · 10 · 2026", fill=text_color, font=font_date)
    draw.text((ix + 28, iy + 16), "Saturday • Mark Your Calendar", fill=sub_color, font=font_sub)

    # 2. Location Pin Icon at (x=48, y=464)
    ly = 464
    draw.ellipse([ix+2, ly, ix+18, ly+15], outline=icon_color, width=2)
    draw.ellipse([ix+7, ly+4, ix+13, ly+10], fill=icon_color)
    draw.polygon([(ix+4, ly+11), (ix+16, ly+11), (ix+10, ly+23)], fill=icon_color)

    # Venue Text
    draw.text((ix + 28, ly - 2), "M.R.P Thirumana Mandapam", fill=text_color, font=font_venue)
    draw.text((ix + 28, ly + 14), "Vadaputhur, Tamil Nadu", fill=sub_color, font=font_sub)

    # Save high-res invite card
    os.makedirs('assets/images', exist_ok=True)
    out_card = 'assets/images/invite-card-2026.jpg'
    orig.convert('RGB').save(out_card, quality=97)
    print(f"Invite card saved to {out_card}")

    # Generate Couple Hero Portrait (cropped and framed)
    couple = orig.crop((120, 210, 630, 1260))
    couple.convert('RGB').save('assets/images/couple-portrait.jpg', quality=95)

    # Generate Groom & Bride individual crops
    groom = orig.crop((170, 220, 420, 580))
    groom.convert('RGB').save('assets/images/groom.jpg', quality=95)

    bride = orig.crop((390, 310, 600, 660))
    bride.convert('RGB').save('assets/images/bride.jpg', quality=95)

    # 3. Create royal Wax Seal PNG with Couple Monogram "G & B" and gold foil detailing
    seal_size = 240
    seal = Image.new('RGBA', (seal_size, seal_size), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(seal)
    center = seal_size // 2
    radius = 100
    points = []
    num_points = 72
    for i in range(num_points):
        angle = i * (2 * math.pi / num_points)
        wobble = 4.0 * math.sin(i * 1.8) + 2.5 * math.cos(i * 3.5)
        r = radius + wobble
        points.append((center + r * math.cos(angle), center + r * math.sin(angle)))

    sdraw.polygon(points, fill=(155, 30, 30, 255))
    sdraw.ellipse([center-85, center-85, center+85, center+85], fill=(175, 38, 38, 255), outline=(212, 175, 55, 240), width=3)
    sdraw.ellipse([center-78, center-78, center+78, center+78], outline=(140, 25, 25, 200), width=1)

    font_seal = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 38)
    font_seal_sub = ImageFont.truetype('C:/Windows/Fonts/georgia.ttf', 14)
    sdraw.text((center - 55, center - 35), "G & B", fill=(245, 215, 120, 255), font=font_seal)
    sdraw.text((center - 45, center + 15), "24 · 10 · 2026", fill=(230, 195, 100, 240), font=font_seal_sub)

    highlight = Image.new('RGBA', (seal_size, seal_size), (0, 0, 0, 0))
    hdraw = ImageDraw.Draw(highlight)
    hdraw.ellipse([center-60, center-75, center+40, center-30], fill=(255, 255, 255, 45))
    seal = Image.alpha_composite(seal, highlight)
    seal.save('assets/images/wax-seal.png', 'PNG')
    print("Wax seal saved to assets/images/wax-seal.png")

if __name__ == '__main__':
    build_all_assets()
