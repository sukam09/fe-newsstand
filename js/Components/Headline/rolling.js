import { constants } from "../../Data/constants.js";

const timer = [];

const repeatRolling = (rollingElement) => {
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
    timer[index] = window.setInterval(
      () => repeatRolling(rollingElement),
      constants.ROLLING_TIMING_MS
    );
  }, index * constants.ROLLING_DIFF_MS);
};

const setRollingAndStop = (rollingElement, index) => {
  setRollingEvent(rollingElement, index);
  rollingElement.addEventListener("mouseover", () =>
    clearInterval(timer[index])
  );
  rollingElement.addEventListener("mouseout", () =>
    setRollingEvent(rollingElement, index)
  );
};

const setRolling = () => {
  const $rollingTarget = document.querySelectorAll(
    ".headline__content_rolling > ul"
  );
  $rollingTarget.forEach((elem, index) => setRollingAndStop(elem, index));
};

export { setRolling };
