import {
  categoryId,
  listPage,
  setCategoryId,
  setListPage,
} from "../../../../../../pageState.js";
import { qs } from "../../../../../../utils.js";
import { showListPage } from "../pressList.js";
import { progressBar, startProgressAnimation } from "./progressBar.js";

export function categoryItem(categoryName, categoryId, len) {
  return `
    <li class="category_item" id="category_${categoryId}">
      <span>${categoryName}</span>
      <span class="page_count">
        <span class="now_page">${listPage + 1}</span>
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
  const id = e.currentTarget.id;
  const [, categoryId] = id.split("_");
  setCategoryId(categoryId);
  setListPage(0);
  showListPage(categoryId, listPage);
  updatePageCount();
  highlightCategoryItem();
}

export function highlightCategoryItem() {
  const $category = qs(`#category_${categoryId}`);
  $category.classList.add("clicked");
  const $progressbar = $category.getElementsByClassName("progressbar")[0];
  console.log($progressbar);
  startProgressAnimation($progressbar);
}

export function updatePageCount() {
  const $categoryItem = qs(`#category_${categoryId}`);
  const $nowPage = $categoryItem.querySelector(".now_page");
  $nowPage.innerHTML = listPage + 1;
}
