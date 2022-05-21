import PIECE_IMAGES from "./images";

export function getPieceImage(type, color) {
  return PIECE_IMAGES[type][color];
}
