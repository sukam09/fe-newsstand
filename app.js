import { NewsDB } from "./core/index.js";
import { startRollingBanner } from "./scripts/rolling-banner.js";
import { renderGridView } from "./scripts/grid-view.js";
import { renderListView } from "./scripts/list-view.js";
import { addEventOnPaginationButton } from "./scripts/pagination-button.js";
import {
  customFetch,
  shuffleData,
  getKRLocaleDateString,
} from "./utils/index.js";
import { store } from "./store/index.js";
import { setCategory } from "./store/reducer.js";
import { addEventOnViewerButton } from "./scripts/viewer-button.js";

const $headerDate = document.querySelector(".container-header_date");
const $listViewTab = document.querySelector(".list-view_tab > ul");
const $listViewTabItems = $listViewTab.querySelectorAll("li");

const initDB = async () => {
  const mockData = await customFetch("./mocks/news.json", shuffleData);
  NewsDB.instance = mockData;
};

const setHeaderDate = () => {
  $headerDate.innerText = getKRLocaleDateString(new Date());
};

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
})();

const handleListViewTabClick = (e) => {
  if (e.target === e.currentTarget) return;

  $listViewTabItems.forEach(($item) => {
    if ($item === e.target) {
      $item.className = "category-selected selected-bold14";
    } else {
      $item.className = "";
    }
  });

  const category = e.target.innerText;
  store.dispatch(setCategory(category));
};

$listViewTab.addEventListener("click", handleListViewTabClick);
