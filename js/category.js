import categoryData from "../json/category.json" assert { type: "json" };
import news from "../json/news.json" assert { type: "json" };
import news_article from "../json/news_article.json" assert { type: "json" };
import { increment, totalTime } from "./constants.js";

let progress = 0;
let categoryCnt = []; //카테고리별 data개수
let categoryNews = {}; //카테고리별 담긴 기사뉴스
let currentCategoryPageNumber = 1;
let currentCategoryNumber = 0;
let progressInterval;
let currentCategoryPage;

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

function drawInitCategory() {
  currentCategoryPageNumber = 1;
  currentCategoryNumber = 0;
  let categoryHtml = `<div class="categoryWrap"><ul>`;
  categoryCnt.forEach((key, index) => {
    categoryHtml += `<div class="categoryItem" id="category${index}"><div class="progress-bar" id=${key.key}></div><span class="category">${key.key}</span></li><span class="currentCategoryPage">1</span><span class="categoryCnt">/ ${key.value}</span></div>`;
  });
  categoryHtml += `</ul></div>`;
  document.getElementById("category").innerHTML = categoryHtml;
  drawCategoryItem();
}

function drawCategoryItem() {
  const categoryItem = document.querySelectorAll(".categoryItem");
  currentCategoryPage = document.querySelectorAll(".currentCategoryPage");
  categoryDisplayClear(categoryItem);
  categoryDisplayOn(categoryItem);
  drawNews();
  if (progressInterval != undefined) {
    clearInterval(progressInterval);
    progressReset(
      document.querySelectorAll(".progress-bar")[currentCategoryNumber],
      currentCategoryPage
    );
  }
  intervalProgress(
    document.querySelectorAll(".progress-bar")[currentCategoryNumber],
    currentCategoryPage
  );
}

function categoryDisplayOn(categoryItem) {
  categoryItem[currentCategoryNumber].style.backgroundColor = "#7890E7";
  categoryItem[currentCategoryNumber].style.color = "#FFFFFF";
  currentCategoryPage[currentCategoryNumber].style.display = "flex";
  document.querySelectorAll(".categoryCnt")[
    currentCategoryNumber
  ].style.display = "flex";
}

function categoryDisplayClear(categoryItem) {
  categoryCnt.forEach((value, index) => {
    categoryItem[index].style.backgroundColor = "#f5f7f9";
    categoryItem[index].style.color = "#5f6e76";
    currentCategoryPage[index].style.display = "none";
    document.querySelectorAll(".categoryCnt")[index].style.display = "none";
  });
}

function intervalProgress(progressBar, currentCategoryPage) {
  progress = 0;
  progressInterval = setInterval(() => {
    doProgress(progressBar, currentCategoryPage);
  }, totalTime / (100 / increment));
}

function doProgress(progressBar, currentCategoryPage) {
  progressBar.style.transition = `width ${
    totalTime / increment / 1000
  }s linear`;
  if (progress === 100) {
    currentCategoryPageNumber++;
    if (
      currentCategoryPageNumber ===
      categoryCnt[currentCategoryNumber].value + 1
    ) {
      currentCategoryPageNumber = 1;
      if (currentCategoryNumber === categoryCnt.length - 1)
        currentCategoryNumber = 0;
      else currentCategoryNumber++;
      clearInterval(progressInterval);
    }
    drawCategoryItem();
    progressReset(progressBar, currentCategoryPage);
    return;
  } else progressFill(progressBar);
}

function progressReset(progressBar, currentCategoryPage) {
  currentCategoryPage[currentCategoryNumber].innerHTML =
    currentCategoryPageNumber;
  progressBar.style.transition = "";
  progressBar.style.width = "0%";
  progress = 0;
}

function progressFill(progressBar) {
  progress += increment;
  progressBar.style.width = `${progress}%`;
}

