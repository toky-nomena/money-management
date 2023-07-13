import * as React from "react";
import { Flex, Checkbox, Text } from "@mantine/core";

import { generateRows, getState, persistState } from "./utils";
import type { Parameters } from "./types";
import Configurator from "./components/Configurator";
import Table from "./components/Table";
import Status from "./components/Status";

export default function App() {
  const [state, setState] = React.useReducer(
    (state: Parameters, updates: Partial<Parameters>): Parameters => ({
      ...state,
      ...updates,
    }),
    getState()
  );

  const setValue = React.useCallback(
    <K extends keyof Parameters>(key: K, value: Parameters[K]) => {
      setState({ ...state, [key]: value });
    },
    [setState, state]
  );

  React.useEffect(() => persistState(state), [state]);
  React.useEffect(() => {
    document.title =
      "MM_" +
      "" +
      state.initialValue +
      "_RK" +
      state.riskRatio +
      "_RR" +
      state.riskReward +
      "_P" +
      state.period +
      "_WR" +
      state.winRate;
  }, [state]);

  const rows = React.useMemo(() => generateRows(state), [state]);

  return (
    <React.Fragment>
      <Configurator state={state} setValue={setValue} />
      <Flex
        mih={50}
        gap="md"
        justify="space-between"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Checkbox
          className="no-print"
          checked={state.simulate}
          label={<Text fz="md">Randomize wins & losses</Text>}
          onChange={() => setState({ simulate: !state.simulate })}
        />
        <Status rows={rows} />
      </Flex>
      <Table rows={rows} />
    </React.Fragment>
  );
}
