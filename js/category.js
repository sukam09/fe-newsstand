import { increment, totalTime } from "../utils/constants.js";
import { drawNews } from "./drawNews.js";
import Stores from "./core/Store.js";
import { makeArrow } from "../utils/utils.js";

let progress;
let currentCategoryPageNumber = 1;
let currentCategoryIndex;
let currentCategoryPage;
let currentProgressBar;

const drawCategory = (news) => {
  drawCategoryList(news);
  addEventArrowList(news);
  clickCategory(news);
};

function drawCategoryList(news) {
  let categoryHtml = `<div class="categoryWrap"><ul class="categoryUl">`;
  for (const categoryItem of Object.keys(news)) {
    categoryHtml += `<div class="categoryItem" id="category${categoryItem}">
    <div class="progress-bar" id="${categoryItem}"></div><span class="category">${categoryItem}</span>${drawCurrentCategoryPage(
      news[categoryItem]
    )}</div>`;
  }
  categoryHtml += `</ul></div>`;
  document.getElementById("category").innerHTML = categoryHtml;
  drawCategoryItem(news, 0);
}

function drawCurrentCategoryPage(categoryItem) {
  return categoryItem[0].arrow
    ? `<span class="currentCategoryPages">></span>`
    : `<span class="currentCategoryPage"></span>`;
}

function drawCategoryItem(news, categoryIndex) {
  currentCategoryIndex = categoryIndex;
  currentCategoryPage = document.querySelectorAll(".currentCategoryPage");
  clearCategoryNumber(news);
  updateCurrentProgressBar();
  progressReset(news, currentProgressBar, currentCategoryPage);
  if (Stores.getProgressInterval() != undefined) {
    Stores.clearProgressInterval();
    progressReset(news, currentProgressBar, currentCategoryPage);
  }
  intervalProgress(news, currentProgressBar, currentCategoryPage);
}

function updateCurrentProgressBar() {
  currentProgressBar =
    document.querySelectorAll(".progress-bar")[currentCategoryIndex];
  currentProgressBar.parentNode.style.width = "166px";
}

function categoryDisplayOn(categoryItem) {
  categoryItem[currentCategoryIndex].style.backgroundColor = "#7890E7";
  categoryItem[currentCategoryIndex].style.color = "#FFFFFF";
  if (currentCategoryPage[currentCategoryIndex] !== undefined)
    currentCategoryPage[currentCategoryIndex].style.display = "flex";
}

function categoryDisplayClear(news, categoryItem) {
  Object.keys(news).forEach((value, index) => {
    categoryItem[index].style.backgroundColor = "#f5f7f9";
    categoryItem[index].style.color = "#5f6e76";
    categoryItem[index].style.textDecoration = "none";
    categoryItem[index].style.width = "";
    categoryItem[index].classList.remove("active");
    if (currentCategoryPage[index] !== undefined) {
      currentCategoryPage[index].style.display = "none";
    }
  });
}

function intervalProgress(news, progressBar, currentCategoryPage) {
  progress = 0;
  Stores.setProgressInterval(
    setInterval(() => {
      doProgress(news, progressBar, currentCategoryPage);
    }, totalTime / (100 / increment))
  );
}

function doProgress(news, progressBar, currentCategoryPage) {
  progressBar.style.transition = `width ${
    totalTime / increment / 1000
  }s linear`;
  if (progress === 100) {
    if (currentCategoryPageNumber === news[progressBar.id].length) {
      currentCategoryPageNumber = 1;
      if (currentCategoryIndex == Object.keys(news).length - 1) {
        Stores.setPage(0);
        currentCategoryIndex = 0;
      } else currentCategoryIndex++;
    } else currentCategoryPageNumber++;
    Stores.clearProgressInterval();
    Stores.setPage(parseInt(Stores.getPage()) + 1);
    clearCategoryNumber(news);
    clearNewsInterval(news);
    progressReset(news, progressBar, currentCategoryPage);
    return;
  } else progressFill(progressBar);
}

