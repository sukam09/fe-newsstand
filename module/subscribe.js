import { GLOBAL } from "./variable.js";

function checkSubscribe(src) {
  for (let news of GLOBAL.NEWS_DATA) {
    if (news.path.slice(-6) === src.slice(-6)) {
      return news.is_subscribe === "true" ? true : false;
    }
  }
}

function toggleSubscribe(event) {}

export { checkSubscribe, toggleSubscribe };
