export const INCHES_PER_FOOT = 12;

/** Values accepted by the calculator are capped so the 16th-of-an-inch display
 *  stays inside JavaScript's safe integer range. One trillion is still a lot of
 *  inches. */
export const MAX_INPUT = 1_000_000_000_000;
export const MAX_DECIMALS = 6;

export type Direction = "in-to-ft" | "ft-to-in";
export type LengthUnit = "inch" | "foot";

export interface Fraction {
  negative: boolean;
  whole: number;
  numerator: number;
  denominator: number;
  approximate: boolean;
}

export interface Conversion {
  direction: Direction;
  inputValue: number;
  outputValue: number;
  inputText: string;
  outputText: string;
  inputUnit: LengthUnit;
  outputUnit: LengthUnit;
  summary: string;
  decimalText: string;
  fractionText: string;
  feetInchesText: string;
  calculationText: string;
  rounded: boolean;
}

export interface ValidationResult {
  value?: number;
  error?: string;
}

const NUMBER_PATTERN =
  /^[+-]?(?:(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;

function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    const remainder = x % y;
    x = y;
    y = remainder;
  }
  return x || 1;
}

/** Round half away from zero, avoiding common floating point artifacts. */
export function roundTo(value: number, decimals = MAX_DECIMALS): number {
  if (!Number.isFinite(value)) return value;
  const factor = 10 ** decimals;
  const rounded = Math.sign(value) * (Math.round((Math.abs(value) + Number.EPSILON) * factor) / factor);
  return Object.is(rounded, -0) ? 0 : rounded;
}

export function formatNumber(value: number, decimals = MAX_DECIMALS): string {
  if (!Number.isFinite(value)) return "";
  const rounded = roundTo(value, decimals);
  if (rounded === 0) return "0";
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
    useGrouping: true,
  });
  return formatter.format(rounded);
}

export function pluralUnit(unit: LengthUnit, value: number): string {
  const singular = Math.abs(value) === 1;
  if (unit === "foot") return singular ? "foot" : "feet";
  return singular ? "inch" : "inches";
}

/** Format a value for an <input> without thousands separators. */
export function formatInputValue(value: number): string {
  return String(roundTo(value, 10));
}

export function validateNumericInput(
  raw: string,
  unitPlural: string,
): ValidationResult {
  const trimmed = raw.trim();

  if (trimmed === "") {
    return { error: `Please enter a number of ${unitPlural}.` };
  }

  if (!NUMBER_PATTERN.test(trimmed)) {
    return {
      error: `That doesn't look like a number. Use digits, an optional minus sign, and a decimal point if needed.`,
    };
  }

  const value = Number(trimmed.replace(/,/g, ""));

  if (!Number.isFinite(value)) {
    return { error: `Please enter a valid number of ${unitPlural}.` };
  }

  if (Math.abs(value) > MAX_INPUT) {
    return {
      error: `For accuracy, please enter an amount no larger than ${formatNumber(MAX_INPUT, 0)}.`,
    };
  }

  return { value: Object.is(value, -0) ? 0 : value };
}

export function validateInput(raw: string, direction: Direction): ValidationResult {
  return validateNumericInput(raw, direction === "in-to-ft" ? "inches" : "feet");
}

/** Find the best exact fraction with a small denominator. Returns null when the
 *  decimal cannot be represented neatly. */
export function findFraction(
  value: number,
  maxDenominator = 64,
  tolerance = 1e-9,
): Fraction | null {
  if (!Number.isFinite(value)) return null;
  const negative = value < 0;
  const absolute = Math.abs(value);

  if (absolute === 0) {
    return {
      negative: false,
      whole: 0,
      numerator: 0,
      denominator: 1,
      approximate: false,
    };
  }

  let best: { numerator: number; denominator: number; error: number } | null = null;

  for (let denominator = 1; denominator <= maxDenominator; denominator += 1) {
    const numerator = Math.round(absolute * denominator);
    const error = Math.abs(absolute - numerator / denominator);
    if (error <= tolerance && (!best || error < best.error)) {
      best = { numerator, denominator, error };
      if (error === 0) break;
    }
  }

  if (!best || best.numerator === 0) {
    // No exact small fraction. Offer a readable approximation only when it is
    // genuinely close (within 5%), otherwise leave the fraction out.
    let closest: { numerator: number; denominator: number; error: number } | null = null;
    for (let denominator = 1; denominator <= 16; denominator += 1) {
      const numerator = Math.round(absolute * denominator);
      if (numerator === 0) continue;
      const error = Math.abs(absolute - numerator / denominator);
      if (!closest || error < closest.error) {
        closest = { numerator, denominator, error };
      }
    }
    if (!closest || closest.error / absolute > 0.05) return null;
    const divisor = gcd(closest.numerator, closest.denominator);
    const numerator = closest.numerator / divisor;
    const denominator = closest.denominator / divisor;
    return {
      negative,
      whole: Math.floor(numerator / denominator),
      numerator: numerator % denominator,
      denominator,
      approximate: true,
    };
  }

  const divisor = gcd(best.numerator, best.denominator);
  const numerator = best.numerator / divisor;
  const denominator = best.denominator / divisor;

  return {
    negative,
    whole: Math.floor(numerator / denominator),
    numerator: numerator % denominator,
    denominator,
    approximate: false,
  };
}

