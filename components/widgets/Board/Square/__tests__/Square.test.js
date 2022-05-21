import { screen, fireEvent } from "@testing-library/react";

import { renderWithGameContext as render } from "~test";
import { SQUARES } from "~constants";
import { ignoreEvent } from "~utils";

import Square from "../Square";
import styles from "../Square.module.scss";

jest.mock("~utils", () => ({
  ignoreEvent: jest.fn(),
}));

const getSquareProps = (id) => SQUARES.find((square) => square.id === id);

describe("<Square />", () => {
  let props;

  beforeEach(() => {
    props = getSquareProps("4a");
  });

  it("renders a square with no piece", () => {
    render(<Square {...props} />);

    const displayId = props.id.toUpperCase();

    expect(screen.getByText(displayId)).toBeInTheDocument();
  });

  it("renders a square with a piece", () => {
    props = getSquareProps("2a");

    render(<Square {...props} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("ignores dragover event", () => {
    const { container } = render(<Square {...props} />);

    const square = container.firstChild;

    fireEvent.dragOver(square);

    expect(ignoreEvent).toHaveBeenCalledTimes(1);
  });

  it("starts moving piece on dragStart", () => {
    const moveStart = jest.fn();

    const { container } = render(<Square {...props} />, { moveStart });

    const square = container.firstChild;

    fireEvent.dragStart(square);

    expect(moveStart).toHaveBeenCalledWith(props.id);
  });

  it("stops moving piece on drop", () => {
    const moveEnd = jest.fn();

    const { container } = render(<Square {...props} />, { moveEnd });

    const square = container.firstChild;

    fireEvent.drop(square);

    expect(moveEnd).toHaveBeenCalledWith(props.id);
  });

  it("highlights square on drag enter", () => {
    const { container } = render(<Square {...props} />);

    const square = container.firstChild;

    fireEvent.dragEnter(square);

    expect(square).toHaveClass(styles.highlighted);
  });

  it("un-highlights square on drag leave", () => {
    const { container } = render(<Square {...props} />);

    const square = container.firstChild;

    fireEvent.dragLeave(square);

    expect(container).not.toHaveClass(styles.highlighted);
  });
});
