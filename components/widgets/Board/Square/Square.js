import PropTypes from "prop-types";
import classNames from "classnames";

import { COLORS } from "~constants";

import Piece from "~widgets/Piece";

import styles from "./Square.module.scss";

const { WHITE, BLACK } = COLORS;

// needed on dragOver and dragEnter events to allow drop to work (because legacy web silliness)
const ignore = (e) => e.preventDefault();

export default function Square({ color, id, piece, moveStart, moveEnd }) {
  const handleStartMoving = () => {
    console.log("grab: ", id);
    moveStart(id);
  };

  const handleStopMoving = () => {
    console.log("drop: ", id);
    moveEnd(id);
  };

  return (
    <div
      id={id}
      className={classNames(styles.square, {
        [styles.white]: color === WHITE,
        [styles.black]: color === BLACK,
        [styles.occupied]: !!piece,
      })}
      onDragStart={handleStartMoving}
      onDrop={handleStopMoving}
      onDragOver={ignore}
      onDragEnter={ignore}
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
  piece: PropTypes.object,
  moveStart: PropTypes.func.isRequired,
  moveEnd: PropTypes.func.isRequired,
};

Square.defaultProps = {
  piece: null,
};
