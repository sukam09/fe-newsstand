/***** grid형 <-> list형 뷰 변경 *****/
import {
  initializeProgress,
  runProgress,
  clearProgress,
} from "./progressBar.js";

let grid_view_selected = true;

//grid형 보기로 바꾸기
function changeToGridView() {
  document.getElementsByClassName("list-selected")[0].style.display = "none";
  document.getElementsByClassName("grid-selected")[0].style.display = "block";
  document.getElementsByClassName("press-list-section")[0].style.display =
    "none";
  document.getElementsByClassName("press-grid")[0].style.display = "block";
  grid_view_selected = true;
}

//list형 보기로 바꾸기
function changeToListView() {
  document.getElementsByClassName("grid-selected")[0].style.display = "none";
  document.getElementsByClassName("list-selected")[0].style.display = "block";
  document.getElementsByClassName("press-list-section")[0].style.display =
    "block";
  document.getElementsByClassName("press-grid")[0].style.display = "none";
  grid_view_selected = false;
}

const grid_symbol = document.querySelectorAll(".grid-symbol");
grid_symbol.forEach((symbol) => {
  symbol.addEventListener("click", () => {
    if (!grid_view_selected) {
      // grid 상태 아니면
      changeToGridView();
      grid_view_selected = true;
      document.querySelector(".progress-bar").classList.remove("progress-bar");
      clearProgress();
      initializeProgress();
    }
  });
});

const list_symbol = document.querySelectorAll(".list-symbol");
list_symbol.forEach((symbol) => {
  symbol.addEventListener("click", () => {
    if (grid_view_selected) {
      //grid 상태라면
      changeToListView();
      grid_view_selected = false;
      document
        .getElementsByClassName("progress-item")[0]
        .classList.add("progress-bar");
      runProgress();
    }
  });
});

export { changeToGridView, changeToListView };
