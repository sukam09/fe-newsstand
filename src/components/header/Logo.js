const $haederLogo = document.querySelector(".container-header_logo");

export const setHeaderLogo = () => {
  $haederLogo.addEventListener("click", () => window.location.reload());
};
