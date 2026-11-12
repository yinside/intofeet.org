# InToFeet.org

A fully static, early-2000s-style unit conversion site focused on the phrase
**"in to feet."** It also covers adjacent metric/imperial conversions such as
centimeters to feet and feet to meters. The calculators are modern and accurate;
the design is a deliberate throwback to 2001 — Times New Roman, navy headers,
beveled gray buttons, and square-cornered tables.

## What is included

- **Home page** with a working inches-to-feet calculator, quick table,
  interactive dual-scale ruler, formula, common conversions, FAQ, and internal
  links.
- **Dedicated SEO pages**
  - `/inches-to-feet/`
  - `/feet-to-inches/`
  - `/1-inch-to-feet/`
  - `/12-inches-to-feet/`
  - `/24-inches-to-feet/`
  - `/36-inches-to-feet/`
  - `/60-inches-to-feet/`
  - `/72-inches-to-feet/`
  - `/cm-to-feet/`
  - `/feet-to-cm/`
  - `/feet-to-meters/`
  - `/meters-to-feet/`
- **Support pages** for About, Contact, Privacy Policy, Disclaimer, and a
  custom 404.
- Static `robots.txt`, XML sitemap, Open Graph image, favicon, and Apple touch
  icon.
- JSON-LD for `WebSite`, `WebApplication`, `FAQPage`, and `BreadcrumbList`
  where each is backed by visible page content.

## Calculator behavior

- Default value: `12` on the main inches-to-feet calculator.
- Supports decimals, negatives, zero, extra-large values, and keyboard Enter.
- Home-page ruler compares inches and centimeters and updates its readout as the
  marker is dragged. It is explicitly labeled as an illustrative screen scale,
  not a calibrated physical measuring tool.
- Metric/imperial pages convert cm ↔ ft and ft ↔ m using exact factors
  (1 ft = 30.48 cm = 0.3048 m).
- Shows decimal, exact fractional (or clearly marked approximate), and
  feet-and-inches results.
- Reset, Swap Units, and Copy Result controls.
- Input validation with plain-English error messages.
- Calculations run entirely in the browser. There is no API or server
  dependency.
- Values are capped at one trillion for display accuracy; results are rounded
  to six decimal places where needed.
- "Swap Units" keeps the typed number and switches the direction. "Reset"
  returns to the page's original direction and value.

## Tech stack

- Next.js 15 (App Router) with `output: "export"`
- React 19
- TypeScript
- Hand-written CSS; no UI framework and no external fonts
- No analytics, cookies, or third-party scripts

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Production build

```bash
pnpm build
```

The static site is written to `out/`. Preview it with:

```bash
pnpm preview
```

## Deploying to Vercel

Import the repository in Vercel. The default Next.js build command
(`pnpm build`) is all that is needed. The app is exported as static files, so no
environment variables or server runtime are required.

The canonical domain is set in `lib/site.ts` (`https://www.intofeet.org`). If the
site is deployed to a different domain, update `SITE_URL`, `public/robots.txt`,
and `public/sitemap.xml`, and regenerate `public/og-image.png` if the domain text
appears in it.

## Structure

```text
app/                 Routes, layout, global CSS
  [slug]/            Static conversion pages (1, 12, 24, 36, 60, 72 inches)
  inches-to-feet/    Hub page
  feet-to-inches/    Reverse-direction hub
  about/ contact/ privacy/ disclaimer/
components/          Calculators, tables, FAQ, header, footer, JSON-LD
lib/                 Conversion math, metric conversions, content, metadata,
                     schema helpers
public/              Sitemap, robots.txt, OG image, icons, humans.txt
scripts/             Asset generation (OG image + icons)
```

## Accuracy notes

- 1 foot = 12 inches, exactly.
- 1 inch = 2.54 cm, exactly.
- 1 foot = 0.3048 m, exactly.
- 1 meter = 1 ÷ 0.3048 ≈ 3.28084 ft.
- 1 centimeter = 0.0328084 ft.
- Fractional feet are found by exact small-denominator reduction. If no neat
  fraction exists, a close approximation is shown with `≈`, or omitted when no
  approximation is within 5%.
- Feet-and-inches readings round to the nearest 1/16 inch and are marked with
  `≈` when a rounding step occurred.

The calculator is a convenience tool. See `/disclaimer/` for the limits of its
use.
