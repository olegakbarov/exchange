import { createReducer } from "typesafe-actions";
import * as actions from "../actions/account";
import { CurrencyCode } from "../types/enums";
import formatNumber from "../utils/formatNumber";

const DEFAULT_STATE: Record<CurrencyCode, number> = {
  USD: 100,
  GBP: 200,
  EUR: 300,
  AUD: 0,
  BGN: 0,
  BRL: 0,
  CAD: 0,
  CHF: 0,
  CNY: 0,
  CZK: 0,
  DKK: 0,
  HKD: 0,
  HRK: 0,
  HUF: 0,
  IDR: 0,
  ILS: 0,
  INR: 0,
  ISK: 0,
  JPY: 0,
  KRW: 0,
  MXN: 0,
  MYR: 0,
  NOK: 0,
  NZD: 0,
  PHP: 0,
  PLN: 0,
  RON: 0,
  RUB: 0,
  SEK: 0,
  SGD: 0,
  THB: 0,
  TRY: 0,
  ZAR: 0
};

export type AccountState = {
  [key in CurrencyCode]: number;
};

export default createReducer(DEFAULT_STATE).handleAction(
  actions.runTransaction,
  (state, { payload: { from, to, amountFrom, rates } }) => {
    if (state[from] >= amountFrom) {
      const result = amountFrom * rates[from][to];

      return {
        ...state,
        [from]: Number((state[from] - amountFrom).toFixed(2)),
        [to]: Number((state[to] + result).toFixed(2))
      };
    } else {
      return state;
    }
  }
);
