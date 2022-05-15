import PropTypes from 'prop-types';

import { SQUARES } from '../../constants';

import Square from './Square';

import styles from './Board.module.scss';

export default function Board({ config, moveStart, moveEnd }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.board}>
        <div className={styles.top} />
        <div className={styles.left} />
        <div className={styles.grid} data-testid='grid'>
          {SQUARES.map(({ id, color }) => {
            const piece = config?.[id];

            return <Square color={color} id={id} key={id} piece={piece} moveStart={moveStart} moveEnd={moveEnd} />;
          })}
        </div>
        <div className={styles.right} />
        <div className={styles.bottom} />
      </div>
    </div>
  );
}

Board.propTypes = {
  config: PropTypes.object, // todo: define shape
};

Board.defaultProps = {
  config: null,
};
