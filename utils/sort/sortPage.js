import { MAX_PAGE_NUM, PAGINATION_NUM } from "../../constants/constant.js";

// 전체 신문사 리스트를 24개로 그룹 나누기
export const sortPages = (agencies) => {
  const pages = [];

  let pageNumber = Math.min(
    Math.ceil(agencies?.length / PAGINATION_NUM),
    MAX_PAGE_NUM
  );
  for (let i = 0; i < pageNumber; i++) {
    pages.push(agencies.slice(i * PAGINATION_NUM, (i + 1) * PAGINATION_NUM));
  }
  return pages;
};
