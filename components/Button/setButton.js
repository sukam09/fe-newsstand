import { appendButton } from "./appendButton.js";

export const setButton = () => {
  const buttonContainer = document.querySelector(".agency-container");

  const [prevBtn, nextBtn] = appendButton();

  buttonContainer.appendChild(prevBtn);
  buttonContainer.appendChild(nextBtn);

  return [prevBtn, nextBtn];
};
