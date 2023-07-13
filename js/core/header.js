import { date } from "../utils/date.js";
import { makeHeaderTag } from "../tag/headerTag.js";

export function renderHeader() {
  makeHeaderTag();
  date();
}
