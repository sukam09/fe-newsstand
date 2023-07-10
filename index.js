import fetchData from "./modules/fetchData.js";
import { render, makeGridPages } from "./modules/gridView.js";
import { appendRollingList } from "./modules/rollingNews.js";

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

  // 자동 롤링에 들어갈 좌우 기사 5개씩 추출
  const leftNewsList = agencies.slice(0, 5);
  const rightNewsList = agencies.slice(5, 10);

  const leftNews = document.querySelector(".recent-news-left");
  const rightNews = document.querySelector(".recent-news-right");
  // 5개의 리스트를 ul 내 li로 삽입
  leftNewsList.map((data) => appendRollingList(leftNews, data));
  rightNewsList.map((data) => appendRollingList(rightNews, data));

  // 롤링을 위한 prev, current, next class 삽입
  leftNews.childNodes[0].className = "prev";
  leftNews.childNodes[1].className = "current";
  leftNews.childNodes[2].className = "next";

  rightNews.childNodes[0].className = "prev";
  rightNews.childNodes[1].className = "current";
  rightNews.childNodes[2].className = "next";

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
