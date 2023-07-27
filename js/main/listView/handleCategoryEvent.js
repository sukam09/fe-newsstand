import { getState, setState } from "../../store/observer.js";
import { listAllPage } from "../../store/store.js";
import { addAnimation, removeAnimation } from "./handleAnimation.js";
import { changeNews, getPagesNum } from "./handleNewsData.js";

/* category event listeners */

let moved;
let startX;
let scrollLeft;
let isDrag = false;
const _ul = document.querySelector(".category");

function handleCategoryClick(e) {
  if (!isDrag) {
    setState(listAllPage, 0);
    removeAnimation();
    addAnimation(e.target, "Current");
  } else {
    return;
  }
}

function handleAniamtionStart(e) {
  changeNews(e);

  const selected = document.querySelector(".selected-category");

  selected.scrollIntoView({ behavior: "smooth" });
}

function handleAniamtionIteration(e) {
  const totalPageNum = getPagesNum(e.currentTarget.dataset.category);
  if (getState(listAllPage) + 1 < totalPageNum) {
    setState(listAllPage, getState(listAllPage) + 1);
    changeNews(e);
  }
  //다음 카테고리로 넘어갈 때
  else {
    setState(listAllPage, 0);
    addAnimation(e.target.parentElement.nextElementSibling, "Next");
  }
  //store.state.list_page > totalNum => passAnimation
}

function handleMouseDown(e) {
  moved = true;
  isDrag = false;
  startX = e.screenX;
  scrollLeft = _ul.scrollLeft;
}

function handleMouseMove(e) {
  if (moved) {
    //drag
    const endX = e.screenX;
    const walk = (endX - startX) * 1;
    _ul.scrollLeft = scrollLeft - walk;

    isDrag = true;
  }
}
function handleMouseUp() {
  moved = false;

  _ul.removeEventListener("mousedown", handleMouseDown);
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("mouseup", handleMouseUp);
  setTimeout(() => {
    _ul.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }, 10);
}

export {
  handleAniamtionIteration,
  handleCategoryClick,
  handleAniamtionStart,
  handleMouseUp,
  handleMouseMove,
  handleMouseDown,
};
