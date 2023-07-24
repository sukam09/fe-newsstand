import { getState } from "../store/observer.js";
import { viewOption } from "../store/store.js";
import {
  changeViewOptionToAll,
  changeViewOptionToSub,
} from "../eventHandlers.js";

function changeView() {
  const allPress = document.querySelector(".all-press");
  const subPress = document.querySelector(".sub-press");
  allPress.addEventListener("click", changeViewOptionToAll);
  subPress.addEventListener("click", changeViewOptionToSub);
}

// function changeViewOptionToSub() {
//   if (getState(viewOption) === "all") {
//     setState(viewOption, "sub");
//   }
// }
// function changeViewOptionToAll() {
//   if (getState(viewOption) === "sub") {
//     setState(viewOption, "all");
//   }
// }

function changeViewOptionClass() {
  const allPress = document.querySelector(".all-press span");
  const subPress = document.querySelector(".sub-press span");
  if (getState(viewOption) === "all") {
    allPress.classList.replace("unclicked-press", "clicked-press");
    subPress.classList.replace("clicked-press", "unclicked-press");
  } else if (getState(viewOption) === "sub") {
    subPress.classList.replace("unclicked-press", "clicked-press");
    allPress.classList.replace("clicked-press", "unclicked-press");
  }
}

export { changeView, changeViewOptionClass };
