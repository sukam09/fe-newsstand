import { CATEGORY } from "../constants/constants.js";
import { drawCategory } from "./drawCategory.js";
//임시로
let order_list = [
  { press: "서울경제", imgIndex: 96 },
  { press: "데일리안", imgIndex: 95 },
  { press: "SBS Biz", imgIndex: 93 },
];

const main_list = document.querySelector(".main-list");

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
    const img = order_list[order - 1].imgIndex;
    const category_news = await getNewsData(category);
    drawCategory(category_news, order, category);
    const newDiv = document.createElement("div");
    newDiv.classList.add("press-news");
    main_list.appendChild(newDiv);
    drawPressInfo(img);
    drawPressNews(category_news, order);
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

function drawPressInfo(img) {
  const press_news = main_list.querySelector(".press-news");
  press_news.innerHTML = `<div class="press-info">
    <img
      id="press-logo"
      alt="press-logo"
      src="../assets/images/logo/light/img${img}.svg"
    />
    <span class="edit-date">2023.07.12 16:52 편집</span>
    <button id="subscribe">
      <img src="../assets/icons/plus.svg" />
      <span>구독하기</span>
    </button>
  </div>`;
  const newDiv = document.createElement("div");
  newDiv.classList.add("news-content");
  press_news.appendChild(newDiv);
}

function drawPressNews(category_news, order) {
  let main_news,
    sub_news = "";
  category_news.forEach((news) => {
    if (news.press === order_list[order - 1].press) {
      if (news.thumbnail === "") {
        sub_news += ` <li>
        ${news.title}
      </li>`;
      } else {
        main_news = `<img src="${news.thumbnail}" alt="thumbnail"/>
        <p class="thumbnail-title">${news.title}</p>`;
      }
    }
  });
  sub_news += `<li id="caption">
  ${order_list[order - 1].press} 언론사에서 직접 편집한 뉴스입니다.
  </li>`;
  const news_content = main_list.querySelector(".news-content");

  news_content.innerHTML = `<div class="main-news">
      ${main_news}
    </div>
    <div class = "sub-news">
    <ul class = "sub-news-ul">
     ${sub_news}
  </ul>
  </div>`;
}

export function showListView(order) {
  drawList(order, CATEGORY[0]);
  document.addEventListener("click", handleClick);
}
