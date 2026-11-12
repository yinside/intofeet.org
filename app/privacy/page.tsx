import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { CONTACT_EMAIL, LAST_UPDATED } from "@/lib/site";

const PATH = "/privacy/";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy — InToFeet.org",
  description:
    "InToFeet.org does not require an account, set cookies, or run advertising trackers. Read the plain-English privacy policy for this inches-to-feet calculator.",
  path: PATH,
});

const crumbs: Array<{ name: string; href?: string }> = [
  { name: "Home", href: "/" },
  { name: "Privacy Policy" },
];

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={crumbs} />
      <h1>Privacy Policy</h1>
      <p className="page-deck">
        The short version: the calculator works in your browser, and we do not ask for an
        account or sell personal information.
      </p>
      <div className="page-meta">
        <span>Effective November 12, 2026</span>
        <span>Page updated {LAST_UPDATED}</span>
      </div>

      <div className="content-page">
        <h2>Information we collect</h2>
        <p>
          InToFeet.org does not require registration and does not ask for your name,
          address, or payment details. The number you type into the calculator is processed
          locally in your browser. It is not submitted to a server and is not stored by
          InToFeet.org.
        </p>

        <h2>Calculator data and the clipboard</h2>
        <p>
          Conversions run entirely on your device using JavaScript. If you press the
          &ldquo;Copy Result&rdquo; button, the result is written to your clipboard using
          your browser&rsquo;s clipboard feature. That action happens only when you request
          it; the site does not read the contents of your clipboard.
        </p>

        <h2>Cookies and analytics</h2>
        <p>
          This site does not set cookies for advertising or analytics, and it does not use
          third-party tracking scripts. There is no advertising network, social widget, or
          session recorder embedded in the pages. Your browser may still store local
          preferences or cache files according to its own settings; those remain under your
          control.
        </p>

        <h2>Hosting and server logs</h2>
        <p>
          Like most websites, the hosting provider that serves these pages may record
          standard technical information in request logs, such as an IP address, browser
          type, referring page, and the time of a request. Those logs are used for security,
          reliability, and diagnosing problems. InToFeet.org does not combine them with
          calculator input, because the calculator input never reaches the server.
        </p>

        <h2>Email</h2>
        <p>
          If you email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, we receive
          the address you send from and whatever you include in the message. That
          correspondence is used only to reply to your question or correct an issue. It is
          not added to a marketing list.
        </p>

        <h2>External links</h2>
        <p>
          Some pages may link to other websites. Their privacy practices are their own, and
          this policy does not cover them. Check the destination site&rsquo;s policy if that
          matters to you.
        </p>

        <h2>Children&rsquo;s privacy</h2>
        <p>
          This site is a general-purpose measurement tool and is not directed at children
          under 13. We do not knowingly collect personal information from anyone through
          the calculator, because the calculator does not collect personal information at
          all.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If the site&rsquo;s practices change — for example, if analytics are ever added —
          this page will be updated first, with a new effective date. The version shown here
          is the current policy.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about privacy can be sent to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. For general site
          information, see the <Link href="/about/">about page</Link>.
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
