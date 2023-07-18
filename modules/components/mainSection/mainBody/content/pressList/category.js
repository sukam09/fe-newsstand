import { getState } from "../../../../../store/observer.js";
import { listPageState } from "../../../../../store/pageState.js";

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

function createCategoryItem(categoryName, categoryId, len) {
  const listPage = getState(listPageState);

  return `
    <li class="category_item" id="category_${categoryId}">
      <span>${categoryName}</span>
      <span class="page_count">
        <span class="now_page">${listPage + 1}</span>
        <span class="all_page">/ ${len}</span>
      </span>
      ${createProgressBar()}
    </li>
    `;
}

function createProgressBar() {
  return `
    <div class="progressbar"></div>
    `;
}
