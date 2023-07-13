import { categoryItem } from "./categoryItem.js";

export function category(categoryNews) {
  let categoryList = "";
  console.log(categoryNews);
  for (let i = 0; i < categoryNews.length; i++) {
    const { categoryName, data } = categoryNews[i];
    categoryList += categoryItem(categoryName, data.length);
    console.log(categoryItem(categoryName, data.length));
  }

  return `
    <div class="category">
      <ul class="category_list flex_row">
        ${categoryList}
      </ul>
    </div>
    `;
}
