import {
  MAX_PAGE_IDX,
  MAX_PAGE_NUM,
  PAGINATION_NUM,
} from "../constants/constant.js";

const prevBtn = document.querySelector(".prev-page-btn");
const nextBtn = document.querySelector(".next-page-btn");

const isFirstPage = (currentPage) => currentPage === 0;
const isLastPage = (currentPage) => currentPage === MAX_PAGE_IDX;

// 전체 신문사 리스트를 24개로 그룹 나누기
const createGridPages = (agencies) => {
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

// Grid 내에 list를 추가
const appendLogo = (data) => {
  const li = document.createElement("li");

  if (data) {
    const img = document.createElement("img");
    li.appendChild(img);

    const btn = document.createElement("button");
    btn.innerText = "test";

    btn.className = "agency-btn-hover";

    li.addEventListener("mouseenter", () => {
      li.appendChild(btn);
    });

    li.addEventListener("mouseleave", () => {
      li.removeChild(btn);
    });

    img.src = data.logo;
  }
  document.querySelector(".agency-grid").appendChild(li);
};

// ul 태그 내 모든 li 태그 삭제
const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

// 페이지에 따라 신문사 list 추가
const render = (currentPage, pages) => {
  const agencyList = document.querySelector(".agency-grid");
  // 기존 child nodes 모두 제거
  removeAllChildNodes(agencyList);

  // 새로운 child append
  pages[currentPage].map((data) => appendLogo(data));
  while (agencyList.childNodes.length < PAGINATION_NUM) {
    appendLogo({ name: "", logo: "" });
  }
  // 첫페이지와 마지막페이지 버튼 disable
  // button disabled 처리
  prevBtn.removeAttribute("disabled");
  nextBtn.removeAttribute("disabled");
  if (isFirstPage(currentPage)) prevBtn.setAttribute("disabled", "");
  if (isLastPage(currentPage)) nextBtn.setAttribute("disabled", "");
};

export { createGridPages, render };
