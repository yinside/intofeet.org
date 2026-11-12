import {
  convertMetric,
  getMetricExtraDetail,
  METRIC_PAIRS,
  METRIC_UNITS,
  type MetricPairId,
} from "@/lib/metric";
import { formatNumber } from "@/lib/conversion";

interface MetricTableProps {
  values: number[];
  pairId: MetricPairId;
  caption: string;
  highlight?: number;
}

export default function MetricTable({
  values,
  pairId,
  caption,
  highlight,
}: MetricTableProps) {
  const pair = METRIC_PAIRS[pairId];
  const fromLabel = METRIC_UNITS[pair.from].title;
  const toLabel = METRIC_UNITS[pair.to].title;
  const extraLabel =
    values.length > 0 ? getMetricExtraDetail(values[0], pair).label : "Equivalent";

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
              {extraLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {values.map((value) => {
            const converted = convertMetric(value, pair.from, pair.to);
            const extra = getMetricExtraDetail(value, pair);
            const current = highlight !== undefined && Math.abs(value - highlight) < 1e-9;
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
                <td className="num">{formatNumber(converted)}</td>
                <td className="equiv">{extra.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
