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

    drag("2b", "3b"); // move white pawn forward

    expect(getSquare("3b").querySelector("img")).toBeInTheDocument();
  });

  it("does not allow invalid moves", async () => {
    render(<Game />);

    await startGame();

    drag("2b", "4b"); // attempt move white pawn forward two spaces

    expect(getSquare("4b").querySelector("img")).not.toBeInTheDocument();
  });
});
