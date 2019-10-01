import * as styledComponents from "../../node_modules/styled-components";
import { ThemedStyledComponentsModule } from "../../node_modules/@types/styled-components/index.d";

import { Theme } from "../types/theme";

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  withTheme,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<Theme>;

export { css, createGlobalStyle, keyframes, ThemeProvider, withTheme };

export * from "../../node_modules/@types/styled-components/index.d";

export default styled;
