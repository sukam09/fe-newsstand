import { createGridPages, renderGrid } from "../components/gridView.js";
import { renderList } from "../components/listView.js";
import { INITIAL_PAGE } from "../constants/constant.js";
import { filterCategory } from "./filterCategory.js";
import { sortCategory } from "./sortCategory.js";

export const viewSelectHandler = (agencies) => {
  const gridBtn = document.querySelector(".grid-view-btn");
  const listBtn = document.querySelector(".list-view-btn");

  const pages = createGridPages(agencies);
  renderGrid(INITIAL_PAGE, pages);

  let currentPage = INITIAL_PAGE;

  const prevBtn = document.querySelector(".prev-page-btn");
  const nextBtn = document.querySelector(".next-page-btn");

  prevBtn.addEventListener("click", () => {
    renderGrid(--currentPage, pages);
  });

  nextBtn.addEventListener("click", () => {
    renderGrid(++currentPage, pages);
  });

  const setGrid = () => {
    if (gridBtn.getAttribute("viewtype") == null) {
      gridBtn.setAttribute("viewtype", true);
      listBtn.removeAttribute("viewtype");

      const $grid = document.querySelector(".agency-grid");
      const $list = document.querySelector(".agency-list");
      $grid.style.display = "grid";
      $list.style.display = "none";

      const pages = createGridPages(agencies);
      renderGrid(INITIAL_PAGE, pages);

      let currentPage = INITIAL_PAGE;

      const prevBtn = document.querySelector(".prev-page-btn");
      const nextBtn = document.querySelector(".next-page-btn");

      prevBtn.addEventListener("click", renderGrid(--currentPage, pages));
      nextBtn.addEventListener("click", renderGrid(++currentPage, pages));
    }
  };

  const setList = () => {
    if (listBtn.getAttribute("viewtype") == null) {
      listBtn.setAttribute("viewtype", true);
      gridBtn.removeAttribute("viewtype");

      const $grid = document.querySelector(".agency-grid");
      const $list = document.querySelector(".agency-list");
      $grid.style.display = "none";
      $list.style.display = "flex";

      let currentPage = INITIAL_PAGE;

      // list view 생성
      const sortedAgencies = sortCategory(agencies);
      renderList(INITIAL_PAGE, filterCategory(sortedAgencies, "종합/경제"));
    }
  };

  gridBtn.addEventListener("click", setGrid);
  listBtn.addEventListener("click", setList);

  // 신문사 타입에 따른 event listener 추가 예정(전체 언론사, 내가 구독한 언론사)

  // 구독, 해지 event listener 추가 예정
};
