import Piece from '../Piece';

export default class Rook extends Piece {
  constructor(props) {
    super(props);

    this.type = 'rook';
  }
}
