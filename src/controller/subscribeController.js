import { STATE, GLOBAL } from "../model/variable.js";
import { changeState } from "./mainController.js";

function initSubscribeBtnEvnet(target) {
  target.addEventListener("click", (event) => {
    const target = event.target.localName === "button" ? event.target.parentNode.firstChild : event.target.parentNode.parentNode.firstChild;
    clickSubscribeBtn(target.src);
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
    changeState(STATE.SHOW_ALERT);
  } else {
    toggleSubscribe(src);
  }
}

function toggleSubscribe(src) {
  const targetNews = findTargetNewsFromSrc(src);
  targetNews.is_subscribe = targetNews.is_subscribe === "true" ? "false" : "true";

  if (targetNews.is_subscribe === "true") {
    GLOBAL.SUBSCRIBE_NEWS_DATA.push(targetNews);
    GLOBAL.SUBSCRIBE_NEWS_NUM++;

    changeState(STATE.SHOW_SNACKBAR);
    changeState(STATE.SUBSCRIBE_NEWS);
  } else {
    GLOBAL.SUBSCRIBE_NEWS_DATA = GLOBAL.SUBSCRIBE_NEWS_DATA.filter((value) => {
      return !(value.path.slice(-6) === src.slice(-6));
    });
    GLOBAL.SUBSCRIBE_NEWS_NUM--;

    changeState(STATE.UNSUBSCRIBE_NEWS);
  }
}

export { initSubscribeBtnEvnet, checkSubscribe, toggleSubscribe };
