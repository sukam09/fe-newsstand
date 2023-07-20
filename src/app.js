import { setGrid } from "./components/main/grid/index.js";
import { setList } from "./components/main/list/index.js";
import { setHeader } from "./components/header/index.js";
import { setAlert } from "./components/common/alert/index.js";
import { setSnackBar } from "./components/common/snack-bar/index.js";
import { setSubscribe } from "./components/main/subscribe-button/index.js";
import { setNavigateButton } from "./components/main/navigate-button/index.js";
import { setViewToggleButton } from "./components/main/view-toggle-button/index.js";
import { setModeToggleButton } from "./components/main/mode-toggle-button/index.js";
import { setOptionToggleButton } from "./components/main/option-toggle-button/index.js";

(function init() {
  const slider = document.querySelector(".list-view_category-bar");
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", () => {
    isDown = false;
  });
  slider.addEventListener("mouseup", () => {
    isDown = false;
  });
  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
  });

  setSubscribe();
  setHeader();
  setGrid();
  setList();
  setNavigateButton();
  setViewToggleButton();
  setModeToggleButton();
  setSnackBar();
  setAlert();
  setOptionToggleButton();
})();
