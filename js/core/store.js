import { FIRST_PAGE_NUM } from "../constants/constants.js";
import { observable } from "./observer.js";
class Store {
  constructor() {
    this.state = observable({
      mode: "light", //추후 다크모드
      view: "grid", //그리드뷰 또는 리스트뷰
      page: FIRST_PAGE_NUM, //현재 페이지
      tabMode: "all", //all 전체언론사 sub 구독한 언론사
      gridIndex: [], //셔플된 그리드 인덱스
      listIndex: [], //셔플된 리스트인덱스
      subscribedPress: [
        // { name: "서울경제", index: 96 },
        // { name: "데일리안", index: 95 },
        // { name: "헤럴드경제", index: 94 },
        // { name: "SBS Biz", index: 93 },
        // { name: "세계일보", index: 92 },
        // { name: "아시아경제", index: 91 },
        // { name: "이데일리", index: 90 },
        // { name: "조선일보", index: 89 },
        // { name: "아이뉴스24", index: 88 },
        // { name: "파이낸셜뉴스", index: 87 },
        // { name: "스포츠서울", index: 86 },
        // { name: "스포츠동아", index: 85 },
        // { name: "석간문화일보", index: 84 },
      ],
      currentPress: { name: "", index: 0 },
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
