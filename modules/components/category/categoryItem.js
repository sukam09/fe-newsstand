import { progressBar } from "./progressBar.js";

export function categoryItem(categoryName, len) {
  return `
    <li class="category_item">
      <span>${categoryName}</span>
      <span class="page_count">
        <span class="now_page">${1}</span>
        <span class="all_page">${len}</span>
      </span>
      ${progressBar()}
    </li>
    `;
}
