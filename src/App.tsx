import * as React from "react";
import * as styledComponents from "styled-components";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import reducers from "./reducers";
import Exchange from "./routes/Exchange";
import { BasicLayout } from "./components/Layout";
import { Provider } from "react-redux";
import { Theme } from "./types/theme";
import { Themes } from "./types/enums";
import getTheme from "./utils/getTheme";

// trickery required to get typed theme in props
type ThemedModule = styledComponents.ThemedStyledComponentsModule<Theme>;
const { ThemeProvider } = styledComponents as ThemedModule;

const middleware =
  process.env.NODE_ENV === "production"
    ? []
    : [createLogger({ collapsed: true, duration: true, diff: true })];

const store = createStore(reducers, applyMiddleware(...middleware));

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={getTheme(Themes.Light)}>
        <BasicLayout>
          <Exchange />
        </BasicLayout>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
