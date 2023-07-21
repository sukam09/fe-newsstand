import { isDarkMode } from "../../../store/storeKey.js";
import { checkIsDarkMode } from "../../../utils/utils.js";
import { getState, setState } from "../../../store/observer.js";
import { _querySelector } from "../../../utils/my-query-selector.js";

const $modeToggleButton = _querySelector(".darkmode-toggle");

const toggleMode = () => {
  const isDarkMode = checkIsDarkMode();
  const $body = _querySelector("body");
  const $toggleBtn = _querySelector(".darkmode-toggle");

  if (isDarkMode) {
    !$toggleBtn.classList.contains("input-checked") &&
      $toggleBtn.classList.add("input-checked");

    $body.className = "dark";
  } else {
    $toggleBtn.classList.contains("input-checked") &&
      $toggleBtn.classList.remove("input-checked");

    $body.className = "";
  }
};

const handleToggleButtonClick = () => {
  const currentMode = getState(isDarkMode);

  setState(isDarkMode, !currentMode);
};

const setEvents = () => {
  $modeToggleButton.addEventListener("click", handleToggleButtonClick);
};

export { toggleMode, setEvents };
