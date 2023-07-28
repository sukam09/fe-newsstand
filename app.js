import { NewsDB } from "./core/index.js";
import { startRollingBanner } from "./scripts/rolling-banner.js";
import { renderGridView } from "./scripts/grid-view.js";
import { renderListView } from "./scripts/list-view.js";
import { addEventHandlerOnPaginationButton } from "./scripts/pagination-button.js";
import { addEventHandlerOnViewerButton } from "./scripts/viewer-button.js";
import { addEventHandlerOnTabs } from "./scripts/tab-button.js";
import { addEventHandlerOnProgressBar } from "./scripts/progress-bar.js";
import { addEventHandlerOnThemeButton, initAppTheme } from "./scripts/theme.js";
import { setModal } from "./scripts/modal.js";
import { setSnackbar } from "./scripts/snackbar.js";
import {
  customFetch,
  shuffleData,
  getKRLocaleDateString,
} from "./utils/index.js";
import { appStore } from "./store/index.js";
import { initSubscribe } from "./store/reducer/subscribe-list.js";
import { getLocalStorageItem } from "./utils/local-storage.js";

async function initDB() {
  const NEWS_DATA_SOURCE = "./mocks/news.json";

  const mockData = await customFetch(NEWS_DATA_SOURCE, shuffleData);
  NewsDB.instance = mockData;
}

function initSubscribeList() {
  const subscribeList = JSON.parse(getLocalStorageItem("subscribeList")) || [];
  appStore.dispatch(initSubscribe(subscribeList));
}

function setHeaderDate() {
  const $headerDate = document.querySelector(".container-header_date");
  $headerDate.innerText = getKRLocaleDateString(new Date());
}

function renderViews() {
  renderGridView();
  renderListView();
}

function addEventHandlers() {
  addEventHandlerOnThemeButton();
  addEventHandlerOnPaginationButton();
  addEventHandlerOnTabs();
  addEventHandlerOnViewerButton();
  addEventHandlerOnProgressBar();
}

async function initApp() {
  await initDB();
  initAppTheme();
  initSubscribeList();

  setHeaderDate();
  setSnackbar();
  setModal();

  startRollingBanner();
  renderViews();
  addEventHandlers();
}

window.addEventListener("DOMContentLoaded", initApp);
