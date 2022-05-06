export const COLORS = {
  WHITE: 'white',
  BLACK: 'black',
};

const { WHITE, BLACK } = COLORS;

export const COLUMNS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const ROWS = [1, 2, 3, 4, 5, 6, 7, 8].reverse();

export const SQUARES = (function () {
  const squares = [];
  let isWhite = true;

  for (const row of ROWS) {
    for (const col of COLUMNS) {
      squares.push({
        id: `${row}${col}`,
        color: isWhite ? WHITE : BLACK,
      });

      isWhite = !isWhite;
    }
    isWhite = !isWhite;
  }

  return squares;
})();