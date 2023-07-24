import { NewsDB } from "./core/index.js";
import { startRollingBanner } from "./scripts/rolling-banner.js";
import { renderGridView } from "./scripts/grid-view.js";
import { renderListView } from "./scripts/list-view.js";
import { addEventOnPaginationButton } from "./scripts/pagination-button.js";
import { addEventOnViewerButton } from "./scripts/viewer-button.js";
import { addEventOnTabs } from "./scripts/tab-button.js";
import { addEventOnProgressBar } from "./scripts/progress-bar.js";
import { setModal } from "./scripts/modal.js";
import { setSnackbar } from "./scripts/snackbar.js";
import {
  customFetch,
  shuffleData,
  getKRLocaleDateString,
  setTheme,
} from "./utils/index.js";
import { store } from "./store/index.js";
import { changeTheme, initTheme } from "./store/reducer/theme.js";
import { initSubscribe } from "./store/reducer/subscribe-list.js";
import { getLocalStorageItem } from "./utils/local-storage.js";
import { THEME } from "./constants/index.js";

async function initDB() {
  const NEWS_DATA_SOURCE = "./mocks/news.json";

  const mockData = await customFetch(NEWS_DATA_SOURCE, shuffleData);
  NewsDB.instance = mockData;
}

function initSubscribeList() {
  const subscribeList = JSON.parse(getLocalStorageItem("subscribeList")) || [];
  store.dispatch(initSubscribe(subscribeList));
}

function initAppTheme() {
  let theme = getLocalStorageItem("theme");

  const isUserPreferDarkTheme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // theme 설정이 없을 시 사용자의 OS 테마 설정을 따름
  if (!theme && isUserPreferDarkTheme) {
    theme = THEME.DARK;
  }

  // 위의 케이스가 모두 해당하지 않을 시 기본 테마를 light로 설정
  if (!theme) {
    theme = THEME.LIGHT;
  }

  store.dispatch(initTheme(theme));
  setTheme();
}

function setHeaderDate() {
  const $headerDate = document.querySelector(".container-header_date");
  $headerDate.innerText = getKRLocaleDateString(new Date());
}

function addEventOnThemeButton() {
  const $themeButton = document.querySelector(".theme-btn");

  $themeButton.addEventListener("click", () => {
    store.dispatch(changeTheme());
    setTheme();
  });
}

function renderViews() {
  renderGridView();
  renderListView();
}

function addEventHandlers() {
  addEventOnThemeButton();
  addEventOnPaginationButton();
  addEventOnTabs();
  addEventOnViewerButton();
  addEventOnProgressBar();
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
