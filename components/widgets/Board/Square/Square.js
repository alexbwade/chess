import { memo, useContext, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { GameContext } from "~context";
import { COLORS } from "~constants";
import { handleLegacyDrag } from "~utils";

import { Piece } from "~widgets";

import styles from "./Square.module.scss";

const { WHITE, BLACK } = COLORS;

function Square({ color, id }) {
  console.count(`square render ${id}`);
  const { config, moveStart, moveEnd } = useContext(GameContext);
  const [highlighted, setHighlighted] = useState(false);

  const piece = config?.[id];

  const handleStartMoving = () => {
    moveStart(id);
    if (!highlighted) setHighlighted(true);
  };

  const handleStopMoving = () => {
    setHighlighted(false);
    moveEnd(id);
  };

  const handleHover = (e) => {
    e.preventDefault();

    if (!highlighted) setHighlighted(true);
  };

  const handleDragLeave = () => {
    if (highlighted) setHighlighted(false);
  };

  const pieceProps = JSON.parse(piece);

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
      onDragStart={handleStartMoving}
      onDrop={handleStopMoving}
      {...handleLegacyDrag}
      onDragOver={handleHover}
      onDragLeave={handleDragLeave}
    >
      {/* temporarily outputting square ID for development */}
      <strong className={styles.squareId}>{id.toUpperCase()}</strong>
      {piece ? <Piece {...pieceProps} /> : null}
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

export default memo(Square, (prevProps, nextProps) => {
  console.log({ prevProps, nextProps });
});
