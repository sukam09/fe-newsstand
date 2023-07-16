import { ROLLING_TIME, ROLLING_LATENCY } from "./const.js";

function rollingCallback(index) {
  document.querySelector(`.rolling-${index} .prev`).classList.remove("prev");

  let $current = document.querySelector(`.rolling-${index} .current`);
  $current.classList.remove("current");
  $current.classList.add("prev");

  let $next = document.querySelector(`.rolling-${index} .next`);
  if ($next.nextElementSibling == null) {
    document.querySelector(`.rolling-${index} ul li:first-child`).classList.add("next");
  } else {
    $next.nextElementSibling.classList.add("next");
  }
  $next.classList.remove("next");
  $next.classList.add("current");
}

function firstRolling() {
  return window.setInterval(() => rollingCallback("first"), ROLLING_TIME);
}

function secondRolling() {
  return window.setInterval(() => rollingCallback("second"), ROLLING_TIME);
}

function initRolling() {
  let interval1 = firstRolling();
  let interval2;
  let t_out = setTimeout(() => (interval2 = secondRolling()), ROLLING_LATENCY);

  const rollings = document.querySelectorAll(".rollingbanner");
  for (const rolling of rollings) {
    rolling.addEventListener("mouseenter", function () {
      window.clearInterval(interval1);
      window.clearInterval(interval2);
      window.clearTimeout(t_out);
    });

    rolling.addEventListener("mouseleave", function () {
      interval1 = firstRolling();
      t_out = setTimeout(() => (interval2 = secondRolling()), ROLLING_LATENCY);
    });
  }
}

export { initRolling };
