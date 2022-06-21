import { DIRECTIONS } from "~constants";

const { DIAGONAL, HORIZONTAL, VERTICAL, L_SHAPE, NONE, OTHER } = DIRECTIONS;

export default function getDirection({ colChange, rowChange }) {
  if (rowChange === 0 && colChange === 0) {
    return NONE;
  }

  if (rowChange === colChange) {
    return DIAGONAL;
  }

  if (rowChange === 0 && colChange > 0) {
    return HORIZONTAL;
  }

  if (colChange === 0 && rowChange > 0) {
    return VERTICAL;
  }

  if ((rowChange === 2 && colChange === 1) || (rowChange === 1 && colChange === 2)) {
    return L_SHAPE;
  }

  return OTHER;
}
