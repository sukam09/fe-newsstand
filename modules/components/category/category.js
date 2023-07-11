import { categoryItem } from "./categoryItem.js";

export function category(newsData) {
  let categoryList = "";
  for (let i = 0; i < newsData.length; i++) {
    const { categoryName, dataLen } = newsData[i];
    categoryList += categoryItem(categoryName, dataLen);
  }

  return `
    <div class="category">
      <ul class="castegory_list flex_row">
        ${categoryList}
      </ul>
    </div>
    `;
}
