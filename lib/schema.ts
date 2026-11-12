import type { FaqItem } from "./content";
import { SITE_NAME, SITE_URL } from "./site";

type CrumbInput = { name: string; path: string };

export function absoluteUrl(path: string): string {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    description:
      "Free online inches to feet converter with formulas, conversion tables, and plain-English answers.",
    inLanguage: "en-US",
  };
}

export function webApplicationSchema({
  name,
  path,
  description,
  features,
}: {
  name: string;
  path: string;
  description: string;
  features?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url: absoluteUrl(path),
    description,
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: "Unit Converter",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript for the interactive calculator",
    isAccessibleForFree: true,
    inLanguage: "en-US",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: features ?? [
      "Convert inches to feet",
      "Convert feet to inches",
      "Decimal and fractional results",
      "Copy results to the clipboard",
    ],
  };
}

export function faqPageSchema(faqs: FaqItem[], path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: absoluteUrl(path),
    inLanguage: "en-US",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: CrumbInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
