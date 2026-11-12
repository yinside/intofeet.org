import Link from "next/link";
import { NAV_LINKS } from "@/lib/content";
import { LAST_UPDATED } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-utility">
        <span className="header-utility-left">www.intofeet.org</span>
        <span className="header-utility-right">Last updated: {LAST_UPDATED}</span>
      </div>

      <div className="header-main">
        <Link href="/" className="brand" aria-label="InToFeet.org home page">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mark-main">ft</span>
            <span className="brand-mark-sub">×12</span>
          </span>
          <span className="brand-copy">
            <span className="site-title">IN TO FEET CONVERTER</span>
            <span className="site-subtitle">Free Online Length Conversion Calculator</span>
          </span>
        </Link>
        <span className="header-stamp" aria-hidden="true">
          NO SIGN-UP
          <br />
          NO POP-UPS
        </span>
      </div>

      <nav className="main-nav" aria-label="Primary">
        <ul>
          {NAV_LINKS.map((link, index) => (
            <li key={link.href}>
              {index > 0 ? (
                <span className="nav-separator" aria-hidden="true">
                  |
                </span>
              ) : null}
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
