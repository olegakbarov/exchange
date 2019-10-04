import account from "./account";
import rates from "./rates";
import userInput from "./userInput";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  account,
  rates,
  userInput
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
