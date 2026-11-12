import Link from "next/link";

export interface RelatedLink {
  href: string;
  label: string;
  description?: string;
}

export default function RelatedLinks({
  title = "Related Conversions",
  links,
  headingId = "related-conversions",
}: {
  title?: string;
  links: RelatedLink[];
  headingId?: string;
}) {
  return (
    <section className="related-box" aria-labelledby={headingId}>
      <h2 id={headingId}>{title}</h2>
      <ul className="related-list">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
            {link.description ? (
              <span className="related-description"> — {link.description}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
