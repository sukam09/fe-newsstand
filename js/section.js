const setRollingEvent = function (rollingElement, startTime) {
  setTimeout(() => {
    window.setInterval(function () {
      rollingElement.style.transitionDuration = "400ms";
      rollingElement.style.marginTop = "-16px";

      window.setTimeout(function () {
        rollingElement.removeAttribute("style");
        rollingElement.appendChild(rollingElement.firstElementChild);
      }, 400);
    }, 5000);
  }, startTime * 1000);
};

let rolling = document.querySelectorAll(".rolling > ul");
rolling.forEach((elem, index) => setRollingEvent(elem, index));
