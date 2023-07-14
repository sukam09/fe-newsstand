import { CATEGORY } from "../constants/constants.js";

function getPressCount(category_news) {
  const uniquePressSet = new Set();
  category_news.forEach((news) => {
    uniquePressSet.add(news.press);
  });
  return Array.from(uniquePressSet);
}

export function drawCategory(category_news, order, category) {
  const main_list = document.querySelector(".main-list");
  let category_list = "";
  //카테고리 그리는 부분
  CATEGORY.forEach((ctg) => {
    category_list +=
      category === ctg
        ? `<li class="category selected"><div class="progress-bar" id="play-animation"></div><div class="ctg-wrapper"><span class="ctg">${ctg}</span><div class="count"><span>${order}</span><span>/</span><span class = "entire">${
            getPressCount(category_news).length
          }</span></div></div></li>`
        : `<li class="category"><div class="progress-bar"></div><div class="ctg-wrapper"><span class="ctg">${ctg}</span></div></li>`;
  });
  main_list.innerHTML = `<div class="field-tab"><ul>${category_list}</ul></div>`;
}
