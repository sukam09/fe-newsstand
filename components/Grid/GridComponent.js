import { PAGINATION_NUM } from "../../constants/constant.js";
import { qs, removeAllChildNodes } from "../../utils/utils.js";
import { makeGrid } from "./gridElement.js";

// 페이지에 따라 신문사 list 추가
export const GridComponent = (current_page, pages) => {
  const agency_list = qs(".agency-grid");
  // 기존 child nodes 모두 제거
  removeAllChildNodes(agency_list);

  // 새로운 child append
  pages[current_page].map((data) => makeGrid(data));
  while (agency_list.childNodes.length < PAGINATION_NUM) {
    makeGrid({ name: "", logo: "" });
  }

  const prev_btn = qs(".prev-page-btn");
  const next_btn = qs(".next-page-btn");

  // 첫페이지와 마지막페이지 버튼 disable
  // button disabled 처리
  prev_btn.removeAttribute("disabled");
  next_btn.removeAttribute("disabled");

  const isFirstPage = (current_page) => current_page === 0;
  const isLastPage = (current_page) => current_page === pages.length - 1;

  if (isFirstPage(current_page)) prev_btn.setAttribute("disabled", "");
  if (isLastPage(current_page)) next_btn.setAttribute("disabled", "");
};
