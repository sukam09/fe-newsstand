import { setGridButton } from "../components/Grid/setGridButton.js";
import { GridComponent } from "../components/GridComponent.js";
import { ListComponent } from "../components/ListComponent.js";
import { INITIAL_PAGE } from "../constants/constant.js";
import { removeButton } from "./removeButton.js";
import { sortCategory } from "./sortCategory.js";
import { sortPages } from "./sortPage.js";

const gridBtn = document.querySelector(".grid-view-btn");
const listBtn = document.querySelector(".list-view-btn");

export const viewSelectHandler = (agencies) => {
  // Grid 뷰 선택 시
  const setGrid = () => {
    // list 뷰 관련 삭제 및 grid 버튼, grid 컴포넌트 추가
    if (gridBtn.getAttribute("viewtype") == null) {
      gridBtn.setAttribute("viewtype", true);
      listBtn.removeAttribute("viewtype");

      const $grid = document.querySelector(".agency-grid");
      const $list = document.querySelector(".agency-list");
      $grid.style.display = "grid";
      $list.style.display = "none";

      const pages = sortPages(agencies);
      setGridButton(pages);
      GridComponent(INITIAL_PAGE, pages);
    }
  };

  // List 뷰 선택시
  const setList = () => {
    if (listBtn.getAttribute("viewtype") == null) {
      listBtn.setAttribute("viewtype", true);
      gridBtn.removeAttribute("viewtype");

      removeButton();

      const $grid = document.querySelector(".agency-grid");
      const $list = document.querySelector(".agency-list");
      $grid.style.display = "none";
      $list.style.display = "flex";

      // list view 생성
      const sortedAgencies = sortCategory(agencies);
      ListComponent(INITIAL_PAGE, sortedAgencies);
    }
  };

  gridBtn.addEventListener("click", setGrid);
  listBtn.addEventListener("click", setList);
  // 신문사 타입에 따른 event listener 추가 예정(전체 언론사, 내가 구독한 언론사)

  // 구독, 해지 event listener 추가 예정
};
