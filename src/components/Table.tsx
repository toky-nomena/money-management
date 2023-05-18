import * as React from "react";
import { Table as MantineTable } from "@mantine/core";

import cs from "classnames";

import { Row } from "../utils";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Table(props: { rows: Row[] }) {
  return (
    <MantineTable>
      <thead>
        <tr>
          <th>Day</th>
          <th>Equity</th>
          <th>Real Profit</th>
          <th>Expected Profit</th>
          <th>Drawdown Max</th>
        </tr>
      </thead>
      <tbody>
        <React.Fragment>
          {props.rows.map((row) => (
            <TableRow key={row.id} row={row} />
          ))}
        </React.Fragment>
      </tbody>
    </MantineTable>
  );
}

function TableRow({ row }: { row: Row }) {
  const classes = cs({
    loss: row.realProfit < 0,
    win: row.realProfit > 0,
  });

  return (
    <tr>
      <td>{row.index}</td>
      <td>{formatter.format(row.equity)}</td>
      <td className={classes}>{formatter.format(row.realProfit)}</td>
      <td>{formatter.format(row.profit)}</td>
      <td>-{formatter.format(row.maxDrawdown)}</td>
    </tr>
  );
}
