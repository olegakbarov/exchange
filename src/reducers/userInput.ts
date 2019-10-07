import { createReducer } from "typesafe-actions";
import * as actions from "../actions/userInput";
import { CurrencyCode } from "src/types/enums";

const DEFAULT_STATE = {
  fromCurrency: "USD" as CurrencyCode,
  fromValue: 0,
  toCurrency: "GBP" as CurrencyCode,
  toValue: 0
};

export type UserInputState = typeof DEFAULT_STATE;

export default createReducer(DEFAULT_STATE)
  .handleAction(actions.setFromValue, (state, action) => ({
    ...state,
    fromValue: action.payload
  }))
  .handleAction(actions.setFromCurr, (state, action) => ({
    ...state,
    fromCurrency: action.payload,
    fromValue: 0
  }))
  .handleAction(actions.setToCurr, (state, action) => ({
    ...state,
    toCurrency: action.payload
  }));
