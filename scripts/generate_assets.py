#!/usr/bin/env python3
"""Generate InToFeet.org's social image and favicons (no external deps)."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

FONT_DIR = Path("/System/Library/Fonts/Supplemental")
TIMES_BOLD = str(FONT_DIR / "Times New Roman Bold.ttf")
TIMES = str(FONT_DIR / "Times New Roman.ttf")
ARIAL = str(FONT_DIR / "Arial.ttf")
ARIAL_BOLD = str(FONT_DIR / "Arial Bold.ttf")
COURIER_BOLD = str(FONT_DIR / "Courier New Bold.ttf")

PAGE = "#d4d0c8"
WHITE = "#ffffff"
NAVY = "#000080"
NAVY_DARK = "#000040"
INK = "#000000"
MUTED = "#333333"
HIGHLIGHT = "#ffffcc"
BEVEL_LIGHT = "#ffffff"
BEVEL_DARK = "#404040"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def centered_text(draw: ImageDraw.ImageDraw, box, text, fnt, fill):
    x0, y0, x1, y1 = box
    bbox = draw.textbbox((0, 0), text, font=fnt)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    draw.text(
        (x0 + (x1 - x0 - w) / 2, y0 + (y1 - y0 - h) / 2 - bbox[1]),
        text,
        font=fnt,
        fill=fill,
    )


def bevel(draw: ImageDraw.ImageDraw, box, fill, width=3, inset=False):
    x0, y0, x1, y1 = box
    draw.rectangle(box, fill=fill)
    light, dark = (BEVEL_DARK, BEVEL_LIGHT) if inset else (BEVEL_LIGHT, BEVEL_DARK)
    for i in range(width):
        draw.line([(x0 + i, y0 + i), (x1 - i, y0 + i)], fill=light)
        draw.line([(x0 + i, y0 + i), (x0 + i, y1 - i)], fill=light)
        draw.line([(x1 - i, y0 + i), (x1 - i, y1 - i)], fill=dark)
        draw.line([(x0 + i, y1 - i), (x1 - i, y1 - i)], fill=dark)


def build_og() -> None:
    image = Image.new("RGB", (1200, 630), PAGE)
    draw = ImageDraw.Draw(image)

    # Paper frame with an old-fashioned drop shadow.
    draw.rectangle((48, 40, 1148, 598), fill="#a7a39b")
    draw.rectangle((38, 30, 1138, 586), fill=WHITE, outline="#7f7f7f", width=2)

    # Header
    draw.rectangle((40, 32, 1136, 210), fill=NAVY)
    draw.rectangle((40, 32, 1136, 54), fill=NAVY_DARK)
    draw.line([(40, 54), (1136, 54)], fill="#808080")
    draw.text((60, 36), "intofeet.org", font=font(ARIAL, 13), fill="#dcdcff")
    right = "FREE ONLINE LENGTH CONVERSION"
    f_small = font(ARIAL_BOLD, 13)
    w = draw.textlength(right, font=f_small)
    draw.text((1116 - w, 36), right, font=f_small, fill="#ffffcc")

    draw.text((70, 76), "IN TO FEET CONVERTER", font=font(TIMES_BOLD, 64), fill=WHITE)
    draw.text(
        (73, 157),
        "Free Online Length Conversion Calculator",
        font=font(ARIAL, 22),
        fill="#d6d6ff",
    )

    # Navigation strip
    draw.rectangle((40, 210, 1136, 250), fill="#c0c0c0")
    draw.line([(40, 210), (1136, 210)], fill=WHITE, width=2)
    draw.line([(40, 249), (1136, 249)], fill="#808080")
    nav = "Home   |   Inches to Feet   |   Feet to Inches   |   About"
    draw.text((70, 219), nav, font=font(ARIAL_BOLD, 16), fill=NAVY)

    # Left feature
    draw.text(
        (70, 285),
        "THE SHORT ANSWER",
        font=font(ARIAL_BOLD, 15),
        fill=NAVY,
    )
    draw.text((68, 306), "12 inches = 1 foot", font=font(TIMES_BOLD, 57), fill=NAVY)
    draw.text(
        (71, 380),
        "Decimal 1 ft   •   Fraction 1 ft   •   Exactly 12 in",
        font=font(ARIAL, 19),
        fill=MUTED,
    )
    bevel(draw, (70, 423, 665, 508), HIGHLIGHT, 2)
    draw.rectangle((72, 425, 663, 506), outline="#555555", width=1)
    centered_text(
        draw,
        (70, 423, 665, 508),
        "Feet = Inches ÷ 12",
        font(COURIER_BOLD, 29),
        INK,
    )

    # Right calculator mock
    bevel(draw, (710, 278, 1106, 525), PAGE, 3)
    draw.rectangle((713, 281, 1103, 311), fill=NAVY)
    draw.text(
        (722, 286),
        "INCHES TO FEET CALCULATOR",
        font=font(ARIAL_BOLD, 13),
        fill=WHITE,
    )
    draw.text((726, 330), "Enter Inches:", font=font(ARIAL_BOLD, 16), fill=INK)
    bevel(draw, (726, 354, 1025, 397), WHITE, 3, inset=True)
    draw.text((735, 358), "12", font=font(ARIAL_BOLD, 25), fill=INK)
    bevel(draw, (1031, 354, 1088, 397), "#c0c0c0", 2)
    centered_text(draw, (1031, 354, 1088, 397), "in", font(ARIAL_BOLD, 15), INK)

    for index, label in enumerate(("Convert", "Reset", "Swap Units")):
        bx = 726 + index * 105
        width = 96 if label != "Swap Units" else 110
        bevel(draw, (bx, 408, bx + width, 440), "#c0c0c0", 2)
        centered_text(draw, (bx, 408, bx + width, 440), label, font(ARIAL, 13), INK)

    bevel(draw, (726, 454, 1088, 509), WHITE, 3, inset=True)
    draw.text((734, 459), "RESULT", font=font(ARIAL_BOLD, 9), fill="#555555")
    draw.text((734, 474), "12 inches = 1 foot", font=font(TIMES_BOLD, 23), fill=NAVY)

    # Footer
    draw.line([(70, 543), (1106, 543)], fill="#999999")
    draw.text(
        (70, 552),
        "Simple tools for everyday measurements.",
        font=font(TIMES, 18),
        fill=NAVY,
    )
    footer = "No sign-up  •  Works in your browser  •  intofeet.org"
    f_footer = font(ARIAL, 13)
    fw = draw.textlength(footer, font=f_footer)
    draw.text((1106 - fw, 556), footer, font=f_footer, fill="#444444")

    image.save(PUBLIC / "og-image.png", optimize=True)
    print("wrote", PUBLIC / "og-image.png")


def build_icons() -> None:
    size = 512
    icon = Image.new("RGB", (size, size), PAGE)
    draw = ImageDraw.Draw(icon)
    draw.rectangle((0, 0, size - 1, size - 1), fill=PAGE)
    bevel(draw, (14, 14, size - 14, size - 14), PAGE, 12)
    draw.rectangle((44, 44, size - 44, size - 44), fill=WHITE, outline="#7f7f7f", width=4)
    draw.rectangle((44, 44, size - 44, 120), fill=NAVY)
    draw.text(
        (68, 58),
        "IN / FT",
        font=font(ARIAL_BOLD, 40),
        fill=WHITE,
    )
    draw.text(
        (60, 148),
        "ft",
        font=font(TIMES_BOLD, 240),
        fill=NAVY,
    )
    draw.text(
        (66, 400),
        "12 inches = 1 foot",
        font=font(ARIAL_BOLD, 28),
        fill=INK,
    )

    icon.save(PUBLIC / "apple-touch-icon.png", optimize=True)
    icon.resize((192, 192), Image.Resampling.LANCZOS).save(
        PUBLIC / "icon-192.png", optimize=True
    )

    # The 32px favicon needs to stay legible, so it uses a simpler mark.
    favicon = Image.new("RGB", (512, 512), PAGE)
    favicon_draw = ImageDraw.Draw(favicon)
    bevel(favicon_draw, (0, 0, 511, 511), PAGE, 10)
    favicon_draw.rectangle((36, 36, 475, 475), fill=NAVY, outline=WHITE, width=5)
    mark = "ft"
    mark_font = font(TIMES_BOLD, 300)
    bbox = favicon_draw.textbbox((0, 0), mark, font=mark_font)
    mark_w = bbox[2] - bbox[0]
    mark_h = bbox[3] - bbox[1]
    favicon_draw.text(
        ((512 - mark_w) / 2 - bbox[0], (512 - mark_h) / 2 - bbox[1] - 12),
        mark,
        font=mark_font,
        fill=WHITE,
    )
    favicon_draw.line([(84, 404), (428, 404)], fill=WHITE, width=5)
    favicon.resize((32, 32), Image.Resampling.LANCZOS).save(
        PUBLIC / "favicon.png", optimize=True
    )
    favicon.resize((48, 48), Image.Resampling.LANCZOS).save(
        PUBLIC / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)]
    )
    print("wrote icons")


if __name__ == "__main__":
    PUBLIC.mkdir(parents=True, exist_ok=True)
    build_og()
    build_icons()
