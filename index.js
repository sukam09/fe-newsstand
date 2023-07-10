import { render, createGridPages } from "./components/gridView.js";
import { rollNews } from "./components/roller.js";
import { fetchData } from "./utils/fetch.js";
import { shuffleData } from "./utils/shuffle.js";
import { sliceData } from "./utils/slice.js";
import { setTime } from "./utils/time.js";

// time 설정
setTime();

fetchData().then((data) => {
  // response로 받은 data shuffle
  const agencies = shuffleData(data);

  // rolling할 뉴스 slice
  const slicedData = sliceData(data);

  // 뉴스 rolling
  rollNews(slicedData);

  // if grid view
  if (true) {
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

  // else if list view
});
