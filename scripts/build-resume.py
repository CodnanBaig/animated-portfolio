"""Build the downloadable, text-selectable resume from data/resume.json.

Requires Python 3 and reportlab (pip install reportlab).
Run from any directory: python scripts/build-resume.py
"""

import json
from html import escape
from pathlib import Path
from shutil import copyfile

from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "data/resume.json").read_text())
OUTPUT = ROOT / "output/pdf/Adnan_Baig_Resume.pdf"
PUBLIC = ROOT / "public/Adnan_Baig_Resume.pdf"
INK = colors.HexColor("#172331")
MUTED = colors.HexColor("#526171")
ACCENT = colors.HexColor("#243f56")
RULE = colors.HexColor("#cbd2d8")


def style(name, **kwargs):
    return ParagraphStyle(
        name,
        fontName=kwargs.pop("fontName", "Helvetica"),
        fontSize=kwargs.pop("fontSize", 9.5),
        leading=kwargs.pop("leading", 12.5),
        textColor=kwargs.pop("textColor", INK),
        **kwargs,
    )


STYLES = {
    "name": style("name", fontName="Helvetica-Bold", fontSize=28, leading=31),
    "role": style("role", fontSize=11, leading=15, textColor=ACCENT),
    "contact": style("contact", fontSize=9, leading=13, textColor=MUTED),
    "section": style("section", fontName="Helvetica-Bold", fontSize=9.2, leading=12, textColor=ACCENT),
    "body": style("body"),
    "entry": style("entry", fontSize=10, leading=13),
    "meta": style("meta", fontSize=8.6, leading=11.5, textColor=MUTED),
    "links": style("links", fontSize=8.5, leading=12, textColor=ACCENT, alignment=TA_RIGHT),
    "bullet": style("bullet", leftIndent=9, firstLineIndent=-9, spaceAfter=2),
    "skills": style("skills", fontSize=9, leading=12.5),
}


def paragraph(text, kind="body"):
    return Paragraph(text, STYLES[kind])


def links(items):
    return " &nbsp; | &nbsp; ".join(
        f'<link href="{escape(item["url"], quote=True)}" color="#243f56">{escape(item["label"])}</link>'
        for item in items
    )


def section(title):
    return [
        Spacer(1, 7),
        paragraph(title.upper(), "section"),
        Spacer(1, 3),
        HRFlowable(width="100%", thickness=0.5, color=RULE),
        Spacer(1, 6),
    ]


def row(left, right, left_width=350):
    table = Table([[left, right]], colWidths=[left_width, A4[0] - 92 - left_width])
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return table


story = [
    paragraph(escape(DATA["name"]), "name"),
    Spacer(1, 3),
    paragraph(escape(DATA["title"]), "role"),
    Spacer(1, 6),
    paragraph(f'{escape(DATA["location"])} &nbsp; | &nbsp; {escape(DATA["availability"])}', "contact"),
    paragraph(
        f'<link href="mailto:{DATA["email"]}">{DATA["email"]}</link> &nbsp; | &nbsp; {links(DATA["links"])}',
        "contact",
    ),
    Spacer(1, 10),
    HRFlowable(width="100%", thickness=0.6, color=RULE),
    Spacer(1, 8),
    paragraph(escape(DATA["summary"])),
    *section("Professional experience"),
]

job = DATA["experience"]
story.extend([
    row(
        paragraph(f'<b>{escape(job["company"])}</b> &nbsp; | &nbsp; {escape(job["role"])}', "entry"),
        paragraph(escape(job["period"]), "links"),
    ),
    Spacer(1, 4),
    *[paragraph(f'&#8226; &nbsp; {escape(item)}', "bullet") for item in job["bullets"]],
    *section("Selected projects"),
])

for index, project in enumerate(DATA["projects"]):
    block = [
        row(paragraph(f'<b>{escape(project["name"])}</b> <font size="8.6" color="#526171"> / {escape(project["descriptor"])}</font>', "entry"), paragraph(links(project["links"]), "links")),
        paragraph(escape(project["stack"]), "meta"),
        Spacer(1, 3),
        *[paragraph(f'&#8226; &nbsp; {escape(item)}', "bullet") for item in project["bullets"]],
    ]
    if index:
        story.append(Spacer(1, 5))
    story.append(KeepTogether(block))

story.extend(section("Technical skills"))
for skill in DATA["skills"]:
    story.append(paragraph(f'<b>{escape(skill["label"])}:</b> {escape(skill["value"])}', "skills"))

education = DATA["education"]
story.extend([
    *section("Education & training"),
    paragraph(f'<b>{escape(education["school"])}</b> &nbsp; | &nbsp; {escape(education["program"])}', "entry"),
    paragraph(escape(education["details"]), "meta"),
])

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
document = SimpleDocTemplate(
    str(OUTPUT), pagesize=A4,
    leftMargin=40, rightMargin=40, topMargin=30, bottomMargin=30,
    title="Adnan Baig - Full-Stack Engineer Resume",
    author=DATA["name"], subject="Professional experience, selected projects, and technical skills",
    pageCompression=1, invariant=1,
)
def reject_overflow(canvas, document):
    raise ValueError("Resume exceeds one page; edit the content or layout before publishing.")


document.build(story, onLaterPages=reject_overflow)
copyfile(OUTPUT, PUBLIC)
print(f"Created {OUTPUT}")
print(f"Published asset {PUBLIC}")

# Keep the application-specific download identical to the existing site asset.
alias = DATA.get("downloadFilename")
if alias:
    if Path(alias).name != alias or not alias.endswith(".pdf"):
        raise ValueError("downloadFilename must be a PDF basename, not a path.")
    destination = ROOT / "public" / alias
    if destination != PUBLIC:
        copyfile(OUTPUT, destination)
        print(f"Application download {destination}")
