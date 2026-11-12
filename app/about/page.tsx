import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { LAST_UPDATED } from "@/lib/site";

const PATH = "/about/";

export const metadata: Metadata = buildPageMetadata({
  title: "About InToFeet.org — A Plain-Talk Conversion Site",
  description:
    "Learn about InToFeet.org, a small independent site for inches-to-feet conversions with a deliberately old-fashioned look and straightforward math.",
  path: PATH,
});

const crumbs: Array<{ name: string; href?: string }> = [
  { name: "Home", href: "/" },
  { name: "About Us" },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={crumbs} />
      <h1>About InToFeet.org</h1>
      <p className="page-deck">
        InToFeet.org is a small, independent measurement site built around one everyday
        question: how many feet is that many inches?
      </p>
      <div className="page-meta">
        <span>Independent &bull; Free to use &bull; No account required</span>
        <span>Page updated {LAST_UPDATED}</span>
      </div>

      <div className="content-page">
        <h2>Why the site looks like 2001</h2>
        <p>
          The design is a deliberate nod to the early web: Times New Roman, navy headers,
          gray beveled buttons, underlined links, and tables with visible borders. It is
          meant to feel like a useful page you might have bookmarked on a Windows XP
          machine — not like a dashboard.
        </p>
        <p>
          The old-fashioned look is only skin deep. The calculator runs in your browser,
          works on phones, supports the keyboard, and uses the same 12-inches-per-foot
          relationship that has been standard for centuries.
        </p>

        <h2>What the site does</h2>
        <p>
          The main calculator converts inches to feet and can swap direction to convert
          feet to inches. It shows a decimal result, a fractional result where one is
          available, a feet-and-inches reading, and the arithmetic used to get there. You
          can copy a result to the clipboard with one button.
        </p>
        <p>
          Alongside the calculator, the site includes quick-reference charts, worked
          examples, plain-English formulas, and dedicated pages for commonly requested
          values such as 12, 24, 36, 60, and 72 inches.
        </p>

        <h2>How the math works</h2>
        <p>
          There are exactly 12 inches in one foot. Inches-to-feet conversions divide by 12;
          feet-to-inches conversions multiply by 12. The international foot is defined as
          exactly 0.3048 meters, and one inch is exactly 2.54 centimeters. Decimal answers
          are rounded to six places where needed, while fractions are shown in exact form
          unless they are marked with an approximation symbol.
        </p>

        <h2>No accounts, no noise</h2>
        <p>
          There is no sign-up, no newsletter pop-up, and no account system. Calculations
          happen locally in your browser; the number you type is not sent to us. The site
          does not set cookies or run advertising trackers. Read the{" "}
          <Link href="/privacy/">privacy policy</Link> for the specifics.
        </p>

        <h2>Corrections and contact</h2>
        <p>
          If you spot an error, have a suggestion for a conversion page, or just want to
          say hello, use the <Link href="/contact/">contact page</Link>. Corrections to the
          math are especially welcome, and they get priority.
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
