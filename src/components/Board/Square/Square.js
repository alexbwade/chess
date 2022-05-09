import PropTypes from 'prop-types';
import classNames from 'classnames';

import { COLORS } from '../../../constants';

import styles from './Square.module.scss';

const { WHITE, BLACK } = COLORS;

export default function Square({ color, id, piece }) {
  return (
    <div
      id={id}
      className={classNames(styles.square, {
        [styles.white]: color === WHITE,
        [styles.black]: color === BLACK,
      })}
    >
      <span>
        {/* temporarily outputting square ID for development */}
        <strong>{id.toUpperCase()}</strong>
        {piece}
      </span>
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
