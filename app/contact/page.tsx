import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { CONTACT_EMAIL, LAST_UPDATED } from "@/lib/site";

const PATH = "/contact/";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact InToFeet.org — Questions and Corrections",
  description:
    "Contact InToFeet.org with questions, correction requests, or suggestions about the inches-to-feet calculator. Email is the fastest way to reach us.",
  path: PATH,
});

const crumbs: Array<{ name: string; href?: string }> = [
  { name: "Home", href: "/" },
  { name: "Contact" },
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={crumbs} />
      <h1>Contact InToFeet.org</h1>
      <p className="page-deck">
        Corrections, questions, and suggestions are all welcome. Email is the simplest
        way to get in touch.
      </p>
      <div className="page-meta">
        <span>No contact form &bull; No account required</span>
        <span>Page updated {LAST_UPDATED}</span>
      </div>

      <div className="content-page">
        <h2>Email</h2>
        <div className="address-block">
          <strong>InToFeet.org</strong>
          <br />
          Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
        <p>
          The site is a one-person project, so replies may take a few days. Messages about
          incorrect calculations, broken pages, or accessibility problems are read first.
        </p>

        <h2>What to include</h2>
        <ul>
          <li>The value you entered and the direction you were converting.</li>
          <li>The answer you expected and the answer you saw.</li>
          <li>The device or browser you were using, if the issue is visual.</li>
          <li>
            A screenshot, if you have one. Please avoid including personal information you
            do not want to share.
          </li>
        </ul>

        <h2>Before you write</h2>
        <p>
          Many common questions are already answered on the{" "}
          <Link href="/inches-to-feet/">inches to feet guide</Link> and the{" "}
          <Link href="/feet-to-inches/">feet to inches page</Link>. If you are checking a
          single value, the calculator on the <Link href="/">home page</Link> is usually
          the fastest route.
        </p>

        <h2>What we cannot help with</h2>
        <p>
          InToFeet.org does not provide engineering, construction, medical, or legal
          advice. For decisions where a measurement needs to be exact, verify the result
          with a qualified professional and a calibrated measuring tool. See the{" "}
          <Link href="/disclaimer/">disclaimer</Link> for details.
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
