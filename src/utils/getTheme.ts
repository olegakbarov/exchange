import { Theme } from "../types/theme";
import { Themes } from "../types/enums";

export default function getTheme(name: Themes): Theme {
  switch (name) {
    case Themes.Light:
      return {
        white: "#fff",
        successGreen: "#56d256",
        errorRed: "#ff2828",
        bgColor: "#f8f8fa",
        fgColor: "#000",
        buttonBgColor: "rgb(38, 132, 255)",
        borderColor: "#eaeaea",
        inputBgColor: "#fff;"
      };

    case Themes.Dark:
      return {
        white: "#fff",
        successGreen: "#56d256",
        errorRed: "#ff2828",
        bgColor: "#000",
        fgColor: "#fff",
        buttonBgColor: "charcoal",
        borderColor: "#fff",
        inputBgColor: "#4d4d4d;"
      };
  }
}
