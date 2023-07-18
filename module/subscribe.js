import { POPUP, GLOBAL } from "./variable.js";

let targetsrc;

function checkSubscribe(src) {
  const targetNews = findTargetNewsFromSrc(src);
  return targetNews.is_subscribe === "true" ? true : false;
}

function clickSubscribeBtn(src) {
  if (checkSubscribe(src) === true) {
    showAlert(src);
    targetsrc = src;
    return "true";
  } else {
    return toggleSubscribe(src);
  }
}

function toggleSubscribe(src) {
  const targetNews = findTargetNewsFromSrc(src);
  targetNews.is_subscribe = targetNews.is_subscribe === "true" ? "false" : "true";
  if (targetNews.is_subscribe === "true") {
    showSnackBar(targetNews.is_subscribe);
  }
  return targetNews.is_subscribe;
}

function findTargetNewsFromSrc(src) {
  for (let news of GLOBAL.NEWS_DATA) {
    if (news.path.slice(-6) === src.slice(-6)) {
      return news;
    }
  }
}

function showSnackBar(isSubscribe) {
  if (isSubscribe === "false") return;

  GLOBAL.DOM.SNACK_BAR.style.display = "block";
  window.setTimeout(() => {
    GLOBAL.DOM.SNACK_BAR.style.display = "none";
  }, POPUP.SNACK_BAR_TIME);
}

function showAlert(src) {
  const targetNews = findTargetNewsFromSrc(src);
  GLOBAL.DOM.ALERT.querySelector(".alert-main-press").innerHTML = targetNews.name;
  GLOBAL.DOM.ALERT.style.display = "flex";
}

function alertBtnHandler(event) {
  GLOBAL.DOM.ALERT.style.display = "none";
  if (event.target.classList[0] === "yes-btn") {
    toggleSubscribe(targetsrc);
  }
}

export { checkSubscribe, clickSubscribeBtn, alertBtnHandler };
