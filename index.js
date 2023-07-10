import fetchData from "./modules/fetchData.js";
import { render, makeGridPages } from "./modules/gridView.js";

// time 설정
const setTime = () => {
  const $time = document.querySelector(".time time");
  const today = new Date();
  const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
  $time.setAttribute("datetime", String(today));
  const format = (num) => String(num).padStart(2, "0");
  $time.innerText = `${today.getFullYear()}. ${format(
    today.getMonth() + 1
  )}. ${format(today.getDate())}. ${DAYS[today.getDay()]}요일`;
};

setTime();

// json에서 데이터 가져오기
fetchData().then((data) => {
  const agencies = data.agencies.sort(() => 0.5 - Math.random());

  // if grid view
  if (true) {
    const pages = makeGridPages(agencies);
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

  // else if list view
});
