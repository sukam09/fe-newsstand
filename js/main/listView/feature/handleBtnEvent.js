import { findCurrentCategory } from "./handleNewsData.js";
import { news_by_category } from "./manipulateNewsByCategory.js";
import { resetAnimation, addAnimation } from "./handleAnimation.js";
import { store } from "../../../store.js";
import { news_by_press } from "./manipulateNewsByPress.js";
/* about list view left, right Btn */

function addEventToBtn() {
  const left_btn = document.getElementById("list-left-btn");
  const right_btn = document.getElementById("list-right-btn");
  left_btn.addEventListener("click", () => handleBtnClick("Left"));
  right_btn.addEventListener("click", () => handleBtnClick("Right"));
}

function handleBtnClick(type) {
  resetAnimation();
  const currentCategory = findCurrentCategory();
  //depend on btn type
  if (type === "Left") {
    handleLeftBtn(currentCategory);
  } else if (type === "Right") {
    handleRightBtn(currentCategory);
  }
}

function handleLeftBtn(currentCategory) {
  //이전 카테고리로 넘어갈 때
  if (store.state.list_page - 1 < 0) {
    let prevCategory = currentCategory.previousElementSibling;
    if (prevCategory === null) {
      prevCategory = document.querySelector(".category li:last-child");
    }
    let prevMaxPage;
    if (store.state.type === "list-category") {
      prevMaxPage = news_by_category[prevCategory.innerText].length;
    } else {
      prevMaxPage = news_by_press[prevCategory.innerText].length;
    }
    store.setListPage(prevMaxPage - 1);
    addAnimation(prevCategory, "Prev");
  } else {
    store.setListPage(store.state.list_page - 1);
  }
}

function handleRightBtn(currentCategory) {
  // const maxPage = currentCategory.children[2].innerText.split("/")[1];
  const maxPage = findPageNum(currentCategory);
  //다음 카테고리로 넘어갈 때
  if (store.state.list_page + 1 >= maxPage) {
    store.setListPage(0);
    addAnimation(currentCategory.nextElementSibling, "Next");
  } else {
    store.setListPage(store.state.list_page + 1);
  }
}

function findPageNum(category) {
  if (store.state.type === "list-category") {
    return news_by_category[category.dataset.category].length;
  } else {
    return news_by_press[category.dataset.category].length;
  }
}

export { addEventToBtn, handleBtnClick };
