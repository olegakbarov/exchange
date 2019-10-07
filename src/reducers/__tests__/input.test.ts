import * as actions from "../../actions/input";
import inputReducer from "../input";
import { UserInputState } from "../input";

const state = {
  fromCurrency: "USD",
  fromValue: 10,
  toCurrency: "GBP",
  toValue: 0
} as UserInputState;

describe("Currency reducer", () => {
  it("Should clear fromValue when fromCurrency changed", () => {
    const action = actions.setFromCurr("ISK");
    const newState = {
      fromCurrency: "ISK",
      fromValue: 0,
      toCurrency: "GBP",
      toValue: 0
    };

    expect(inputReducer(state, action)).toEqual(newState);
  });
});
