import { getState } from "../../../../../../core/observer.js";

import { listPageState } from "../../../../../../state/pageState.js";
import { createProgressBar } from "./progressBar.js";

export function createCategoryItem(categoryName, categoryId, len) {
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
