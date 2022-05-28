import calcMoveEvent from "./calcMoveEvent";
// import getValidationObject from "./getValidationObject";
import validate from "./validation";

export function updateBoard(board, move) {
  // calculate data about move (including outcome)
  const event = calcMoveEvent(board, move);

  validate(event);

  return {
    status: event.nextStatus,
    config: event.nextConfig,
    turn: event.nextTurn,
  };
}
