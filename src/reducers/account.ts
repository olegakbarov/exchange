import * as A from "../types/actions";
import { ActionTypes as AT, CurrencyCode } from "../types/enums";
import { AccountState } from "../types/states";
import createReducer from "../utils/createReducer";

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

const update = (
  state: AccountState,
  { payload: { currency, value } }: A.AccountAction
) => ({
  ...state,
  [currency]: value
});

export default function account(
  state: AccountState = DEFAULT_STATE,
  action: A.AccountAction
): AccountState {
  return createReducer(
    "account",
    {
      [AT.UpdateAccount]: update
    },
    state,
    action
  );
}
