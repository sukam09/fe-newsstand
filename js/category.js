import { increment, totalTime } from "../utils/constants.js";
import { drawNews } from "./drawNews.js";
import Stores from "./core/Store.js";
import { makeArrow } from "../utils/utils.js";
import { categoryNews } from "./setData.js/setCategoryData.js";

let progress = 0;
let currentCategoryPageNumber = 1;
let currentCategoryIndex;
let currentCategoryPage;
let currentProgressBar;

const drawCategory = (categoryCnt, categoryNews) => {
  // console.log(categoryNews);
  drawCategoryList(categoryCnt, categoryNews);
  addEventArrowList(categoryCnt, categoryNews);
  clickCategory(categoryCnt, categoryNews);
};

function drawCategoryList(categoryCnt, categoryNews) {
  let categoryHtml = `<div class="categoryWrap"><ul>`;
  categoryCnt.forEach((key, index) => {
    categoryHtml += `<div class="categoryItem" id="category${index}"><div class="progress-bar" id=${
      key.key
    }></div><span class="category">${key.key}</span></li>${drawCategoryNumber(
      key
    )}</div>`;
  });
  categoryHtml += `</ul></div>`;
  document.getElementById("category").innerHTML = categoryHtml;
  drawCategoryBar(categoryCnt, categoryNews, 0);
}

function drawCategoryNumber(category) {
  return category.arrow
    ? `<span class="currentCategoryPages"></span><span class="categoryCnt">></span>`
    : `<span class="currentCategoryPage">1</span><span class="categoryCnt">/ ${category.value}</span>`;
}

function drawCategoryBar(categoryCnt, categoryNews, categoryIndex) {
  currentCategoryIndex = categoryIndex;
  currentCategoryPage = document.querySelectorAll(".currentCategoryPage");
  clearCategoryNumber(categoryCnt);
  updateCurrentProgressBar();
  if (Stores.getProgressInterval() != undefined) {
    Stores.clearProgressInterval();
    progressReset(currentProgressBar, currentCategoryPage);
  }
  intervalProgress(
    categoryCnt,
    categoryNews,
    currentProgressBar,
    currentCategoryPage
  );
}

function updateCurrentProgressBar() {
  currentProgressBar =
    document.querySelectorAll(".progress-bar")[currentCategoryIndex];
}

function categoryDisplayOn(categoryItem) {
  categoryItem[currentCategoryIndex].style.backgroundColor = "#7890E7";
  categoryItem[currentCategoryIndex].style.color = "#FFFFFF";
  if (currentCategoryPage[currentCategoryIndex] !== undefined)
    currentCategoryPage[currentCategoryIndex].style.display = "flex";
  document.querySelectorAll(".categoryCnt")[
    currentCategoryIndex
  ].style.display = "flex";
}

function categoryDisplayClear(categoryCnt, categoryItem) {
  categoryCnt.forEach((value, index) => {
    categoryItem[index].style.backgroundColor = "#f5f7f9";
    categoryItem[index].style.color = "#5f6e76";
    categoryItem[index].style.textDecoration = "none";
    categoryItem[index].classList.remove("active");
    if (currentCategoryPage[index] !== undefined)
      currentCategoryPage[index].style.display = "none";
    document.querySelectorAll(".categoryCnt")[index].style.display = "none";
  });
}

function intervalProgress(
  categoryCnt,
  categoryNews,
  progressBar,
  currentCategoryPage
) {
  progress = 0;
  Stores.setProgressInterval(
    setInterval(() => {
      doProgress(categoryCnt, categoryNews, progressBar, currentCategoryPage);
    }, totalTime / (100 / increment))
  );
}

function doProgress(
  categoryCnt,
  categoryNews,
  progressBar,
  currentCategoryPage
) {
  progressBar.style.transition = `width ${
    totalTime / increment / 1000
  }s linear`;
  if (progress === 100) {
    Stores.setPage(parseInt(Stores.getPage()) + 1);
    currentCategoryPageNumber++;
    if (
      currentCategoryPageNumber ===
      categoryCnt[currentCategoryIndex].value + 1
    ) {
      currentCategoryPageNumber = 1;
      if (currentCategoryIndex == categoryCnt.length - 1) {
        Stores.setPage(0);
        currentCategoryIndex = 0;
      } else currentCategoryIndex++;
      Stores.clearProgressInterval();
    }
    clearCategoryNumber(categoryCnt);
    clearNewsInterval(categoryCnt, categoryNews);
    progressReset(progressBar, currentCategoryPage);
    return;
  } else progressFill(progressBar);
}

