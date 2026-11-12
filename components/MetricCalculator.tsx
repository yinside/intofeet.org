"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { copyTextToClipboard } from "@/lib/clipboard";
import {
  formatInputValue,
  validateNumericInput,
} from "@/lib/conversion";
import {
  buildMetricResult,
  METRIC_PAIRS,
  METRIC_UNITS,
  type MetricPairId,
  type MetricResult,
} from "@/lib/metric";

interface MetricCalculatorProps {
  initialPairId: MetricPairId;
  initialValue?: number;
  prefillFromQuery?: boolean;
  anchorId?: string;
}

export default function MetricCalculator({
  initialPairId,
  initialValue,
  prefillFromQuery = false,
  anchorId = "calculator",
}: MetricCalculatorProps) {
  const initialPair = METRIC_PAIRS[initialPairId];
  const startingValue = initialValue ?? initialPair.defaultInput;
  const [pairId, setPairId] = useState<MetricPairId>(initialPairId);
  const [input, setInput] = useState<string>(formatInputValue(startingValue));
  const [result, setResult] = useState<MetricResult | null>(() =>
    buildMetricResult(startingValue, initialPair),
  );
  const [error, setError] = useState<string>("");
  const [copyStatus, setCopyStatus] = useState<string>("");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const uid = useId();

  const pair = METRIC_PAIRS[pairId];
  const inputId = `${uid}-input`;
  const headingId = `${uid}-heading`;
  const hintId = `${uid}-hint`;
  const errorId = `${uid}-error`;

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!prefillFromQuery) return;
    const params = new URLSearchParams(window.location.search);
    const raw = params.get(initialPair.queryKey) ?? params.get("value");
    if (!raw) return;
    const validation = validateNumericInput(
      raw,
      METRIC_UNITS[initialPair.from].plural,
    );
    if (validation.value === undefined) return;
    setPairId(initialPairId);
    setInput(formatInputValue(validation.value));
    setResult(buildMetricResult(validation.value, initialPair));
    setError("");
  }, [prefillFromQuery, initialPairId, initialPair]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateNumericInput(
      input,
      METRIC_UNITS[pair.from].plural,
    );
    if (validation.value === undefined) {
      setError(validation.error ?? "Please enter a valid number.");
      setResult(null);
      setCopyStatus("");
      return;
    }
    setError("");
    setCopyStatus("");
    setResult(buildMetricResult(validation.value, pair));
  }

  function handleReset() {
    const resetValue = initialValue ?? initialPair.defaultInput;
    setPairId(initialPairId);
    setInput(formatInputValue(resetValue));
    setResult(buildMetricResult(resetValue, initialPair));
    setError("");
    setCopyStatus("");
  }

  function handleSwap() {
    const nextPair = METRIC_PAIRS[pair.reverse];
    setPairId(nextPair.id);
    setError("");
    setCopyStatus("");

    const validation = validateNumericInput(
      input,
      METRIC_UNITS[nextPair.from].plural,
    );
    if (validation.value === undefined) {
      setResult(null);
      return;
    }
    setResult(buildMetricResult(validation.value, nextPair));
  }

  async function handleCopy() {
    if (!result) return;
    const copied = await copyTextToClipboard(result.summary);
    setCopyStatus(
      copied
        ? "Copied to clipboard."
        : "Copy failed. Select the result and copy it manually.",
    );

    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyStatus(""), 5000);
  }

  return (
    <section id={anchorId} className="calculator" aria-labelledby={headingId}>
      <div className="calc-titlebar">
        <h2 id={headingId}>{pair.title}</h2>
        <span className="calc-titlebar-badge">{pair.badge}</span>
      </div>

      <div className="calc-grid">
        <div className="calc-controls">
          <form onSubmit={handleSubmit} noValidate>
            <label className="calc-label" htmlFor={inputId}>
              {pair.inputLabel}
            </label>

            <div className="calc-input-row">
              <input
                id={inputId}
                className="calc-input"
                type="number"
                step="any"
                name={pair.from}
                inputMode="decimal"
                autoComplete="off"
                spellCheck={false}
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                  if (error) setError("");
                  if (copyStatus) setCopyStatus("");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${hintId} ${errorId}` : hintId}
              />
              <span className="calc-unit-tag" aria-hidden="true">
                {METRIC_UNITS[pair.from].short}
              </span>
            </div>

            <p id={hintId} className="calc-hint">
              Decimals, negative numbers, and values up to one trillion are accepted.
              Press Enter or click Convert.
            </p>

            <div className="calc-buttons">
              <button className="btn btn-convert" type="submit">
                Convert
              </button>
              <button className="btn" type="button" onClick={handleReset}>
                Reset
              </button>
              <button
                className="btn"
                type="button"
                onClick={handleSwap}
                title="Switch the conversion direction"
              >
                Swap Units
              </button>
            </div>

            <div className="calc-error-slot">
              {error ? (
                <p className="calc-error" id={errorId} role="alert">
                  <span aria-hidden="true">!</span> {error}
                </p>
              ) : null}
            </div>

            <noscript>
              <p className="calc-noscript">
                JavaScript is turned off, so the interactive calculator cannot update.
                The formula, tables, and worked examples on this page still apply.
              </p>
            </noscript>

            <p className="calc-formula">
              <strong>Formula:</strong> {pair.formula}
            </p>
          </form>
        </div>

        <div className="result-panel">
          <p className="result-kicker">Result</p>
          {result ? (
            <>
              <p className="result-main" aria-live="polite" aria-atomic="true">
                {result.summary}
              </p>
              <table className="result-table">
                <caption className="visually-hidden">Detailed conversion result</caption>
                <tbody>
                  {result.details.map((detail) => (
                    <tr key={detail.label}>
                      <th scope="row">{detail.label}:</th>
                      <td>{detail.value}</td>
                    </tr>
                  ))}
                  <tr>
                    <th scope="row">Calculation:</th>
                    <td>{result.calculationText}</td>
                  </tr>
                </tbody>
              </table>
              <div className="result-actions">
                <button className="btn btn-small" type="button" onClick={handleCopy}>
                  Copy Result
                </button>
                <span className="copy-status" role="status">
                  {copyStatus}
                </span>
              </div>
              <p className="result-note">
                Results are rounded to six decimal places where needed. Feet-and-inches
                values are rounded to the nearest 1/16 inch and marked with ≈.
              </p>
            </>
          ) : (
            <p className="result-empty">
              Enter a number and press Convert to see the answer.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
