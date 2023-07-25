import { fetchData } from "../../utils/fetchData.js";
import { viewOption, viewType } from "../../store/store.js";
import { getState } from "../../store/observer.js";
import { manipulateNewsByCategory } from "./manipulateNewsByCategory.js";
import { manipulateNewsByPress } from "./manipulateNewsByPress.js";
import { makeListView } from "./makeListView.js";

async function renderListView() {
  const news = await fetchData(".././assets/news.json");
  console.log(getState(viewType));
  if (getState(viewOption) === "all") {
    manipulateNewsByCategory(news);
    makeListView();
  } else {
    manipulateNewsByPress(news);
    makeListView();
  }
}

export { renderListView };
