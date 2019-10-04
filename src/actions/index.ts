import * as account from "./account";
import * as rates from "./rates";
import * as userInput from "./userInput";

export default {
  ...rates,
  ...account,
  ...userInput
};
