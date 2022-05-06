import { PIECE_TYPES } from '../constants';
import imgWhite from '../../../images/queen-white.png';
import imgBlack from '../../../images/queen-black.png';

import Piece from '../Piece';

export default class Queen extends Piece {
  constructor(props) {
    super(props);

    const { color } = this.props;
    const images = {
      white: imgWhite,
      black: imgBlack,
    };

    this.type = PIECE_TYPES.QUEEN;
    this.image = images[color];
  }
}
