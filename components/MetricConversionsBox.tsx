import Link from "next/link";
import { METRIC_PAGES } from "@/lib/metric-content";

export default function MetricConversionsBox({
  title = "More Length Conversions",
  headingId = "more-length-conversions",
  intro,
}: {
  title?: string;
  headingId?: string;
  intro?: string;
}) {
  return (
    <section className="related-box" aria-labelledby={headingId}>
      <h2 id={headingId}>{title}</h2>
      {intro ? <p className="related-box-intro">{intro}</p> : null}
      <ul className="related-list">
        {METRIC_PAGES.map((page) => (
          <li key={page.slug}>
            <Link href={`/${page.slug}/`}>{page.menuLabel}</Link>
            <span className="related-description"> — {page.shortDescription}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
