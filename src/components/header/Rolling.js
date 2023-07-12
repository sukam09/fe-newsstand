import {
  ROLLING_WAIT_TIME,
  ROLLING_DIFF_TIME,
} from "../../constants/constants.js";
import { customFetch } from "../../utils/utils.js";

const $newsBar = document.querySelectorAll(".container-news-bar_wrap");
const $leftRollingBox = $newsBar[0];
const $leftRollingList = $leftRollingBox.querySelector("ul");
const $rightRollingBox = $newsBar[1];
const $rightRollingList = $rightRollingBox.querySelector("ul");

export const setRolling = async () => {
  const headLineData = await customFetch("./mocks/headlines.json");

  fillHeadlineContents(headLineData);

  setRollingInterval();
};

const fillHeadlineContents = (headlineData) => {
  headlineData.slice(0, 5).forEach(({ title, link }, idx) => {
    const headlineContent = createHeadlineContent(title, link, idx);

    $leftRollingList.appendChild(headlineContent);
  });

  headlineData.slice(5, 10).forEach(({ title, link }, idx) => {
    const headlineContent = createHeadlineContent(title, link, idx);

    $rightRollingList.appendChild(headlineContent);
  });
};

const createHeadlineContent = (title, link, idx) => {
  const $li = document.createElement("li");
  const $a = document.createElement("a");

  if (idx === 0) $li.className = "current";
  else if (idx === 1) $li.className = "next";
  else if (idx === 4) $li.className = "prev";

  $a.className = "available-medium14";
  $a.href = link;
  $a.innerHTML = title;

  $li.appendChild($a);

  return $li;
};

const setRollingInterval = () => {
  let rollingInterval = setInterval(() => {
    rollingCallback();
  }, ROLLING_WAIT_TIME);

  $leftRollingBox.addEventListener("mouseenter", () => {
    clearInterval(rollingInterval);
  });
  $leftRollingBox.addEventListener("mouseleave", () => {
    rollingInterval = setInterval(() => {
      rollingCallback();
    }, ROLLING_WAIT_TIME);
  });

  $rightRollingBox.addEventListener("mouseenter", () => {
    clearInterval(rollingInterval);
  });
  $rightRollingBox.addEventListener("mouseleave", () => {
    rollingInterval = setInterval(() => {
      rollingCallback();
    }, ROLLING_WAIT_TIME);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      clearInterval(rollingInterval);
      rollingInterval = setInterval(() => {
        rollingCallback();
      }, ROLLING_WAIT_TIME);
    } else {
      clearInterval(rollingInterval);
    }
  });
};

const rollingCallback = () => {
  rollingElement($leftRollingBox);

  const rightRollingCallback = () => rollingElement($rightRollingBox);
  setTimeout(rightRollingCallback, ROLLING_DIFF_TIME);
};

const rollingElement = (elem) => {
  elem.querySelector(".prev").classList.remove("prev");

  const $current = elem.querySelector(".current");

  $current.classList.remove("current");
  $current.classList.add("prev");

  const $next = elem.querySelector(".next");

  if ($next.nextElementSibling == null) {
    elem.querySelector("ul li:first-child").classList.add("next");
  } else {
    $next.nextElementSibling.classList.add("next");
  }

  $next.classList.remove("next");
  $next.classList.add("current");
};
