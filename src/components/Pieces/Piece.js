import { Component } from 'react';

import styles from './Piece.module.scss';
export default class Piece extends Component {
  render() {
    const { image, type } = this;

    return <img alt={type} className={styles.piece} src={image} />;
  }
}
