import { increment, totalTime } from "../utils/constants.js";
import { drawNews } from "./drawNews.js";
import { categoryCnt } from "./setData.js/setCategoryData.js";
import Stores from "../utils/Store.js";

let progress = 0;
let currentCategoryPageNumber = 1;
let currentCategoryIndex = 0;
let currentCategoryPage;

function drawInitCategory() {
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
  if (Stores.getProgressInterval() != undefined) {
    Stores.clearProgressInterval();
    progressReset(
      document.querySelectorAll(".progress-bar")[currentCategoryIndex],
      currentCategoryPage
    );
  }
  intervalProgress(
    document.querySelectorAll(".progress-bar")[currentCategoryIndex],
    currentCategoryPage
  );
}

function categoryDisplayOn(categoryItem) {
  categoryItem[currentCategoryIndex].style.backgroundColor = "#7890E7";
  categoryItem[currentCategoryIndex].style.color = "#FFFFFF";
  currentCategoryPage[currentCategoryIndex].style.display = "flex";
  document.querySelectorAll(".categoryCnt")[
    currentCategoryIndex
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
  Stores.setProgressInterval(
    setInterval(() => {
      doProgress(progressBar, currentCategoryPage);
    }, totalTime / (100 / increment))
  );
}

function doProgress(progressBar, currentCategoryPage) {
  progressBar.style.transition = `width ${
    totalTime / increment / 1000
  }s linear`;
  if (progress === 100) {
    currentCategoryPageNumber++;
    if (
      currentCategoryPageNumber ===
      categoryCnt[currentCategoryIndex].value + 1
    ) {
      currentCategoryPageNumber = 1;
      if (currentCategoryIndex === categoryCnt.length - 1)
        currentCategoryIndex = 0;
      else currentCategoryIndex++;
      Stores.clearProgressInterval();
    }
    drawCategoryItem();
    progressReset(progressBar, currentCategoryPage);
    return;
  } else progressFill(progressBar);
}

function progressReset(progressBar, currentCategoryPage) {
  currentCategoryPage[currentCategoryIndex].innerHTML =
    currentCategoryPageNumber;
  progressBar.style.transition = "";
  progressBar.style.width = "0%";
  progress = 0;
}

function progressFill(progressBar) {
  progress += increment;
  progressBar.style.width = `${progress}%`;
}

function clearCategoryNumber() {
  const categoryItem = document.querySelectorAll(".categoryItem");
  categoryDisplayClear(categoryItem);
  categoryDisplayOn(categoryItem);
}

function clearNewsInterval() {
  drawNews();
  Stores.clearProgressInterval();
  intervalProgress(
    document.querySelectorAll(".progress-bar")[currentCategoryIndex],
    currentCategoryPage
  );
}

function increaseListPage() {
  if (currentCategoryPageNumber === categoryCnt[currentCategoryIndex].value) {
    currentCategoryPageNumber = 1;
    progressReset(
      document.querySelectorAll(".progress-bar")[currentCategoryIndex],
      currentCategoryPage
    );
    if (currentCategoryIndex === categoryCnt.length - 1)
      currentCategoryIndex = 0;
    else currentCategoryIndex++;
    clearCategoryNumber();
    clearNewsInterval();
    return;
  }
  currentCategoryPageNumber++;
  progressReset(
    document.querySelectorAll(".progress-bar")[currentCategoryIndex],
    currentCategoryPage
  );
  clearNewsInterval();
}

function decreaseListPage() {
  if (currentCategoryPageNumber === 1) {
    currentCategoryPageNumber = 1;
    progressReset(
      document.querySelectorAll(".progress-bar")[currentCategoryIndex],
      currentCategoryPage
    );
    if (currentCategoryIndex === 0)
      currentCategoryIndex = categoryCnt.length - 1;
    else currentCategoryIndex--;
    clearCategoryNumber();
    clearNewsInterval();
    return;
  }
  currentCategoryPageNumber--;
  progressReset(
    document.querySelectorAll(".progress-bar")[currentCategoryIndex],
    currentCategoryPage
  );
  clearNewsInterval();
}

export {
  drawInitCategory,
  increaseListPage,
  decreaseListPage,
  currentCategoryIndex,
  currentCategoryPageNumber,
};
