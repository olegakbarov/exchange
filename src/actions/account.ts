import { CurrencyCode } from "../types/enums";
import { createAction } from "typesafe-actions";

export const updateAccount = createAction(
  "UPDATE_ACCOUNT",
  action => (curr: CurrencyCode, value: number) => action({ curr, value })
);
