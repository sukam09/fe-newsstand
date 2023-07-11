import { shuffle } from "../utils/util.js";
import {
  moveTopContent,
  moveMiddleContent,
  moveBottomContent,
  replaceText,
} from "../utils/rollingContent.js";

const MAIN_CORP_CLASS_NAME = "main__rolling-corp-right";
const MAIN_TITLE_CLASS_NAME = "main__rolling-title-right";

const newsDataRight = shuffle([
  {
    title: `英 BBC "한국 향한 '우크라 포탄 지원' 압박 고조"`,
    corp: `YTN`,
  },
  {
    title: `'괴물수비수 KIM 놓치고 분노 폭발' 텐 하흐 멘붕`,
    corp: `스포츠조선`,
  },
  {
    title: `고려대에 고액 기부 잇달아…같은날 2명이 100억씩`,
    corp: `연합뉴스`,
  },
  {
    title: `달에서 50km 규모 화강암 지형 발견…"물 있었나?"`,
    corp: `ZDNET`,
  },
  {
    title: `엔씨소프트 생성형 AI 이름은 '바르코'?…상표권 출원`,
    corp: `연합뉴스`,
  },
]);

const SET_TIME = 5000; // 롤링되는 주기 입니다 (1000 => 1초)
const firstCorp = document.getElementById("main__first-corp-right");
const secondCorp = document.getElementById("main__second-corp-right");
const thirdCorp = document.getElementById("main__third-corp-right");
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
  firstCorp.textContent = newsDataRight[0].corp;
  firstTitle.textContent = newsDataRight[0].title;

  subViewRightInterval = setInterval(moveContentRight, SET_TIME);

  leftViewBox.addEventListener("mouseover", () => {
    clearInterval(subViewRightInterval);
  });
  leftViewBox.addEventListener("mouseout", () => {
    subViewRightInterval = setInterval(moveContentRight, SET_TIME);
  });
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
    newsDataRight
  );
  dataCnt += 1;
  dataCnt = dataCnt % newsDataRight.length;

  currentChildIndex === 2 ? (currentChildIndex = 0) : currentChildIndex++;
}
