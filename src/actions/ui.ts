import { createAction } from "typesafe-actions";

export const toggleTheme = createAction("TOGGLE_THEME", action => () =>
  action()
);
