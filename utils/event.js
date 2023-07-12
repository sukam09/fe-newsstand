import { createGridPages, render } from "../components/gridView.js";

export const viewSelectHandler = (agencies) => {
  const gridBtn = document.querySelector(".grid-view-btn");
  const listBtn = document.querySelector(".list-view-btn");

  const pages = createGridPages(agencies);
  render(0, pages);

  let currentPage = 0;

  const prevBtn = document.querySelector(".prev-page-btn");
  const nextBtn = document.querySelector(".next-page-btn");

  prevBtn.addEventListener("click", () => {
    render(--currentPage, pages);
  });

  nextBtn.addEventListener("click", () => {
    render(++currentPage, pages);
  });

  const setGrid = () => {
    if (gridBtn.getAttribute("viewtype") == null) {
      gridBtn.setAttribute("viewtype", true);
      listBtn.removeAttribute("viewtype");

      const gridDiv = document.querySelector(".agency-list-container");
      gridDiv.style.display = "block";

      const pages = createGridPages(agencies);
      render(0, pages);

      let currentPage = 0;

      const prevBtn = document.querySelector(".prev-page-btn");
      const nextBtn = document.querySelector(".next-page-btn");

      prevBtn.addEventListener("click", () => {
        render(--currentPage, pages);
      });

      nextBtn.addEventListener("click", () => {
        render(++currentPage, pages);
      });
    }
  };

  const setList = () => {
    if (listBtn.getAttribute("viewtype") == null) {
      listBtn.setAttribute("viewtype", true);
      gridBtn.removeAttribute("viewtype");

      const gridDiv = document.querySelector(".agency-list-container");
      gridDiv.style.display = "none";
    }
  };

  gridBtn.addEventListener("click", setGrid);

  listBtn.addEventListener("click", setList);

  // 신문사 타입에 따른 event listener 추가 예정(전체 언론사, 내가 구독한 언론사)
  // 구독, 해지 event listener 추가 예정
};
