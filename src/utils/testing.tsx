import * as React from "react";
import { ThemeProvider } from "styled-components/macro";
import getTheme from "./getTheme";
import { shallow, render } from "enzyme";
import { Themes } from "../types/enums";

export const shallowWithTheme = (children: any) =>
  shallow(
    <ThemeProvider theme={getTheme(Themes.Light)}>{children}</ThemeProvider>
  );

export const renderWithTheme = (children: any) =>
  render(
    <ThemeProvider theme={getTheme(Themes.Light)}>{children}</ThemeProvider>
  );
