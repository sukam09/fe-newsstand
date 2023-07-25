import { findCurrentCategory } from "./handleNewsData.js";
import { news_by_category } from "./manipulateNewsByCategory.js";
import { resetAnimation, addAnimation } from "./handleAnimation.js";
import { news_by_press } from "./manipulateNewsByPress.js";
import { getState, setState } from "../../store/observer.js";
import { listAllPage, viewOption } from "../../store/store.js";

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
  if (getState(listAllPage) - 1 < 0) {
    let prevCategory = currentCategory.previousElementSibling;
    if (prevCategory === null) {
      prevCategory = document.querySelector(".category li:last-child");
    }
    let prevMaxPage;
    if (getState(viewOption) === "all") {
      prevMaxPage = news_by_category[prevCategory.innerText].length;
    } else {
      prevMaxPage = news_by_press[prevCategory.innerText].length;
    }
    setState(listAllPage, getState(listAllPage) - 1);
    addAnimation(prevCategory, "Prev");
  } else {
    setState(listAllPage, getState(listAllPage) - 1);
  }
}

function handleRightBtn(currentCategory) {
  // const maxPage = currentCategory.children[2].innerText.split("/")[1];
  const maxPage = findPageNum(currentCategory);
  //다음 카테고리로 넘어갈 때
  if (getState(listAllPage) + 1 >= maxPage) {
    setState(listAllPage, 0);
    addAnimation(currentCategory.nextElementSibling, "Next");
  } else {
    setState(listAllPage, getState(listAllPage) + 1);
  }
}

function findPageNum(category) {
  if (getState(viewOption) === "all") {
    return news_by_category[category.dataset.category].length;
  } else {
    return news_by_press[category.dataset.category].length;
  }
}

export { addEventToBtn, handleBtnClick };
