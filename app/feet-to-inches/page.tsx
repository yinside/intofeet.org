import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Calculator from "@/components/Calculator";
import ConversionTable from "@/components/ConversionTable";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import MetricConversionsBox from "@/components/MetricConversionsBox";
import RelatedLinks from "@/components/RelatedLinks";
import { CONVERSION_PAGES, REVERSE_FAQS } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";
import {
  breadcrumbSchema,
  faqPageSchema,
  webApplicationSchema,
} from "@/lib/schema";
import { LAST_UPDATED } from "@/lib/site";

const PATH = "/feet-to-inches/";
const TITLE = "Feet to Inches Converter — Free Online Calculator";
const DESCRIPTION =
  "Convert feet to inches with a free online calculator. See the feet-to-inches formula, a complete chart, worked examples, and common height conversions.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const CHART_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 50, 100];

const crumbs: Array<{ name: string; href?: string }> = [
  { name: "Home", href: "/" },
  { name: "Feet to Inches" },
];

const relatedLinks = [
  {
    href: "/inches-to-feet/",
    label: "Inches to Feet Converter",
    description: "the opposite direction, with the full inches guide.",
  },
  ...CONVERSION_PAGES.map((page) => ({
    href: `/${page.slug}/`,
    label: `${page.inches} ${page.inches === 1 ? "inch" : "inches"} to feet`,
    description: "a dedicated answer, formula, and table.",
  })),
  {
    href: "/",
    label: "In to Feet Converter Home",
    description: "the main inches-to-feet calculator.",
  },
];

export default function FeetToInchesPage() {
  return (
    <>
      <Breadcrumbs items={crumbs} />
      <h1>Convert Feet to Inches</h1>
      <p className="page-deck">
        Go the other way with ease. Enter a number of feet, press Convert, and get the
        equivalent in inches — including a decimal, a fraction, and a feet-and-inches
        reading.
      </p>
      <div className="page-meta">
        <span>Free online calculator &bull; Works on mobile</span>
        <span>Page updated {LAST_UPDATED}</span>
      </div>

      <Calculator
        initialDirection="ft-to-in"
        initialValue={5}
        prefillFromQuery
      />

      <h2>The Feet-to-Inches Relationship</h2>
      <p>
        One foot contains exactly 12 inches. Converting feet to inches is therefore a
        multiplication problem: take the number of feet and multiply by 12. A value such
        as 5 feet becomes 5 × 12 = 60 inches.
      </p>
      <p>
        The rule works with fractions and decimals too. Half a foot is 6 inches, 2.5 feet
        is 30 inches, and 6.75 feet is 81 inches. Negative values are fine as well: -2 feet
        is -24 inches.
      </p>

      <div className="formula-box">
        <p className="formula-main">Inches = Feet × 12</p>
        <p className="formula-sub">
          The reverse: feet = inches ÷ 12 &nbsp;&bull;&nbsp; 1 foot = 12 inches
        </p>
      </div>

      <h2>Feet to Inches Conversion Chart</h2>
      <p className="section-intro">
        A quick reference for common values. The same multiplication produces every row,
        so the pattern should look familiar after a few entries.
      </p>
      <ConversionTable
        values={CHART_VALUES}
        direction="ft-to-in"
        caption="Feet to inches conversion chart"
      />

      <h2>Worked Examples</h2>

      <h3>2.5 feet to inches</h3>
      <p>
        Multiply 2.5 by 12: 2.5 × 12 = 30 inches. You can also think of it as 2 feet
        (24 inches) plus half a foot (6 inches), which is 30 inches in total.
      </p>

      <h3>6.75 feet to inches</h3>
      <p>
        Six and three-quarter feet is 6.75 × 12 = 81 inches. In feet-and-inches notation,
        that is 6&rsquo;9&quot;.
      </p>

      <h3>Half a foot to inches</h3>
      <p>
        0.5 × 12 = 6 inches. This is the same as saying half of 12 is 6, which is often the
        quickest way to check the answer mentally.
      </p>

      <h3>5 feet 10 inches in total inches</h3>
      <p>
        First convert the whole feet: 5 × 12 = 60 inches. Then add the extra 10 inches:
        60 + 10 = 70 inches. This two-step method is the one to use whenever a height is
        written in feet and inches.
      </p>

      <h2>Feet and Inches in Height</h2>
      <p>
        Height is usually written with an apostrophe for feet and a quotation mark for
        inches. For example, 5&rsquo;10&quot; means 5 feet 10 inches, not 5.10 feet. To
        convert that height to total inches, multiply the feet by 12 and add the remaining
        inches.
      </p>
      <p>
        A few common heights make useful checkpoints: 5&rsquo;0&quot; is 60 inches,
        5&rsquo;6&quot; is 66 inches, 5&rsquo;8&quot; is 68 inches, 5&rsquo;10&quot; is 70
        inches, and 6&rsquo;0&quot; is 72 inches.
      </p>

      <h2>Why Multiply by 12?</h2>
      <p>
        Multiplication is just repeated addition. Each foot in the measurement contributes
        another 12 inches. Three feet contribute 12 + 12 + 12 = 36 inches, which is far
        easier to calculate as 3 × 12. The same logic applies to any number of feet,
        including fractional ones.
      </p>

      <h2>Common Conversion Mistakes</h2>
      <ul>
        <li>
          <strong>Reading 5.5 feet as 5&rsquo;5&quot;.</strong> The decimal .5 means half a
          foot, or 6 inches, so 5.5 feet is 5&rsquo;6&quot;.
        </li>
        <li>
          <strong>Forgetting to add the extra inches.</strong> For 5&rsquo;10&quot;, convert
          the 5 feet to 60 inches and then add 10 — do not just multiply 10 by 12.
        </li>
        <li>
          <strong>Mixing up linear and square feet.</strong> One square foot is 144 square
          inches, not 12. The multiplier changes because area has two dimensions.
        </li>
      </ul>

      <h2>Frequently Asked Questions</h2>
      <FaqList items={REVERSE_FAQS} />

      <MetricConversionsBox
        title="Metric ↔ Imperial Converters"
        headingId="feet-to-inches-metric"
        intro="Need centimeters or meters instead? These exact-factor converters cover the other common length conversions."
      />

      <RelatedLinks
        title="Related Conversion Pages"
        headingId="feet-to-inches-related"
        links={relatedLinks}
      />

      <JsonLd
        data={webApplicationSchema({
          name: "Feet to Inches Converter",
          path: PATH,
          description: DESCRIPTION,
        })}
      />
      <JsonLd
        data={breadcrumbSchema(
          crumbs.map((crumb) => ({
            name: crumb.name,
            path: crumb.href ?? PATH,
          })),
        )}
      />
      <JsonLd data={faqPageSchema(REVERSE_FAQS, PATH)} />
    </>
  );
}
