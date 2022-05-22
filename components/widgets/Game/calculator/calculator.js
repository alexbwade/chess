import getCoreProperties from "./getCoreProperties";
import getDirection from "./getDirection";
import getMiscProperties from "./getMiscProperties";
import getSpacesInPath from "./getSpacesInPath";

export default function calculate(initialMoveData) {
  // todo: refactor (these functions should ideally be 'pure')
  let move;

  move = getCoreProperties(initialMoveData);
  move = getDirection(move);
  move = getSpacesInPath(move);
  move = getMiscProperties(move);

  return move;
}
