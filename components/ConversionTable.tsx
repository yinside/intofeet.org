import {
  convert,
  formatFeetInches,
  formatNumber,
  type Direction,
} from "@/lib/conversion";

interface ConversionTableProps {
  values: number[];
  direction?: Direction;
  caption: string;
  highlight?: number;
}

export default function ConversionTable({
  values,
  direction = "in-to-ft",
  caption,
  highlight,
}: ConversionTableProps) {
  const fromLabel = direction === "in-to-ft" ? "Inches" : "Feet";
  const toLabel = direction === "in-to-ft" ? "Feet" : "Inches";

  return (
    <div className="table-wrap">
      <table className="data-table">
        <caption>{caption}</caption>
        <colgroup>
          <col className="col-from" />
          <col className="col-to" />
          <col className="col-equiv" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">{fromLabel}</th>
            <th scope="col" className="num">
              {toLabel}
            </th>
            <th scope="col" className="equiv">
              Feet &amp; inches
            </th>
          </tr>
        </thead>
        <tbody>
          {values.map((value) => {
            const conversion = convert(value, direction);
            const current = highlight !== undefined && Math.abs(value - highlight) < 1e-9;
            const equivalent = formatFeetInches(
              direction === "in-to-ft" ? value : conversion.outputValue,
            );
            return (
              <tr key={value} className={current ? "is-current" : undefined}>
                <th scope="row">
                  {formatNumber(value)}
                  {current ? (
                    <>
                      <span className="row-marker" aria-hidden="true">
                        ◄
                      </span>
                      <span className="visually-hidden"> (current value)</span>
                    </>
                  ) : null}
                </th>
                <td className="num">{formatNumber(conversion.outputValue)}</td>
                <td className="equiv">{equivalent}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
