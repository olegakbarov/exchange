import { Theme } from "../types/theme";
import { Themes } from "../types/enums";

export default function getTheme(name: Themes): Theme {
  switch (name) {
    case Themes.Light:
      return {
        white: "#fff",
        bgColor: "#f8f8fa",
        fgColor: "#000",
        buttonBgColor: "rgb(38, 132, 255)",
        borderColor: "#eaeaea"
      };

    case Themes.Dark:
      return {
        white: "#fff",
        bgColor: "#f8f8fa",
        fgColor: "#fff",
        buttonBgColor: "#000",
        borderColor: "#fff"
      };
  }
}
