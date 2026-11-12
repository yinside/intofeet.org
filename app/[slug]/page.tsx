import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnswerPanel from "@/components/AnswerPanel";
import Breadcrumbs from "@/components/Breadcrumbs";
import Calculator from "@/components/Calculator";
import ConversionTable from "@/components/ConversionTable";
import JsonLd from "@/components/JsonLd";
import RelatedLinks from "@/components/RelatedLinks";
import {
  CONVERSION_PAGES,
  getConversionPage,
} from "@/lib/content";
import { convert, formatNumber } from "@/lib/conversion";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, webApplicationSchema } from "@/lib/schema";
import { LAST_UPDATED } from "@/lib/site";

interface ConversionPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return CONVERSION_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: ConversionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getConversionPage(slug);
  if (!page) return {};
  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: `/${page.slug}/`,
  });
}

export default async function ConversionValuePage({ params }: ConversionPageProps) {
  const { slug } = await params;
  const page = getConversionPage(slug);
  if (!page) notFound();

  const conversion = convert(page.inches, "in-to-ft");
  const centimeters = page.inches * 2.54;
  const meters = centimeters / 100;
  const pagePath = `/${page.slug}/`;

  const crumbs: Array<{ name: string; href?: string }> = [
    { name: "Home", href: "/" },
    { name: "Inches to Feet", href: "/inches-to-feet/" },
    { name: `${page.inches} ${page.inches === 1 ? "Inch" : "Inches"} to Feet` },
  ];

  const relatedLinks = [
    {
      href: "/inches-to-feet/",
      label: "Inches to Feet Converter",
      description: "the complete guide, chart, and calculator.",
    },
    {
      href: "/feet-to-inches/",
      label: "Feet to Inches Converter",
      description: "convert in the opposite direction.",
    },
    {
      href: "/cm-to-feet/",
      label: "Centimeters to Feet Converter",
      description: "centimeters to feet and inches.",
    },
    {
      href: "/feet-to-meters/",
      label: "Feet to Meters Converter",
      description: "feet to the metric system.",
    },
    ...CONVERSION_PAGES.filter((item) => item.slug !== page.slug).map((item) => ({
      href: `/${item.slug}/`,
      label: `${item.inches} ${item.inches === 1 ? "inch" : "inches"} to feet`,
      description: "exact answer, formula, and table.",
    })),
  ];

  return (
    <>
      <Breadcrumbs items={crumbs} />
      <h1>{page.h1}</h1>
      <p className="page-deck">{page.lead}</p>
      <div className="page-meta">
        <span>Exact answer &bull; Free calculator &bull; No sign-up</span>
        <span>Page updated {LAST_UPDATED}</span>
      </div>

      {page.body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <AnswerPanel inches={page.inches} centimeters={centimeters} />

      <Calculator initialValue={page.inches} />

      <h2>
        How to Convert {page.inches} {page.inches === 1 ? "Inch" : "Inches"} to Feet
      </h2>
      <p>
        Use the standard conversion factor: 1 foot = 12 inches. Divide the number of
        inches by 12 to find the number of feet. For this measurement, the arithmetic is{" "}
        <strong>{conversion.calculationText}</strong>.
      </p>
      <div className="formula-box">
        <p className="formula-main">Feet = Inches ÷ 12</p>
        <p className="formula-sub">
          {conversion.inputText} ÷ 12 = {conversion.outputText} ft
        </p>
      </div>
      <p>{page.note}</p>

      <h3>
        What is {page.inches} {page.inches === 1 ? "inch" : "inches"} in feet and inches?
      </h3>
      <p>
        The same length can be written as <strong>{conversion.feetInchesText}</strong>. In
        metric terms, {page.inches} {page.inches === 1 ? "inch is" : "inches is"}{" "}
        {formatNumber(centimeters, 6)} centimeters, or {formatNumber(meters, 6)} meters.{" "}
        {Number.isInteger(conversion.outputValue)
          ? "The result is a whole number of feet, so no rounding is required."
          : `The fractional form of the answer is ${conversion.fractionText}.`}
      </p>

      <h2>{page.contextTitle}</h2>
      <ul>
        {page.context.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Nearby Inches to Feet Conversions</h2>
      <p>
        The highlighted row is the value covered on this page. Neighboring values are
        included so you can compare the answers at a glance.
      </p>
      <ConversionTable
        values={page.nearby}
        highlight={page.inches}
        caption={`Conversions near ${page.inches} ${
          page.inches === 1 ? "inch" : "inches"
        }`}
      />

      <div className="notice">
        <strong>Need a number that is not listed?</strong> The{" "}
        <a href="/inches-to-feet/">full inches-to-feet converter</a> accepts any value
        from zero to one trillion, including decimals and negative numbers. You can also
        switch to <a href="/feet-to-inches/">feet to inches</a> in one click.
      </div>

      <RelatedLinks
        title="Related Conversion Pages"
        headingId="value-related"
        links={relatedLinks}
      />

      <JsonLd
        data={webApplicationSchema({
          name: `${page.inches} Inches to Feet Calculator`,
          path: pagePath,
          description: page.description,
        })}
      />
      <JsonLd
        data={breadcrumbSchema(
          crumbs.map((crumb) => ({
            name: crumb.name,
            path: crumb.href ?? pagePath,
          })),
        )}
      />
    </>
  );
}
