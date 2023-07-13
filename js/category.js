import categoryData from "../json/category.json" assert { type: "json" };

let progress = 0;
const increment = 10;
const totalTime = 20000; //초
let category = [];
let categoryItem;
let currentPage = 1;
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
  categoryItem[0].style.backgroundColor = "#7890E7";
  categoryItem[0].style.color = "#FFFFFF";
  categoryItem[0].style.display = "flex";
  document.querySelectorAll(".currentCategoryPage")[0].style.display = "flex";
  document.querySelectorAll(".categoryCnt")[0].style.display = "flex";
  doProgress(document.querySelector(".progress-bar"));
}

function addOnClickCategory() {
  category.forEach((value, index) => {
    document.addEventListener("click", () => {});
  });
}

function doProgress(progressBar) {
  setInterval(() => {
    if (progress >= 100) {
      progress = 0;
      currentPage++;
      document.querySelectorAll(".currentCategoryPage")[0].innerHTML = currentPage;
      return;
    }
    progress += increment;
    progressBar.style.width = `${progress}%`;
  }, totalTime / (100 / increment));
}
// const progressInterval = setInterval(doProgress,totalTime / (100 / increment), progressBar);
setCategoryData();
export { addInitCategory };
