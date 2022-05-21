import { memo } from "react";
import Image from "next/image";
import PropTypes from "prop-types";

import PIECE_IMAGES from "./images";

import styles from "./Piece.module.scss";

function Piece({ color, type }) {
  console.count("piece render");
  const image = PIECE_IMAGES[type][color];

  return <Image alt={type} className={styles.piece} src={image} />;
}

Piece.propTypes = {
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default memo(Piece);
