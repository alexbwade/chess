import { Component } from 'react';

export default class Piece extends Component {
  render() {
    const type = this.type || 'Piece';

    return <div>{type}</div>;
  }
}
