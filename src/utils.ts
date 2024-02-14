import { v4 } from 'uuid'

import { defaultParameters } from './constants'
import type { Parameters, Row } from './types'

function random(): number {
  const array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  return array[0] / (Math.pow(2, 32) - 1)
}

export function pick(probabilities: number[]): number {
  const numbers = [1, -1]
  const cumulativeProbabilities: number[] = []
  let cumulativeProbability = 0

  for (let i = 0; i < probabilities.length; i++) {
    cumulativeProbability += probabilities[i]
    cumulativeProbabilities.push(cumulativeProbability)
  }

  const randomValue = random()

  for (let i = 0; i < cumulativeProbabilities.length; i++) {
    if (randomValue <= cumulativeProbabilities[i]) {
      return numbers[i]
    }
  }

  // If no number is selected, return the last number
  return numbers[numbers.length - 1]
}

export function generateRows({
  initialValue,
  stopLoss,
  period,
  riskRatio,
  riskReward,
  simulate,
  winRate,
}: Parameters): Row[] {
  const rows = []
  let equity = initialValue
  let week = 1

  for (let index = 1; index <= period; index++) {
    const profit = Math.floor(riskReward * riskRatio * equity) / 100
    const maxDrawdown = (riskRatio * equity) / 100

    const sign = simulate ? pick([winRate / 100.0, 1 - winRate / 100.0]) : 1

    const realProfit = sign > 0 ? profit : -maxDrawdown
    const lot = ((equity / 100) * riskRatio) / stopLoss

    rows.push({
      id: v4(),
      index,
      equity,
      profit,
      realProfit,
      lot,
      maxDrawdown,
      week,
    })

    if (index % 5 === 0) {
      week++
    }

    equity = equity + realProfit
  }

  return rows
}

export function getLot(lot: number): { size: number; repeat: number } {
  if (lot < 0.01) {
    return { size: 0.01, repeat: 1 }
  }

  if (lot <= 100) {
    return { size: lot, repeat: 1 }
  }

  return { size: 100, repeat: lot % 100 }
}

export const getState = (): Parameters => {
  try {
    const currentState = localStorage.getItem('currentState') || '{}'
    return {
      ...defaultParameters,
      ...JSON.parse(currentState),
    }
  } catch {
    return defaultParameters
  }
}

export const persistState = (state: Parameters): void => {
  localStorage.setItem('currentState', JSON.stringify(state))
}
