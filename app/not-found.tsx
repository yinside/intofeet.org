import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found (404)",
  description:
    "The page you requested could not be found. Try the inches to feet converter or one of the popular conversion pages.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <>
      <h1>Page Not Found</h1>
      <p className="page-deck">
        The page you asked for is not here. It may have moved, or the address may have a
        typo. The converter still works, though.
      </p>

      <div className="not-found-box">
        <p className="not-found-code">404</p>
        <p>
          <strong>Sorry about that.</strong> This is the web equivalent of looking in the
          wrong drawer.
        </p>
        <p>
          <Link href="/">Return to the inches to feet converter</Link>
        </p>
      </div>

      <h2>Popular Pages</h2>
      <ul>
        <li>
          <Link href="/inches-to-feet/">Inches to Feet Converter</Link>
        </li>
        <li>
          <Link href="/feet-to-inches/">Feet to Inches Converter</Link>
        </li>
        <li>
          <Link href="/12-inches-to-feet/">12 Inches to Feet</Link>
        </li>
        <li>
          <Link href="/60-inches-to-feet/">60 Inches to Feet</Link>
        </li>
        <li>
          <Link href="/about/">About InToFeet.org</Link>
        </li>
      </ul>

      <p>
        You can also check the <a href="/sitemap.xml">XML sitemap</a> for every page on the
        site.
      </p>
    </>
  );
}
