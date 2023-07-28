import { qs } from "../../utils/utils.js";

export const removeButton = () => {
  const button_container = qs(".agency-container");

  const prev_btn = qs(".prev-page-btn");
  const next_btn = qs(".next-page-btn");

  button_container.removeChild(prev_btn);
  button_container.removeChild(next_btn);
};
