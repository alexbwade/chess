import { useState } from "react";
import classNames from "classnames";

import { BOARD_EMPTY, BOARD_NEW_GAME } from "./constants";
import isValidMove from "./validation";
import getMoveDetails from "./calculator";

import Board from "../Board";

import styles from "./Game.module.scss";

export default function Game() {
  const [config, setConfig] = useState(BOARD_EMPTY);
  const [moving, setMoving] = useState(false);
  const [fromSquareId, setFromSquareId] = useState(null);

  const moveStart = (squareId) => {
    setMoving(true);
    setFromSquareId(squareId);
  };

  const moveEnd = (targetSquareId) => {
    const start = fromSquareId;
    const end = targetSquareId;
    const piece = config[start];

    const move = getMoveDetails({ config, piece, start, end });

    console.log({ move });

    if (isValidMove(move, piece)) {
      movePiece(start, end);
    }

    setMoving(false);
    setFromSquareId(null);
  };

  const movePiece = (start, end) => {
    setConfig({
      ...config,
      [start]: null,
      [end]: config[start],
    });
  };

  const setBoard = () => setConfig(BOARD_NEW_GAME);

  const clearBoard = () => setConfig(BOARD_EMPTY);

  return (
    <div className={classNames(styles.game, { [styles.moving]: moving })}>
      <div>
        <button className={styles.button} onClick={setBoard} type="button">
          Start Game
        </button>
        <button className={styles.button} onClick={clearBoard} type="button">
          Clear Board
        </button>
      </div>
      <Board config={config} moveStart={moveStart} moveEnd={moveEnd} />
    </div>
  );
}
