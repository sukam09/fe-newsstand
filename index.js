import { rollNews } from "./components/Roller/Roller.js";
import { RECENT_NEWS_NUM } from "./constants/constant.js";
import { setEvents } from "./utils/setEvents.js";
import { DateComponent } from "./components/Date/Date.js";
import { initGrid } from "./components/Grid/InitGrid.js";
import { fetchAllPress, shufflePress, sliceData } from "./utils/utils.js";
import { initializeStore } from "./store/store.js";
import { setAllAgencies } from "./utils/setAgencies.js";

// time 설정
DateComponent();

fetchAllPress().then((press_list) => {
  // response로 받은 data shuffle
  const agencies = shufflePress(press_list);
  // rolling할 뉴스 slice
  const sliced_data = sliceData(agencies, 0, RECENT_NEWS_NUM);

  // 뉴스 rolling
  rollNews(sliced_data);
  setAllAgencies(agencies);
  // 상태에 따라 grid, list view render
  initializeStore(press_list);
  initGrid(agencies);
  setEvents();
});
