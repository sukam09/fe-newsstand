import { categoryItem } from "./categoryItem.js";

export function category(newsData) {
  let categoryList = "";
  for (let i = 0; i < newsData.length; i++) {
    const { categoryName, data } = newsData[i];
    categoryList += categoryItem(categoryName, data.length);
  }

  return `
    <div class="category">
      <ul class="category_list flex_row">
        ${categoryList}
      </ul>
    </div>
    `;
}
