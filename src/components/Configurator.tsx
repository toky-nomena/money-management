import * as React from "react";
import { Grid, NumberInput } from "@mantine/core";

import type { Parameters } from "../types";

function Configurator({
  state,
  setValue,
}: {
  state: Parameters;
  setValue: <K extends keyof Parameters>(key: K, value: Parameters[K]) => void;
}) {
  return (
    <Grid grow gutter="xs" className="no-print">
      <Grid.Col span={4}>
        <NumberInput
          min={5}
          label="Initial Equity (USD)"
          value={state.initialValue}
          onChange={(value) => setValue("initialValue", value || 0)}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          min={0}
          max={100}
          label="Risk Ratio (%)"
          value={state.riskRatio}
          onChange={(value) => setValue("riskRatio", value || 0)}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          min={0}
          label="Risk Reward"
          value={state.riskReward}
          onChange={(value) => setValue("riskReward", value || 0)}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          label="Win Rate (%)"
          min={0}
          max={100}
          value={state.winRate}
          disabled={!state.simulate}
          onChange={(value) => setValue("winRate", value || 0)}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          label="Period (Days)"
          value={state.period}
          onChange={(value) => setValue("period", value || 0)}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <NumberInput
          label="Leverage"
          value={state.leverage}
          onChange={(value) => setValue("leverage", value || 0)}
        />
      </Grid.Col>
    </Grid>
  );
}

export default Configurator;
