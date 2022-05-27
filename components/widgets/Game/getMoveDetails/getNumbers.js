import { COLUMNS, ROWS } from "~constants";

export default function getNumbers(move) {
  const { start, end } = move;

  const [prevRow, prevCol] = start.split("");
  const [nextRow, nextCol] = end.split("");
  const prevRowIndex = ROWS.indexOf(+prevRow);
  const prevColIndex = COLUMNS.indexOf(prevCol);
  const nextRowIndex = ROWS.indexOf(+nextRow);
  const nextColIndex = COLUMNS.indexOf(nextCol);

  return {
    ...move,
    prevRowIndex,
    prevColIndex,
    nextRowIndex,
    nextColIndex,
    rowDelta: nextRowIndex - prevRowIndex,
    colDelta: nextColIndex - prevColIndex,
  };
}
