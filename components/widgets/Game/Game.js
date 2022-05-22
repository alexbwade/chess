import { useState } from "react";

import { BOARD_EMPTY, BOARD_NEW_GAME, STATUSES } from "~constants";
import { Board } from "~widgets";
import { GameContext } from "~context";

import { updateBoard } from "./helpers";

import styles from "./Game.module.scss";

const { PLAYER_1 } = STATUSES;

export default function Game() {
  const player = PLAYER_1; // todo: this will probably need to be stateful

  const [config, setConfig] = useState(BOARD_EMPTY);
  const [status, setStatus] = useState(null);
  const [source, setSource] = useState(null);
  const [error, setError] = useState(null);

  const moveStart = (squareId) => setSource(squareId);

  const moveEnd = (dest) => {
    const board = { config, status };
    const move = { player, start: source, end: dest };

    try {
      const newBoard = updateBoard(board, move);

      setConfig(newBoard.config);
      setStatus(newBoard.status);
    } catch (err) {
      setError(err.message);
    }

    setSource(null);
  };

  const newGame = () => {
    setConfig(BOARD_NEW_GAME);
    setStatus(PLAYER_1);
  };

  const endGame = () => {
    setConfig(BOARD_EMPTY);
    setStatus(null);
  };

  const context = {
    config,
    status,
    moveStart,
    moveEnd,
  };

  return (
    <GameContext.Provider value={context}>
      <div className={styles.game}>
        <div>
          {error}
          <button className={styles.button} onClick={newGame} type="button">
            Start Game
          </button>
          <button className={styles.button} onClick={endGame} type="button">
            Clear Board
          </button>
        </div>
        <Board />
      </div>
    </GameContext.Provider>
  );
}
