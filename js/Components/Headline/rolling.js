import { constants } from "../../Data/constants.js";

const rollingStop = [false, false];

const repeatRolling = (rollingElement, index) => {
  if (rollingStop[index]) return;

  rollingElement.style.transitionDuration =
    constants.ROLLING_TRANSITION_DURATION_MS + "ms";
  rollingElement.style.marginTop = "-16px";

  window.setTimeout(() => {
    rollingElement.removeAttribute("style");
    rollingElement.appendChild(rollingElement.firstElementChild);
  }, constants.ROLLING_TRANSITION_DURATION_MS);
};

const setRollingEvent = (rollingElement, index) => {
  setTimeout(() => {
    window.setInterval(
      () => repeatRolling(rollingElement, index),
      constants.ROLLING_TIMING_MS
    );
  }, index * constants.ROLLING_DIFF_MS);
};

const setRollingAndStop = (rollingElement, index) => {
  setRollingEvent(rollingElement, index);
  rollingElement.addEventListener(
    "mouseover",
    () => (rollingStop[index] = true)
  );
  rollingElement.addEventListener(
    "mouseout",
    () => (rollingStop[index] = false)
  );
};

const setRolling = () => {
  const $rollingTarget = document.querySelectorAll(
    ".headline__content_rolling > ul"
  );
  $rollingTarget.forEach((elem, index) => setRollingAndStop(elem, index));
};

export { setRolling };
