import categoryData from "../json/category.json" assert { type: "json" };
import news from "../json/news.json" assert { type: "json" };
import { leftAsideButton, rightAsideButton } from "./renderMain.js";
import { increment, totalTime } from "./constants.js";

let progress = 0;

let categoryCnt = []; //json파일을 받아와 배열 형태로 관리
let categoryNews = {};
let currentCategoryPageNumber = 1;
let currentCategoryNumber = 0;
let progressInterval;

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
  console.log(categoryNews);
}
setCategoryCnt();
setCategoryNews();

function addInitCategory() {
  progress = 0;
  currentCategoryPageNumber = 1;
  currentCategoryNumber = 0;
  let categoryHtml = `<div class="categoryWrap"><ul>`;
  categoryCnt.forEach((key, index) => {
    categoryHtml += `<div class="categoryItem" id="category${index}"><div class="progress-bar" id=${key.key}></div><span class="category">${key.key}</span></li><span class="currentCategoryPage">1</span><span class="categoryCnt">/ ${key.value}</span></div>`;
  });
  categoryHtml += `</ul></div>`;
  document.getElementById("category").innerHTML = categoryHtml;
  initCategoryItem();
}

function initCategoryItem() {
  const categoryItem = document.querySelectorAll(".categoryItem");
  const currentCategoryPage = document.querySelectorAll(".currentCategoryPage");
  categoryDisplayClear(categoryItem, currentCategoryPage);
  categoryDisplayOn(categoryItem, currentCategoryPage);
  intervalProgress(
    document.querySelectorAll(".progress-bar")[currentCategoryNumber],
    currentCategoryPage
  );
}

function categoryDisplayOn(categoryItem, currentCategoryPage) {
  categoryItem[currentCategoryNumber].style.backgroundColor = "#7890E7";
  categoryItem[currentCategoryNumber].style.color = "#FFFFFF";
  currentCategoryPage[currentCategoryNumber].style.display = "flex";
  document.querySelectorAll(".categoryCnt")[
    currentCategoryNumber
  ].style.display = "flex";
}

function categoryDisplayClear(categoryItem, currentCategoryPage) {
  categoryCnt.forEach((value, index) => {
    categoryItem[index].style.backgroundColor = "#f5f7f9";
    categoryItem[index].style.color = "#5f6e76";
    currentCategoryPage[index].style.display = "none";
    document.querySelectorAll(".categoryCnt")[index].style.display = "none";
  });
}

function intervalProgress(progressBar, currentCategoryPage) {
  progressInterval = setInterval(() => {
    doProgress(progressBar, currentCategoryPage);
  }, totalTime / (100 / increment));
}

function doProgress(progressBar, currentCategoryPage) {
  progressBar.style.transition = `width ${
    totalTime / increment / 1000
  }s linear`;
  if (progress === 100) {
    progress = 0;
    currentCategoryPageNumber++;
    if (
      currentCategoryPageNumber ===
      categoryCnt[currentCategoryNumber].value + 1
    ) {
      currentCategoryPageNumber = 1;
      currentCategoryNumber++;
      if (currentCategoryNumber === categoryCnt.length)
        currentCategoryNumber = 0;
      clearInterval(progressInterval);
      initCategoryItem();
    }
    progressReset(progressBar, currentCategoryPage);
    return;
  } else progressFill(progressBar);
}

function progressReset(progressBar, currentCategoryPage) {
  currentCategoryPage[currentCategoryNumber].innerHTML =
    currentCategoryPageNumber;
  progressBar.style.transition = "";
  progressBar.style.width = "0%";
}

function progressFill(progressBar) {
  progress += increment;
  progressBar.style.width = `${progress}%`;
}

function addNewsHeader() {
  const news_header = document.querySelector(".news_header");
  news_header.innerHTML = "";
  let new_div = `<div class="news-header-div"><img class="newsThumbnail" src="${categoryNews[currentCategoryNumber][currentCategoryPageNumber].thumbnail}"><span class="newsEditTime">${categoryNews[currentCategoryNumber][currentCategoryPageNumber].editTime}</span><img class="subscribeButton" src="./img/subscribeButton.svg"></div>`;
  news_header.innerHTML = new_div;
  console.log(`currentPageNumber: ${currentCategoryPageNumber}`);
  console.log(`currentCategoryNumber: ${currentCategoryNumber}`);
}

function increaseListPage() {
  if (currentPageNumber === MAX_PAGE_NUMBER - 1) {
    rightAsideButton.style.visibility = "hidden";
    currentCategoryNumber++;
    addNewsHeader();
    return;
  }
  leftAsideButton.style.visibility = "visible";
  addNewsHeader();
}

function decreaseListPage() {
  console.log(currentPageNumber);
  if (currentPageNumber === MIN_PAGE_NUMBER + 1) {
    leftAsideButton.style.visibility = "hidden";
    currentCategoryNumber--;
    addNewsHeader();
    return;
  }
  rightAsideButton.style.visibility = "visible";
  addNewsHeader();
}

export {
  addInitCategory,
  progressInterval,
  addNewsHeader,
  increaseListPage,
  decreaseListPage,
};
