import { Component } from 'react';

import { BOARD_EMPTY, BOARD_NEW_GAME } from './constants';

import Board from '../Board';

import styles from './Game.module.scss';

export default class Game extends Component {
  constructor() {
    super();

    this.state = {
      config: BOARD_EMPTY,
    };

    this.setBoard = this.setBoard.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
  }

  setBoard() {
    this.setState({ config: BOARD_NEW_GAME });
  }

  clearBoard() {
    this.setState({ config: BOARD_EMPTY });
  }

  render() {
    const { config } = this.state;

    return (
      <div className={styles.game}>
        <div>
          <button className={styles.button} onClick={this.setBoard} type='button'>
            Start Game
          </button>
          <button className={styles.button} onClick={this.clearBoard} type='button'>
            Clear Board
          </button>
        </div>
        <Board config={config} />
      </div>
    );
  }
}
