import { createReducer } from "typesafe-actions";
import * as actions from "../actions/ui";
import { Themes } from "../types/enums";

const DEFAULT_STATE = {
  themeName: Themes.Light
};

export type UiState = typeof DEFAULT_STATE;

export default createReducer(DEFAULT_STATE).handleAction(
  actions.toggleTheme,
  state => ({
    ...state,
    themeName: state.themeName === Themes.Light ? Themes.Dark : Themes.Light
  })
);
