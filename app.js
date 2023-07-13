import { NewsDB } from "./core/index.js";
import { startRollingBanner } from "./scripts/rolling-banner.js";
import { renderGridView } from "./scripts/grid-view.js";
import { renderListView } from "./scripts/list-view.js";
import { addEventOnPaginationButton } from "./scripts/pagination-button.js";
import { addEventOnViewerButton } from "./scripts/viewer-button.js";
import {
  customFetch,
  shuffleData,
  getKRLocaleDateString,
  setTheme,
} from "./utils/index.js";
import { addEventOnProgressBar } from "./scripts/progress-bar.js";
import { changeTheme } from "./store/reducer.js";
import { store } from "./store/index.js";

const $headerDate = document.querySelector(".container-header_date");

const initDB = async () => {
  const mockData = await customFetch("./mocks/news.json", shuffleData);
  NewsDB.instance = mockData;
};

const setHeaderDate = () => {
  $headerDate.innerText = getKRLocaleDateString(new Date());
};

const $themeButton = document.querySelector(".container-header_theme-btn");
$themeButton.addEventListener("click", () => {
  store.dispatch(changeTheme());

  setTheme();
});
// main
(async function () {
  await initDB();
  const newsData = NewsDB.getNewsData();

  setHeaderDate();
  startRollingBanner();

  renderGridView(newsData);
  renderListView();

  addEventOnPaginationButton();
  addEventOnViewerButton();
  addEventOnProgressBar();
})();
