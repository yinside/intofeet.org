import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import ConversionTable from "@/components/ConversionTable";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import MetricConversionsBox from "@/components/MetricConversionsBox";
import RelatedLinks from "@/components/RelatedLinks";
import Ruler from "@/components/Ruler";
import { COMMON_CONVERSIONS, CONVERSION_PAGES, HOME_FAQS } from "@/lib/content";
import { convert } from "@/lib/conversion";
import { buildPageMetadata } from "@/lib/metadata";
import { faqPageSchema, webApplicationSchema } from "@/lib/schema";
import { LAST_UPDATED } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "In to Feet Converter — Inches to Feet Calculator",
  description:
    "Convert inches to feet instantly with a free online inches to feet calculator. Get decimal and fractional answers, a quick conversion table, and the formula.",
  path: "/",
});

const QUICK_VALUES = [1, 6, 12, 18, 24, 36, 48, 60, 72, 120];

const relatedLinks = [
  {
    href: "/inches-to-feet/",
    label: "Inches to Feet Converter",
    description: "the full guide, chart, and calculator.",
  },
  {
    href: "/feet-to-inches/",
    label: "Feet to Inches Converter",
    description: "convert the other way around.",
  },
  ...CONVERSION_PAGES.map((page) => ({
    href: `/${page.slug}/`,
    label: `${page.inches} inches to feet`,
    description: `${page.inches} in = ${convert(page.inches, "in-to-ft").outputText} ft.`,
  })),
];

export default function HomePage() {
  return (
    <>
      <h1>Inches to Feet Converter</h1>
      <p className="page-deck">
        Convert inches to feet quickly and easily with our free online inches to feet
        calculator. Whether you searched for &ldquo;in to feet&rdquo; or &ldquo;inch to
        feet,&rdquo; type a value, press Convert, and get a precise answer without a page
        reload.
      </p>
      <div className="page-meta">
        <span>Free &bull; No registration &bull; Works in your browser</span>
        <span>Page updated {LAST_UPDATED}</span>
      </div>

      <div className="notice">
        <span className="tag-new">FREE</span>
        <strong>No pop-ups, no account, no waiting.</strong> The calculator handles
        decimals, negative numbers, zero, and large values. Decimal and fractional
        results are shown together.
      </div>

      <Calculator initialValue={12} prefillFromQuery />

      <section className="ruler-section" aria-labelledby="ruler-heading">
        <h2 id="ruler-heading">On-Screen Ruler</h2>
        <Ruler />
      </section>

      <h2>Quick Conversion Table</h2>
      <p className="section-intro">
        These are the inch-to-foot values people ask for most often. Each result is
        calculated with the same relationship the calculator uses: 12 inches to every
        foot.
      </p>
      <ConversionTable
        values={QUICK_VALUES}
        caption="Inches to feet at a glance"
      />

      <h2>How to Convert Inches to Feet</h2>
      <p>
        One foot is exactly 12 inches. That single fact gives us the conversion factor
        for every calculation on this page.
      </p>
      <p>
        To convert inches to feet, divide the number of inches by 12. The answer is the
        number of feet. If the division does not come out evenly, the leftover is simply
        part of a foot and appears as a decimal or a fraction.
      </p>

      <div className="formula-box">
        <p className="formula-main">Feet = Inches ÷ 12</p>
        <p className="formula-sub">
          Or: feet = inches / 12 &nbsp;&bull;&nbsp; 1 foot = 12 inches
        </p>
      </div>

      <h3>Example: 36 inches to feet</h3>
      <p>
        Divide 36 by 12: <strong>36 ÷ 12 = 3 feet</strong>. Because 36 is a multiple of
        12, the answer is a whole number. The same method works for any value, including
        decimals such as 18.5 inches and negative values such as -24 inches.
      </p>

      <div className="callout">
        <strong>Handy reference:</strong> 1 inch = 0.083333 feet (1/12 ft), 12 inches = 1
        foot, 36 inches = 3 feet (1 yard), and 60 inches = 5 feet.
      </div>

      <h2>Common Conversions</h2>
      <p>
        Click any of these common values to open a converter with the number already
        filled in. The dedicated pages include the exact answer, the arithmetic, and a
        short reference table.
      </p>
      <ul className="common-grid">
        {COMMON_CONVERSIONS.map((item) => (
          <li key={item.inches}>
            <a href={item.href}>
              {item.inches} {item.inches === 1 ? "inch" : "inches"} to feet
            </a>
          </li>
        ))}
      </ul>

      <MetricConversionsBox
        title="More Length Conversions"
        headingId="more-length-conversions"
        intro="Working between metric and imperial units? These related calculators use the same exact conversion standards and the same classic calculator layout."
      />

      <h2>Frequently Asked Questions</h2>
      <p className="section-intro">
        Short, practical answers to the questions people ask most about converting
        inches to feet.
      </p>
      <FaqList items={HOME_FAQS} />

      <RelatedLinks
        title="Related Conversion Pages"
        headingId="home-related"
        links={relatedLinks}
      />

      <JsonLd
        data={webApplicationSchema({
          name: "Inches to Feet Converter",
          path: "/",
          description:
            "A free online calculator that converts inches to feet and feet to inches with decimal, fractional, and feet-and-inches results.",
          features: [
            "Convert inches to feet",
            "Convert feet to inches",
            "Decimal and fractional results",
            "Interactive inch-and-centimeter ruler",
            "Copy results to the clipboard",
          ],
        })}
      />
      <JsonLd data={faqPageSchema(HOME_FAQS, "/")} />
    </>
  );
}
