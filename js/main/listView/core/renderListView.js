import { fetchData } from "../../../utils/fetchData.js";
import { manipulateNews } from "../feature/manipulateNews.js";
import { makeListView } from "./makeListView.js";

async function renderListView() {
  const news = await fetchData(".././assets/news.json");
  manipulateNews(news);
  makeListView();
}

export { renderListView };
