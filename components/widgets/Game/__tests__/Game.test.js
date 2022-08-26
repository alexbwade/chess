import { render, screen, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PIECE_TYPES } from "~constants";

import Game from "../Game";

const getSquare = (squareId) => screen.getByTestId(`square-${squareId}`);

const drag = (fromSquareId, toSquareId) => {
  fireEvent.dragStart(getSquare(fromSquareId));
  fireEvent.drop(getSquare(toSquareId));
};

const startGame = async () => {
  const startButton = screen.getByText("Start Game");

  userEvent.click(startButton);

  const pawns = await screen.findAllByAltText(PIECE_TYPES.PAWN);

  return pawns.length === 16;
};

const endGame = async () => {
  const endButton = screen.getByText("Clear Board");

  userEvent.click(endButton);

  await waitForElementToBeRemoved(() => screen.queryAllByAltText(PIECE_TYPES.PAWN));

  return true;
};

describe("<Game />", () => {
  it("renders a start button", () => {
    render(<Game />);

    expect(screen.getByText("Start Game")).toBeInTheDocument();
  });

  it("starts a new game", async () => {
    render(<Game />);

    const started = await startGame();

    expect(started).toBe(true);
  });

  it("clears an existing game", async () => {
    render(<Game />);

    await startGame();
    const ended = await endGame();

    expect(ended).toBe(true);
  });

  it("allows valid moves", async () => {
    render(<Game />);

    await startGame();

    drag("b2", "b3"); // move white pawn forward

    expect(getSquare("b3").querySelector("img")).toBeInTheDocument();
  });

  it("does not allow invalid moves", async () => {
    render(<Game />);

    await startGame();

    drag("b2", "b5"); // attempt move white pawn forward three spaces

    expect(getSquare("b5").querySelector("img")).not.toBeInTheDocument();
  });
});
