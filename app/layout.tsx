import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { websiteSchema } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "In to Feet Converter — Inches to Feet Calculator",
    template: "%s | InToFeet.org",
  },
  description:
    "Convert inches to feet instantly with a free online inches to feet calculator. Get decimal and fractional answers, conversion tables, formulas, and examples.",
  applicationName: SITE_NAME,
  keywords: [
    "in to feet",
    "inches to feet",
    "inch to feet",
    "convert inches to feet",
    "inches in feet",
    "inch conversion calculator",
    "inches to feet calculator",
  ],
  authors: [{ name: "InToFeet.org" }],
  creator: "InToFeet.org",
  publisher: "InToFeet.org",
  category: "Reference",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: "In to Feet Converter — Inches to Feet Calculator",
    description:
      "A free, no-nonsense inches to feet calculator with decimal and fractional answers, a quick conversion table, and plain-English formulas.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InToFeet.org — IN TO FEET CONVERTER",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "In to Feet Converter — Inches to Feet Calculator",
    description:
      "A free, no-nonsense inches to feet calculator with decimal and fractional answers.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000080",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US">
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <div className="page-shell" id="top">
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </div>
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
