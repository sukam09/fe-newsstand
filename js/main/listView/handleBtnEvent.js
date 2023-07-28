import { findCurrentCategory } from "./handleNewsData.js";
import { news_by_category, news_by_press } from "./manipulateNews.js";
import { resetAnimation, addAnimation } from "./handleAnimation.js";
import { getState, setState } from "../../store/observer.js";
import { listAllPage, viewOption } from "../../store/store.js";
import { ALL_PRESS } from "../../utils/constant.js";

/* about list view left, right Btn */

function addEventToListBtn() {
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
  const allPage = getState(listAllPage);
  //이전 카테고리로 넘어갈 때
  if (allPage - 1 < 0) {
    let prevCategory = currentCategory.previousElementSibling;
    if (prevCategory === null) {
      prevCategory = document.querySelector(".category li:last-child");
    }
    let prevMaxPage;
    if (getState(viewOption) === ALL_PRESS) {
      prevMaxPage = news_by_category[prevCategory.innerText].length;
    } else {
      prevMaxPage = news_by_press[prevCategory.innerText].length;
    }
    setState(listAllPage, prevMaxPage - 1);
    addAnimation(prevCategory, "Prev");
  } else {
    setState(listAllPage, allPage - 1);
  }
}

function handleRightBtn(currentCategory) {
  const allPage = getState(listAllPage);
  const maxPage = findPageNum(currentCategory);
  //다음 카테고리로 넘어갈 때
  if (allPage + 1 >= maxPage) {
    setState(listAllPage, 0);
    addAnimation(currentCategory.nextElementSibling, "Next");
  } else {
    setState(listAllPage, allPage + 1);
  }
}

function findPageNum(category) {
  if (getState(viewOption) === ALL_PRESS) {
    return news_by_category[category.dataset.category].length;
  } else {
    return news_by_press[category.dataset.category].length;
  }
}

export { addEventToListBtn, handleBtnClick };