export function formatFraction(fraction: Fraction, unit: LengthUnit): string {
  const abbreviation = unit === "foot" ? "ft" : "in";
  const sign = fraction.negative ? "-" : "";
  const prefix = fraction.approximate ? "≈ " : "";
  const wholePart =
    fraction.whole > 0 ? `${fraction.whole.toLocaleString("en-US")}` : "";

  if (fraction.numerator === 0) {
    return `${prefix}${sign}${wholePart || "0"} ${abbreviation}`;
  }

  const fractionPart =
    fraction.whole > 0
      ? `${wholePart} ${fraction.numerator}/${fraction.denominator}`
      : `${fraction.numerator}/${fraction.denominator}`;

  return `${prefix}${sign}${fractionPart} ${abbreviation}`;
}

/** Render total inches as feet + inches, rounded to the nearest 1/16 inch. */
export function formatFeetInches(totalInches: number): string {
  if (!Number.isFinite(totalInches)) return "";
  const negative = totalInches < 0;
  const absolute = Math.abs(totalInches);
  if (absolute === 0) return "0 in";

  const precision = 16;
  const totalSixteenths = Math.round(absolute * precision);
  const sixteenthsPerFoot = INCHES_PER_FOOT * precision;
  const feet = Math.floor(totalSixteenths / sixteenthsPerFoot);
  const remainder = totalSixteenths % sixteenthsPerFoot;
  const wholeInches = Math.floor(remainder / precision);
  let fractionNumerator = remainder % precision;
  let fractionDenominator = precision;

  if (fractionNumerator > 0) {
    const divisor = gcd(fractionNumerator, fractionDenominator);
    fractionNumerator /= divisor;
    fractionDenominator /= divisor;
  }

  const approximate = Math.abs(absolute * precision - totalSixteenths) > 1e-9;
  const sign = negative ? "-" : "";

  let inchPart = "";
  if (wholeInches > 0 || fractionNumerator > 0) {
    if (wholeInches > 0 && fractionNumerator > 0) {
      inchPart = `${wholeInches} ${fractionNumerator}/${fractionDenominator} in`;
    } else if (fractionNumerator > 0) {
      inchPart = `${fractionNumerator}/${fractionDenominator} in`;
    } else {
      inchPart = `${wholeInches} in`;
    }
  }

  const feetText = feet.toLocaleString("en-US");
  let text = "";
  if (feet > 0 && inchPart) {
    text = `${feetText} ft ${inchPart}`;
  } else if (feet > 0) {
    text = `${feetText} ft`;
  } else if (inchPart) {
    text = inchPart;
  } else {
    text = "0 in";
  }

  return `${approximate ? "≈ " : ""}${sign}${text}`;
}

function decimalText(value: number, unit: LengthUnit): string {
  if (value !== 0 && Math.abs(value) < 0.000001) {
    // Show enough significant digits for very small inputs instead of printing 0.
    const tiny = formatNumber(value, 12);
    return `${tiny} ${pluralUnit(unit, value)}`;
  }
  return `${formatNumber(value)} ${pluralUnit(unit, value)}`;
}

function fractionTextFor(value: number, unit: LengthUnit): string {
  const fraction = findFraction(value);
  if (!fraction) return "—";
  return formatFraction(fraction, unit);
}

export function convert(value: number, direction: Direction): Conversion {
  const isInchesToFeet = direction === "in-to-ft";
  const inputUnit: LengthUnit = isInchesToFeet ? "inch" : "foot";
  const outputUnit: LengthUnit = isInchesToFeet ? "foot" : "inch";
  const outputValue = isInchesToFeet ? value / INCHES_PER_FOOT : value * INCHES_PER_FOOT;
  const inputText = formatNumber(value);
  const outputRounded = roundTo(outputValue);
  // Very small non-zero results would round to "0" at six decimals. Show extra
  // precision in that case rather than claiming the answer is exactly zero.
  const outputText =
    outputRounded === 0 && outputValue !== 0
      ? formatNumber(outputValue, 12)
      : formatNumber(outputValue);

  const summary = `${inputText} ${pluralUnit(inputUnit, value)} = ${outputText} ${pluralUnit(
    outputUnit,
    outputRounded,
  )}`;

  const totalInches = isInchesToFeet ? value : outputValue;
  const decimal = decimalText(outputValue, outputUnit);
  const fraction = fractionTextFor(outputValue, outputUnit);
  const feetInches = formatFeetInches(totalInches);

  const calculation = isInchesToFeet
    ? `${inputText} ÷ ${INCHES_PER_FOOT} = ${outputText}`
    : `${inputText} × ${INCHES_PER_FOOT} = ${outputText}`;

  return {
    direction,
    inputValue: value,
    outputValue,
    inputText,
    outputText,
    inputUnit,
    outputUnit,
    summary,
    decimalText: decimal,
    fractionText: fraction,
    feetInchesText: feetInches,
    calculationText: calculation,
    rounded: Math.abs(outputRounded - outputValue) > 1e-9,
  };
}

export function directionLabels(direction: Direction): {
  from: string;
  to: string;
  inputLabel: string;
  title: string;
  badge: string;
  formula: string;
  swapLabel: string;
} {
  if (direction === "in-to-ft") {
    return {
      from: "inches",
      to: "feet",
      inputLabel: "Enter Inches:",
      title: "Inches to Feet Calculator",
      badge: "in → ft",
      formula: "Feet = Inches ÷ 12",
      swapLabel: "Swap to Feet → Inches",
    };
  }
  return {
    from: "feet",
    to: "inches",
    inputLabel: "Enter Feet:",
    title: "Feet to Inches Calculator",
    badge: "ft → in",
    formula: "Inches = Feet × 12",
    swapLabel: "Swap to Inches → Feet",
  };
}
