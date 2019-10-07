import { CurrencyCode } from "../types/enums";
import { createAction } from "typesafe-actions";
import { RatesState } from "../reducers/rates";

export const runTransaction = createAction(
  "RUN_TRANSACTION",
  action => (
    from: CurrencyCode,
    to: CurrencyCode,
    amountFrom: number,
    rates: RatesState
  ) => action({ from, to, amountFrom, rates })
);
