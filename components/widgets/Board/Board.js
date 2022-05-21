import { SQUARES } from "~constants";

import Square from "./Square";

import styles from "./Board.module.scss";

export default function Board() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.board}>
        <div className={styles.top} />
        <div className={styles.left} />
        <div className={styles.grid} data-testid="grid">
          {SQUARES.map(({ id, color }) => (
            <Square color={color} id={id} key={id} />
          ))}
        </div>
        <div className={styles.right} />
        <div className={styles.bottom} />
      </div>
    </div>
  );
}
