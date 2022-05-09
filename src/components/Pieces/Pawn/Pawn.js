import Piece from '../Piece';

export default class Pawn extends Piece {
  constructor(props) {
    super(props);

    this.type = 'pawn';
  }
}
