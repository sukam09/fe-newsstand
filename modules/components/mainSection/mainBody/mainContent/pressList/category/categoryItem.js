import { progressBar, startProgressAnimation } from "./progressBar.js";

export function categoryItem(categoryName, len) {
  return `
    <li class="category_item">
      <span>${categoryName}</span>
      <span class="page_count">
        <span class="now_page">${1}</span>
        <span class="all_page">/ ${len}</span>
      </span>
      ${progressBar()}
    </li>
    `;
}

export function handleClickCategoryItem(e) {
  const $clickedElements = document.getElementsByClassName("clicked");
  for (let i = 0; i < $clickedElements.length; i++) {
    $clickedElements[i].classList.remove("clicked");
  }
  e.currentTarget.classList.add("clicked");
  const $progressbar = e.currentTarget.getElementsByClassName("progressbar")[0];
  startProgressAnimation($progressbar);
}
