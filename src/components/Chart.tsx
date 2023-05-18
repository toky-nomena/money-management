import * as React from "react";
import { Row } from "../utils";
import { Chart as ReactChart, AxisOptions } from "react-charts";

type Series = {
  label: string;
  data: Row[];
};

export default function Chart(props: { rows: Row[] }) {
  const primaryAxis = React.useMemo(
    (): AxisOptions<Row> => ({
      getValue: (datum) => datum.index,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<Row>[] => [
      {
        getValue: (datum) => datum.equity,
      },
    ],
    []
  );

  const data: Series[] = [{ label: "Equity", data: props.rows }];

  return (
    <ReactChart
      options={{
        data,
        primaryAxis,
        secondaryAxes,
      }}
    />
  );
}
