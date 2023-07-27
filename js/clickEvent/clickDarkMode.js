const clickDarkLightMode = () => {
  clickDarkMode();
  clickLightMode();
};

function clickDarkMode() {
  document
    .getElementById("toggle-radio-dark")
    .addEventListener("click", function () {
      document.getElementById("root").classList.add("dark-mode");
      document.getElementById("light-mode").style.display = "flex";
      document.getElementById("dark-mode").style.display = "none";
    });
}

function clickLightMode() {
  document
    .getElementById("toggle-radio-light") 
    .addEventListener("click", function () {
      document.getElementById("root").classList.remove("dark-mode");
      document.getElementById("light-mode").style.display = "none";
      document.getElementById("dark-mode").style.display = "flex";
    });
}

export { clickDarkLightMode };
