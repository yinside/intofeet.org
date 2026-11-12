import { convert, formatNumber } from "@/lib/conversion";

interface AnswerPanelProps {
  inches: number;
  centimeters: number;
}

export default function AnswerPanel({ inches, centimeters }: AnswerPanelProps) {
  const conversion = convert(inches, "in-to-ft");
  const headingId = `answer-${inches}`;
  const hasFraction = conversion.fractionText.includes("/");

  return (
    <section className="answer-box" aria-labelledby={headingId}>
      <h2 id={headingId} className="answer-label">
        The Short Answer
      </h2>
      <p className="answer-equation">{conversion.summary}</p>
      <dl className={hasFraction ? "answer-details" : "answer-details answer-details-three"}>
        <div>
          <dt>Decimal</dt>
          <dd>{conversion.decimalText}</dd>
        </div>
        {hasFraction ? (
          <div>
            <dt>Fraction</dt>
            <dd>{conversion.fractionText}</dd>
          </div>
        ) : null}
        <div>
          <dt>Feet &amp; inches</dt>
          <dd>{conversion.feetInchesText}</dd>
        </div>
        <div>
          <dt>Centimeters</dt>
          <dd>{formatNumber(centimeters, 6)} cm</dd>
        </div>
      </dl>
      <p className="answer-note">
        Also written as {conversion.inputText} in = {conversion.outputText} ft.{" "}
        <a href="#calculator">Use the calculator below</a> for any other value.
      </p>
    </section>
  );
}
