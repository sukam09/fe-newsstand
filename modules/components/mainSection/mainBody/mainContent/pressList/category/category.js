import { categoryItem } from "./categoryItem.js";

export function category(newsList) {
  let categoryList = "";
  console.log(newsList);
  for (let i = 0; i < newsList.length; i++) {
    const { categoryName, data } = newsList[i];
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
