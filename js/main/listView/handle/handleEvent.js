import { addAnimation, removeAnimation } from "./handleAnimation.js";
import { chageNews, getPagesNum } from "./handleData.js";
import { currentPage, changeCurrentPage } from "./handlePage.js";
/* category event listeners */

function handleCategoryClick(e) {
  changeCurrentPage(0);
  removeAnimation();
  addAnimation(e.target, "Current");
}

function handleAniamtionStart(e) {
  chageNews(e);
}

function handleAniamtionIteration(e) {
  const totalPageNum = getPagesNum(e.currentTarget.dataset.category);
  if (currentPage + 1 < totalPageNum) {
    changeCurrentPage(currentPage + 1);
    chageNews(e);
  }
  //다음 카테고리로 넘어갈 때
  else {
    changeCurrentPage(0);
    addAnimation(e.target.parentElement.nextElementSibling, "Next");
  }
  //currentPage > totalNum => passAnimation
}

export { handleAniamtionIteration, handleCategoryClick, handleAniamtionStart };
