const timer = [];

const setRollingEvent = function (rollingElement, index) {
  setTimeout(() => {
    timer[index] = window.setInterval(function () {
      rollingElement.style.transitionDuration = "400ms";
      rollingElement.style.marginTop = "-16px";

      window.setTimeout(function () {
        rollingElement.removeAttribute("style");
        rollingElement.appendChild(rollingElement.firstElementChild);
      }, 400);
    }, 2000);
  }, index * 1000);
};

let rolling = document.querySelectorAll(".rolling > ul");
rolling.forEach((elem, index) => {
  setRollingEvent(elem, index);
  elem.addEventListener("mouseover", () => clearInterval(timer[index]));
  elem.addEventListener("mouseout", () => setRollingEvent(elem, index));
  console.log(elem);
});
