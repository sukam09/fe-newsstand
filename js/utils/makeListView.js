import { CATEGORY } from "../constants/constants.js";

//종합/경제 카테고리 부분 언론사 순서 임시로
const order_list = ["SBS Biz", "서울경제"];

let selected_category = null;
function getPressCount(category_news) {
  const uniquePressSet = new Set();
  category_news.forEach((news) => {
    uniquePressSet.add(news.press);
  });
  return Array.from(uniquePressSet);
}

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
  const view_content = document.querySelector(".view-content");

  try {
    //임시로 이미지
    let imgIndex = 96;
    if (order_list[order - 1] === "SBS Biz") imgIndex = 93;
    let category_list = "";
    let main_news,
      sub_news = "";
    const category_news = await getNewsData(category);
    //카테고리 그리는 부분
    CATEGORY.forEach((ctg) => {
      category_list += `<li class="category"><div><span>${ctg}</span> <span class = "entire">${
        getPressCount(category_news).length
      }</span></div></li>`;
    });

    //뉴스 그리는 부분
    category_news.forEach((news) => {
      if (news.press === order_list[order - 1]) {
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
${order_list[order - 1]} 언론사에서 직접 편집한 뉴스입니다.
</li>`;

    const list_view = `<div class="list-view">
<button id="left-btn">
  <img id="left" src="../assets/icons/left-btn.svg" />
</button>
<div class="main-list">
<div class="field-tab">
  <ul>
    ${category_list}
</ul>
</div>
<div class="press-news">
<div class="press-info"><img id = "press-logo" alt="press-logo" src="../assets/images/logo/light/img${imgIndex}.svg"/>
  <span class="edit-date">2023.07.12 16:52 편집</span>
  <button id = "subscribe"><img src="../assets/icons/plus.svg"/><span>구독하기</span></button>
</div>
<div class = "news-content">
  <div class="main-news">
    ${main_news}
  </div>
  <div class = "sub-news">
    <ul class = "sub-news-ul">
     ${sub_news}
  </ul>
  </div>
</div>
</div>
</div>
<button id="right-btn">
  <img id="right" src="../assets/icons/right-btn.svg" />
</div>
</button>
</div>
`;
    view_content.innerHTML = list_view;
  } catch (error) {
    console.log(error);
  }
}

function handleClick(e) {
  const target = e.target.closest("li");
  if (target && target.classList.contains("category")) {
    if (selected_category) {
      selected_category.classList.remove("selected");
    }
    target.classList.add("selected");
    const category = target.textContent.trim().split(" ")[0];
    selected_category = target;
    // drawList(1, category);
  }
}

export function showListView(order) {
  drawList(order, CATEGORY[0]);

  document.addEventListener("click", handleClick);
}
