import { COLUMNS, ROWS } from "~constants";

export default function getDeltas({ start, end }) {
  const [prevCol, prevRow] = start.split("");
  const [nextCol, nextRow] = end.split("");

  const prevRowIndex = ROWS.indexOf(+prevRow);
  const prevColIndex = COLUMNS.indexOf(prevCol);
  const nextRowIndex = ROWS.indexOf(+nextRow);
  const nextColIndex = COLUMNS.indexOf(nextCol);

  const rowDelta = nextRowIndex - prevRowIndex;
  const colDelta = nextColIndex - prevColIndex;

  const rowChange = Math.abs(rowDelta);
  const colChange = Math.abs(colDelta);

  return {
    prevRowIndex,
    prevColIndex,
    nextRowIndex,
    nextColIndex,
    rowDelta,
    colDelta,
    rowChange,
    colChange,
  };
}
