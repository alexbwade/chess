import { memo } from "react";
import Image from "next/image";
import PropTypes from "prop-types";

import { getPieceImage } from "./helpers";

import styles from "./Piece.module.scss";

function Piece({ color, type }) {
  const image = getPieceImage(type, color);

  return <Image alt={type} className={styles.piece} draggable="true" src={image} />;
}

Piece.propTypes = {
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default memo(Piece);
