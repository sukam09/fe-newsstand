import { POPUP, GLOBAL } from "./variable.js";

function checkSubscribe(src) {
  const targetNews = findTargetNewsFromSrc(src);
  return targetNews.is_subscribe === "true" ? true : false;
}

function toggleSubscribe(src) {
  const targetNews = findTargetNewsFromSrc(src);
  targetNews.is_subscribe = targetNews.is_subscribe === "true" ? "false" : "true";
  showSnackBar(targetNews.is_subscribe);
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

export { checkSubscribe, toggleSubscribe };