function progressReset(progressBar, currentCategoryPage) {
  if (currentCategoryPage[currentCategoryIndex] !== undefined) {
    currentCategoryPage[currentCategoryIndex].style.textDecoration = "none";
    currentCategoryPage[currentCategoryIndex].innerHTML =
      currentCategoryPageNumber;
  }
  progressBar.style.transition = "";
  progressBar.style.width = "0%";
  progress = 0;
}

function progressFill(progressBar) {
  progress += increment;
  progressBar.style.width = `${progress}%`;
}

function clearCategoryNumber(categoryCnt) {
  const categoryItem = document.querySelectorAll(".categoryItem");
  categoryDisplayClear(categoryCnt, categoryItem);
  categoryDisplayOn(categoryItem);
}

function clearNewsInterval(categoryCnt, categoryNews) {
  drawNews(categoryNews);
  Stores.clearProgressInterval();
  updateCurrentProgressBar();
  intervalProgress(
    categoryCnt,
    categoryNews,
    currentProgressBar,
    currentCategoryPage
  );
}

function addEventArrowList(categoryCnt, categoryNews) {
  makeArrow();
  const leftAsideButton = document.getElementById("left-arrow");
  const rightAsideButton = document.getElementById("right-arrow");
  leftAsideButton.style.visibility = "visible";
  leftAsideButton.addEventListener("click", () => {
    decreaseListPage(categoryCnt, categoryNews);
  });
  rightAsideButton.addEventListener("click", () => {
    increaseListPage(categoryCnt, categoryNews);
  });
}

function increaseListPage(categoryCnt, categoryNews) {
  if (currentCategoryPageNumber === categoryCnt[currentCategoryIndex].value) {
    currentCategoryPageNumber = 1;
    progressReset(currentProgressBar, currentCategoryPage);
    if (currentCategoryIndex === categoryCnt.length - 1) {
      currentCategoryIndex = 0;
      Stores.setPage(currentCategoryIndex);
    } else {
      currentCategoryIndex++;
      Stores.setPage(parseInt(Stores.getPage()) + 1);
    }
    clearCategoryNumber(categoryCnt);
    clearNewsInterval(categoryCnt, categoryNews);
    return;
  }
  currentCategoryPageNumber++;
  Stores.setPage(parseInt(Stores.getPage()) + 1);
  progressReset(currentProgressBar, currentCategoryPage);
  clearNewsInterval(categoryCnt, categoryNews);
}

function decreaseListPage(categoryCnt, categoryNews) {
  if (currentCategoryPageNumber === 1) {
    currentCategoryPageNumber = 1;
    progressReset(currentProgressBar, currentCategoryPage);
    if (currentCategoryIndex === 0) {
      currentCategoryIndex = categoryCnt.length - 1;
      Stores.setPage(currentCategoryIndex);
    } else {
      currentCategoryIndex--;
      Stores.setPage(parseInt(Stores.getPage()) - 1);
    }
    clearCategoryNumber(categoryCnt);
    clearNewsInterval(categoryCnt, categoryNews);
    return;
  }
  currentCategoryPageNumber--;
  Stores.setPage(parseInt(Stores.getPage()) - 1);
  progressReset(currentProgressBar, currentCategoryPage);
  clearNewsInterval(categoryCnt, categoryNews);
}

function clickCategory(categoryCnt, categoryNews) {
  for (let categoryNum = 0; categoryNum < categoryCnt.length; categoryNum++) {
    const categoryItem = document.getElementById(`category${categoryNum}`);
    categoryItem.addEventListener("click", function () {
      progressReset(currentProgressBar, currentCategoryPage);
      currentCategoryPageNumber = 1;
      drawCategoryBar(categoryCnt, categoryNews, categoryItem.id.slice(-1));
      drawNews(categoryNews);
      Stores.setPage(categoryItem.id.slice(-1));
    });
    categoryItem.addEventListener("mouseover", function () {
      if (categoryNum !== currentCategoryIndex)
        categoryItem.style.textDecoration = "underline";
    });
    categoryItem.addEventListener("mouseout", function () {
      if (categoryNum !== currentCategoryIndex)
        categoryItem.style.textDecoration = "";
    });
  }
}
export { drawCategory, currentCategoryIndex, currentCategoryPageNumber };
