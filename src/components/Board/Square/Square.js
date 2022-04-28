import PropTypes from 'prop-types';
import classNames from 'classnames';

import { COLORS } from '../../../constants';

import styles from './Square.module.scss';

const { WHITE, BLACK } = COLORS;

export default function Square({ color, id }) {
  return (
    <div
      id={id}
      className={classNames(styles.square, {
        [styles.white]: color === WHITE,
        [styles.black]: color === BLACK,
      })}
    />
  );
}

Square.propTypes = {
  color: PropTypes.string.isRequired,
};
