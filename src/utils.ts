import { v4 } from "uuid";
import { Row, Parameters } from "./types";
import { defaultParameters } from "./constants";

function generateRandomValue(): number {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] / (Math.pow(2, 32) - 1);
}

export function generateRandomNumber(
  probabilities: number[],
  numbers: number[]
): number {
  const cumulativeProbabilities: number[] = [];
  let cumulativeProbability = 0;

  for (let i = 0; i < probabilities.length; i++) {
    cumulativeProbability += probabilities[i];
    cumulativeProbabilities.push(cumulativeProbability);
  }

  const randomValue = generateRandomValue();

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
    const lot = (equity * config.riskRatio) / 100 / config.leverage;

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
  let state = defaultParameters;
  try {
    state = { ...state, ...JSON.parse(currentState) };
  } catch {}

  return state;
};

export const persistState = (state: Parameters): void => {
  localStorage.setItem("currentState", JSON.stringify(state));
};
