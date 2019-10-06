import { createAction } from "typesafe-actions";

export const toggleTheme = createAction("TOGGLE_THEME", action => () =>
  action()
);

export const setNetworkStatus = createAction(
  "SET_NETWORK_STATUS",
  action => (online: boolean) => action(online)
);
