import {
  makeCategory,
  makeRandomNews,
  transformMainNews,
} from "./feature/handleNewsData.js";
import { addEventToBtn } from "./feature/handleBtnEvent.js";
import { fetchData } from "../../utils/fetchData.js";
import { transformNews } from "./feature/transformNews.js";

async function initListView() {
  const news = await fetchData(".././assets/news.json");
  transformNews(news);
  makeListView();
}

function makeListView() {
  makeRandomNews();
  makeCategory();
  transformMainNews();
  addEventToBtn();
}

export { initListView };
