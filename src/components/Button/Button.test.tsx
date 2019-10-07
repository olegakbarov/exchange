import * as React from "react";
import { shallow, render } from "enzyme";
import "jest-styled-components";
import Button from "./index";
import getTheme from "../../utils/getTheme";
import { Themes } from "../../types/enums";

const BUTTON_TEXT = "Click";

describe("Button", () => {
  it("Shallow render snapshots are equal", () => {
    const tree = shallow(
      <Button theme={getTheme(Themes.Light)} onClick={() => {}}>
        {BUTTON_TEXT}
      </Button>
    );
    expect(tree).toMatchSnapshot();
  });

  it("Render snapshots are equal", () => {
    const tree = render(
      <Button theme={getTheme(Themes.Light)} onClick={() => {}}>
        {BUTTON_TEXT}
      </Button>
    );
    expect(tree).toMatchSnapshot();
  });
});
