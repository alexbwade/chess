import PropTypes from 'prop-types';
import classNames from 'classnames';

import { COLORS } from '../../../constants';

import styles from './Square.module.scss';

const { WHITE, BLACK } = COLORS;

// needed on dragOver and dragEnter events to allow drop to work (because legacy web silliness)
const ignore = (e) => e.preventDefault();

export default function Square({ color, id, piece }) {
  return (
    <div
      id={id}
      className={classNames(styles.square, {
        [styles.white]: color === WHITE,
        [styles.black]: color === BLACK,
        [styles.occupied]: !!piece,
      })}
      onDragStart={(e) => console.log(`drag start: ${id}`, { e })}
      onDrop={(e) => console.log(`drop: ${id}`, { e })}
      onDragOver={ignore}
      onDragEnter={ignore}
    >
      {/* temporarily outputting square ID for development */}
      <strong className={styles.squareId}>{id.toUpperCase()}</strong>
      {piece}
    </div>
  );
}

Square.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  piece: PropTypes.element,
};

Square.defaultProps = {
  piece: null,
};
