import categoryData from "../../json/category.json" assert { type: "json" };
import news from "../../json/news.json" assert { type: "json" };

let categoryCnt = []; //카테고리별 data개수
let categoryNews = {}; //카테고리별 담긴 기사뉴스

function setCategoryCnt() {
  for (const categories of categoryData) {
    for (const key in categories) {
      const item = {
        key: key,
        value: categories[key],
      };
      categoryCnt.push(item);
    }
  }
}

function setCategoryNews() {
  categoryCnt.forEach((categoryCntValue, categoryCntIndex) => {
    const item = [];
    news.News.forEach((newsValue) => {
      if (newsValue.category == categoryCntValue.key) item.push(newsValue);
    });
    categoryNews[categoryCntIndex] = item;
  });
}

setCategoryCnt();
setCategoryNews();

export { categoryCnt, categoryNews };
