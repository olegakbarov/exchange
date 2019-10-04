import { createReducer } from "typesafe-actions";
import * as actions from "../actions/rates";
import { CurrencyCode } from "src/types/enums";

export type RatesState =
  | {
      [key in CurrencyCode]: {
        [key in CurrencyCode]: number;
      };
    }
  | {};

const DEFAULT_STATE: RatesState = {};

export default createReducer(DEFAULT_STATE).handleAction(
  actions.updateRates,
  (state, { payload }) => ({
    ...state,
    [payload.base]: payload.rates
  })
);
