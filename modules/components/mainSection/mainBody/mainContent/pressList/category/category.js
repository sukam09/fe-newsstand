import { categoryItem } from "./categoryItem.js";

export function category(categoryNews) {
  let categoryList = "";
  for (let i = 0; i < categoryNews.length; i++) {
    const { categoryId, categoryName, data } = categoryNews[i];
    categoryList += categoryItem(categoryName, categoryId, data.length);
  }

  return `
    <div class="category">
      <ul class="category_list flex_row">
        ${categoryList}
      </ul>
    </div>
    `;
}
