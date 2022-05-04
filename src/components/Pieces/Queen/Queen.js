import Piece from '../Piece';

export default class Queen extends Piece {
  constructor(props) {
    super(props);

    this.type = 'queen';
  }
}
