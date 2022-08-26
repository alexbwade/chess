import { COLUMNS, ROWS, DIRECTIONS, NUM_SQUARES, getSquareId } from "~constants";

const { L_SHAPE, OTHER } = DIRECTIONS;

const getIncrementer = (diff) => {
  if (diff > 0) return 1; // right, down
  if (diff < 0) return -1; // left, up
  return 0;
};

export default function getPath(deltas, direction) {
  const { prevRowIndex, prevColIndex, nextRowIndex, nextColIndex, rowDelta, colDelta } = deltas;

  const results = [];

  if ([L_SHAPE, OTHER].includes(direction)) {
    // must be a straight line to calculate
    return results;
  }

  const rowIncrementer = getIncrementer(rowDelta);
  const colIncrementer = getIncrementer(colDelta);

  let thisRowIndex = prevRowIndex + rowIncrementer;
  let thisColIndex = prevColIndex + colIncrementer;
  let iterations = 0;

  while (!(thisRowIndex === nextRowIndex && thisColIndex === nextColIndex)) {
    const rowId = ROWS[thisRowIndex];
    const colId = COLUMNS[thisColIndex];
    const squareId = getSquareId({ rowId, colId });

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
