import {
  formatFeetInches,
  formatNumber,
  roundTo,
} from "./conversion";

export type MetricUnit = "cm" | "ft" | "m";
export type MetricPairId = "cm-ft" | "ft-cm" | "ft-m" | "m-ft";

export interface MetricUnitInfo {
  singular: string;
  plural: string;
  short: string;
  title: string;
}

export const METRIC_UNITS: Record<MetricUnit, MetricUnitInfo> = {
  cm: {
    singular: "centimeter",
    plural: "centimeters",
    short: "cm",
    title: "Centimeters",
  },
  ft: {
    singular: "foot",
    plural: "feet",
    short: "ft",
    title: "Feet",
  },
  m: {
    singular: "meter",
    plural: "meters",
    short: "m",
    title: "Meters",
  },
};

/** Exact length of each supported unit in meters. */
export const METERS_PER_UNIT: Record<MetricUnit, number> = {
  cm: 0.01,
  ft: 0.3048,
  m: 1,
};

export const CENTIMETERS_PER_FOOT = 30.48;
export const METERS_PER_FOOT = 0.3048;

export interface MetricPair {
  id: MetricPairId;
  from: MetricUnit;
  to: MetricUnit;
  reverse: MetricPairId;
  inputLabel: string;
  title: string;
  badge: string;
  formula: string;
  formulaSub: string;
  defaultInput: number;
  queryKey: string;
}

export const METRIC_PAIRS: Record<MetricPairId, MetricPair> = {
  "cm-ft": {
    id: "cm-ft",
    from: "cm",
    to: "ft",
    reverse: "ft-cm",
    inputLabel: "Enter Centimeters:",
    title: "Centimeters to Feet Calculator",
    badge: "cm → ft",
    formula: "Feet = Centimeters ÷ 30.48",
    formulaSub: "1 foot = 30.48 centimeters",
    defaultInput: 180,
    queryKey: "cm",
  },
  "ft-cm": {
    id: "ft-cm",
    from: "ft",
    to: "cm",
    reverse: "cm-ft",
    inputLabel: "Enter Feet:",
    title: "Feet to Centimeters Calculator",
    badge: "ft → cm",
    formula: "Centimeters = Feet × 30.48",
    formulaSub: "1 foot = 30.48 centimeters",
    defaultInput: 6,
    queryKey: "ft",
  },
  "ft-m": {
    id: "ft-m",
    from: "ft",
    to: "m",
    reverse: "m-ft",
    inputLabel: "Enter Feet:",
    title: "Feet to Meters Calculator",
    badge: "ft → m",
    formula: "Meters = Feet × 0.3048",
    formulaSub: "1 foot = 0.3048 meters",
    defaultInput: 6,
    queryKey: "ft",
  },
  "m-ft": {
    id: "m-ft",
    from: "m",
    to: "ft",
    reverse: "ft-m",
    inputLabel: "Enter Meters:",
    title: "Meters to Feet Calculator",
    badge: "m → ft",
    formula: "Feet = Meters ÷ 0.3048",
    formulaSub: "1 meter ≈ 3.28084 feet",
    defaultInput: 2,
    queryKey: "m",
  },
};

export function getMetricPair(id: MetricPairId): MetricPair {
  return METRIC_PAIRS[id];
}

export function metricUnitName(unit: MetricUnit, value: number): string {
  const singular = Math.abs(value) === 1;
  const info = METRIC_UNITS[unit];
  return singular ? info.singular : info.plural;
}

export function convertMetric(
  value: number,
  from: MetricUnit,
  to: MetricUnit,
): number {
  return (value * METERS_PER_UNIT[from]) / METERS_PER_UNIT[to];
}

export interface MetricExtraDetail {
  label: string;
  value: string;
}

/** A second useful reading for the table and result panel. */
export function getMetricExtraDetail(
  inputValue: number,
  pair: MetricPair,
): MetricExtraDetail {
  const meters = inputValue * METERS_PER_UNIT[pair.from];

  switch (pair.id) {
    case "cm-ft":
      return {
        label: "Inches",
        value: `${formatNumber(meters / 0.0254)} in`,
      };
    case "ft-cm":
      return {
        label: "Meters",
        value: `${formatNumber(meters)} m`,
      };
    case "ft-m":
      return {
        label: "Centimeters",
        value: `${formatNumber(meters * 100)} cm`,
      };
    case "m-ft":
      return {
        label: "Centimeters",
        value: `${formatNumber(inputValue * 100)} cm`,
      };
  }
}

export interface MetricResult {
  pair: MetricPair;
  inputValue: number;
  outputValue: number;
  inputText: string;
  outputText: string;
  summary: string;
  decimalText: string;
  feetInchesText: string;
  details: MetricExtraDetail[];
  calculationText: string;
  rounded: boolean;
}

function metricNumberText(value: number): string {
  const rounded = roundTo(value);
  if (rounded === 0 && value !== 0) {
    return formatNumber(value, 12);
  }
  return formatNumber(value);
}

function metricValueText(value: number, unit: MetricUnit): string {
  return `${metricNumberText(value)} ${metricUnitName(unit, roundTo(value))}`;
}

export function buildMetricResult(
  inputValue: number,
  pair: MetricPair,
): MetricResult {
  const meters = inputValue * METERS_PER_UNIT[pair.from];
  const outputValue = meters / METERS_PER_UNIT[pair.to];
  const outputRounded = roundTo(outputValue);
  const inputText = formatNumber(inputValue);
  const outputText =
    outputRounded === 0 && outputValue !== 0
      ? formatNumber(outputValue, 12)
      : formatNumber(outputValue);

  const summary = `${inputText} ${metricUnitName(pair.from, inputValue)} = ${outputText} ${metricUnitName(
    pair.to,
    outputRounded,
  )}`;

  const totalInches = meters / 0.0254;
  const feetInchesText = formatFeetInches(totalInches);
  const decimalText = metricValueText(outputValue, pair.to);
  const extra = getMetricExtraDetail(inputValue, pair);

  let calculationText: string;
  switch (pair.id) {
    case "cm-ft":
      calculationText = `${inputText} ÷ ${CENTIMETERS_PER_FOOT} = ${outputText}`;
      break;
    case "ft-cm":
      calculationText = `${inputText} × ${CENTIMETERS_PER_FOOT} = ${outputText}`;
      break;
    case "ft-m":
      calculationText = `${inputText} × ${METERS_PER_FOOT} = ${outputText}`;
      break;
    case "m-ft":
      calculationText = `${inputText} ÷ ${METERS_PER_FOOT} = ${outputText}`;
      break;
  }

  return {
    pair,
    inputValue,
    outputValue,
    inputText,
    outputText,
    summary,
    decimalText,
    feetInchesText,
    details: [
      { label: "Decimal", value: decimalText },
      { label: "Feet & inches", value: feetInchesText },
      extra,
    ],
    calculationText,
    rounded: Math.abs(outputRounded - outputValue) > 1e-9,
  };
}
