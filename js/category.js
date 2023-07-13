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
    categoryHtml += `<div class="categoryItem"><div class="progress-bar" id=${key.key}></div><span class="category">${key.key}</span></li><span class="categoryCnt">${key.value}</span></div>`;
  });
  categoryHtml += `</ul></div>`;
  document.getElementById("category").innerHTML = categoryHtml;
}


setCategoryData();
export { addInitCategory };
