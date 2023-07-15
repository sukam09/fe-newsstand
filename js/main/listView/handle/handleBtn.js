import { findCurrentCategory } from "./handleData.js";
import { news_by_category } from "../../../../assets/news.js";
import { resetAnimation, addAnimation } from "./handleAnimation.js";
/* about Btn */
import { currentPage, changeCurrentPage } from "./handlePage.js";

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
  if (currentPage - 1 < 0) {
    let prevCategory = currentCategory.previousElementSibling;
    if (prevCategory === null) {
      prevCategory = document.querySelector(".category li:last-child");
    }
    const prevMaxPage = news_by_category[prevCategory.innerText].length;
    // currentPage = prevMaxPage - 1;
    changeCurrentPage(prevMaxPage - 1);
    addAnimation(prevCategory, "Prev");
  } else {
    // currentPage -= 1;
    changeCurrentPage(currentPage - 1);
  }
}

function handleRightBtn(currentCategory) {
  const maxPage = currentCategory.children[2].innerText.split("/")[1];
  //다음 카테고리로 넘어갈 때
  if (currentPage + 1 >= maxPage) {
    // currentPage = 0;
    changeCurrentPage(0);
    addAnimation(currentCategory.nextElementSibling, "Next");
  } else {
    // currentPage += 1;
    changeCurrentPage(currentPage + 1);
  }
}

export { addEventToBtn, handleBtnClick };
