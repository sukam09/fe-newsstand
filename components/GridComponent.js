import { MAX_PAGE_IDX, PAGINATION_NUM } from "../constants/constant.js";
import { removeAllChildNodes } from "../utils/removeChild.js";
import { makeGrid } from "./Grid/gridElement.js";

const prevBtn = document.querySelector(".prev-page-btn");
const nextBtn = document.querySelector(".next-page-btn");

const isFirstPage = (currentPage) => currentPage === 0;
const isLastPage = (currentPage) => currentPage === MAX_PAGE_IDX;

// 페이지에 따라 신문사 list 추가
export const GridComponent = (currentPage, pages) => {
  const agencyList = document.querySelector(".agency-grid");
  // 기존 child nodes 모두 제거
  removeAllChildNodes(agencyList);

  // 새로운 child append
  pages[currentPage].map((data) => makeGrid(data));
  while (agencyList.childNodes.length < PAGINATION_NUM) {
    makeGrid({ name: "", logo: "" });
  }
  // 첫페이지와 마지막페이지 버튼 disable
  // button disabled 처리
  prevBtn.removeAttribute("disabled");
  nextBtn.removeAttribute("disabled");
  if (isFirstPage(currentPage)) prevBtn.setAttribute("disabled", "");
  if (isLastPage(currentPage)) nextBtn.setAttribute("disabled", "");
};
