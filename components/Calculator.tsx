"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  convert,
  directionLabels,
  formatInputValue,
  validateInput,
  type Conversion,
  type Direction,
} from "@/lib/conversion";
import { copyTextToClipboard } from "@/lib/clipboard";

interface CalculatorProps {
  initialDirection?: Direction;
  initialValue?: number;
  prefillFromQuery?: boolean;
  anchorId?: string;
}

function defaultInputFor(direction: Direction): number {
  return direction === "in-to-ft" ? 12 : 5;
}

export default function Calculator({
  initialDirection = "in-to-ft",
  initialValue,
  prefillFromQuery = false,
  anchorId = "calculator",
}: CalculatorProps) {
  const startingValue = initialValue ?? defaultInputFor(initialDirection);
  const [direction, setDirection] = useState<Direction>(initialDirection);
  const [input, setInput] = useState<string>(formatInputValue(startingValue));
  const [result, setResult] = useState<Conversion | null>(() =>
    convert(startingValue, initialDirection),
  );
  const [error, setError] = useState<string>("");
  const [copyStatus, setCopyStatus] = useState<string>("");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const uid = useId();

  const inputId = `${uid}-input`;
  const headingId = `${uid}-heading`;
  const hintId = `${uid}-hint`;
  const errorId = `${uid}-error`;
  const labels = directionLabels(direction);

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!prefillFromQuery) return;
    const params = new URLSearchParams(window.location.search);
    const key = initialDirection === "in-to-ft" ? "inches" : "feet";
    const raw = params.get(key) ?? params.get("value");
    if (!raw) return;
    const validation = validateInput(raw, initialDirection);
    if (validation.value === undefined) return;
    setDirection(initialDirection);
    setInput(formatInputValue(validation.value));
    setResult(convert(validation.value, initialDirection));
    setError("");
  }, [prefillFromQuery, initialDirection]);

  function handleLiveInput(raw: string) {
    setInput(raw);
    if (copyStatus) setCopyStatus("");

    if (raw.trim() === "") {
      setError("");
      setResult(null);
      return;
    }

    const validation = validateInput(raw, direction);
    if (validation.value === undefined) {
      setError(validation.error ?? "Please enter a valid number.");
      setResult(null);
      return;
    }

    setError("");
    setResult(convert(validation.value, direction));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateInput(input, direction);
    if (validation.value === undefined) {
      setError(validation.error ?? "Please enter a valid number.");
      setResult(null);
      setCopyStatus("");
      return;
    }
    setError("");
    setCopyStatus("");
    setResult(convert(validation.value, direction));
  }

  function handleReset() {
    const resetValue = initialValue ?? defaultInputFor(initialDirection);
    setDirection(initialDirection);
    setInput(formatInputValue(resetValue));
    setResult(convert(resetValue, initialDirection));
    setError("");
    setCopyStatus("");
  }

  function handleSwap() {
    const nextDirection: Direction = direction === "in-to-ft" ? "ft-to-in" : "in-to-ft";
    setDirection(nextDirection);
    setError("");
    setCopyStatus("");

    const validation = validateInput(input, nextDirection);
    if (validation.value === undefined) {
      setResult(null);
      return;
    }
    setResult(convert(validation.value, nextDirection));
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
    <section
      id={anchorId}
      className="calculator"
      aria-labelledby={headingId}
    >
      <div className="calc-titlebar">
        <h2 id={headingId}>{labels.title}</h2>
        <span className="calc-titlebar-badge">{labels.badge}</span>
      </div>

      <div className="calc-grid">
        <div className="calc-controls">
          <form onSubmit={handleSubmit} noValidate>
            <label className="calc-label" htmlFor={inputId}>
              {labels.inputLabel}
            </label>

            <div className="calc-input-row">
              <input
                id={inputId}
                className="calc-input"
                type="number"
                step="any"
                name={direction === "in-to-ft" ? "inches" : "feet"}
                inputMode="decimal"
                autoComplete="off"
                spellCheck={false}
                value={input}
                onChange={(event) => handleLiveInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${hintId} ${errorId}` : hintId}
              />
              <button
                className="calc-unit-tag"
                type="button"
                onClick={handleSwap}
                title={`Switch input from ${labels.from} to ${labels.to}`}
                aria-label={`Switch input from ${labels.from} to ${labels.to}`}
              >
                {direction === "in-to-ft" ? "in" : "ft"}
              </button>
            </div>

            <p id={hintId} className="calc-hint">
              Results update as you type. Decimals, negative numbers, and values up to
              one trillion are accepted. Click the unit tag to switch direction.
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
                title="Switch between inches to feet and feet to inches"
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
              <strong>Formula:</strong> {labels.formula}
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
                  <tr>
                    <th scope="row">Decimal:</th>
                    <td>{result.decimalText}</td>
                  </tr>
                  <tr>
                    <th scope="row">Fraction:</th>
                    <td>{result.fractionText}</td>
                  </tr>
                  <tr>
                    <th scope="row">Feet &amp; inches:</th>
                    <td>{result.feetInchesText}</td>
                  </tr>
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
                Results are rounded to six decimal places where needed. Fractional forms
                are exact unless marked with ≈.
              </p>
            </>
          ) : (
            <p className="result-empty">
              Type a value above to see the conversion.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
