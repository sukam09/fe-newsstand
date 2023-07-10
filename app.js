import { startRollingBanner } from "./scripts/rolling-banner.js";
import { fillNewsContents } from "./scripts/grid-view.js";
import {
  customFetch,
  shuffleData,
  getKRLocaleDateString,
} from "./utils/index.js";

let scheme = "light";

const $headerDate = document.querySelector(".container-header_date");

(async function init() {
  $headerDate.innerText = getKRLocaleDateString(new Date());

  const newsData = await customFetch("./mocks/news.json", shuffleData);
  fillNewsContents(newsData);

  const headlineData = await customFetch("./mocks/headline.json");
  startRollingBanner(headlineData);
})();
