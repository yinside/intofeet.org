import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/content";
import { METRIC_PAGES } from "@/lib/metric-content";
import { LAST_UPDATED, SITE_TAGLINE } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <nav className="footer-nav" aria-label="Footer">
        <ul>
          {FOOTER_LINKS.map((link, index) => (
            <li key={link.href}>
              {index > 0 ? (
                <span className="footer-separator" aria-hidden="true">
                  |
                </span>
              ) : null}
              {link.href.endsWith(".xml") ? (
                <a href={link.href}>{link.label}</a>
              ) : (
                <Link href={link.href}>{link.label}</Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <p className="footer-conversions">
        <span className="footer-conversions-label">More conversions:</span>{" "}
        {METRIC_PAGES.map((page, index) => (
          <span key={page.slug}>
            {index > 0 ? (
              <span className="footer-separator" aria-hidden="true">
                |
              </span>
            ) : null}
            <Link href={`/${page.slug}/`}>{page.footerLabel}</Link>
          </span>
        ))}
      </p>

      <p className="footer-friend-link">
        <span className="footer-friend-label">Friend Link:</span>{" "}
        <a
          href="https://www.cmtoin.xyz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          cm to in
        </a>
      </p>

      <p className="footer-tagline">{SITE_TAGLINE}</p>

      <div className="footer-badges" aria-hidden="true">
        <span className="retro-badge">NO COOKIES</span>
        <span className="retro-badge">NO SIGN-UP</span>
        <span className="retro-badge">FREE TO USE</span>
      </div>

      <p className="footer-copyright">Copyright © 2026 InToFeet.org</p>
      <p className="footer-small">
        Every conversion is calculated in your browser. No accounts, no trackers, no
        nonsense.
      </p>
      <p className="footer-small footer-timestamp">
        Page last updated {LAST_UPDATED}. Best viewed in any browser, at any size.
      </p>
      <p className="footer-toplink">
        <a href="#main">Back to top ↑</a>
      </p>
    </footer>
  );
}
