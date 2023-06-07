import { decimalFormatter } from "../formatters";
import type { Row } from "../types";

function Status(props: { rows: Row[] }) {
  if (props.rows.length <= 1) {
    return null;
  }

  const first = props.rows[0];
  const last = props.rows[props.rows.length - 1];
  const wins = props.rows.filter((row) => row.realProfit > 0);
  const winning = first.equity < last.equity;

  const rate = (last.equity / first.equity) * 100;

  const growthRate = winning ? rate : -100 + rate;

  const growthRateString = winning
    ? "+" + decimalFormatter.format(growthRate)
    : decimalFormatter.format(growthRate);

  return (
    <>
      {winning ? "Winning" : "Loosing"}: {wins.length} / {props.rows.length} -
      Growth Rate: {growthRateString}%
    </>
  );
}

export default Status;
