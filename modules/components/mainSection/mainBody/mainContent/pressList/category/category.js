import { createCategoryItem } from "./categoryItem.js";

export function createCategory(categoryList) {
  let categoryItems = "";
  for (let i = 0; i < categoryList.length; i++) {
    const { categoryId, categoryName, pressIdList } = categoryList[i];
    categoryItems += createCategoryItem(
      categoryName,
      categoryId,
      pressIdList.length
    );
  }

  return `
    <div class="category">
      <ul class="category_list flex_row">
        ${categoryItems}
      </ul>
    </div>
    `;
}
