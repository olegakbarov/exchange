import account from "./account";
import rates from "./rates";
import input from "./input";
import ui from "./ui";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  account,
  rates,
  input,
  ui
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
