import { DIRECTIONS } from "~constants";

const { DIAGONAL, HORIZONTAL, VERTICAL, L_SHAPE, NONE, OTHER } = DIRECTIONS;

export default function getDirection({ colDelta, rowDelta }) {
  const rowAbsDelta = Math.abs(rowDelta);
  const colAbsDelta = Math.abs(colDelta);

  if (rowAbsDelta === 0 && colAbsDelta === 0) {
    return NONE;
  }

  if (rowAbsDelta === colAbsDelta) {
    return DIAGONAL;
  }

  if (colAbsDelta === 0 && rowAbsDelta > 0) {
    return HORIZONTAL;
  }

  if (rowAbsDelta === 0 && colAbsDelta > 0) {
    return VERTICAL;
  }

  if ((rowAbsDelta === 2 && colAbsDelta === 1) || (rowAbsDelta === 1 && colAbsDelta === 2)) {
    return L_SHAPE;
  }

  return OTHER;
}
