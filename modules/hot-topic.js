import { getJSON } from "./data.js";
import { TOPIC, URL } from "../constant.js";

/**
 * 핫토픽 5개씩 요소 추가하기
 */
const setHotTopic = async () => {
  const $hotTopicLeft = document.querySelector(".hot-topic-left");
  const $hotTopicRight = document.querySelector(".hot-topic-right");

  let hotTopic = await getJSON(URL.HOT_TOPIC);

  hotTopic.forEach((topic, idx) => {
    const $li = document.createElement("li");
    $li.classList.add("hot-topic_list");

    if (idx % TOPIC.SECTION_NUM === 0) $li.classList.add("prev");
    else if (idx % TOPIC.SECTION_NUM === 1) $li.classList.add("current");
    else if (idx % TOPIC.SECTION_NUM === 2) $li.classList.add("next");

    const $h2 = document.createElement("h2");
    $h2.classList.add("hot-topic_list_title");
    $h2.innerText = topic.title;

    const $p = document.createElement("p");
    $p.classList.add("hot-topic_list_content");
    $p.innerText = topic.content;

    $li.append($h2, $p);

    idx < TOPIC.SECTION_NUM
      ? $hotTopicLeft.append($li)
      : $hotTopicRight.append($li);
  });
};

/**
 * 핫토픽 롤링하는 함수
 * -> 5초에 한번씩 가장 위에 있는 뉴스 하위로 가져옴.
 */
let leftInterval = null,
  rightInterval = null;

const rollingTopic = () => {
  document.addEventListener("DOMContentLoaded", () => {
    clearInterval(leftInterval);
    clearInterval(rightInterval);

    leftInterval = startRolling("hot-topic-left");

    setTimeout(() => {
      rightInterval = startRolling("hot-topic-right");
    }, TOPIC.ROLLING_TIME_GAP);
  });
};

const startRolling = (sectionClass) => {
  let interval =
    sectionClass === "hot-topic-left" ? leftInterval : rightInterval;

  interval = setInterval(() => {
    rollingCallback(sectionClass);
  }, TOPIC.ROLLING_TIME);

  const $hotTopic = document.querySelector(`.${sectionClass}`);
  $hotTopic.addEventListener("mouseenter", () => {
    clearInterval(interval);
  });
  $hotTopic.addEventListener("mouseleave", () => {
    interval = startRolling("hot-topic-right");
  });

  return interval;
};

/**
 * 핫토픽 롤링 동작 함수
 */
const rollingCallback = (sectionClass) => {
  document.querySelector(`.${sectionClass} .prev`).classList.remove("prev");

  let current = document.querySelector(`.${sectionClass} .current`);
  current.classList.remove("current");
  current.classList.add("prev");

  let next = document.querySelector(`.${sectionClass} .next`);
  if (next.nextElementSibling === null) {
    document
      .querySelector(`.${sectionClass} .hot-topic_list:first-child`)
      .classList.add("next");
  } else {
    next.nextElementSibling.classList.add("next");
  }
  next.classList.remove("next");
  next.classList.add("current");
};

/**
 * 초기 핫토픽 동작 세팅
 */
async function initHotTopicView() {
  setHotTopic();
  rollingTopic();
}

export { initHotTopicView };
