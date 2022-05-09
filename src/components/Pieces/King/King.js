import Piece from '../Piece';

export default class King extends Piece {
  constructor(props) {
    super(props);

    this.type = 'king';
  }
}
