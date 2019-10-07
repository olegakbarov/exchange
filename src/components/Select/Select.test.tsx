import * as React from "react";
import "jest-styled-components";
import Select from "./index";
import { shallowWithTheme, renderWithTheme } from "../../utils/testing";

describe("Select", () => {
  it("Shallow render snapshots are equal", () => {
    const tree = shallowWithTheme(
      <Select>
        <option>'ABC'</option>
      </Select>
    );
    expect(tree).toMatchSnapshot();
  });

  it("Render snapshots are equal", () => {
    const tree = renderWithTheme(
      <Select>
        <option>'ABC'</option>
      </Select>
    );
    expect(tree).toMatchSnapshot();
  });
});
