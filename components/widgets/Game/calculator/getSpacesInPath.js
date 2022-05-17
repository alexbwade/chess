import { COLUMNS, ROWS, DIRECTIONS } from "~constants";

const { L_SHAPE, OTHER } = DIRECTIONS;

const getIncrementer = (diff) => {
  if (diff > 0) return 1; // right, down
  if (diff < 0) return -1; // left, up
  return 0;
};

export function getSpacesInPathProperty(move) {
  const { currentRowIndex, currentColIndex, targetRowIndex, targetColIndex, rowDiff, colDiff } = move;

  const results = [];

  if ([L_SHAPE, OTHER].includes(move.direction)) {
    // must be a straight line to calculate
    return results;
  }

  const rowIncrementer = getIncrementer(rowDiff);
  const colIncrementer = getIncrementer(colDiff);

  let thisRowIndex = currentRowIndex + rowIncrementer;
  let thisColIndex = currentColIndex + colIncrementer;

  while (!(thisRowIndex === targetRowIndex && thisColIndex === targetColIndex)) {
    const rowId = ROWS[thisRowIndex];
    const colId = COLUMNS[thisColIndex];
    const squareId = `${rowId}${colId}`;

    results.push(squareId);

    thisRowIndex += rowIncrementer;
    thisColIndex += colIncrementer;
  }

  return results;
}

export default function getSpacesInPath(move) {
  return {
    ...move,
    spacesInPath: getSpacesInPathProperty(move),
  };
}
