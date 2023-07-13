import { convertTab } from "./fieldTab.js";
import { clearProgress } from "./progress.js";

let page = 1;
let $nowPage;

const $leftButton = document.querySelector(
  ".news-section-list .left-button_content"
);
const $rightButton = document.querySelector(
  ".news-section-list .right-button_content"
);

const renderContent = () => {
  $nowPage.data = page + " ";
  clearProgress();

  // 컨텐츠 새로 렌더링하기
  // renderNewspaper(page);
};

const movePage = (amout) => {
  page += amout;
  renderContent();
};

const movePageLeft = () => {
  if (page === 1) {
    convertTab(-1);
    page = 10;
    renderContent();
  } else {
    movePage(-1);
  }
};

const movePageRight = () => {
  if (page === 10) {
    convertTab(1);
  } else {
    movePage(1);
  }
};

const setNowPageTag = () => {
  $nowPage = document.querySelector(".news-list__field-tab__progress-count")
    .childNodes[0];
};

const changePageTarget = () => {
  setNowPageTag();
  page = 1;
};

const setListPageButton = () => {
  setNowPageTag();

  $leftButton.addEventListener("click", movePageLeft);
  $rightButton.addEventListener("click", movePageRight);
};

export { setListPageButton, movePageRight, changePageTarget };
