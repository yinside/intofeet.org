import type { Metadata } from "next";
import { SITE_NAME } from "./site";

interface PageMetadataArgs {
  title: string;
  description: string;
  path: string;
  socialTitle?: string;
  socialDescription?: string;
}

/**
 * Builds a consistent metadata block for every page. Canonicals are relative to
 * metadataBase in the root layout, so they stay correct wherever the static site
 * is hosted (as long as the domain is intofeet.org).
 */
export function buildPageMetadata({
  title,
  description,
  path,
  socialTitle,
  socialDescription,
}: PageMetadataArgs): Metadata {
  const image = {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "InToFeet.org — IN TO FEET CONVERTER, a classic inches to feet calculator",
  };

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title: socialTitle ?? title,
      description: socialDescription ?? description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle ?? title,
      description: socialDescription ?? description,
      images: [image.url],
    },
  };
}
