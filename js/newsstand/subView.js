import { shuffle } from "../utils/util.js";
import { fetchHeadline } from "../fetchAPI.js";
import { makeCorpViewTag, makeTitleViewTag } from "../tag/rollingTag.js";
import {
  moveTopContent,
  moveMiddleContent,
  moveBottomContent,
  replaceText,
} from "../utils/rolling.js";

const MAIN_CORP_CLASS_NAME = "main__rolling-corp";
const MAIN_TITLE_CLASS_NAME = "main__rolling-title";

// fetch 헤드라인 데이터
const headlineData = await makeHeadlineData();

// 인터벌 시간
const SET_TIME = 5000; // 롤링되는 주기 입니다 (1000 => 1초)

// 발행사
makeCorpViewTag();
const firstCorp = document.getElementById("main__first-corp");
const secondCorp = document.getElementById("main__second-corp");
const thirdCorp = document.getElementById("main__third-corp");

// 제목
makeTitleViewTag();
const firstTitle = document.getElementById("main__first-title");
const secondTitle = document.getElementById("main__second-title");
const thirdTitle = document.getElementById("main__third-title");

let subViewInterval;
const subViewBox = document.querySelector(".main__rolling-title-left");
let move = 2;
let dataCnt = 1;
let currentChildIndex = 1; // 자식의 몇번째를 의미함.

export async function paintSubView() {
  firstCorp.textContent = headlineData[0].publisher;
  firstTitle.textContent = headlineData[0].title;

  subViewInterval = setInterval(moveContent, SET_TIME);
  subViewBox.addEventListener("mouseover", () => {
    clearInterval(subViewInterval);
  });
  subViewBox.addEventListener("mouseout", () => {
    subViewInterval = setInterval(moveContent, SET_TIME);
  });
}

async function makeHeadlineData() {
  const data = await fetchHeadline("./data/headline.json");
  return shuffle(data.slice(0, data.length / 2));
}

function moveContent() {
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
