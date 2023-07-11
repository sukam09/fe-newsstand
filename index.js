import { setHotTopic, rollingTopic } from "./module/hot-topic.js";
import { setArrowVisible, makeGrid } from "./module/grid.js";
import { MEDIA } from "./constant.js";

let idList = Array.from({ length: MEDIA.TOTAL_NUM }, (_, idx) => idx);

/**
 * 배열을 섞는 함수
 */
const shuffleList = (list) => {
  list.sort(() => Math.random() - 0.5);
};

/**
 * 시스템 날짜 표시하기
 */
const setDate = () => {
  const today = new Date();

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  };

  const $systemDate = document.querySelector(".system-date");
  const $p = document.createElement("p");
  $p.innerText = today.toLocaleDateString("ko-KR", options);
  $systemDate.append($p);
};
const subscribed = Array.from({ length: 27 }, (_, idx) => idx + 1);

/**
 * 로고를 클릭하면 새로고침
 */
const setReload = () => {
  const $headerTitle = document.querySelector(".header_title");
  $headerTitle.addEventListener("click", () => location.reload());
};

function init() {
  setReload();
  setDate();

  setHotTopic();
  rollingTopic();

  shuffleList(idList);
  setArrowVisible();
  makeGrid();
}

init();

export { idList };
