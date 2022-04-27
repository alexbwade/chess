import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Square.module.scss';

export default function Square({ color }) {
  return (
    <div
      className={classNames(styles.square, {
        [styles.white]: color === 'white',
        [styles.black]: color === 'black',
      })}
    />
  );
}

Square.propTypes = {
  color: PropTypes.string.isRequired,
};
