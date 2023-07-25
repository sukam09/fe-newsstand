import { getState, setState } from "../../store/observer.js";
import { listAllPage } from "../../store/store.js";
import { addAnimation, removeAnimation } from "./handleAnimation.js";
import { chageNews, getPagesNum } from "./handleNewsData.js";
/* category event listeners */

function handleCategoryClick(e) {
  setState(listAllPage, 0);
  removeAnimation();
  addAnimation(e.target, "Current");
}

function handleAniamtionStart(e) {
  chageNews(e);
}

function handleAniamtionIteration(e) {
  const totalPageNum = getPagesNum(e.currentTarget.dataset.category);
  if (getState(listAllPage) + 1 < totalPageNum) {
    setState(listAllPage, getState(listAllPage) + 1);
    chageNews(e);
  }
  //다음 카테고리로 넘어갈 때
  else {
    setState(listAllPage, 0);
    addAnimation(e.target.parentElement.nextElementSibling, "Next");
  }
  //store.state.list_page > totalNum => passAnimation
}

export { handleAniamtionIteration, handleCategoryClick, handleAniamtionStart };
