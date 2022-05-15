import { COLORS, COLUMNS, ROWS, DIRECTIONS, PIECE_TYPES } from "../../../constants";

export default function getSpacesInPath({
  start,
  end,
  currentRowIndex,
  currentColIndex,
  targetRowIndex,
  targetColIndex,
  rowDiff,
  colDiff,
  direction,
}) {
  const results = [];

  return results;

  // switch (true) {
  //   case isDiagonal(start, end): {
  //     if (rowDiff <= 1 && colDiff <= 1) return results;

  //     break;
  //   }

  //   case isHorizontal(start, end): {
  //     if (colDiff <= 1) return results;
  //     for (let i = currentColIndex + 1; i < targetColIndex; i++) {
  //       results.push(`${ROWS[currentRowIndex]}${COLUMNS[i]}`);
  //     }
  //     break;
  //   }

  //   case isVertical(start, end): {
  //     if (rowDiff <= 1) return results;
  //     for (let i = currentRowIndex + 1; i < targetRowIndex; i++) {
  //       results.push(`${ROWS[i]}${COLUMNS[currentColIndex]}`);
  //     }

  //     break;
  //   }

  //   default: {
  //     console.log("Invalid direction for getting intermediaries.");
  //   }
  // }
  // console.log({ results });

  // return results;
}
