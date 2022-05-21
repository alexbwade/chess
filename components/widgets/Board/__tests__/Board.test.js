import { screen } from "@testing-library/react";

import { renderWithGameContext as render } from "~test";
import { NUM_SQUARES } from "~constants";
import Board from "../Board";

describe("<Board />", () => {
  it(`renders ${NUM_SQUARES} squares`, () => {
    render(<Board />);

    const grid = screen.getByTestId("grid");
    const squareCount = grid.childNodes.length;

    expect(squareCount).toBe(NUM_SQUARES);
  });
});
