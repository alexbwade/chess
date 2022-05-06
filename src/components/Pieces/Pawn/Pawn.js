import { PIECE_TYPES } from '../constants';
import imgWhite from '../../../images/pawn-white.png';
import imgBlack from '../../../images/pawn-black.png';

import Piece from '../Piece';

export default class Pawn extends Piece {
  constructor(props) {
    super(props);

    const { color } = this.props;
    const images = {
      white: imgWhite,
      black: imgBlack,
    };

    this.type = PIECE_TYPES.PAWN;
    this.image = images[color];
  }
}
