import { IMAGE } from "../constant.js";

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

const setViewEvent = () => {
  const $listIcon = document.querySelector(".nav-list");
  const $gridIcon = document.querySelector(".nav-grid");

  $listIcon.addEventListener("click", () => {
    moveListView();
  });
  $gridIcon.addEventListener("click", () => {
    moveGridView();
  });
};

const moveGridView = () => {
  const $gridIcon = document.querySelector(".nav-grid");
  const $listIcon = document.querySelector(".nav-list");

  //   $gridIcon.src = "/images/grid-view_blue.svg";
  $gridIcon.src = IMAGE.BLUE_GRID_ICON;
  $listIcon.src = IMAGE.GRAY_LIST_ICON;

  const $gridView = document.querySelector(".news-grid-wrapper");
  const $listView = document.querySelector(".news-list-wrapper");

  console.log($gridView, $listView);

  $gridView.classList.remove("hidden");
  $listView.classList.add("hidden");
};

const moveListView = () => {
  const $gridIcon = document.querySelector(".nav-grid");
  const $listIcon = document.querySelector(".nav-list");

  $gridIcon.src = IMAGE.GRAY_GRID_ICON;
  $listIcon.src = IMAGE.BLUE_LIST_ICON;
  const $gridView = document.querySelector(".news-grid-wrapper");
  const $listView = document.querySelector(".news-list-wrapper");

  $listView.classList.remove("hidden");
  $gridView.classList.add("hidden");
};

export { shuffleList, setDate, setReload, setViewEvent };
