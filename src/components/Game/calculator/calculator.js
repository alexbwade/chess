import getDiffs from "./getDiffs";
import getSpacesInPath from "./getSpacesInPath";
import getMovementProperties from "./getMovementProperties";
import getDirection from "./getDirection";

export default function calculate(initialMoveData) {
  const {
    config,
    piece: { color, type },
    start,
    end,
  } = initialMoveData;

  // const direction = getDirection(start, end);
  const diffs = getDiffs(start, end);
  const direction = getDirection({ start, end, ...diffs });
  const spacesInPath = getSpacesInPath();
  const info = {
    config,
    color,
    type,
    start,
    end,
    spacesInPath,
    ...diffs,
  };

  const move = getMovementProperties(info);

  console.log({ move });

  return move;
}
