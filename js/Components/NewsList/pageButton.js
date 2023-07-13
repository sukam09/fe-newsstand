import { clearProgress } from "./progress.js";

let page = 1;

const $progressCount = document.querySelector(
  ".news-list__field-tab__progress-count"
).childNodes[0];

const $leftButton = document.querySelector(
  ".news-section-list .left-button_content"
);
const $rightButton = document.querySelector(
  ".news-section-list .right-button_content"
);

const renderContent = () => {
  $progressCount.data = page + " ";
  clearProgress();

  // 컨텐츠 새로 렌더링하기
  // renderNewspaper(page);
};

const movePageLeft = () => {
  page--;
  renderContent();
};

const movePageRight = () => {
  page++;
  renderContent();
};

const setListPageButton = () => {
  $leftButton.addEventListener("click", movePageLeft);
  $rightButton.addEventListener("click", movePageRight);
};

export { setListPageButton, movePageRight };