function drawNewsHeader() {
  let PageNumberIndex = currentCategoryPageNumber - 1;
  const news_header = document.querySelector(".news-header");
  news_header.innerHTML = "";
  let new_div = `<div class="news-header-div"><img class="news-thumbnail" src="${categoryNews[currentCategoryNumber][PageNumberIndex].thumbnail}"><span class="news-edit-time">${categoryNews[currentCategoryNumber][PageNumberIndex].editTime}</span><img class="subscribe-button" src="./img/subscribe_button.svg"></div>`;
  news_header.innerHTML = new_div;
}

function drawNewsDiv() {
  const PageNumberIndex = currentCategoryPageNumber - 1;
  const listDiv = document.querySelector(".news-content");
  listDiv.innerHTML = "";
  let new_div = `<div class="news-main-left-div">${drawNewsImage(
    PageNumberIndex
  )}</div><div class="news-main-right-div">${drawNewsArticle(
    PageNumberIndex
  )}</div>`;
  listDiv.innerHTML = new_div;
}

function drawNewsImage(PageNumberIndex) {
  return `<img class="news-main-image" src="${categoryNews[currentCategoryNumber][PageNumberIndex].thumbnail}">${categoryNews[currentCategoryNumber][PageNumberIndex].title}`;
}

function drawNewsArticle(PageNumberIndex) {
  let article_div = "";
  for (let article_cnt = 0; article_cnt < 6; article_cnt++) {
    article_div += `<div class="news-main-article">${news_article.article[article_cnt]}</div>`;
  }
  article_div += `<div class="news-main-article-press">${categoryNews[currentCategoryNumber][PageNumberIndex].press}언론사에서 직접 편집한 뉴스입니다.</div>`;
  return article_div;
}

function drawNews() {
  drawNewsDiv();
  drawNewsHeader();
}

function clearCategoryNumber() {
  const categoryItem = document.querySelectorAll(".categoryItem");
  categoryDisplayClear(categoryItem);
  categoryDisplayOn(categoryItem);
}

function increaseListPage() {
  if (currentCategoryPageNumber === categoryCnt[currentCategoryNumber].value) {
    currentCategoryPageNumber = 1;
    if (currentCategoryNumber === categoryCnt.length - 1)
      currentCategoryNumber = 0;
    else currentCategoryNumber++;
    drawNews();
    clearCategoryNumber();
    clearInterval(progressInterval);
    progressReset(
      document.querySelectorAll(".progress-bar")[currentCategoryNumber],
      currentCategoryPage
    );
    intervalProgress(
      document.querySelectorAll(".progress-bar")[currentCategoryNumber],
      currentCategoryPage
    );
    return;
  }
  currentCategoryPageNumber++;
  clearInterval(progressInterval);
  progressReset(
    document.querySelectorAll(".progress-bar")[currentCategoryNumber],
    currentCategoryPage
  );
  intervalProgress(
    document.querySelectorAll(".progress-bar")[currentCategoryNumber],
    currentCategoryPage
  );
  drawNews();
}

function decreaseListPage() {
  if (currentCategoryPageNumber === 1) {
    currentCategoryPageNumber = 1;
    if (currentCategoryNumber === 0)
      currentCategoryNumber = categoryCnt.length - 1;
    else currentCategoryNumber--;
    clearCategoryNumber();
    drawNews();
    clearInterval(progressInterval);
    progressReset(
      document.querySelectorAll(".progress-bar")[currentCategoryNumber],
      currentCategoryPage
    );
    intervalProgress(
      document.querySelectorAll(".progress-bar")[currentCategoryNumber],
      currentCategoryPage
    );
    return;
  }
  currentCategoryPageNumber--;
  clearInterval(progressInterval);
  progressReset(
    document.querySelectorAll(".progress-bar")[currentCategoryNumber],
    currentCategoryPage
  );
  intervalProgress(
    document.querySelectorAll(".progress-bar")[currentCategoryNumber],
    currentCategoryPage
  );
  drawNews();
}

export {
  drawInitCategory,
  progressInterval,
  drawNewsHeader,
  drawNewsDiv,
  increaseListPage,
  decreaseListPage,
};
