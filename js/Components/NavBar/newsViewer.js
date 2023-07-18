// import { startProgress, stopProgress } from "../NewsList/progress.js";
// import { constants } from "../../Data/constants.js";

// let $listButton;
// let $gridButton;
// let $listButtonElem;
// let $gridButtonElem;
// let $listSection;
// let $gridSection;

// const clickViewer = (target) => {
//   const isList = target === constants.SHOW_LIST;
//   $listButtonElem.setAttribute("fill", isList ? "#4362D0" : "#879298");
//   $gridButtonElem.setAttribute("fill", isList ? "#879298" : "#4362D0");
//   $gridSection.style.display = isList ? "none" : "block";
//   $listSection.style.display = isList ? "block" : "none";
//   isList ? startProgress() : stopProgress();
// };

// const setViewerEvent = () => {
//   $listButton = document.querySelector(".news-navbar_content__list");
//   $gridButton = document.querySelector(".news-navbar_content__grid");
//   $listButtonElem = $listButton.childNodes[1].childNodes[1];
//   $gridButtonElem = $gridButton.childNodes[1].childNodes[1];
//   $listSection = document.querySelector(".news-section-list");
//   $gridSection = document.querySelector(".news-section-grid");

//   $listButton.addEventListener("click", () => clickViewer(constants.SHOW_LIST));
//   $gridButton.addEventListener("click", () => clickViewer(constants.SHOW_GRID));
// };

// export { setViewerEvent };
