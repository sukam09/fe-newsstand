import { startProgress, stopProgress } from "../NewsList/progress.js";
import { constants } from "../../Data/constants.js";

const $listButton = document.querySelector(".news-navbar_content__list");
const $gridButton = document.querySelector(".news-navbar_content__grid");
const $listButtonElem = $listButton.childNodes[1].childNodes[1];
const $gridButtonElem = $gridButton.childNodes[1].childNodes[1];
const $listSection = document.querySelector(".news-section-list");
const $gridSection = document.querySelector(".news-section-grid");

const clickViewer = (target) => {
  const isList = target === constants.SHOW_LIST;
  $listButtonElem.setAttribute("fill", isList ? "#4362D0" : "#879298");
  $gridButtonElem.setAttribute("fill", isList ? "#879298" : "#4362D0");
  $gridSection.style.display = isList ? "none" : "block";
  $listSection.style.display = isList ? "block" : "none";
  isList ? startProgress() : stopProgress();
};

const setViewerEvent = () => {
  $listButton.addEventListener("click", () => clickViewer(constants.SHOW_LIST));
  $gridButton.addEventListener("click", () => clickViewer(constants.SHOW_GRID));
};

export { setViewerEvent };
