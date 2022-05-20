import { render, screen } from "@testing-library/react";

import { NUM_SQUARES } from "~constants";
import Board from "../Board";

describe("<Board />", () => {
  let props;

  beforeEach(() => {
    props = {
      config: {},
      moveStart: jest.fn(),
      moveEnd: jest.fn(),
    };
  });

  it(`renders ${NUM_SQUARES} squares`, () => {
    render(<Board {...props} />);

    const grid = screen.getByTestId("grid");
    const squareCount = grid.childNodes.length;

    expect(squareCount).toBe(NUM_SQUARES);
  });
});
