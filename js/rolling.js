const timer = [];

const repeatRolling = (rollingElement) => {
  rollingElement.style.transitionDuration = "400ms";
  rollingElement.style.marginTop = "-16px";

  window.setTimeout(() => {
    rollingElement.removeAttribute("style");
    rollingElement.appendChild(rollingElement.firstElementChild);
  }, 400);
};

const setRollingEvent = (rollingElement, index) => {
  setTimeout(() => {
    timer[index] = window.setInterval(
      () => repeatRolling(rollingElement),
      5000
    );
  }, index * 1000);
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
  const $rollingTarget = document.querySelectorAll(".rolling > ul");
  $rollingTarget.forEach((elem, index) => setRollingAndStop(elem, index));
};

export { setRolling };
