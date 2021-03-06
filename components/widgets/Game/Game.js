import { useState } from "react";

import { BOARD_EMPTY, BOARD_NEW_GAME, PLAYERS } from "~constants";
import { Board } from "~widgets";
import { GameContext } from "~context";

import { updateBoard } from "./helpers";

import styles from "./Game.module.scss";

const { PLAYER_1 } = PLAYERS;

export default function Game() {
  const [player, setPlayer] = useState(null); // todo: this should actually make sense
  const [config, setConfig] = useState(BOARD_EMPTY);
  const [status, setStatus] = useState(null);
  const [turn, setTurn] = useState(null);
  const [error, setError] = useState(null);
  const [source, setSource] = useState(null);

  const moveStart = (squareId) => setSource(squareId);

  const moveEnd = (dest) => {
    const board = { config, status, turn };
    const move = { player, start: source, end: dest };

    try {
      const newBoard = updateBoard(board, move);

      setConfig(newBoard.config);
      setTurn(newBoard.turn);
      setPlayer(newBoard.turn); // temporary
      setStatus(newBoard.status);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }

    setSource(null);
  };

  const newGame = () => {
    setConfig(BOARD_NEW_GAME);
    setTurn(PLAYER_1);
    setPlayer(PLAYER_1); // temporary
  };

  const endGame = () => {
    setConfig(BOARD_EMPTY);
    setTurn(null);
  };

  const context = {
    config,
    turn,
    moveStart,
    moveEnd,
  };

  return (
    <GameContext.Provider value={context}>
      <div className={styles.game}>
        <div>
          <div>{status}</div>
          <div>{error}</div>
        </div>
        <div>
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
