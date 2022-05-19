import { COLUMNS, ROWS, DIRECTIONS, NUM_SQUARES } from "~constants";

const { L_SHAPE, OTHER } = DIRECTIONS;

const getIncrementer = (diff) => {
  if (diff > 0) return 1; // right, down
  if (diff < 0) return -1; // left, up
  return 0;
};

export function getSpacesInPathProperty(move) {
  const { currentRowIndex, currentColIndex, direction, targetRowIndex, targetColIndex, rowDiff, colDiff } = move;

  const results = [];

  if ([L_SHAPE, OTHER].includes(direction)) {
    // must be a straight line to calculate
    return results;
  }

  const rowIncrementer = getIncrementer(rowDiff);
  const colIncrementer = getIncrementer(colDiff);

  let thisRowIndex = currentRowIndex + rowIncrementer;
  let thisColIndex = currentColIndex + colIncrementer;
  let iterations = 0;

  while (!(thisRowIndex === targetRowIndex && thisColIndex === targetColIndex)) {
    const rowId = ROWS[thisRowIndex];
    const colId = COLUMNS[thisColIndex];
    const squareId = `${rowId}${colId}`;

    results.push(squareId);

    thisRowIndex += rowIncrementer;
    thisColIndex += colIncrementer;
    iterations++;

    if (iterations > NUM_SQUARES) {
      throw new Error("Infinite loop in 'while' statement.");
    }
  }

  return results;
}

export default function getSpacesInPath(move) {
  return {
    ...move,
    spacesInPath: getSpacesInPathProperty(move),
  };
}
