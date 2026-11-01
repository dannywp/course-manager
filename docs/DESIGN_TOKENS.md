# Design tokens

Extracted from the Figma file (copy `04Q7EHGrcMmgsC4Q6lMeX5`). The raw reference data is in [figma/](figma/).

**Colours** (Figma variables)

| Token | Hex | Use |
|---|---|---|
| UI/TrackMan Orange | #EC691A | primary button, checkbox checked, focus border, logo |
| UI/Danger Red | #EE1B34 | danger button; proposed for error border and text |
| Grayscale/Background Black | #222222 | top nav |
| Grayscale/Text & Element | #414141 | primary text, icons |
| Grayscale/Dark Gray | #7B7B7B | secondary text (meta, explainer), nav divider, upload icon |
| Grayscale/Gray | #A0A0A0 | location text, input borders, labels, placeholders, disabled |
| Grayscale/Light Gray | #E0E0E0 | drop zone fill and border, action-bar borders |
| Grayscale/Lighter Gray | #F5F5F5 | page background, secondary button, icon button, modal dividers |
| Grayscale/Lightest Gray | #FBFBFB | menu item hover |
| Grayscale/White | #FFFFFF | cards, inputs, header, menus |

**Typography** (Inter; the Figma line heights are 1.4×)

| Token | Size / weight / line height | Use |
|---|---|---|
| Header 1 | 22 / 700 / 30.8 | page title |
| Header 2 | 15 / 600 / 21 | section titles, modal title, mobile page title |
| Body | 13 / 400 / 18.2 | body, inputs, menu items, location |
| Body Bold | 13 / 600 / 18.2 | card name, filename |
| Label | 11 / 400 / 15.4 | floating labels, card meta, drop-zone hint |
| Button | 13 / 600 / 12 | buttons |
| Trumpet | 11 / 700 / 10, uppercase, letter-spacing 0.22px (2%) | FEATURED badge, CARD PREVIEW label |
| Nav product name | 12 / 600, uppercase, letter-spacing 2.88px (24%) | "FACILITY PORTAL" |

**Spacing scale:** 1, 2, 4, 8, 12, 16, 20, 24, 32 and 40px.
- Page padding is 40px on desktop and 16px on mobile.
- The grid gap is 32px, and so is the gap between the button row and the grid.
- Card padding is 12/12/20/12, with a 12px gap between image and text. The text block has 8px horizontal padding and 4px between rows. The meta row gap is 8px.
- Form: 32px between fields. Sections have 40px or 24px vertical padding, 40px horizontal padding, and a 24px gap.
- Inputs have 12px horizontal padding. The modal has 24px padding.

**Radii:**
- 4px: buttons, menu, menu items, badge, card image, checkbox, thumbnail
- 8px: inputs, textarea, drop zone, modal
- 12px: uploaded-file row
- 16px: card

**Effects:**
- Soft shadow: `0 5px 15px rgba(0,0,0,0.10)` (TM/Soft Shadow/Down). Used on card hover and menus.
- Focus glow: `0 0 4px rgba(236,105,26,0.25)` with a 1px #EC691A border.
- Modal backdrop: `rgba(34,34,34,0.5)`, no blur. Not in Figma (ASSUMPTIONS #30).

**Component sizes:**

| Element | Size |
|---|---|
| Top nav | 48px tall; logo cell 48px with a 1×20px divider |
| Page header | 104px on desktop, 57px on mobile |
| Editor action bar | 48px, with top and bottom border #E0E0E0 |
| Buttons | 32px tall, 24px horizontal padding |
| Icon button | 32×32px, 16px icon |
| Input / select | 48px tall (312px wide in the design) |
| Textarea | 130px tall |
| Checkbox | 16px box, 8px gap to the label |
| Card | min 304, max 380px wide; min 434px tall; image aspect 280/328 |
| Badge | 20px tall, 12px star icon |
| Menu | 192px wide, 4px padding, 2px gap, 40px items |
| Modal | 444px wide; header and footer 56px; 16px button gap |
| Drop zone | 216px tall |
| File row | 64px tall, 40px thumbnail |
| Upload icon | 32px |

**Breakpoints:**
- Design frames are 1440px (desktop) and 402px (mobile).
- Derived: 720px (2 columns, 40px padding), 1056px (3 columns) and 1392px (4 columns). The editor stacks below 1024px. See DECISIONS.md D1.
