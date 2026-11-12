import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { LAST_UPDATED } from "@/lib/site";

const PATH = "/disclaimer/";

export const metadata: Metadata = buildPageMetadata({
  title: "Disclaimer — InToFeet.org",
  description:
    "Read the InToFeet.org disclaimer covering the accuracy of inches-to-feet conversions, rounding, and the limits of this free measurement tool.",
  path: PATH,
});

const crumbs: Array<{ name: string; href?: string }> = [
  { name: "Home", href: "/" },
  { name: "Disclaimer" },
];

export default function DisclaimerPage() {
  return (
    <>
      <Breadcrumbs items={crumbs} />
      <h1>Disclaimer</h1>
      <p className="page-deck">
        InToFeet.org is a free informational tool. It is intended for everyday conversions,
        not for decisions where a measurement error could cause harm or financial loss.
      </p>
      <div className="page-meta">
        <span>Effective November 12, 2026</span>
        <span>Page updated {LAST_UPDATED}</span>
      </div>

      <div className="content-page">
        <h2>General information only</h2>
        <p>
          The calculators, charts, formulas, and explanations on this site are provided for
          general informational and educational purposes. They are not professional
          engineering, construction, architectural, medical, legal, or financial advice,
          and they do not create a professional relationship of any kind.
        </p>

        <h2>Accuracy and rounding</h2>
        <p>
          The conversions use the standard relationship of 12 inches per foot. Decimal
          results are rounded to six decimal places where the division does not terminate,
          and feet-and-inches readings are rounded to the nearest 1/16 inch unless stated
          otherwise. Rounded values may differ slightly from exact arithmetic or from
          another calculator that uses different rounding rules.
        </p>
        <p>
          The site is tested for accuracy, but no guarantee is made that every page is free
          of errors, omissions, or typographical mistakes. If you find a mistake, please
          report it through the <Link href="/contact/">contact page</Link>.
        </p>

        <h2>Verify important measurements</h2>
        <p>
          Do not rely on this site alone for construction cuts, engineering calculations,
          product sizing, safety clearances, or any other measurement where an error could
          cause damage, injury, or financial loss. Measure with a calibrated tool and
          confirm critical values with a qualified professional.
        </p>

        <h2>No warranty</h2>
        <p>
          This website and its content are provided &ldquo;as is&rdquo; and &ldquo;as
          available,&rdquo; without warranties of any kind, express or implied, including
          but not limited to accuracy, fitness for a particular purpose, or
          non-infringement. To the fullest extent permitted by law, InToFeet.org is not
          liable for any loss or damage arising from the use of, or reliance on, the
          information on this site.
        </p>

        <h2>External links</h2>
        <p>
          Links to other websites are provided for convenience. InToFeet.org does not
          control those sites and is not responsible for their content, accuracy, or
          practices.
        </p>

        <h2>Copyright</h2>
        <p>
          The text, design, and code on this site are part of InToFeet.org unless otherwise
          noted. You may link to the pages and quote short passages with attribution. Please
          do not republish the site&rsquo;s content wholesale without permission.
        </p>

        <h2>Questions</h2>
        <p>
          For questions about this disclaimer, use the{" "}
          <Link href="/contact/">contact page</Link>. See also the{" "}
          <Link href="/privacy/">privacy policy</Link>.
        </p>
      </div>

      <JsonLd
        data={breadcrumbSchema(
          crumbs.map((crumb) => ({
            name: crumb.name,
            path: crumb.href ?? PATH,
          })),
        )}
      />
    </>
  );
}
