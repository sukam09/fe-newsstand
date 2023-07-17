import { GLOBAL } from "./variable.js";

function checkSubscribe(src) {
  const targetNews = findTargetNewsFromSrc(src);
  return targetNews.is_subscribe === "true" ? true : false;
}

function toggleSubscribe(src) {
  const targetNews = findTargetNewsFromSrc(src);
  targetNews.is_subscribe = targetNews.is_subscribe === "true" ? "false" : "true";
  return targetNews.is_subscribe;
}

function findTargetNewsFromSrc(src) {
  for (let news of GLOBAL.NEWS_DATA) {
    if (news.path.slice(-6) === src.slice(-6)) {
      return news;
    }
  }
}

export { checkSubscribe, toggleSubscribe };
