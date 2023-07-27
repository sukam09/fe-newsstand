/*
기사 컨텐츠 네비게이션 컴포넌트
*/

import Component from "../../utils/Component.js";
import findTargetParentNode from "../../api/findTargetParentNode.js";
import { pressStore } from "../../store/PressStore.js";
import { mainStore, ALL, MY, LIST } from "../../store/MainStore.js";
import { fetchPress } from "../../api/fetchNews.js";
import {
  listStore,
  setCategory,
  setListPage,
  timer,
  cancelAnimation,
} from "../../store/ListStore.js";

const press = await fetchPress();

const categories = [
  "종합/경제",
  "방송/통신",
  "IT",
  "영자지",
  "스포츠/연예",
  "매거진/전문지",
  "지역",
];

const arrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
<path d="M5.48341 10.5L4.66675 9.68333L7.35008 7L4.66675 4.31667L5.48341 3.5L8.98342 7L5.48341 10.5Z" fill="white"/>
</svg>`;

const createNav = function (categoryArr) {
  let liString;
  let key = 0;
  liString = categoryArr.reduce((accumulator, currentValue) => {
    return (
      accumulator +
      `<li data-key=${key++}>
        <span>${currentValue}</span>
      </li>`
    );
  }, "");

  return liString;
};

const nextListPage = () => {
  let lastCategory = 6;
  let action;

  const currentPage = listStore.getState().page;
  if (currentPage === listStore.getState().lastPage) {
    let nextCategory;
    if (mainStore.getState().pressType === MY) {
      lastCategory = pressStore.getState().pressArr.length - 1;
    }

    action = setCategory(
      (listStore.getState().category + 1) % (lastCategory + 1)
    );
  } else {
    action = setListPage(listStore.getState().page + 1);
  }

  listStore.dispatch(action);
};

const startProgress = (progressBar) => {
  const duration = 2000; // 20초
  const startWidth = 0;
  const endWidth = 100;
  const startTime = performance.now();

  function changeWidth(timestamp) {
    const elapsed = timestamp - startTime;
    const width = Math.min(
      (elapsed / duration) * (endWidth - startWidth) + startWidth,
      100
    );

    progressBar.style.width = width + "%";

    if (width >= endWidth) {
      nextListPage();
    }

    if (elapsed < duration) {
      timer.push(requestAnimationFrame(changeWidth));
    }
  }

  timer.push(requestAnimationFrame(changeWidth));
};
function CategoryNav($target, props) {
  this.$ul = undefined;
  this.currentPage = 1;
  this.lastPage = 12;

  Component.call(this, $target, props);
  listStore.subscribe(this.setUp);
}

Object.setPrototypeOf(CategoryNav.prototype, Component.prototype);

const getSubPress = (pressIdArr) => {
  let nameArr = [];
  pressIdArr.forEach((element) => {
    nameArr.push(press[Number(element) + 1].name);
  });

  return nameArr;
};

CategoryNav.prototype.template = function () {
  if (mainStore.getState().viewType === LIST) {
    let categoryArr =
      mainStore.getState().pressType === ALL
        ? categories
        : getSubPress(pressStore.getState().pressArr);

    return `
    <ul class="categoty-list">
      ${createNav(categoryArr)}
    </ul>`;
  }
};

const handleClickCategory = function ({ target }) {
  cancelAnimation();
  let targetElement = findTargetParentNode(target, "li");
  if (targetElement) {
    const $select = this.$ul.querySelector(".select");

    if ($select) {
      $select.classList.remove("select");
      $select.removeChild($select.lastElementChild);
      $select.removeChild($select.lastElementChild);
    }

    const nextCategory = setCategory(Number(targetElement.dataset.key));
    listStore.dispatch(nextCategory);
  }
};

CategoryNav.prototype.setEvent = function () {
  this.$ul = this.$el.querySelector("ul");
  this.$ul.addEventListener("click", handleClickCategory.bind(this));
};

CategoryNav.prototype.mounted = function () {
  const currentCategory = listStore.getState().category;
  const progressBar = `<div class="progress-bar"></div>`;
  const selectedElement = this.$ul.children[currentCategory];

  if (selectedElement) {
    selectedElement.style.zIndex = 1;
    selectedElement.classList.add("select");
    selectedElement.innerHTML += `
    <span>
      ${
        mainStore.getState().pressType === ALL
          ? `${listStore.getState().page}/${listStore.getState().lastPage}`
          : arrowIcon
      }
    </span>
    ${progressBar}
    `;
  }
  let progress = selectedElement.querySelector(".progress-bar");
  startProgress(progress);
};

CategoryNav.prototype.isRender = function () {
  return mainStore.getState().viewType === LIST;
};

export default CategoryNav;
