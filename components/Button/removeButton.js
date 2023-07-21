export const removeButton = () => {
  const button_container = document.querySelector(".agency-container");

  const prev_btn = document.querySelector(".prev-page-btn");
  const next_btn = document.querySelector(".next-page-btn");

  button_container.removeChild(prev_btn);
  button_container.removeChild(next_btn);
};
