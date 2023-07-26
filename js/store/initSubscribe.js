import { subscribe } from "./observer.js";
import { render } from "../main/render.js";
import { isDark, viewOption, viewType } from "./store.js";
import { changeViewOption } from "../feature/changeView.js";

function initSubscribe() {
  subscribe(viewType, render);
  subscribe(viewOption, changeViewOption);
  subscribe(viewOption, render);
  subscribe(isDark, render);
}

export { initSubscribe };
