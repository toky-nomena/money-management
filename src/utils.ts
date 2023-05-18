import { v4 } from "uuid";

export type Row = {
  id: string;
  index: number;
  equity: number;
  week: number;
  profit: number;
  lot: number;
  realProfit: number;
  maxDrawdown: number;
};

export type Parameters = {
  initialValue: number;
  period: number;
  riskReward: number;
  riskRatio: number;
  winRate: number;
  simulate: boolean;
};

export function generateRandomNumber(
  probabilities: number[],
  numbers: number[]
): number {
  if (probabilities.length !== numbers.length) {
    throw new Error(
      "The length of probabilities and numbers must be the same."
    );
  }

  const cumulativeProbabilities: number[] = [];
  let cumulativeProbability = 0;

  for (let i = 0; i < probabilities.length; i++) {
    cumulativeProbability += probabilities[i];
    cumulativeProbabilities.push(cumulativeProbability);
  }

  const randomValue = Math.random();

  for (let i = 0; i < cumulativeProbabilities.length; i++) {
    if (randomValue <= cumulativeProbabilities[i]) {
      return numbers[i];
    }
  }

  // If no number is selected, return the last number
  return numbers[numbers.length - 1];
}

export function generateRows(config: Parameters): Row[] {
  const rows = [];
  let equity = config.initialValue;
  let week = 1;

  for (let index = 1; index <= config.period; index++) {
    const profit =
      Math.floor(config.riskReward * config.riskRatio * equity) / 100;
    const maxDrawdown = (config.riskRatio * equity) / 100;

    const sign = config.simulate
      ? generateRandomNumber(
          [config.winRate / 100.0, 1 - config.winRate / 100.0],
          [1, -1]
        )
      : 1;

    const realProfit = sign > 0 ? profit : -maxDrawdown;
    const lot = equity / 5000.0;

    rows.push({
      index,
      equity,
      profit,
      realProfit,
      lot,
      maxDrawdown,
      id: v4(),
      week,
    });

    if (index % 5 === 0) {
      week++;
    }

    equity = equity + realProfit;
  }

  return rows;
}

export function getLot(lot: number): { size: number; repeat: number } {
  if (lot < 0.01) {
    return {
      size: 0.01,
      repeat: 1,
    };
  }
  if (lot <= 100) {
    return {
      size: lot,
      repeat: 1,
    };
  }
  return {
    size: 100,
    repeat: lot % 100,
  };
}

export const getState = (): Parameters => {
  const currentState = localStorage.getItem("currentState") || "{}";
  let state: Parameters | undefined;
  try {
    state = JSON.parse(currentState);
  } catch {}

  return {
    initialValue: 100,
    period: 100,
    riskReward: 3.0,
    riskRatio: 1.0,
    winRate: 60.0,
    simulate: true,
    ...state,
  };
};

export const persistState = (state: Parameters): void => {
  localStorage.setItem("currentState", JSON.stringify(state));
};
