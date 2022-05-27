import getMoveEvent from "./getMoveEvent";
import getValidationObject from "./getValidationObject";
import validate from "./validator";

export function updateBoard(board, move) {
  // calculate data about move (including outcome)
  const event = getMoveEvent(board, move);

  // create validation object from move event
  const validationObject = getValidationObject(event);

  validate(validationObject); // game, move-generic, move-specific

  return {
    status: event.nextStatus,
    config: event.nextConfig,
    turn: event.nextTurn,
  };
}
