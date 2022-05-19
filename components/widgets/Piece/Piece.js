import Image from "next/image";

import PIECE_IMAGES from "./images";

import styles from "./Piece.module.scss";

export default function Piece({ color, type }) {
  const image = PIECE_IMAGES[type][color];

  console.log({ image });

  return <Image alt={type} className={styles.piece} src={image} />;
}
