const clickDarkLightModeButton = () => {
  clickDarkMode();
  clickLightMode();
};

function clickDarkMode() {
  document
    .getElementById("toggle-radio-dark")
    .addEventListener("click", function () {
      document.getElementById("root").classList.add("dark-mode");
      document.getElementById("light-mode").style.opacity = "1";
      document.getElementById("dark-mode").style.opacity = "0";
    });
}

function clickLightMode() {
  document
    .getElementById("toggle-radio-light")
    .addEventListener("click", function () {
      document.getElementById("root").classList.remove("dark-mode");
      document.getElementById("light-mode").style.opacity = "0";
      document.getElementById("dark-mode").style.opacity = "1";
    });
}

export { clickDarkLightModeButton };
