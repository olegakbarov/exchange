import { CurrencyCode } from "../types/enums";
import { createAction } from "typesafe-actions";

export const setFromCurr = createAction(
  "SET_FROM_CURR",
  action => (from: CurrencyCode) => action(from)
);

export const setToCurr = createAction(
  "SET_TO_CURR",
  action => (to: CurrencyCode) => action(to)
);

export const setFromValue = createAction(
  "SET_TO_VALUE",
  action => (value: number) => action(value)
);
