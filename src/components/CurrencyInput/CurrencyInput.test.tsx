import * as React from "react";
import "jest-styled-components";
import CurrencyInput from "./index";
import { shallowWithTheme, renderWithTheme } from "../../utils/testing";

describe("CurrencyInput", () => {
  it("Shallow render snapshots are equal", () => {
    const tree = shallowWithTheme(
      <CurrencyInput
        disabled={false}
        value={39.01}
        handleChange={() => {}}
        maxValue={100}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("Render snapshots are equal", () => {
    const tree = renderWithTheme(
      <CurrencyInput
        disabled={false}
        value={39.01}
        handleChange={() => {}}
        maxValue={100}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
