import { PIECE_TYPES } from '../constants';
import imgWhite from '../../../images/king-white.png';
import imgBlack from '../../../images/king-black.png';

import Piece from '../Piece';

export default class King extends Piece {
  constructor(props) {
    super(props);

    const { color } = this.props;
    const images = {
      white: imgWhite,
      black: imgBlack,
    };

    this.type = PIECE_TYPES.KING;
    this.image = images[color];
  }
}
