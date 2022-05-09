import { PIECE_TYPES } from '../constants';
import imgWhite from '../../../images/bishop-white.png';
import imgBlack from '../../../images/bishop-black.png';

import Piece from '../Piece';

export default class Bishop extends Piece {
  constructor(props) {
    super(props);

    const { color } = this.props;
    const images = {
      white: imgWhite,
      black: imgBlack,
    };

    this.type = PIECE_TYPES.BISHOP;
    this.image = images[color];
  }
}
