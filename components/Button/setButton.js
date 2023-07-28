import { qs } from "../../utils/utils.js";
import { appendButton } from "./appendButton.js";

export const setButton = () => {
  const button_container = qs(".agency-container");

  const [prev_btn, next_btn] = appendButton();

  button_container.appendChild(prev_btn);
  button_container.appendChild(next_btn);

  return [prev_btn, next_btn];
};
