import { useContext, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { GameContext } from "~context";
import { COLORS } from "~constants";
import { handleLegacyDrag } from "~utils";

import { Piece } from "~widgets";

import styles from "./Square.module.scss";

const { WHITE, BLACK } = COLORS;

export default function Square({ color, id }) {
  const { config, moveStart, moveEnd } = useContext(GameContext);
  const [highlighted, setHighlighted] = useState(false);

  const piece = config?.[id];

  const handleDragStart = () => {
    moveStart(id);
  };

  const handleDrop = () => {
    moveEnd(id);
    setHighlighted(false);
  };

  const handleDragEnter = () => {
    setHighlighted(true);
  };

  const handleDragLeave = () => {
    setHighlighted(false);
  };

  return (
    <div
      id={id}
      className={classNames(styles.square, {
        [styles.white]: color === WHITE,
        [styles.black]: color === BLACK,
        [styles.occupied]: !!piece,
        [styles.highlighted]: highlighted,
      })}
      data-testid={`square-${id}`}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      {...handleLegacyDrag}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {/* temporarily outputting square ID for development */}
      <strong className={styles.squareId}>{id.toUpperCase()}</strong>
      {piece ? <Piece {...piece} /> : null}
    </div>
  );
}

Square.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  piece: PropTypes.string,
};

Square.defaultProps = {
  piece: null,
};
