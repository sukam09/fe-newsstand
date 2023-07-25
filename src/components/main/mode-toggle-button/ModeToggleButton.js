import { isDarkMode } from "../../../store/store.js";
import { useGetAtom, useSetAtom } from "../../../store/atom.js";
import { _querySelector } from "../../../utils/my-query-selector.js";

const $body = _querySelector("body");
const $toggleButton = _querySelector(".darkmode-toggle");
const $modeToggleButton = _querySelector(".darkmode-toggle");

const toggleMode = () => {
  const currentIsDarkMode = useGetAtom(isDarkMode);

  if (currentIsDarkMode) {
    !$toggleButton.classList.contains("input-checked") &&
      $toggleButton.classList.add("input-checked");

    $body.className = "dark";
  } else {
    $toggleButton.classList.contains("input-checked") &&
      $toggleButton.classList.remove("input-checked");

    $body.className = "";
  }
};

const handleToggleButtonClick = () => {
  const currentMode = useGetAtom(isDarkMode);

  useSetAtom(isDarkMode, !currentMode);
};

const setEvents = () => {
  $modeToggleButton.addEventListener("click", handleToggleButtonClick);
};

export { toggleMode, setEvents };
