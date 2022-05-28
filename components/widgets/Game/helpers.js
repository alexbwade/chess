import calcMoveEvent from "./calcMoveEvent";
import validate from "./validation";

export function updateBoard(board, move) {
  const event = calcMoveEvent(board, move);

  validate(event);

  return {
    config: event.nextConfig,
    status: event.nextStatus,
    turn: event.nextTurn,
  };
}
