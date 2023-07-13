import categoryData from "../json/category.json" assert { type: "json" };

let progress = 0;
const increment = 10;
const totalTime = 2000;
let category = []; //json파일을 받아와 배열 형태로 관리
let currentPage = 1;
let currentCategoryNumber = 0;
let progressInterval;

function setCategoryData() {
  for (const categories of categoryData) {
    for (const key in categories) {
      const item = {
        key: key,
        value: categories[key],
      };
      category.push(item);
    }
  }
}

function addInitCategory() {
  progress = 0;
  currentPage = 1;
  currentCategoryNumber = 0;
  let categoryHtml = `<div class="categoryWrap"><ul>`;
  category.forEach((key, index) => {
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
  category.forEach((value, index) => {
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
    currentPage++;
    if (currentPage === category[currentCategoryNumber].value + 1) {
      currentPage = 1;
      currentCategoryNumber++;
      if (currentCategoryNumber === category.length) currentCategoryNumber = 0;
      clearInterval(progressInterval);
      initCategoryItem();
    }
    progressReset(progressBar, currentCategoryPage);
    return;
  } else progressFill(progressBar);
}

function progressReset(progressBar, currentCategoryPage) {
  currentCategoryPage[currentCategoryNumber].innerHTML = currentPage;
  progressBar.style.transition = "";
  progressBar.style.width = "0%";
}

function progressFill(progressBar) {
  progress += increment;
  progressBar.style.width = `${progress}%`;
}

setCategoryData();
export { addInitCategory, progressInterval };
