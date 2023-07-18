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
import { changeTheme } from "./store/reducer/theme.js";
import { store } from "./store/index.js";
import { setSnackbar } from "./scripts/snackbar.js";
import { initSubscribe } from "./store/reducer/subscribe-list.js";
import { getLocalStorageItem } from "./utils/local-storage.js";

const $headerDate = document.querySelector(".container-header_date");

const initDB = async () => {
  const mockData = await customFetch("./mocks/news.json", shuffleData);
  NewsDB.instance = mockData;
};

const initSubscribeList = () => {
  const subscribeList = JSON.parse(getLocalStorageItem("subscribeList")) || [];
  store.dispatch(initSubscribe(subscribeList));
};

const setHeaderDate = () => {
  $headerDate.innerText = getKRLocaleDateString(new Date());
};

const addEventOnThemeButton = () => {
  const $themeButton = document.querySelector(".theme-btn");

  $themeButton.addEventListener("click", () => {
    store.dispatch(changeTheme());
    setTheme();
  });
};
// main
(async function () {
  await initDB();
  initSubscribeList();
  const newsData = NewsDB.getNewsData();

  setHeaderDate();
  setSnackbar();
  startRollingBanner();

  renderGridView(newsData);
  renderListView();

  addEventOnThemeButton();
  addEventOnPaginationButton();
  addEventOnViewerButton();
  addEventOnProgressBar();
})();
