import { CurrencyCode } from "../types/enums";
import { createAction } from "typesafe-actions";

export const updateAccount = createAction(
  "UPDATE_ACCOUNT",
  action => (curr: CurrencyCode, value: number) => action({ curr, value })
);

export const runTransaction = createAction(
  "RUN_TRANSACTION",
  action => (
    from: CurrencyCode,
    to: CurrencyCode,
    amountFrom: number,
    amountTo: number
  ) => action({ from, to, amountFrom, amountTo })
);
