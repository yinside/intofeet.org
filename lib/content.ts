export interface FaqItem {
  question: string;
  answer: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface ConversionPageContent {
  slug: string;
  inches: number;
  title: string;
  description: string;
  h1: string;
  lead: string;
  body: string[];
  contextTitle: string;
  context: string[];
  nearby: number[];
  note: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/inches-to-feet/", label: "Inches to Feet" },
  { href: "/feet-to-inches/", label: "Feet to Inches" },
  { href: "/about/", label: "About" },
];

export const FOOTER_LINKS: NavLink[] = [
  { href: "/about/", label: "About Us" },
  { href: "/contact/", label: "Contact" },
  { href: "/privacy/", label: "Privacy Policy" },
  { href: "/disclaimer/", label: "Disclaimer" },
  { href: "/sitemap.xml", label: "Sitemap" },
];

export const COMMON_CONVERSIONS: Array<{ inches: number; href: string }> = [
  { inches: 1, href: "/1-inch-to-feet/" },
  { inches: 2, href: "/inches-to-feet/?inches=2" },
  { inches: 3, href: "/inches-to-feet/?inches=3" },
  { inches: 6, href: "/inches-to-feet/?inches=6" },
  { inches: 10, href: "/inches-to-feet/?inches=10" },
  { inches: 12, href: "/12-inches-to-feet/" },
  { inches: 18, href: "/inches-to-feet/?inches=18" },
  { inches: 24, href: "/24-inches-to-feet/" },
  { inches: 30, href: "/inches-to-feet/?inches=30" },
  { inches: 36, href: "/36-inches-to-feet/" },
  { inches: 48, href: "/inches-to-feet/?inches=48" },
  { inches: 60, href: "/60-inches-to-feet/" },
  { inches: 72, href: "/72-inches-to-feet/" },
  { inches: 100, href: "/inches-to-feet/?inches=100" },
];

export const HOME_FAQS: FaqItem[] = [
  {
    question: "How many feet are in an inch?",
    answer:
      "There is 1/12 of a foot in one inch. As a decimal, 1 inch = 0.083333 feet (rounded to six places). The exact value is 0.0833333…, which is why the fraction is often clearer than the decimal.",
  },
  {
    question: "How many inches make one foot?",
    answer:
      "Exactly 12 inches make one foot. The foot is defined as 12 inches in both the imperial and U.S. customary systems, so this part of the conversion never changes.",
  },
  {
    question: "How do I convert inches to feet?",
    answer:
      "Divide the number of inches by 12. For example, 36 inches ÷ 12 = 3 feet. For a value that does not divide evenly, the decimal answer shows the remainder as part of a foot; 18 inches ÷ 12 = 1.5 feet.",
  },
  {
    question: "How many feet is 60 inches?",
    answer:
      "60 inches equals exactly 5 feet, because 60 ÷ 12 = 5. In metric terms, 60 inches is 152.4 centimeters, or 1.524 meters.",
  },
  {
    question: "Is 12 inches equal to 1 foot?",
    answer:
      "Yes. Twelve inches is exactly one foot, not an approximation. This relationship is the basis of every conversion on this page.",
  },
  {
    question: "How do I convert decimal inches to feet?",
    answer:
      "Divide the decimal number of inches by 12 just as you would a whole number. For 18.5 inches: 18.5 ÷ 12 = 1.541667 feet. You can also split it into 18 inches (1 foot 6 inches) plus 0.5 inches, for 1 foot 6.5 inches.",
  },
];

export const HUB_FAQS: FaqItem[] = [
  {
    question: "What is 5 feet 10 inches in decimal feet?",
    answer:
      "5 feet 10 inches equals 5.833333 feet. Convert the 10 inches first: 10 ÷ 12 = 0.833333, then add the 5 whole feet. The same height is 70 inches in total.",
  },
  {
    question: "Why are there 12 inches in a foot?",
    answer:
      "The 12-part foot is ancient, tracing back to Roman measurement practice. The modern international foot was fixed at exactly 0.3048 meters by international agreement in 1959, and it still contains 12 inches.",
  },
  {
    question: "How many feet is 1 inch, exactly?",
    answer:
      "Exactly 1/12 of a foot, or 0.0833333… feet. The decimal never terminates, so 0.083333 is a rounded six-decimal answer rather than the exact value.",
  },
  {
    question: "Do I divide by 144 to convert square inches to square feet?",
    answer:
      "Yes. Area conversions use 144 because 12 × 12 = 144 square inches in one square foot. Dividing a linear inch value by 12 only works for length, not area.",
  },
];

export const REVERSE_FAQS: FaqItem[] = [
  {
    question: "How many inches are in 5 feet?",
    answer:
      "5 feet equals 60 inches. Multiply the number of feet by 12: 5 × 12 = 60.",
  },
  {
    question: "How tall is 5 feet 11 inches in inches?",
    answer:
      "5 feet 11 inches is 71 inches in total. Five feet is 60 inches, and 11 more inches brings the total to 71.",
  },
  {
    question: "What is 6.5 feet in inches?",
    answer:
      "6.5 feet equals 78 inches. Multiply 6.5 by 12: 6.5 × 12 = 78.",
  },
  {
    question: "How do I turn feet and inches into decimal feet?",
    answer:
      "Keep the feet, divide the inches by 12, and add the two parts. For 5 foot 8 inches: 5 + (8 ÷ 12) = 5.666667 feet.",
  },
];

export const CONVERSION_PAGES: ConversionPageContent[] = [
  {
    slug: "1-inch-to-feet",
    inches: 1,
    title: "1 Inch to Feet — How Many Feet Is 1 Inch?",
    description:
      "1 inch equals 0.083333 feet, or exactly 1/12 of a foot. See the conversion, the formula, a free calculator, and nearby inch-to-foot values.",
    h1: "1 Inch to Feet",
    lead:
      "One inch is a small measurement — roughly the width of a thumb — and it works out to one-twelfth of a foot.",
    body: [
      "Because a foot contains 12 equal inches, a single inch is 1 ÷ 12 of a foot. In decimal form that is 0.0833333… feet, usually rounded to 0.083333 for everyday work.",
      "The fraction is the cleaner answer here: 1 inch = 1/12 foot. Keep that in mind when you are adding several small measurements; twelve separate inches make one full foot.",
    ],
    contextTitle: "How small is one inch?",
    context: [
      "An inch is exactly 2.54 centimeters, or 25.4 millimeters.",
      "A standard ruler usually marks 16 ticks per inch, so one inch spans sixteen 1/16-inch marks.",
      "A U.S. quarter is about 0.955 inches across — close to one inch, but not quite.",
      "A thumb is a handy rough gauge for an inch, though real thumb widths vary a lot.",
    ],
    nearby: [0.5, 0.75, 1, 1.5, 2, 3],
    note:
      "This page uses the international foot, defined as exactly 0.3048 meters in 1959. Because the foot and inch are both defined from that same standard, 1 inch is exactly 1/12 foot.",
  },
  {
    slug: "12-inches-to-feet",
    inches: 12,
    title: "12 Inches to Feet — How Many Feet Is 12 Inches?",
    description:
      "12 inches equals exactly 1 foot. Convert 12 inches to feet with our free calculator, see the decimal and fraction, and try nearby values.",
    h1: "12 Inches to Feet",
    lead:
      "Twelve inches is not just close to a foot — it is the definition of one.",
    body: [
      "Divide 12 by 12 and the answer is exactly 1. No rounding, no remainder: 12 inches = 1 foot. The result is just as exact in the other direction, because 1 foot = 12 inches.",
      "This is the anchor point for every other conversion on the site. Once you know that 12 inches make a foot, converting feet to inches is multiplication, and converting inches to feet is division.",
    ],
    contextTitle: "What is about 12 inches long?",
    context: [
      "A standard school ruler is 12 inches, or one foot, long.",
      "A 12-inch vinyl LP measures 12 inches across, which is where the format gets its name.",
      "A sheet of U.S. letter paper is 11 inches long — one inch short of a foot.",
      "Twelve inches is 30.48 centimeters, or 0.3048 meters.",
    ],
    nearby: [6, 9, 10, 11, 12, 13, 14, 18, 24],
    note:
      "The number 12 is exact here, not rounded. If you see 12 inches listed as 1.0 feet, the .0 is just a formatting choice; the value is still exactly one foot.",
  },
  {
    slug: "24-inches-to-feet",
    inches: 24,
    title: "24 Inches to Feet — How Many Feet Is 24 Inches?",
    description:
      "24 inches equals exactly 2 feet. Convert 24 inches with a free calculator, see the formula and metric equivalent, and browse nearby conversions.",
    h1: "24 Inches to Feet",
    lead:
      "Twenty-four inches is exactly two feet — the length of two standard rulers placed end to end.",
    body: [
      "To convert 24 inches to feet, divide by 12: 24 ÷ 12 = 2. The answer is a whole number, so there is no decimal remainder to round and no fraction to reduce.",
      "The same length can be written as 2 feet, 2 ft, or 24 inches. In metric units it is 60.96 centimeters, or about 0.61 meters.",
    ],
    contextTitle: "Where do you meet 24 inches?",
    context: [
      "Many kitchen base cabinets are about 24 inches deep, which is why a standard countertop is roughly two feet front to back.",
      "A 24-inch monitor is measured diagonally, so the screen itself is not 24 inches wide.",
      "Two feet is a comfortable step length for many adults, though stride varies by person.",
      "A standard interior door is about 80 inches tall; 24 inches is less than a third of that height.",
    ],
    nearby: [12, 18, 20, 22, 24, 26, 28, 30, 36],
    note:
      "24 inches is exactly 2 feet because 24 is a multiple of 12. There is no need for a fraction or a rounded decimal in this conversion.",
  },
  {
    slug: "36-inches-to-feet",
    inches: 36,
    title: "36 Inches to Feet — How Many Feet Is 36 Inches?",
    description:
      "36 inches equals exactly 3 feet, which is also 1 yard. Convert 36 inches to feet with our free calculator and see the formula and examples.",
    h1: "36 Inches to Feet",
    lead:
      "Thirty-six inches is exactly three feet. It is also the length of one yard, a unit still used for fabric and landscaping.",
    body: [
      "Divide 36 by 12 to get 3 exactly: 36 ÷ 12 = 3 feet. Because 36 inches is also 1 yard, this is one of the few conversions with two familiar names.",
      "In metric terms, 36 inches is 91.44 centimeters, or 0.9144 meters. A meter is slightly longer than a yard, so 36 inches falls just short of one meter.",
    ],
    contextTitle: "Where does 36 inches turn up?",
    context: [
      "A yardstick is 36 inches long and is still used in sewing, crafting, and some classrooms.",
      "A standard exterior door is often 36 inches wide, though openings and door styles vary.",
      "Kitchen counters are commonly about 36 inches high, which is convenient for standing work.",
      "Fabric sold by the yard is sold in 36-inch lengths, so 2 yards is 72 inches.",
    ],
    nearby: [30, 32, 33, 34, 36, 38, 40, 42, 48],
    note:
      "36 inches is exactly 3 feet and exactly 1 yard. The yard is defined as 0.9144 meters, which follows directly from the 0.3048-meter foot.",
  },
  {
    slug: "60-inches-to-feet",
    inches: 60,
    title: "60 Inches to Feet — How Many Feet Is 60 Inches?",
    description:
      "60 inches equals exactly 5 feet, or 152.4 centimeters. Convert 60 inches to feet with a free calculator and see the formula and nearby values.",
    h1: "60 Inches to Feet",
    lead:
      "Sixty inches is exactly five feet, a height people often recognize at a glance.",
    body: [
      "Divide 60 by 12 and you get 5 with nothing left over: 60 ÷ 12 = 5 feet. The conversion is exact, so the decimal form is simply 5.0.",
      "In metric units, 60 inches is 152.4 centimeters or 1.524 meters. A height of 5 feet is also 1.524 meters when written in meters.",
    ],
    contextTitle: "What does 60 inches measure?",
    context: [
      "A standard bathtub is often about 60 inches long, which is one reason five feet is a familiar bathroom dimension.",
      "A queen-size mattress is 60 inches wide and 80 inches long.",
      "A typical interior door is about 80 inches tall, so 60 inches is 20 inches shorter than the door.",
      "60 inches is 5 feet exactly — a common way to describe a person's height.",
    ],
    nearby: [48, 54, 57, 58, 60, 62, 63, 66, 72],
    note:
      "Because 60 is a multiple of 12, this conversion has no remainder. Five feet is exact, not an approximation rounded to the nearest foot.",
  },
  {
    slug: "72-inches-to-feet",
    inches: 72,
    title: "72 Inches to Feet — How Many Feet Is 72 Inches?",
    description:
      "72 inches equals exactly 6 feet, or 182.88 centimeters. Convert 72 inches to feet with a free calculator, formula, and nearby examples.",
    h1: "72 Inches to Feet",
    lead:
      "Seventy-two inches is exactly six feet — often used as shorthand for a tall adult height.",
    body: [
      "Divide 72 by 12 to get 6 exactly: 72 ÷ 12 = 6 feet. The answer is a whole number, so there is no need to round or reduce a fraction.",
      "Six feet is 182.88 centimeters or 1.8288 meters. In feet-and-inches notation, 72 inches is simply 6'0\".",
    ],
    contextTitle: "How long is 72 inches?",
    context: [
      "A standard interior door is about 80 inches tall, so 72 inches is eight inches shorter than the door.",
      "Six feet is a common way to describe a tall adult, though actual heights are usually given in feet and inches.",
      "An old-fashioned six-foot ruler or measuring stick is 72 inches long.",
      "A yard is 36 inches, so 72 inches is exactly 2 yards.",
    ],
    nearby: [60, 66, 68, 69, 70, 72, 74, 75, 78, 84],
    note:
      "72 inches is exactly 6 feet and exactly 2 yards. Since 72 is divisible by 12, the decimal answer is a clean 6 rather than a repeating decimal.",
  },
];

export const CONVERSION_PAGE_MAP = new Map(
  CONVERSION_PAGES.map((page) => [page.slug, page]),
);

export function getConversionPage(slug: string): ConversionPageContent | undefined {
  return CONVERSION_PAGE_MAP.get(slug);
}
