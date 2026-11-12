import type { FaqItem } from "./content";
import type { MetricPairId } from "./metric";

export interface MetricExample {
  title: string;
  body: string;
}

export interface MetricPageContent {
  slug: string;
  pairId: MetricPairId;
  menuLabel: string;
  footerLabel: string;
  crumbLabel: string;
  shortDescription: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  body: string[];
  initialValue: number;
  chartTitle: string;
  chartCaption: string;
  chartIntro: string;
  chartValues: number[];
  examples: MetricExample[];
  contextTitle: string;
  context: string[];
  faqs: FaqItem[];
  note: string;
}

export const METRIC_PAGES: MetricPageContent[] = [
  {
    slug: "cm-to-feet",
    pairId: "cm-ft",
    menuLabel: "Centimeters to Feet (cm → ft)",
    footerLabel: "cm to feet",
    crumbLabel: "Centimeters to Feet",
    shortDescription: "convert centimeters to feet and inches.",
    title: "Centimeters to Feet Converter — cm to ft Calculator",
    description:
      "Convert centimeters to feet with a free online calculator. One foot is 30.48 cm. Includes the formula, a conversion chart, and worked examples.",
    h1: "Centimeters to Feet Converter",
    lead:
      "Convert centimeters to feet and get both a decimal answer and a feet-and-inches reading. No sign-up, no page reload.",
    body: [
      "Centimeters and feet measure length in two different systems. The bridge between them is exact: one foot is 30.48 centimeters. To convert centimeters to feet, divide the centimeter value by 30.48.",
      "Many conversions do not land on a whole foot, so the result is usually a decimal. The calculator also rounds the same length to the nearest 1/16 inch and shows it in feet and inches, which is easier to compare with a tape measure.",
    ],
    initialValue: 180,
    chartTitle: "Centimeters to Feet Conversion Chart",
    chartCaption: "Centimeters to feet conversion chart",
    chartIntro:
      "Common centimeter values, with the decimal-inch equivalent in the third column.",
    chartValues: [30.48, 50, 100, 150, 180, 182.88, 200, 250, 300],
    examples: [
      {
        title: "180 centimeters to feet",
        body:
          "180 ÷ 30.48 = 5.905512 feet. On a tape measure that is about 5 feet 10 7/8 inches, or roughly 5 ft 11 in.",
      },
      {
        title: "30.48 centimeters to feet",
        body:
          "Because 30.48 centimeters is exactly one foot, the answer is 1 foot with no decimal remainder.",
      },
      {
        title: "100 centimeters to feet",
        body:
          "100 ÷ 30.48 = 3.28084 feet, which is about 3 feet 3 3/8 inches.",
      },
      {
        title: "200 centimeters to feet",
        body:
          "200 ÷ 30.48 = 6.56168 feet, or about 6 feet 6 3/4 inches. Note that 200 cm is not 6 feet; 6 feet is 182.88 cm.",
      },
    ],
    contextTitle: "Where centimeters and feet meet",
    context: [
      "A person who is 180 cm tall is about 5 ft 11 in; 182.88 cm is exactly 6 ft.",
      "A standard interior door is about 203 cm tall, or roughly 6 ft 8 in.",
      "One meter is 100 cm, so 100 cm is about 3.28 ft.",
      "A 30 cm ruler is about 11.81 inches, slightly less than one foot.",
    ],
    faqs: [
      {
        question: "How many feet is 180 cm?",
        answer:
          "180 cm ÷ 30.48 = 5.905512 feet, or about 5 feet 10.9 inches.",
      },
      {
        question: "How do I convert cm to feet?",
        answer:
          "Divide the number of centimeters by 30.48. For example, 100 ÷ 30.48 = 3.28084 feet.",
      },
      {
        question: "How many centimeters are in a foot?",
        answer: "Exactly 30.48 centimeters.",
      },
      {
        question: "Is 200 cm equal to 6 feet?",
        answer:
          "No. 200 cm is 6.56168 feet, or about 6 ft 6.7 in. Six feet is 182.88 cm.",
      },
    ],
    note:
      "The divisor 30.48 is exact: one foot is defined as 0.3048 meters, and one meter is 100 centimeters, so 0.3048 × 100 = 30.48.",
  },
  {
    slug: "feet-to-cm",
    pairId: "ft-cm",
    menuLabel: "Feet to Centimeters (ft → cm)",
    footerLabel: "feet to cm",
    crumbLabel: "Feet to Centimeters",
    shortDescription: "convert feet to centimeters exactly.",
    title: "Feet to Centimeters Converter — ft to cm Calculator",
    description:
      "Convert feet to centimeters with a free calculator. One foot equals 30.48 cm. See the formula, a conversion chart, and examples for feet, inches, and heights.",
    h1: "Feet to Centimeters Converter",
    lead:
      "Turn feet into centimeters with an exact multiplier: 30.48 centimeters per foot.",
    body: [
      "One foot is exactly 30.48 centimeters. That makes feet-to-centimeters a multiplication problem: centimeters = feet × 30.48.",
      "If a measurement is given in feet and inches, convert it to total inches first and then multiply by 2.54. For example, 5 ft 10 in is 70 inches, and 70 × 2.54 = 177.8 cm.",
    ],
    initialValue: 6,
    chartTitle: "Feet to Centimeters Conversion Chart",
    chartCaption: "Feet to centimeters conversion chart",
    chartIntro:
      "Whole and half-foot values, with the metric equivalent in meters for reference.",
    chartValues: [1, 2, 3, 4, 5, 5.5, 6, 8, 10, 20],
    examples: [
      {
        title: "6 feet to centimeters",
        body:
          "6 × 30.48 = 182.88 centimeters. That is the same as 1.8288 meters.",
      },
      {
        title: "5.5 feet to centimeters",
        body:
          "5.5 × 30.48 = 167.64 centimeters. Half a foot adds 15.24 cm to the 5-foot value of 152.4 cm.",
      },
      {
        title: "5 feet 10 inches to centimeters",
        body:
          "First turn the height into inches: 5 × 12 + 10 = 70 inches. Then multiply by 2.54: 70 × 2.54 = 177.8 cm.",
      },
      {
        title: "1 foot to centimeters",
        body: "1 × 30.48 = 30.48 centimeters, or 0.3048 meters exactly.",
      },
    ],
    contextTitle: "Feet, inches, and centimeters in practice",
    context: [
      "A 6-foot person is 182.88 cm tall, and a 5-foot-10-inch person is 177.8 cm.",
      "A standard 80-inch interior door is 203.2 cm tall.",
      "Five feet is 152.4 cm; five and a half feet is 167.64 cm.",
      "Centimeters are the usual unit for clothing and body measurements in most countries.",
    ],
    faqs: [
      {
        question: "How many centimeters are in 6 feet?",
        answer: "6 × 30.48 = 182.88 centimeters.",
      },
      {
        question: "How many centimeters is 5 ft 10 in?",
        answer:
          "5 ft 10 in is 70 inches, and 70 × 2.54 = 177.8 centimeters.",
      },
      {
        question: "How many centimeters are in a foot?",
        answer: "Exactly 30.48 centimeters.",
      },
      {
        question: "How do I convert feet and inches to centimeters?",
        answer:
          "Convert the height to total inches (feet × 12 + inches), then multiply by 2.54. For 5 ft 8 in: 68 × 2.54 = 172.72 cm.",
      },
    ],
    note:
      "This conversion uses the international foot, defined as 0.3048 meters exactly. Multiplying feet by 30.48 gives centimeters directly.",
  },
  {
    slug: "feet-to-meters",
    pairId: "ft-m",
    menuLabel: "Feet to Meters (ft → m)",
    footerLabel: "feet to meters",
    crumbLabel: "Feet to Meters",
    shortDescription: "convert feet to meters with the exact factor.",
    title: "Feet to Meters Converter — ft to m Calculator",
    description:
      "Convert feet to meters with a free calculator. One foot equals 0.3048 meters. Includes the formula, a conversion chart, and worked examples.",
    h1: "Feet to Meters Converter",
    lead:
      "Feet-to-meters conversion is exact: multiply the number of feet by 0.3048.",
    body: [
      "One foot is defined as exactly 0.3048 meters. To convert feet to meters, multiply by 0.3048; to go back, divide by the same number.",
      "This is the standard conversion used in engineering, aviation, and sport, where a measurement may be described in feet in one document and meters in another.",
    ],
    initialValue: 6,
    chartTitle: "Feet to Meters Conversion Chart",
    chartCaption: "Feet to meters conversion chart",
    chartIntro:
      "Common feet values with the centimeter equivalent in the third column.",
    chartValues: [1, 2, 3, 4, 5, 6, 8, 10, 20, 50, 100],
    examples: [
      {
        title: "6 feet to meters",
        body: "6 × 0.3048 = 1.8288 meters, or 182.88 centimeters.",
      },
      {
        title: "100 feet to meters",
        body: "100 × 0.3048 = 30.48 meters exactly.",
      },
      {
        title: "5 feet 10 inches to meters",
        body:
          "5 ft 10 in is 70 inches and 177.8 cm, which is 1.778 meters.",
      },
      {
        title: "1 foot to meters",
        body: "1 × 0.3048 = 0.3048 meters, the definition of the foot.",
      },
    ],
    contextTitle: "Feet and meters in the real world",
    context: [
      "A 6-foot person is 1.8288 meters tall.",
      "A 100-meter sprint is 328.08399 feet.",
      "A 40-foot shipping container is 12.192 meters long.",
      "An aircraft altitude of 35,000 feet is 10,668 meters.",
    ],
    faqs: [
      {
        question: "How many meters is 6 feet?",
        answer: "6 × 0.3048 = 1.8288 meters.",
      },
      {
        question: "Is one meter equal to 3.28 feet?",
        answer:
          "Approximately. One meter is 1 ÷ 0.3048 = 3.280839895… feet, so 3.28 is a rounded shorthand.",
      },
      {
        question: "How do I convert feet to meters?",
        answer:
          "Multiply the number of feet by 0.3048. For example, 10 × 0.3048 = 3.048 meters.",
      },
      {
        question: "What is 100 feet in meters?",
        answer: "100 × 0.3048 = 30.48 meters exactly.",
      },
    ],
    note:
      "0.3048 is exact by international agreement; it is not a rounded conversion factor.",
  },
  {
    slug: "meters-to-feet",
    pairId: "m-ft",
    menuLabel: "Meters to Feet (m → ft)",
    footerLabel: "meters to feet",
    crumbLabel: "Meters to Feet",
    shortDescription: "convert meters to feet and inches.",
    title: "Meters to Feet Converter — m to ft Calculator",
    description:
      "Convert meters to feet with a free calculator. One meter equals 3.28084 feet. See the formula, conversion chart, and worked examples.",
    h1: "Meters to Feet Converter",
    lead:
      "Convert meters to feet by dividing by 0.3048, or multiply by 3.28084 for a quick estimate.",
    body: [
      "One foot is exactly 0.3048 meters, so one meter is 1 ÷ 0.3048 = 3.280839895… feet. The conversion is exact when you divide meters by 0.3048.",
      "For everyday estimates, multiplying meters by 3.28 is close enough. The calculator uses the exact factor and shows the answer rounded to six decimals, along with a feet-and-inches reading.",
    ],
    initialValue: 2,
    chartTitle: "Meters to Feet Conversion Chart",
    chartCaption: "Meters to feet conversion chart",
    chartIntro:
      "Common metric values, with the decimal-inch equivalent in the third column.",
    chartValues: [0.5, 1, 1.5, 1.8, 2, 2.5, 3, 5, 10, 100],
    examples: [
      {
        title: "2 meters to feet",
        body:
          "2 ÷ 0.3048 = 6.56168 feet, or about 6 feet 6 3/4 inches.",
      },
      {
        title: "1.8 meters to feet",
        body:
          "1.8 ÷ 0.3048 = 5.905512 feet, which is about 5 feet 10.9 inches — roughly 5 ft 11 in.",
      },
      {
        title: "100 meters to feet",
        body:
          "100 ÷ 0.3048 = 328.08399 feet, the length of a 100-meter sprint.",
      },
      {
        title: "1 meter to feet",
        body:
          "1 ÷ 0.3048 = 3.28084 feet. The exact factor is 3.280839895…, so 3.28084 is a six-decimal approximation.",
      },
    ],
    contextTitle: "Meters and feet in everyday measurements",
    context: [
      "A 2-meter measurement is about 6 ft 6.7 in, which is unusually tall for a person.",
      "A 100-meter track race covers 328.08399 feet.",
      "A 1.8-meter doorway is about 5 ft 10.9 in tall.",
      "A 3-meter room is about 9 ft 10 in long.",
    ],
    faqs: [
      {
        question: "How many feet is 2 meters?",
        answer: "2 ÷ 0.3048 = 6.56168 feet.",
      },
      {
        question: "How do I convert meters to feet?",
        answer:
          "Divide the number of meters by 0.3048, or multiply by 3.28084 for an approximate answer.",
      },
      {
        question: "What is 100 meters in feet?",
        answer: "100 ÷ 0.3048 = 328.08399 feet.",
      },
      {
        question: "Is one meter exactly 3.28 feet?",
        answer:
          "No. One meter is 3.280839895… feet. The value 3.28 is a rounded shorthand, while the calculator uses the exact divisor.",
      },
    ],
    note:
      "The exact factor comes from the international foot: 1 ft = 0.3048 m. Dividing by 0.3048 avoids compounding a rounded 3.28 multiplier.",
  },
];

export const METRIC_PAGE_MAP = new Map(
  METRIC_PAGES.map((page) => [page.slug, page]),
);

export function getMetricPage(slug: string): MetricPageContent | undefined {
  return METRIC_PAGE_MAP.get(slug);
}
