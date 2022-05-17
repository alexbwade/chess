import getCoreProperties from "./getCoreProperties";
import getDirection from "./getDirection";
import getMiscProperties from "./getMiscProperties";
import getSpacesInPath from "./getSpacesInPath";

export default function calculate(initialMoveData) {
  let move;

  move = getCoreProperties(initialMoveData);
  move = getDirection(move);
  move = getSpacesInPath(move);
  move = getMiscProperties(move);

  return move;
}
