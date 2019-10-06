import * as React from "react";
import * as styledComponents from "styled-components";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import reducers, { RootState } from "./reducers";
import Exchange from "./routes/Exchange";
import { BasicLayout } from "./components/Layout";
import { Provider, useSelector } from "react-redux";
import { Theme } from "./types/theme";
import getTheme from "./utils/getTheme";
import { setNetworkStatus } from "./actions/ui";

// trickery required to get typed theme in props
type ThemedModule = styledComponents.ThemedStyledComponentsModule<Theme>;
const { ThemeProvider, createGlobalStyle } = styledComponents as ThemedModule;

const middleware =
  process.env.NODE_ENV === "production"
    ? []
    : [createLogger({ collapsed: true, duration: true, diff: true })];

const store = createStore(reducers, applyMiddleware(...middleware));

const GlobalStyle = createGlobalStyle`
  html {
    overflow: hidden;
  }

  body {
    margin: 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow-y: auto;
    font-family: -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif;
    background-color: ${p => p.theme.bgColor};
    color: ${p => p.theme.fgColor};
  }
`;

const App = () => {
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  );
};

const ThemedApp = () => {
  const themeName = useSelector((state: RootState) => state.ui.themeName);

  React.useEffect(() => {
    window.addEventListener("offline", () => {
      store.dispatch(setNetworkStatus(false));
    });

    window.addEventListener("online", () => {
      store.dispatch(setNetworkStatus(true));
    });
  }, []);

  return (
    <ThemeProvider theme={getTheme(themeName)}>
      <BasicLayout>
        <GlobalStyle />
        <Exchange />
      </BasicLayout>
    </ThemeProvider>
  );
};

export default App;
