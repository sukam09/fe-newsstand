import { getQuerySelector } from "../../utils/js/getElements.js";
import { showListNewsData } from "./pressListChange.js";
import { isGrid, allOfPress } from "../store/store.js";
import { getState, register, setState } from "../observer/observer.js";

const pressListView = getQuerySelector("#pressbar-icon-list-view");
const pressGridView = getQuerySelector("#pressbar-icon-grid-view");

const allOfPressMode = getQuerySelector(".pressbar-name-all");
const myPressMode = getQuerySelector(".pressbar-name-subscribe");

function changeViewMode() {
  setState(isGrid, !getState(isGrid));
}

function changePressMode() {
  setState(allOfPress, !getState(allOfPress));

  if (getState(allOfPress)) {
    makeStrongPressbarName(allOfPressMode);
    makeDefaultPressbarName(myPressMode);
  } else {
    makeStrongPressbarName(myPressMode);
    makeDefaultPressbarName(allOfPressMode);
  }
}

// style속성 지우기
function makeDefaultPressbarName(selector) {
  selector.classList.remove("press-content-name-strong");
  selector.classList.add("press-content-name-default");
}

function makeStrongPressbarName(selector) {
  selector.classList.remove("press-content-name-default");
  selector.classList.add("press-content-name-strong");
}

// 언론사 뷰 전환시 아이콘 색상 변경(UI)
function pressViewChange() {
  myPressMode.addEventListener("click", changePressMode);
  allOfPressMode.addEventListener("click", changePressMode);

  pressListView.addEventListener("click", () => {
    changeViewMode();
    showListNewsData("종합/경제", 1); // 꼼수라서 아이디어 생각나면 고쳐야함..
  });

  pressGridView.addEventListener("click", changeViewMode);

  register(isGrid, updateViewButtons);
  register(isGrid, showPressView);
  register(allOfPress, showPressView);
}

function updateViewButtons() {
  const currentIsGridMode = getState(isGrid);
  const pressListView = getQuerySelector("#pressbar-icon-list-view");
  const pressGridView = getQuerySelector("#pressbar-icon-grid-view");

  pressListView.childNodes[1].setAttribute(
    "fill",
    !currentIsGridMode ? "#4362D0" : "#879298"
  );
  pressGridView.childNodes[1].setAttribute(
    "fill",
    currentIsGridMode ? "#4362D0" : "#879298"
  );
}

// 언론사 뷰 전환시 해당하는 뷰(그리드 or 리스트) 나타내기
function showPressView() {
  const currentIsGridMode = getState(isGrid);
  const currentIsAllOfPress = getState(allOfPress);

  const pressContentAllListView = getQuerySelector(
    ".press-content-all-list-view"
  );
  const pressContentMyListView = getQuerySelector(
    ".press-content-my-list-view"
  );

  const pressContentAllGridView = getQuerySelector(
    ".press-content-all-grid-view"
  );
  const pressContentMyGridView = getQuerySelector(
    ".press-content-my-grid-view"
  );

  if (currentIsGridMode && currentIsAllOfPress) {
    pressContentMyListView.style.display = "none";
    pressContentAllGridView.style.display = "grid";
    pressContentMyGridView.style.display = "none";
    pressContentAllListView.style.display = "none";
  } else if (currentIsGridMode && !currentIsAllOfPress) {
    pressContentMyListView.style.display = "none";
    pressContentAllGridView.style.display = "none";
    pressContentMyGridView.style.display = "grid";
    pressContentAllListView.style.display = "none";
  } else if (!currentIsGridMode && currentIsAllOfPress) {
    //전체 리스트
    pressContentMyListView.style.display = "none";
    pressContentAllListView.style.display = "block";
    pressContentAllGridView.style.display = "none";
    pressContentMyGridView.style.display = "none";
  } else {
    pressContentMyListView.style.display = "block";
    pressContentAllListView.style.display = "none";
    pressContentAllGridView.style.display = "none";
    pressContentMyGridView.style.display = "none";
  }
}

export { pressViewChange, changePressMode };
