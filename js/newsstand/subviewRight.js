import { shuffle } from "../utils/util.js";
import { fetchHeadline } from "../fetchAPI.js";
import {
  makeRightCorpViewTag,
  makeRightTitleViewTag,
} from "../tag/rollingTag.js";
import {
  moveTopContent,
  moveMiddleContent,
  moveBottomContent,
  replaceText,
} from "../utils/rolling.js";

const MAIN_CORP_CLASS_NAME = "main__rolling-corp-right";
const MAIN_TITLE_CLASS_NAME = "main__rolling-title-right";

// fetch 헤드라인 데이터
const headlineData = await makeHeadlineData();

// 인터벌 시간
const SET_TIME = 5000; // 롤링되는 주기 입니다 (1000 => 1초)

// 발행사
makeRightCorpViewTag();
const firstCorp = document.getElementById("main__first-corp-right");
const secondCorp = document.getElementById("main__second-corp-right");
const thirdCorp = document.getElementById("main__third-corp-right");

// 제목
makeRightTitleViewTag();
const firstTitle = document.getElementById("main__first-title-right");
const secondTitle = document.getElementById("main__second-title-right");
const thirdTitle = document.getElementById("main__third-title-right");

const [leftViewBox] = document.getElementsByClassName(
  "main__rolling-title-right"
);

let move = 2;
let dataCnt = 1;
let currentChildIndex = 1; // 자식의 몇번째를 의미함.
let subViewRightInterval;

export function paintSubViewRight() {
  firstCorp.textContent = headlineData[0].publisher;
  firstTitle.textContent = headlineData[0].title;

  setTimeout(() => {
    subViewRightInterval = setInterval(moveContentRight, SET_TIME);
  }, 1000);

  leftViewBox.addEventListener("mouseover", () => {
    clearInterval(subViewRightInterval);
  });
  leftViewBox.addEventListener("mouseout", () => {
    subViewRightInterval = setInterval(moveContentRight, SET_TIME);
    // setTimeout(() => {
    //   subViewRightInterval = setInterval(moveContentRight, SET_TIME);
    // }, 1000);
  });
}

async function makeHeadlineData() {
  const data = await fetchHeadline("./data/headline.json");
  return shuffle(data.slice(data.length / 2, data.length));
}

function moveContentRight() {
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

  replaceText(
    MAIN_CORP_CLASS_NAME,
    MAIN_TITLE_CLASS_NAME,
    currentChildIndex,
    dataCnt,
    headlineData
  );
  dataCnt += 1;
  dataCnt = dataCnt % headlineData.length;

  currentChildIndex === 2 ? (currentChildIndex = 0) : currentChildIndex++;
}
