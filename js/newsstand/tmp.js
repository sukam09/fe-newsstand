import {
  moveTopContent,
  moveMiddleContent,
  moveBottomContent,
  replaceText,
} from "../utils/rollingContent.js";

const MAIN_CORP_CLASS_NAME = "main__rolling-corp";
const MAIN_TITLE_CLASS_NAME = "main__rolling-title";

const newsDataLeft = [
  {
    title: `삼성전자 2분기 영업익 6천억…사실상 '바닥' 확인 평가`,
    corp: `연합뉴스`,
  },
  {
    title: `스레드, 출시 1주 안 돼 이용자 1억 육박...트위터의 40% 수준`,
    corp: `JTBC`,
  },
  {
    title: `우리랑 일하시겠습니까?”…대양·대륙 쉼없이 건너는 CEO들`,
    corp: `매일경제`,
  },
  {
    title: `오늘도 전국 대부분 비…무더위는 계속`,
    corp: `채널A`,
  },
  {
    title: `푸바오 일일 매니저 채용 경쟁률 4540:1…무슨 일 할까`,
    corp: `YTN`,
  },
];

const SET_TIME = 5000; // 롤링되는 주기 입니다 (1000 => 1초)

export function paintSubView() {
  const firstCorp = document.getElementById("main__first-corp");
  const secondCorp = document.getElementById("main__second-corp");
  const thirdCorp = document.getElementById("main__third-corp");

  const firstTitle = document.getElementById("main__first-title");
  const secondTitle = document.getElementById("main__second-title");
  const thirdTitle = document.getElementById("main__third-title");
  firstCorp.textContent = newsDataLeft[0].corp;
  firstTitle.textContent = newsDataLeft[0].title;

  let move = 2;
  let dataCnt = 1;
  let listCnt = 1;
  setInterval(() => {
    if (move == 2) {
      moveTopContent(
        firstTitle,
        secondTitle,
        thirdTitle,
        firstCorp,
        secondCorp,
        thirdCorp
      );
      move = 0;
    } else if (move == 1) {
      moveMiddleContent(
        firstTitle,
        secondTitle,
        thirdTitle,
        firstCorp,
        secondCorp,
        thirdCorp
      );
      move = 2;
    } else if (move == 0) {
      moveBottomContent(
        firstTitle,
        secondTitle,
        thirdTitle,
        firstCorp,
        secondCorp,
        thirdCorp
      );
      move = 1;
    }

    if (dataCnt < newsDataLeft.length - 1) {
      replaceText(
        MAIN_CORP_CLASS_NAME,
        MAIN_TITLE_CLASS_NAME,
        listCnt,
        dataCnt,
        newsDataLeft
      );
      dataCnt++;
    } else if (dataCnt == newsDataLeft.length - 1) {
      replaceText(
        MAIN_CORP_CLASS_NAME,
        MAIN_TITLE_CLASS_NAME,
        listCnt,
        dataCnt,
        newsDataLeft
      );
      dataCnt = 0;
    }

    listCnt === 2 ? (listCnt = 0) : listCnt++;
  }, SET_TIME);
}
