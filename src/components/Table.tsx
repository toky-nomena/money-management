import * as React from "react";
import { Table as MantineTable } from "@mantine/core";

import cs from "classnames";

import type { Row } from "../types";
import { currencyFormatter } from "../formatters";
import { Lot } from "./Lot";

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
  const className = cs({
    loss: row.realProfit < 0,
    win: row.realProfit > 0,
  });

  return (
    <tr>
      <td>{row.index}</td>
      <td>{currencyFormatter.format(row.equity)}</td>
      <td className={className}>{currencyFormatter.format(row.realProfit)}</td>
      <td>{currencyFormatter.format(row.profit)}</td>
      <td>-{currencyFormatter.format(row.maxDrawdown)}</td>
    </tr>
  );
}
