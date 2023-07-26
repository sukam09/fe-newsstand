import { fetchData } from "../../utils/fetchData.js";
import { viewOption } from "../../store/store.js";
import { getState } from "../../store/observer.js";
import { manipulateNewsByCategory } from "./manipulateNewsByCategory.js";
import { manipulateNewsByPress } from "./manipulateNewsByPress.js";
import { makeListView } from "./makeListView.js";
import { ALL_PRESS } from "../../constant.js";

async function renderListView() {
  const news = await fetchData(".././assets/news.json");
  if (getState(viewOption) === ALL_PRESS) {
    manipulateNewsByCategory(news);
    makeListView();
  } else {
    manipulateNewsByPress(news);
    makeListView();
  }
}

export { renderListView };
