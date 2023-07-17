import {
  makeCategory,
  makeRandomNews,
  transformMainNews,
} from "./handle/handleData.js";
import { addEventToBtn } from "./handle/handleBtn.js";
import { fetchData } from "../../utils/fetchData.js";

let category = [];
let news_by_category = {};

async function initListView() {
  const news = await fetchData(".././assets/news.json");
  makeNewsByCategory(news);
  makeListView();
}

function makeNewsByCategory(news) {
  news.forEach((item) => {
    if (!category.includes(item.category)) category.push(item.category);
  });
  category.forEach((item) => {
    news_by_category[item] = [];
  });
  news.forEach((item) => {
    news_by_category[item.category].push({
      name: item.name,
      src: item.lightSrc,
      isSub: item.isSub,
      editDate: item.editDate,
      thumbSrc: item.thumbSrc,
      headTitle: item.main_title,
      subTitle: item.subTitle,
      copyRight: `${item.name} 언론사에서 직접 편집한 뉴스입니다.`,
    });
  });
}

function makeListView() {
  makeRandomNews();
  makeCategory();
  transformMainNews();
  addEventToBtn();
}

export { initListView, category, news_by_category };
