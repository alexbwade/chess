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
        <button className={styles.startButton} onClick={this.setBoard} type='button'>
          Start Game
        </button>
        <Board config={config} />
      </div>
    );
  }
}
