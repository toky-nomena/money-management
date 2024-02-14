export type Row = {
  id: string
  index: number
  equity: number
  week: number
  profit: number
  lot: number
  realProfit: number
  maxDrawdown: number
}

export type Parameters = {
  initialValue: number
  period: number
  stopLoss: number
  riskReward: number
  riskRatio: number
  winRate: number
  simulate: boolean
  startDate: Date
}
