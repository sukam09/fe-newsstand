import { fetchData } from "../../../utils/fetchData.js";
import { manipulateNewsByCategory } from "../feature/manipulateNewsByCategory.js";
import { makeListView } from "./makeListView.js";
import { store } from "../../../store.js";
import { manipulateNewsByPress } from "../feature/manipulateNewsByPress.js";

async function renderListView() {
  console.log(store.state.list_page);
  const news = await fetchData(".././assets/news.json");
  if (store.state.type === "list-category") {
    manipulateNewsByCategory(news);
    makeListView();
  } else {
    manipulateNewsByPress(news);
    makeListView();
  }
}

export { renderListView };
