import { rollNews } from "./components/Roller.js";
import { RECENT_NEWS_NUM } from "./constants/constant.js";
import { viewSelectHandler } from "./utils/setViewMode.js";
import { TimeComponent } from "./components/Time.js";
import { initGrid } from "./components/InitGrid.js";
import { fetchData, shuffleData, sliceData } from "./utils/utils.js";

// time 설정
TimeComponent();

fetchData().then((data) => {
  // response로 받은 data shuffle
  const agencies = shuffleData(data);
  // rolling할 뉴스 slice
  const slicedData = sliceData(agencies, 0, RECENT_NEWS_NUM);

  // 뉴스 rolling
  rollNews(slicedData);
  // 상태에 따라 grid, list view render
  initGrid(agencies);
  viewSelectHandler(agencies);
});
