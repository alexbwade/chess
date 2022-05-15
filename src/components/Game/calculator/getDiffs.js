import { COLUMNS, ROWS } from "../../../constants";

export default function getDiffs(move) {
  const { start, end } = move;

  const [currentRow, currentCol] = start.split("");
  const [targetRow, targetCol] = end.split("");
  const currentRowIndex = ROWS.indexOf(+currentRow);
  const currentColIndex = COLUMNS.indexOf(currentCol);
  const targetRowIndex = ROWS.indexOf(+targetRow);
  const targetColIndex = COLUMNS.indexOf(targetCol);

  return {
    ...move,
    currentRowIndex,
    currentColIndex,
    targetRowIndex,
    targetColIndex,
    rowDiff: targetRowIndex - currentRowIndex,
    colDiff: targetColIndex - currentColIndex,
  };
}