function progressReset(news, progressBar, currentCategoryPage) {
  let progressBarId =
    document.getElementsByClassName("progress-bar")[currentCategoryIndex].id;
  if (currentCategoryPage[currentCategoryIndex] !== undefined) {
    currentCategoryPage[currentCategoryIndex].style.textDecoration = "none";
    currentCategoryPage[
      currentCategoryIndex
    ].innerHTML = `${currentCategoryPageNumber} / ${news[progressBarId].length}`;
  }
  progressBar.style.transition = "";
  progressBar.style.width = "0%";
  progress = 0;
}

function progressFill(progressBar) {
  progress += increment;
  progressBar.style.width = `${progress}%`;
}

function clearCategoryNumber(news) {
  const categoryItem = document.querySelectorAll(".categoryItem");
  categoryDisplayClear(news, categoryItem);
  categoryDisplayOn(categoryItem);
}

function clearNewsInterval(news) {
  drawNews(news);
  Stores.clearProgressInterval();
  updateCurrentProgressBar();
  intervalProgress(news, currentProgressBar, currentCategoryPage);
}

function addEventArrowList(news) {
  makeArrow();
  const leftAsideButton = document.getElementById("left-arrow");
  const rightAsideButton = document.getElementById("right-arrow");
  leftAsideButton.style.visibility = "visible";
  leftAsideButton.addEventListener("click", () => {
    decreaseListPage(news);
  });
  rightAsideButton.addEventListener("click", () => {
    increaseListPage(news);
  });
}

function increaseListPage(news) {
  if (currentCategoryPageNumber == news[currentProgressBar.id].length) {
    currentCategoryPageNumber = 1;
    if (currentCategoryIndex === Object.keys(news).length - 1) {
      currentCategoryIndex = 0;
      Stores.setPage(currentCategoryIndex);
    } else {
      currentCategoryIndex++;
      Stores.setPage(parseInt(Stores.getPage()) + 1);
    }
    clearCategoryNumber(news);
    progressReset(news, currentProgressBar, currentCategoryPage);
    clearNewsInterval(news);
    return;
  }
  currentCategoryPageNumber++;
  Stores.setPage(parseInt(Stores.getPage()) + 1);
  progressReset(news, currentProgressBar, currentCategoryPage);
  clearNewsInterval(news);
}

function decreaseListPage(news) {
  if (currentCategoryPageNumber === 1) {
    if (currentCategoryIndex === 0) {
      currentCategoryIndex = Object.keys(news).length - 1;
      Stores.setPage(currentCategoryIndex);
    } else {
      currentCategoryIndex--;
      Stores.setPage(parseInt(Stores.getPage()) - 1);
    }
    clearCategoryNumber(news);
    progressReset(news, currentProgressBar, currentCategoryPage);
    clearNewsInterval(news);
    return;
  }
  currentCategoryPageNumber--;
  Stores.setPage(parseInt(Stores.getPage()) - 1);
  progressReset(news, currentProgressBar, currentCategoryPage);
  clearNewsInterval(news);
}

function clickCategory(news) {
  Object.keys(news).forEach((key, index) => {
    {
      const categoryItem = document.getElementById(`category${key}`);
      categoryItem.addEventListener("click", function () {
        progressReset(news, currentProgressBar, currentCategoryPage);
        currentCategoryPageNumber = 1;
        drawCategoryItem(news, index);
        drawNews(news);
        Stores.setPage(index);
      });
      categoryItem.addEventListener("mouseover", function () {
        if (index !== currentCategoryIndex)
          categoryItem.style.textDecoration = "underline";
      });
      categoryItem.addEventListener("mouseout", function () {
        if (index !== currentCategoryIndex)
          categoryItem.style.textDecoration = "";
      });
    }
  });
}

export { drawCategory, currentCategoryIndex, currentCategoryPageNumber };
