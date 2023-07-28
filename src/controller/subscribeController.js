import { CONSTANT, MODE, GLOBAL, PATH } from "../model/variable.js";
import { drawSubscribeBtn } from "../view/subscribe.js";
import { moveLeft } from "./arrowBtnController.js";
import { getState, setState, setStateOnce } from "./observer.js";
import { currentMode, gridCurrentPage, listCurrentPage, showAlert, showSnackBar, subscribeNewsNum } from "../model/store.js";
import { resetSnackBarTimer } from "./componentController.js";
import { updateCategory } from "./fieldTabController.js";

function initSubscribeBtnEvnet(target) {
  target.addEventListener("click", (event) => {
    const target = event.target.localName === "button" ? event.target.parentNode.firstChild : event.target.parentNode.parentNode.firstChild;
    clickSubscribeBtn(target.src);

    document.querySelector(".grid-view .list-sub-btn").remove();
    drawSubscribeBtn(target.src);
  });
}

function checkSubscribe(src) {
  const targetNews = findTargetNewsFromSrc(src);
  return targetNews.is_subscribe === "true" ? true : false;
}

function findTargetNewsFromSrc(src) {
  for (let news of GLOBAL.NEWS_DATA) {
    if (news.path.slice(-6) === src.slice(-6)) {
      return news;
    }
  }
}

function clickSubscribeBtn(src) {
  if (checkSubscribe(src) === true) {
    GLOBAL.TEMP_TARGET = findTargetNewsFromSrc(src);
    setStateOnce(showAlert);
  } else {
    toggleSubscribe(src);
  }
}

function toggleSubscribe(src) {
  const targetNews = findTargetNewsFromSrc(src);
  targetNews.is_subscribe = targetNews.is_subscribe === "true" ? "false" : "true";

  if (GLOBAL.SNACKBAR_TIME_OUT !== null) {
    resetSnackBarTimer();
  }

  if (targetNews.is_subscribe === "true") {
    GLOBAL.SUBSCRIBE_NEWS_DATA.push(targetNews);
    setSubscribeBtnX();
    setStateOnce(showSnackBar);
    setState(subscribeNewsNum, getState(subscribeNewsNum) + 1);
  } else {
    GLOBAL.SUBSCRIBE_NEWS_DATA = GLOBAL.SUBSCRIBE_NEWS_DATA.filter((value) => {
      return !(value.path.slice(-6) === src.slice(-6));
    });

    const newSubscribeNewsNum = getState(subscribeNewsNum) - 1;
    viewExceptionHandling(newSubscribeNewsNum);
    if (getState(currentMode) === MODE.LIST_SUB && getState(listCurrentPage) >= newSubscribeNewsNum) {
      moveLeft();
    }
    setState(subscribeNewsNum, newSubscribeNewsNum);
  }
}

function setSubscribeBtnX() {
  const listSubBtn = document.querySelector(".list-sub-btn");
  listSubBtn.childNodes[0].src = PATH.X;
  listSubBtn.childNodes[1].style.display = "none";
}

function viewExceptionHandling(newSubscribeNewsNum) {
  if (getState(currentMode) === MODE.GRID_SUB) {
    if (newSubscribeNewsNum === 0) {
      setState(currentMode, MODE.GRID_ALL);
    } else if (getState(gridCurrentPage) > Math.floor((newSubscribeNewsNum - 1) / CONSTANT.GRID_NEWS_NUM)) {
      setState(gridCurrentPage, getState(gridCurrentPage) - 1);
    }
  } else if (getState(currentMode) === MODE.LIST_SUB) {
    if (newSubscribeNewsNum === 0) {
      updateCategory(0);
      setState(currentMode, MODE.LIST_ALL);
    }
  }
}

export { initSubscribeBtnEvnet, checkSubscribe, clickSubscribeBtn, toggleSubscribe };
