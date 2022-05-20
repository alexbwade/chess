import PropTypes from "prop-types";
import classNames from "classnames";

import { COLORS } from "~constants";
import { ignoreEvent } from "~utils";

import Piece from "~widgets/Piece";

import styles from "./Square.module.scss";

const { WHITE, BLACK } = COLORS;

export default function Square({ color, id, piece, moveStart, moveEnd }) {
  const handleStartMoving = () => moveStart(id);

  const handleStopMoving = () => moveEnd(id);

  return (
    <div
      id={id}
      className={classNames(styles.square, {
        [styles.white]: color === WHITE,
        [styles.black]: color === BLACK,
        [styles.occupied]: !!piece,
      })}
      data-testid={`square-${id}`}
      onDragStart={handleStartMoving}
      onDrop={handleStopMoving}
      // needed on dragOver and dragEnter events to allow drop to work (because legacy web silliness)
      onDragOver={ignoreEvent}
      onDragEnter={ignoreEvent}
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
