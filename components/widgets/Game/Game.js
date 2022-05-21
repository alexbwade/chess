import { useState } from "react";

import { BOARD_EMPTY, BOARD_NEW_GAME } from "~constants";
import { Board } from "~widgets";
import { GameContext } from "~context";

import isValidMove from "./validator";
import getMoveDetails from "./calculator";

import styles from "./Game.module.scss";

export default function Game() {
  const [config, setConfig] = useState(BOARD_EMPTY);
  const [fromSquareId, setFromSquareId] = useState(null);

  const moveStart = (squareId) => setFromSquareId(squareId);

  const moveEnd = (targetSquareId) => {
    const start = fromSquareId;
    const end = targetSquareId;
    const piece = JSON.parse(config[start]);

    console.log({ config, piece, start, end });

    const move = getMoveDetails({ config, piece, start, end });

    if (isValidMove(move, piece)) {
      movePiece(start, end);
    }

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

  const context = {
    config,
    moveStart,
    moveEnd,
  };

  return (
    <GameContext.Provider value={context}>
      <div className={styles.game}>
        <div>
          <button className={styles.button} onClick={setBoard} type="button">
            Start Game
          </button>
          <button className={styles.button} onClick={clearBoard} type="button">
            Clear Board
          </button>
        </div>
        <Board />
      </div>
    </GameContext.Provider>
  );
}
