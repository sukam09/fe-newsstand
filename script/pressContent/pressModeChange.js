// import { getQuerySelector } from "../../utils/js/getElements.js";
// import { getState, setState } from "../observer/observer.js";
// import { allOfPress } from "../store/store.js";

// function changePressMode() {
//   setState(allOfPress, !getState(allOfPress));
//   console.log("allOfPressMode", getState(allOfPress));
//   const isAllOfPressMode = getState(allOfPress);
//   if (!isAllOfPressMode) {
//     mySubscribedPress();
//   }
// }

// function clickNameOfPressMode() {
//   const allOfPressMode = getQuerySelector(".pressbar-name-all");
//   const myPressMode = getQuerySelector(".pressbar-name-subscribe");

//   myPressMode.addEventListener("click", changePressMode);
//   allOfPressMode.addEventListener("click", changePressMode);
// }

// function mySubscribedPress() {
//   console.log("mysubscribepress");
//   const allGridView = getQuerySelector(".press-content-all-grid-view");
//   const myGridView = getQuerySelector(".press-content-my-grid-view");

//   allGridView.style.display = "none";
//   myGridView.style.display = "grid";
// }

// export { clickNameOfPressMode };
