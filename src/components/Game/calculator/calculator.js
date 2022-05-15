import getDiffs from "./getDiffs";
import getSpacesInPath from "./getSpacesInPath";
import getMovementProperties from "./getMovementProperties";
import getDirection from "./getDirection";

export default function calculate(initialMoveData) {
  let move;

  move = getDiffs(initialMoveData);
  move = getDirection(move);
  move = getSpacesInPath(move);
  move = getMovementProperties(move);

  return move;
}
