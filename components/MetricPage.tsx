import Breadcrumbs from "@/components/Breadcrumbs";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import MetricCalculator from "@/components/MetricCalculator";
import MetricTable from "@/components/MetricTable";
import RelatedLinks, { type RelatedLink } from "@/components/RelatedLinks";
import {
  METRIC_PAGES,
  type MetricPageContent,
} from "@/lib/metric-content";
import { METRIC_PAIRS, METRIC_UNITS } from "@/lib/metric";
import {
  breadcrumbSchema,
  faqPageSchema,
  webApplicationSchema,
} from "@/lib/schema";
import { LAST_UPDATED } from "@/lib/site";

export default function MetricPage({ page }: { page: MetricPageContent }) {
  const pair = METRIC_PAIRS[page.pairId];
  const reversePage = METRIC_PAGES.find(
    (item) => item.pairId === pair.reverse,
  );
  const otherMetricPages = METRIC_PAGES.filter(
    (item) => item.slug !== page.slug && item.slug !== reversePage?.slug,
  );

  const relatedLinks: RelatedLink[] = [
    ...(reversePage
      ? [
          {
            href: `/${reversePage.slug}/`,
            label: reversePage.menuLabel,
            description: "the reverse conversion.",
          },
        ]
      : []),
    ...otherMetricPages.map((item) => ({
      href: `/${item.slug}/`,
      label: item.menuLabel,
      description: item.shortDescription,
    })),
    {
      href: "/inches-to-feet/",
      label: "Inches to Feet Converter",
      description: "the main inches-to-feet guide and chart.",
    },
    {
      href: "/feet-to-inches/",
      label: "Feet to Inches Converter",
      description: "convert feet to inches in the other direction.",
    },
    {
      href: "/12-inches-to-feet/",
      label: "12 Inches to Feet",
      description: "a common inch-to-foot conversion.",
    },
    {
      href: "/",
      label: "In to Feet Converter Home",
      description: "the main calculator and common conversions.",
    },
  ];

  const crumbs: Array<{ name: string; href?: string }> = [
    { name: "Home", href: "/" },
    { name: page.crumbLabel },
  ];

  const path = `/${page.slug}/`;

  return (
    <>
      <Breadcrumbs items={crumbs} />
      <h1>{page.h1}</h1>
      <p className="page-deck">{page.lead}</p>
      <div className="page-meta">
        <span>Free online calculator &bull; Exact conversion factors</span>
        <span>Page updated {LAST_UPDATED}</span>
      </div>

      {page.body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <MetricCalculator
        initialPairId={page.pairId}
        initialValue={page.initialValue}
        prefillFromQuery
      />

      <h2>
        How to Convert {pair.from === "cm" ? "Centimeters" : pair.from === "ft" ? "Feet" : "Meters"} to{" "}
        {pair.to === "ft" ? "Feet" : pair.to === "cm" ? "Centimeters" : "Meters"}
      </h2>
      <div className="formula-box">
        <p className="formula-main">{pair.formula}</p>
        <p className="formula-sub">{pair.formulaSub}</p>
      </div>
      <p>{page.note}</p>

      <p className="notice">
        Need the opposite direction? Use the{" "}
        {reversePage ? (
          <a href={`/${reversePage.slug}/`}>{reversePage.h1}</a>
        ) : (
          "related converter"
        )}{" "}
        or press <strong>Swap Units</strong> in the calculator above.
      </p>

      <h2>{page.chartTitle}</h2>
      <p className="section-intro">{page.chartIntro}</p>
      <MetricTable
        values={page.chartValues}
        pairId={page.pairId}
        caption={page.chartCaption}
        highlight={page.initialValue}
      />

      <h2>Worked Examples</h2>
      {page.examples.map((example) => (
        <div key={example.title}>
          <h3>{example.title}</h3>
          <p>{example.body}</p>
        </div>
      ))}

      <h2>{page.contextTitle}</h2>
      <ul>
        {page.context.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Frequently Asked Questions</h2>
      <FaqList items={page.faqs} />

      <RelatedLinks
        title="Related Conversion Pages"
        headingId={`${page.slug}-related`}
        links={relatedLinks}
      />

      <JsonLd
        data={webApplicationSchema({
          name: pair.title,
          path,
          description: page.description,
          features: [
            `Convert ${METRIC_UNITS[pair.from].plural} to ${METRIC_UNITS[pair.to].plural}`,
            "Show decimal and feet-and-inches results",
            "Copy results to the clipboard",
          ],
        })}
      />
      <JsonLd
        data={breadcrumbSchema(
          crumbs.map((crumb) => ({
            name: crumb.name,
            path: crumb.href ?? path,
          })),
        )}
      />
      <JsonLd data={faqPageSchema(page.faqs, path)} />
    </>
  );
}
