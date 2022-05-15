import { COLUMNS, ROWS } from "../../../constants";

export default function getDiffs(start, end) {
  const [currentRow, currentCol] = start.split("");
  const [targetRow, targetCol] = end.split("");
  const currentRowIndex = ROWS.indexOf(+currentRow);
  const currentColIndex = COLUMNS.indexOf(currentCol);
  const targetRowIndex = ROWS.indexOf(+targetRow);
  const targetColIndex = COLUMNS.indexOf(targetCol);

  return {
    currentRowIndex,
    currentColIndex,
    targetRowIndex,
    targetColIndex,
    rowDiff: targetRowIndex - currentRowIndex,
    colDiff: targetColIndex - currentColIndex,
  };
}
