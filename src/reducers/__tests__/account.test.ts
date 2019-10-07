import * as actions from "../../actions/account";
import accountReducer from "../account";
import { CurrencyCode } from "src/types/enums";

const state = {
  USD: 100,
  GBP: 200,
  EUR: 300,
  ISK: 0
} as Record<CurrencyCode, number>;

describe("Currency reducer", () => {
  it("Should correctly update state", () => {
    const ratesState = {
      USD: { ISK: 0.1 }
    };
    const action = actions.runTransaction("USD", "ISK", 100, ratesState);
    const newState = {
      USD: 0,
      GBP: 200,
      EUR: 300,
      ISK: 10
    };

    expect(accountReducer(state, action)).toEqual(newState);
  });
});
