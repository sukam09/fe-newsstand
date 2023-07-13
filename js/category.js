import categoryData from "../json/category.json" assert { type: "json" };

let progress = 0;
const increment = 10;
const totalTime = 2000; //초
let category = [];
let categoryItem;
let currentPage = 1;
let categoryNumber = 0;
let interval;

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
  let categoryHtml = `<div class="categoryWrap"><ul>`;
  category.forEach((key, index) => {
    categoryHtml += `<div class="categoryItem" id="category${index}"><div class="progress-bar" id=${key.key}></div><span class="category">${key.key}</span></li><span class="currentCategoryPage">1</span><span class="categoryCnt">/ ${key.value}</span></div>`;
  });
  categoryHtml += `</ul></div>`;
  document.getElementById("category").innerHTML = categoryHtml;
  initCategoryItem();
}

function initCategoryItem() {
  categoryItem = document.querySelectorAll(".categoryItem");
  clearCategoryItem();
  categoryItem[categoryNumber].style.backgroundColor = "#7890E7";
  categoryItem[categoryNumber].style.color = "#FFFFFF";
  document.querySelectorAll(".currentCategoryPage")[
    categoryNumber
  ].style.display = "flex";
  document.querySelectorAll(".categoryCnt")[categoryNumber].style.display =
    "flex";
  intervalProgress(document.querySelectorAll(".progress-bar")[categoryNumber]);
}

function clearCategoryItem() {
  category.forEach((value, index) => {
    categoryItem[index].style.backgroundColor = "#f5f7f9";
    categoryItem[index].style.color = "#5f6e76";
    document.querySelectorAll(".currentCategoryPage")[
      index
    ].style.display = "none";
    document.querySelectorAll(".categoryCnt")[index].style.display =
      "none";
  });
}

function intervalProgress(progressBar) {
  interval = setInterval(() => {
    doProgress(progressBar);
  }, totalTime / (100 / increment));
}

function doProgress(progressBar) {
  progressBar.style.transition = `width ${
    totalTime / increment / 1000
  }s linear`;
  if (progress === 100) {
    progress = 0;
    currentPage++;
    if (currentPage === category[categoryNumber].value + 1) {
      currentPage = 1;
      categoryNumber++;
      if (categoryNumber === category.length) categoryNumber = 0;
      clearInterval(interval);
      initCategoryItem();
    }
    document.querySelectorAll(".currentCategoryPage")[
      categoryNumber
    ].innerHTML = currentPage;
    progressBar.style.transition = "";
    progressBar.style.width = "0%";
    return;
  }
  progress += increment;
  progressBar.style.width = `${progress}%`;
}

setCategoryData();
export { addInitCategory };
