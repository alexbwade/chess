import PropTypes from 'prop-types';

import { COLORS, COLUMNS, ROWS } from '../../constants';

import Square from './Square';

import styles from './Board.module.scss';

const { WHITE, BLACK } = COLORS;

const SQUARES = (function() {
  const squares = [];
  let isWhite = false;

  for (const row of ROWS) {
    for (const col of COLUMNS) {
      squares.push({
        id: `${row}${col}`,
        color: isWhite ? WHITE : BLACK,
      });

      isWhite = !isWhite;
    }
    isWhite = !isWhite;
  }

  return squares;
})();

export default function Board({ config }) {
  return (
    <div className={styles.board}>
      {SQUARES.map(({ id, color }) => (
        <Square color={color} id={id} key={id} />
      ))}
    </div>
  );
}

Board.propTypes = {
  config: PropTypes.object, // todo: define shape
};

Board.defaultProps = {
  config: null,
};
