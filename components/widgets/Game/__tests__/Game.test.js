import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Game from "../Game";

const getSquare = (squareId) => screen.getByTestId(`square-${squareId}`);

const drag = (fromSquareId, toSquareId) => {
  fireEvent.dragStart(getSquare(fromSquareId));
  fireEvent.drop(getSquare(toSquareId));
};

const startGame = () => userEvent.click(screen.getByText("Start Game"));

describe("<Game />", () => {
  it("renders a start button", () => {
    render(<Game />);

    expect(screen.getByText("Start Game")).toBeInTheDocument();
  });

  // it("allows drag-and-drop of pieces", () => {
  //   render(<Game />);

  //   startGame();
  //   drag("7b", "8b"); // move pawn

  //   expect(screen.getByText("Start Game")).toBeInTheDocument();
  // });
});
