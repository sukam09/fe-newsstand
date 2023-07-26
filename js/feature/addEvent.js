import { addEventToGridBtn } from "../main/gridView/makeGridView.js";
import { addEventToListBtn } from "../main/listView/handleBtnEvent.js";
import { addEventPressInfo } from "../main/listView/handleNewsData.js";
import { addEventToViewBtn } from "./changeView.js";
import { getState, setState } from "../store/observer.js";
import { isDark } from "../store/store.js";
function addEvent() {
  addEventToGridBtn();
  addEventToListBtn();
  addEventPressInfo();
  addEventToDarkMode();
  addEventToViewBtn();
}

function addEventToDarkMode() {
  const darkMode = document.querySelector(".dark-mode");
  darkMode.addEventListener("click", () => {
    if (getState(isDark)) {
      document.documentElement.setAttribute("color-theme", "light");
      darkMode.setAttribute("src", "../images/icon/Dark.svg");
      setState(isDark, !getState(isDark));
    } else {
      document.documentElement.setAttribute("color-theme", "dark");
      darkMode.setAttribute("src", "../images/icon/Light.svg");
      setState(isDark, !getState(isDark));
    }
  });
}

export { addEvent };
