export const removeButton = () => {
  const buttonContainer = document.querySelector(".agency-container");

  const prevBtn = document.querySelector(".prev-page-btn");
  const nextBtn = document.querySelector(".next-page-btn");

  buttonContainer.removeChild(prevBtn);
  buttonContainer.removeChild(nextBtn);
};
