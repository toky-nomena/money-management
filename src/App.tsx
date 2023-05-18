import * as React from "react";
import { Flex, Checkbox, Text } from "@mantine/core";

import { generateRows, Parameters, getState, persistState } from "./utils";
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

  React.useEffect(() => persistState(state), [state]);

  const rows = generateRows(state);

  return (
    <React.Fragment>
      <Configurator state={state} setState={setState} />
      <Flex
        mih={50}
        gap="md"
        justify="space-between"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Checkbox
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
