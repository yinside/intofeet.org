"use client";

import { useId, useState } from "react";
import { formatNumber } from "@/lib/conversion";

interface RulerTick {
  position: number;
  kind: string;
}

const INCH_TICKS: RulerTick[] = Array.from({ length: 12 * 16 + 1 }, (_, index) => {
  const remainder = index % 16;
  let kind = "sixteenth";
  if (remainder === 0) kind = "inch";
  else if (remainder === 8) kind = "half";
  else if (remainder === 4 || remainder === 12) kind = "quarter";
  else if (remainder % 2 === 0) kind = "eighth";
  return { position: (index / (12 * 16)) * 100, kind };
});

const CM_TICKS: RulerTick[] = (() => {
  const ticks: RulerTick[] = [];
  for (let halfCentimeter = 0; halfCentimeter <= 60; halfCentimeter += 1) {
    const centimeters = halfCentimeter / 2;
    const kind =
      halfCentimeter % 10 === 0
        ? "major"
        : halfCentimeter % 2 === 0
          ? "whole"
          : "half";
    ticks.push({ position: (centimeters / 30.48) * 100, kind });
  }
  // A physical 12-inch ruler ends at exactly 30.48 centimeters.
  ticks.push({ position: 100, kind: "end" });
  return ticks;
})();

const CM_LABELS = [0, 5, 10, 15, 20, 25, 30];

export default function Ruler() {
  const [inches, setInches] = useState(6);
  const sliderId = useId();
  const noteId = `${sliderId}-note`;

  const centimeters = inches * 2.54;
  const feet = inches / 12;
  const markerPercent = (inches / 12) * 100;
  const inchWord = inches === 1 ? "inch" : "inches";
  const centimeterWord = centimeters === 1 ? "centimeter" : "centimeters";
  const footWord = feet === 1 ? "foot" : "feet";

  const readout = `${formatNumber(inches, 4)} ${inchWord} = ${formatNumber(
    centimeters,
    4,
  )} ${centimeterWord} = ${formatNumber(feet, 4)} ${footWord}`;

  return (
    <div className="ruler-panel">
      <div className="ruler-topline" aria-hidden="true">
        <span>Dual-scale ruler</span>
        <span className="ruler-range">0–12 in &bull; 0–30.48 cm</span>
      </div>

      <div className="ruler" aria-hidden="true">
        <div className="ruler-inch-labels">
          {Array.from({ length: 13 }, (_, index) => (
            <span key={index} style={{ left: `${(index / 12) * 100}%` }}>
              {index}
            </span>
          ))}
        </div>

        <div className="ruler-body">
          <div className="ruler-inch-ticks">
            {INCH_TICKS.map((tick) => (
              <span
                key={`in-${tick.position}-${tick.kind}`}
                className={`ruler-tick inch-${tick.kind}`}
                style={{ left: `${tick.position}%` }}
              />
            ))}
          </div>
          <div className="ruler-cm-ticks">
            {CM_TICKS.map((tick) => (
              <span
                key={`cm-${tick.position}-${tick.kind}`}
                className={`ruler-tick cm-${tick.kind}`}
                style={{ left: `${tick.position}%` }}
              />
            ))}
          </div>
          <span
            className="ruler-marker"
            style={{ left: `${markerPercent}%` }}
          />
        </div>

        <div className="ruler-cm-labels">
          {CM_LABELS.map((label) => (
            <span key={label} style={{ left: `${(label / 30.48) * 100}%` }}>
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="ruler-controls">
        <label htmlFor={sliderId}>Marker position (inches):</label>
        <div className="ruler-slider-row">
          <input
            id={sliderId}
            className="ruler-slider"
            type="range"
            min="0"
            max="12"
            step="0.0625"
            value={inches}
            onChange={(event) => setInches(Number(event.target.value))}
            aria-valuetext={`${formatNumber(inches, 4)} inches, ${formatNumber(
              centimeters,
              4,
            )} centimeters`}
            aria-describedby={noteId}
          />
          <output className="ruler-value" htmlFor={sliderId}>
            {formatNumber(inches, 4)} in
          </output>
        </div>
      </div>

      <p className="ruler-readout" aria-live="polite">
        {readout}
      </p>
      <p className="ruler-note" id={noteId}>
        The 12-inch mark is exactly 30.48 cm, or one foot. This is an illustrative
        on-screen scale, not a calibrated physical measuring tool; screen sizes vary.
      </p>
    </div>
  );
}
