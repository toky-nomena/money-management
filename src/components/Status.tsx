import { Row } from "../utils";

function Status(props: { rows: Row[] }) {
  if (props.rows.length <= 1) {
    return null;
  }

  const first = props.rows[0];
  const last = props.rows[props.rows.length - 1];
  const wins = props.rows.filter((row) => row.realProfit > 0);

  return (
    <>
      Wins {wins.length} / {props.rows.length} -{" "}
      {first.equity < last.equity ? "Winning" : "Loosing"}
    </>
  );
}

export default Status;
