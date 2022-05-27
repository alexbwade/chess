import getCoreProperties from "./getCoreProperties";
import getDirection from "./getDirection";
import getMiscProperties from "./getMiscProperties";
import getSpacesInPath from "./getSpacesInPath";

export default function calculate(move) {
  // todo: refactor (these functions should ideally be 'pure')
  // const event = {};

  // event.core = getCoreProperties(initialMoveData);
  // event.direction = getDirection(event);
  // event.spaces = getSpacesInPath(event);
  // event.misc = getMiscProperties(event);

  // return event;

  // const numbers = getNumbers(move);
  // const direction = getDirection(details);
  // const spacesInPath = getSpacesInPath(details, direction);
  // const nextConfig = getNextConfig(move); // check castle in here independently
  // const nextStatus = getNextStatus(nextConfig); // normal, check, checkmate

  // const event =

  let move;

  move = getCoreProperties(initialMoveData);
  move = getDirection(move);
  move = getSpacesInPath(move);
  move = getMiscProperties(move);

  return move;
}
