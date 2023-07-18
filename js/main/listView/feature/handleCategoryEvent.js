import { addAnimation, removeAnimation } from "./handleAnimation.js";
import { chageNews, getPagesNum } from "./handleNewsData.js";
import { store } from "./store.js";

/* category event listeners */

function handleCategoryClick(e) {
  store.setGridPage(0);
  removeAnimation();
  addAnimation(e.target, "Current");
}

function handleAniamtionStart(e) {
  chageNews(e);
}

function handleAniamtionIteration(e) {
  const totalPageNum = getPagesNum(e.currentTarget.dataset.category);
  if (store.state.list_page + 1 < totalPageNum) {
    store.setGridPage(store.state.list_page + 1);
    chageNews(e);
  }
  //다음 카테고리로 넘어갈 때
  else {
    store.setGridPage(0);
    addAnimation(e.target.parentElement.nextElementSibling, "Next");
  }
  //store.state.list_page > totalNum => passAnimation
}

export { handleAniamtionIteration, handleCategoryClick, handleAniamtionStart };
