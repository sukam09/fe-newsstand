import { CONSTANT, MODE, GLOBAL, PATH } from "../model/variable.js";
import { drawSubscribeBtn } from "../view/subscribe.js";
import { moveLeft } from "./arrowBtnController.js";
import { setState } from "./observer.js";
import { showAlert, showSnackBar, toggleSubscription } from "../model/store.js";

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
    setState(showAlert, true);
  } else {
    toggleSubscribe(src);
  }
}

function toggleSubscribe(src) {
  const targetNews = findTargetNewsFromSrc(src);
  targetNews.is_subscribe = targetNews.is_subscribe === "true" ? "false" : "true";

  if (GLOBAL.SNACKBAR_TIME_OUT !== null) {
    document.querySelector(".snack-bar").style.display = "none";
    window.clearTimeout(GLOBAL.SNACKBAR_TIME_OUT);
    GLOBAL.SNACKBAR_TIME_OUT = null;
  }

  if (targetNews.is_subscribe === "true") {
    GLOBAL.SUBSCRIBE_NEWS_DATA.push(targetNews);
    GLOBAL.SUBSCRIBE_NEWS_NUM++;
    setState(showSnackBar, true);

    const listSubBtn = document.querySelector(".list-sub-btn");
    listSubBtn.childNodes[0].src = PATH.X;
    listSubBtn.childNodes[1].style.display = "none";
  } else {
    GLOBAL.SUBSCRIBE_NEWS_DATA = GLOBAL.SUBSCRIBE_NEWS_DATA.filter((value) => {
      return !(value.path.slice(-6) === src.slice(-6));
    });
    GLOBAL.SUBSCRIBE_NEWS_NUM--;

    if (GLOBAL.CURRENT_MODE === MODE.GRID_SUB) {
      if (GLOBAL.SUBSCRIBE_NEWS_NUM === 0) {
        GLOBAL.CURRENT_MODE = MODE.GRID_ALL;
      } else if (GLOBAL.GRID_CURRENT_PAGE > Math.floor((GLOBAL.SUBSCRIBE_NEWS_NUM - 1) / CONSTANT.GRID_NEWS_NUM)) {
        GLOBAL.GRID_CURRENT_PAGE--;
      }
    } else if (GLOBAL.CURRENT_MODE === MODE.LIST_SUB) {
      if (GLOBAL.SUBSCRIBE_NEWS_NUM === 0) {
        GLOBAL.CURRENT_MODE = MODE.LIST_ALL;
      }
    }

    if (GLOBAL.CURRENT_MODE === MODE.LIST_SUB) {
      moveLeft();
    }
    setState(toggleSubscription, true);
  }
}

export { initSubscribeBtnEvnet, checkSubscribe, clickSubscribeBtn, toggleSubscribe };
