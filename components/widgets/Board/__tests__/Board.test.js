import { render, screen } from "@testing-library/react";

import { NUM_SQUARES } from "~constants";
import Board from "../Board";

test(`renders ${NUM_SQUARES} squares`, () => {
  render(<Board />);

  const grid = screen.getByTestId("dgrid");
  const squareCount = grid.childNodes.length;

  expect(squareCount).toBe(NUM_SQUARES);
});
