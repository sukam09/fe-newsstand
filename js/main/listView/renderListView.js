import { fetchData } from "../../utils/fetchData.js";
import { viewOption } from "../../store/store.js";
import { getState } from "../../store/observer.js";
import {
  manipulateNewsByCategory,
  manipulateNewsByPress,
} from "./manipulateNews.js";
import { ALL_PRESS } from "../../utils/constant.js";
import { makeCategory, transformMainNews } from "./handleNewsData.js";

async function renderListView() {
  const news = await fetchData(".././assets/news.json");
  if (getState(viewOption) === ALL_PRESS) {
    manipulateNewsByCategory(news);
  } else {
    manipulateNewsByPress(news);
  }
  makeCategory();
  transformMainNews();
}

export { renderListView };
