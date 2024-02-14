import { Checkbox, Flex, Text } from '@mantine/core'
import { Fragment, useCallback, useEffect, useMemo, useReducer } from 'react'

import Configurator from './components/Configurator'
import Status from './components/Status'
import Table from './components/Table'
import { generateRows, getState, persistState } from './utils'

function useStateReducer<T>(initialState: T) {
  const [state, dispatch] = useReducer(
    (previous: T, next: Partial<T>): T => ({ ...previous, ...next }),
    initialState,
  )

  const setState = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      dispatch({ [key]: value } as unknown as Partial<T>)
    },
    [dispatch],
  )

  return { state, setState }
}

export default function App() {
  const { state, setState } = useStateReducer(getState())

  useEffect(() => persistState(state), [state])

  const rows = useMemo(() => generateRows(state), [state])

  return (
    <Fragment>
      <Configurator state={state} setValue={setState} />
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
          onChange={() => setState('simulate', !state.simulate)}
        />
        <Status rows={rows} />
      </Flex>
      <Table rows={rows} />
    </Fragment>
  )
}
