import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Calculator from "@/components/Calculator";
import ConversionTable from "@/components/ConversionTable";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import MetricConversionsBox from "@/components/MetricConversionsBox";
import RelatedLinks from "@/components/RelatedLinks";
import { CONVERSION_PAGES, HUB_FAQS } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";
import {
  breadcrumbSchema,
  faqPageSchema,
  webApplicationSchema,
} from "@/lib/schema";
import { LAST_UPDATED } from "@/lib/site";

const PATH = "/inches-to-feet/";
const TITLE = "Inches to Feet Converter — Free Online Calculator";
const DESCRIPTION =
  "Convert inches to feet with a free online calculator. See the inches-to-feet formula, a complete conversion chart, worked examples, and common questions.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const CHART_VALUES = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72,
  84, 96, 120,
];

const crumbs: Array<{ name: string; href?: string }> = [
  { name: "Home", href: "/" },
  { name: "Inches to Feet" },
];

const relatedLinks = [
  {
    href: "/feet-to-inches/",
    label: "Feet to Inches Converter",
    description: "the reverse conversion, with its own chart.",
  },
  ...CONVERSION_PAGES.map((page) => ({
    href: `/${page.slug}/`,
    label: `${page.inches} ${page.inches === 1 ? "inch" : "inches"} to feet`,
    description: "exact answer, formula, and reference table.",
  })),
  {
    href: "/",
    label: "In to Feet Converter Home",
    description: "quick answers and the common conversions list.",
  },
];

export default function InchesToFeetPage() {
  return (
    <>
      <Breadcrumbs items={crumbs} />
      <h1>Convert Inches to Feet</h1>
      <p className="page-deck">
        A complete inches-to-feet guide: a working calculator, the formula, a full
        conversion chart, and worked examples. Start with the number you have, or read
        on for the arithmetic behind every answer.
      </p>
      <div className="page-meta">
        <span>Free online calculator &bull; No account needed</span>
        <span>Page updated {LAST_UPDATED}</span>
      </div>

      <Calculator initialValue={36} prefillFromQuery />

      <h2>The Inches-to-Feet Relationship</h2>
      <p>
        There are exactly 12 inches in one foot. This is a definition, not an
        approximation, so the conversion factor never changes. To go from inches to feet,
        divide by 12; to go from feet to inches, multiply by 12.
      </p>
      <p>
        Both units are part of the imperial and U.S. customary systems. The international
        foot has been defined as exactly 0.3048 meters since 1959, and one inch is exactly
        2.54 centimeters. Those metric definitions are consistent with the older
        12-inches-per-foot rule.
      </p>

      <div className="formula-box">
        <p className="formula-main">Feet = Inches ÷ 12</p>
        <p className="formula-sub">
          The reverse: inches = feet × 12 &nbsp;&bull;&nbsp; 1 foot = 12 inches
        </p>
      </div>

      <h2>Inches to Feet Conversion Chart</h2>
      <p className="section-intro">
        A longer reference chart than the one on the home page. Values are shown to six
        decimal places where the division does not come out evenly.
      </p>
      <ConversionTable
        values={CHART_VALUES}
        caption="Inches to feet conversion chart"
      />

      <h2>Worked Examples</h2>

      <h3>7 inches to feet</h3>
      <p>
        Seven inches is less than a foot, so the answer is smaller than 1. Divide 7 by 12:
        7 ÷ 12 = 0.583333 feet. As a fraction, that is 7/12 of a foot.
      </p>

      <h3>45.5 inches to feet</h3>
      <p>
        Decimals work the same way. 45.5 ÷ 12 = 3.791667 feet. In feet and inches, 3 feet
        is 36 inches, leaving 9.5 inches, so the measurement is 3 ft 9.5 in.
      </p>

      <h3>100 inches to feet</h3>
      <p>
        100 ÷ 12 = 8.333333 feet, or 8 1/3 feet. Another way to read it is 8 feet 4 inches,
        because 8 × 12 = 96 and 4 inches remain.
      </p>

      <h2>Inches and Feet in Everyday Life</h2>
      <p>
        In the United States, inches and feet are the default units for a lot of everyday
        measuring: a person&rsquo;s height, the width of a door, the length of a piece of
        lumber, or the depth of a cabinet. A tape measure usually shows both scales side
        by side, which makes it easy to check a conversion by eye.
      </p>
      <p>
        Elsewhere, the same measurement is more often given in centimeters or meters. If
        you need to cross over, multiply inches by 2.54 to get centimeters, or multiply
        feet by 0.3048 to get meters.
      </p>

      <h2>Common Conversion Mistakes</h2>
      <ul>
        <li>
          <strong>Dividing by 10 instead of 12.</strong> There are 12 inches in a foot, so
          60 inches is 5 feet, not 6 feet.
        </li>
        <li>
          <strong>Reading 5&rsquo;10&quot; as 5.10 feet.</strong> The 10 is inches, so the
          decimal height is 5 + 10/12 = 5.833333 feet.
        </li>
        <li>
          <strong>Rounding too early.</strong> Keep the full value through intermediate
          steps, then round the final answer to the precision you need.
        </li>
        <li>
          <strong>Using 12 for area.</strong> Square inches to square feet uses 144,
          because area has two dimensions: 12 × 12 = 144.
        </li>
      </ul>

      <h2>Frequently Asked Questions</h2>
      <FaqList items={HUB_FAQS} />

      <MetricConversionsBox
        title="Metric ↔ Imperial Converters"
        headingId="inches-to-feet-metric"
        intro="Need centimeters or meters instead? These exact-factor converters cover the other common length conversions."
      />

      <RelatedLinks
        title="Related Conversion Pages"
        headingId="inches-to-feet-related"
        links={relatedLinks}
      />

      <JsonLd
        data={webApplicationSchema({
          name: "Inches to Feet Converter",
          path: PATH,
          description: DESCRIPTION,
        })}
      />
      <JsonLd data={breadcrumbSchema(crumbs.map((crumb) => ({
        name: crumb.name,
        path: crumb.href ?? PATH,
      })))} />
      <JsonLd data={faqPageSchema(HUB_FAQS, PATH)} />
    </>
  );
}
