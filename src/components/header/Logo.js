const $haederLogo = document.querySelector(".container-header_logo");

const setHeaderLogo = () => {
  $haederLogo.addEventListener("click", () => window.location.reload());
};

export { setHeaderLogo };
