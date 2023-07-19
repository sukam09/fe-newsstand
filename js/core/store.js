import { FIRST_PAGE_NUM } from "../constants/constants.js";
import { observable } from "./observer.js";
class Store {
  constructor() {
    this.state = observable({
      mode: "light", //추후 다크모드
      view: "grid", //그리드뷰 또는 리스트뷰
      page: FIRST_PAGE_NUM, //현재 페이지
      tabMode: "all", //all 전체언론사 sub 구독한 언론사
      subscribedPress: ["서울경제", "데일리안", "헤럴드경제"],
    });
  }

  setState(newState) {
    for (const [key, value] of Object.entries(newState)) {
      if (!this.state.hasOwnProperty(key)) continue;
      this.state[key] = value;
    }
  }
}

export const store = new Store();
