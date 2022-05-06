import { PIECE_TYPES } from '../constants';
import imgWhite from '../../../images/rook-white.png';
import imgBlack from '../../../images/rook-black.png';

import Piece from '../Piece';

export default class Rook extends Piece {
  constructor(props) {
    super(props);

    const { color } = this.props;
    const images = {
      white: imgWhite,
      black: imgBlack,
    };

    this.type = PIECE_TYPES.ROOK;
    this.image = images[color];
  }
}
