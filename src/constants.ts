import type { Parameters } from './types'

export const defaultParameters: Parameters = {
  initialValue: 5,
  period: 100,
  riskReward: 2.0,
  riskRatio: 6.0,
  winRate: 80.0,
  simulate: true,
  stopLoss: 100,
  startDate: new Date(),
}
