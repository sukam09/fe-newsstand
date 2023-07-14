import { drawCategory } from "./drawCategory.js";
import { drawPressInfo } from "./drawPressInfo.js";
import { drawPressNews } from "./drawPressNews.js";
import { getPressCount } from "./getPressCount.js";
import { CATEGORY } from "../constants/constants.js";
//임시로
let order_list = [
  { press: "서울경제", imgIndex: 96 },
  { press: "데일리안", imgIndex: 95 },
  { press: "SBS Biz", imgIndex: 93 },
];

async function getNewsData(category) {
  try {
    const response = await fetch("../data/news.json");
    const newsData = await response.json();
    const category_news = newsData.News.filter(
      (news) => news.category === category
    );
    return category_news;
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw error;
  }
}

async function drawList(order, category) {
  if (category !== "종합/경제")
    order_list = [
      { press: "SBS Biz", imgIndex: 93 },
      { press: "데일리안", imgIndex: 95 },
      { press: "서울경제", imgIndex: 96 },
    ];
  else {
    order_list = [
      { press: "서울경제", imgIndex: 96 },
      { press: "데일리안", imgIndex: 95 },
      { press: "SBS Biz", imgIndex: 93 },
    ];
  }
  try {
    const main_list = document.querySelector(".main-list");
    const img = order_list[order - 1].imgIndex;
    let category_news = await getNewsData(category);
    if (
      getPressCount(category_news).length !== 0 &&
      getPressCount(category_news).length < order
    ) {
      order = 1;
      const currentIndex = CATEGORY.indexOf(category);
      const nextIndex = (currentIndex + 1) % CATEGORY.length;
      category = CATEGORY[nextIndex];
      category_news = await getNewsData(category);
    }
    drawCategory(category_news, order, category);
    const newDiv = document.createElement("div");
    newDiv.classList.add("press-news");
    main_list.appendChild(newDiv);
    drawPressInfo(img);
    drawPressNews(category_news, order_list[order - 1].press);
  } catch (error) {
    console.log(error);
  }
}

function handleClick(e) {
  const target = e.target.closest("li");
  if (target && target.classList.contains("category")) {
    const category = target.querySelector(".ctg").textContent.trim();
    drawList(1, category);
  }
}

export function showListView(order, category = "") {
  if (category === "") {
    const selected_category = document.querySelector(".category.selected .ctg");
    category = selected_category.textContent;
  }
  const main_list = document.querySelector(".main-list");
  main_list.innerHTML = "";
  drawList(order, category);
  document.addEventListener("click", handleClick);
}
