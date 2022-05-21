import { render, screen, fireEvent } from "@testing-library/react";

import { COLORS, PIECE_TYPES, SQUARES } from "~constants";
// import { ignoreEvent } from "~utils";

import Square from "../Square";

// jest.mock("~utils", () => ({
//   ignoreEvent: jest.fn(),
// }));

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

  // it("ignores dragover and dragenter events", () => {
  //   props.piece = { color: WHITE, type: PAWN };

  //   const { container } = render(<Square {...props} />);

  //   const square = container.firstChild;

  //   fireEvent.dragOver(square);
  //   fireEvent.dragEnter(square);

  //   expect(ignoreEvent).toHaveBeenCalledTimes(2);
  // });

  it("starts moving piece on dragStart", () => {
    const { container } = render(<Square {...props} />);

    const square = container.firstChild;

    fireEvent.dragStart(square);

    expect(props.moveStart).toHaveBeenCalledWith(props.id);
  });

  it("stops moving piece on drop", () => {
    const { container } = render(<Square {...props} />);

    const square = container.firstChild;

    fireEvent.drop(square);

    expect(props.moveEnd).toHaveBeenCalledWith(props.id);
  });
});
