import account from "./account";
import rates from "./rates";
import userInput from "./userInput";
import ui from "./ui";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  account,
  rates,
  userInput,
  ui
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
