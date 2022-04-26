import PropTypes from 'prop-types';

import styles from './Board.module.scss';

export default function Board({ children }) {
  return <div className={styles.board}>{children}</div>;
}

Board.propTypes = {
  children: PropTypes.elementType.isRequired,
};
