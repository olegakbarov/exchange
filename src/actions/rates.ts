import { ApiResponse } from "../types/api";
import { createAction } from "typesafe-actions";

export const updateRates = createAction(
  "UPDATE_RATES",
  action => (resp: ApiResponse) => action(resp)
);
