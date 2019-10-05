import * as account from "./account";
import * as rates from "./rates";
import * as userInput from "./userInput";
import * as ui from "./ui";

export default {
  ...rates,
  ...account,
  ...userInput,
  ...ui
};
