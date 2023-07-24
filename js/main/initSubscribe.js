import { subscribe } from "../store/observer.js";
import { render } from "./render.js";
import { gridPage, viewOption, viewType } from "../store/store.js";
import { checkPage } from "./gridView/makeGridView.js";
import { changeViewOptionClass } from "./changeView.js";

function initSubscribe() {
  subscribe(viewType, render);
  subscribe(gridPage, checkPage);
  subscribe(viewOption, changeViewOptionClass);
  subscribe(viewOption, render);
}

export { initSubscribe };
