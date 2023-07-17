import { controllButtonShowing } from "../../../../../../controller/pageController.js";
import { getState, setState } from "../../../../../../core/observer.js";

import {
  categoryIdState,
  listPageState,
} from "../../../../../../state/pageState.js";
import { qs } from "../../../../../../utils.js";
import { createProgressBar, startProgressAnimation } from "./progressBar.js";

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

export function handleClickCategoryItem(e) {
  const id = e.currentTarget.id;
  const [, categoryId] = id.split("_");

  setState(categoryIdState, parseInt(categoryId));
  setState(listPageState, 0);

  if (!e.currentTarget.classList.contains("clicked")) {
    highlightCategoryItem();
  }
}

export function highlightCategoryItem() {
  const categoryId = getState(categoryIdState);
  const $clickedElements = document.getElementsByClassName("clicked");
  for (let i = 0; i < $clickedElements.length; i++) {
    $clickedElements[i].classList.remove("clicked");
  }

  const $category = qs(`#category_${parseInt(categoryId)}`);
  $category.classList.add("clicked");
  const $progressbar = $category.getElementsByClassName("progressbar")[0];
  startProgressAnimation($progressbar);
}

export function updatePageCount() {
  const listPage = getState(listPageState);
  const categoryId = getState(categoryIdState);
  const $categoryItem = qs(`#category_${parseInt(categoryId)}`);
  const $nowPage = $categoryItem.querySelector(".now_page");
  $nowPage.innerHTML = listPage + 1;
}
