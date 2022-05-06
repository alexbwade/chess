import { PIECE_TYPES } from '../constants';
import imgWhite from '../../../images/knight-white.png';
import imgBlack from '../../../images/knight-black.png';

import Piece from '../Piece';

export default class Knight extends Piece {
  constructor(props) {
    super(props);

    const { color } = this.props;
    const images = {
      white: imgWhite,
      black: imgBlack,
    };

    this.type = PIECE_TYPES.KNIGHT;
    this.image = images[color];
  }
}
