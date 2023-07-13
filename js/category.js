import categoryData from "../json/category.json" assert { type: "json" };

let progressValue = 1;
let progressTime = 20;
let category = [];

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
    categoryHtml += `<div class="categoryItem"><li><span>${key.key}</span></li><span class="categoryCnt">${key.value}</span></div>`;
  });
  categoryHtml += `</ul></div>`;
  document.getElementById("category").innerHTML = categoryHtml;
}

function increaseValue(id) {
  setInterval(() => {
    const progressElement = document.getElementById(key);
    if (progressValue < progressTime) {
      progressValue++; // 값 증가
      progressElement.value = progressValue; // 값 업데이트
    }
  }, 1000);
}

setCategoryData();
export { addInitCategory };
