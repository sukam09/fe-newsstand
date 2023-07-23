import { PRESS_CNT } from "../constants/constants.js";
const imgIndex = Array(PRESS_CNT)
  .fill()
  .map((arr, i) => i + 1);

export function shuffleImgIndex() {
  return [...imgIndex].sort(() => Math.random() - 0.5);
}
