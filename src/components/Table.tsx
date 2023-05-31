import * as React from "react";
import { Table as MantineTable } from "@mantine/core";

import cs from "classnames";

import { Row } from "../utils";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const lotFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

const compactLotFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
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
          <th>Lot</th>
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
      <td>
        <LotCell lot={row.lot} />
      </td>
    </tr>
  );
}

function getMaxLot(lot: number): number {
  if (lot <= 10) {
    return lot;
  }

  if (lot < 1000) {
    return Math.ceil(lot / 10);
  }

  return 100;
}

function LotCell({ lot }: { lot: number }) {
  const maxLot = getMaxLot(lot);

  const quotient = Math.floor(lot / maxLot);

  if (maxLot < 10) {
    return (
      <>
        {lot % 1 != 0
          ? lotFormatter.format(lot)
          : compactLotFormatter.format(lot)}
      </>
    );
  }

  const remainder = compactLotFormatter.format(quotient);

  return (
    <>
      {maxLot} x {remainder} ({compactLotFormatter.format(lot)})
    </>
  );
}
