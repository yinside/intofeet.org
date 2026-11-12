import type { Metadata } from "next";
import MetricPage from "@/components/MetricPage";
import { getMetricPage } from "@/lib/metric-content";
import { buildPageMetadata } from "@/lib/metadata";

const page = getMetricPage("feet-to-cm")!;

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: `/${page.slug}/`,
});

export default function Page() {
  return <MetricPage page={page} />;
}
