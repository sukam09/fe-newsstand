import { subscribe } from "../store/observer.js";
import { render } from "./render.js";
import { viewOption, viewType } from "../store/store.js";
import { changeViewOption } from "./changeView.js";

function initSubscribe() {
  subscribe(viewType, render);
  subscribe(viewOption, changeViewOption);
  subscribe(viewOption, render);
}

export { initSubscribe };
