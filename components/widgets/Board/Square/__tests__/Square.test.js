import { render, screen } from "@testing-library/react";

import { COLORS, PIECE_TYPES, SQUARES } from "~constants";

import Square from "../Square";

const { WHITE, BLACK } = COLORS;
const { PAWN } = PIECE_TYPES;

describe("<Square />", () => {
  let props;

  beforeEach(() => {
    props = {
      color: BLACK,
      id: SQUARES[4].id,
      piece: null,
      moveStart: jest.fn(),
      moveEnd: jest.fn(),
    };
  });

  it("renders a square with no piece", () => {
    render(<Square {...props} />);

    const displayId = props.id.toUpperCase();

    expect(screen.getByText(displayId)).toBeInTheDocument();
  });

  it("renders a square with a piece", () => {
    props.piece = { color: WHITE, type: PAWN };

    render(<Square {...props} />);

    const displayId = props.id.toUpperCase();

    expect(screen.getByText(displayId)).toBeInTheDocument();
  });
});
