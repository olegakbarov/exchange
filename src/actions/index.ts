import * as account from "./account";
import * as rates from "./rates";
import * as input from "./input";
import * as ui from "./ui";

export default {
  ...rates,
  ...account,
  ...input,
  ...ui
};
