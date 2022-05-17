import PIECE_IMAGES from "./images";

import styles from "./Piece.module.scss";

export default function Piece({ color, type }) {
  const image = PIECE_IMAGES[type][color];

  return <img alt={type} className={styles.piece} src={image} />;
}
