import { render, createGridPages } from "./components/gridView.js";
import { rollNews } from "./components/roller.js";
import { RECENT_NEWS_NUM } from "./constants/constant.js";
import { viewSelectHandler } from "./utils/event.js";
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
  const slicedData = sliceData(data, 0, RECENT_NEWS_NUM);

  // 뉴스 rolling
  rollNews(slicedData);
  // 상태에 따라 grid, list view render
  viewSelectHandler(agencies);
});
