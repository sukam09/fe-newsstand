import { subscribe } from "../observer.js";
import { render } from "./render.js";
import { viewType } from "../store.js";

function initSubscribe() {
  subscribe(viewType, render);
}

export { initSubscribe };
