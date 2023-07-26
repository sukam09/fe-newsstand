import { getQuerySelector } from "../../utils/js/getElements.js";
import { showListNewsData } from "./pressListChange.js";
import { isGrid, allOfPress } from "../store/store.js";
import { getState, register, setState } from "../observer/observer.js";

function changeViewMode() {
  setState(isGrid, !getState(isGrid));
}

function changePressMode() {
  setState(allOfPress, !getState(allOfPress));
}

// 언론사 뷰 전환시 아이콘 색상 변경(UI)
function pressViewChange() {
  const pressListView = getQuerySelector("#pressbar-icon-list-view");
  const pressGridView = getQuerySelector("#pressbar-icon-grid-view");

  const allOfPressMode = getQuerySelector(".pressbar-name-all");
  const myPressMode = getQuerySelector(".pressbar-name-subscribe");
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
  console.log("isGrid ", currentIsGridMode);
  console.log("allOfPress ", currentIsAllOfPress);
  const pressContentAllGridView = getQuerySelector(
    ".press-content-all-grid-view"
  );
  const pressContentMyGridView = getQuerySelector(
    ".press-content-my-grid-view"
  );
  const pressContentListView = getQuerySelector(".press-content-list-view");

  if (currentIsGridMode && currentIsAllOfPress) {
    pressContentAllGridView.style.display = "grid";
    pressContentMyGridView.style.display = "none";
  } else if (currentIsGridMode && !currentIsAllOfPress) {
    pressContentAllGridView.style.display = "none";
    pressContentMyGridView.style.display = "grid";
  } else if (!currentIsGridMode) {
    pressContentListView.style.display = "block";
    pressContentAllGridView.style.display = "none";
    pressContentMyGridView.style.display = "none";
  }
  // pressContentAllGridView.style.display =
  //   currentIsGridMode && currentIsAllOfPress ? "grid" : "none";

  // pressContentMyGridView.style.display =
  //   currentIsGridMode && !currentIsAllOfPress ? "none" : "grid";

  // pressContentListView.style.display = currentIsGridMode ? "none" : "block";
  // pressContentListView.style.display = !currentIsGridMode ? "block" : "none";
}

// 전체 언론사, 내가 구독한 언론사

export { pressViewChange };
