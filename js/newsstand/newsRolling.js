import { shuffle } from "../utils/util.js";
import { getHeadline } from "../fetchAPI.js";
import {
  makeCorpViewTag,
  makeTitleViewTag,
  makeRightCorpViewTag,
  makeRightTitleViewTag,
} from "../tag/rollingTag.js";
import {
  moveTopContent,
  moveMiddleContent,
  moveBottomContent,
  replaceText,
} from "../utils/rolling.js";

// fetch 헤드라인 데이터
const leftHeadlineData = await makeLeftHeadlineData();
const rightHeadlineData = await makeRightHeadlineData();

// 인터벌 시간
const SET_TIME = 5000; // 롤링되는 주기 입니다 (1000 => 1초)

const MAIN_CORP_CLASS_NAME_LFET = ".main__rolling-corp-left";
const MAIN_TITLE_CLASS_NAME_LEFT = ".main__rolling-title-left";
const MAIN_CORP_CLASS_NAME_RIGHT = ".main__rolling-corp-right";
const MAIN_TITLE_CLASS_NAME_RIGHT = ".main__rolling-title-right";

// 발행사와 제목 태그 생성
makeCorpViewTag();
makeTitleViewTag();
makeRightCorpViewTag();
makeRightTitleViewTag();

let hoverTags = [];
let leftInterval;
let rightInterval;
let move = [2, 2];
let dataCnt = [1, 1];
let currentChildIndex = [1, 1]; // 자식의 몇번째를 의미함.

const position = ["left", "right"];
let firstCorp = [];
let secondCorp = [];
let thirdCorp = [];
let firstTitle = [];
let secondTitle = [];
let thirdTitle = [];

// 롤링 subView를 그려주는 함수.
export async function paintSubView() {
  findRollingTag();
  paintInitContent();

  // 왼쪽 오른쪽 1초 차이두고 롤링
  leftRolling();
  setTimeout(() => {
    rightRolling();
  }, 1000);
}

// 시작화면 시작할때 첫 롤링뉴스 보여주는 함수.
function paintInitContent() {
  firstCorp[0].textContent = leftHeadlineData[0].publisher;
  firstTitle[0].textContent = leftHeadlineData[0].title;
  firstCorp[1].textContent = rightHeadlineData[0].publisher;
  firstTitle[1].textContent = rightHeadlineData[0].title;
}

// 왼쪽 롤링
function leftRolling() {
  leftInterval = setInterval(moveLeftContent(), SET_TIME);
  hoverTags[0].addEventListener("mouseover", () => {
    clearInterval(leftInterval);
  });
  hoverTags[0].addEventListener("mouseout", () => {
    leftInterval = setInterval(moveLeftContent(), SET_TIME);
  });
}

// 오른쪽 롤링
function rightRolling() {
  rightInterval = setInterval(moveRightContent, SET_TIME);
  hoverTags[1].addEventListener("mouseover", () => {
    clearInterval(rightInterval);
  });
  hoverTags[1].addEventListener("mouseout", () => {
    rightInterval = setInterval(moveRightContent, SET_TIME);
  });
}

async function makeLeftHeadlineData() {
  const data = await getHeadline("./data/headline.json");
  return shuffle(data.slice(0, data.length / 2));
}

async function makeRightHeadlineData() {
  const data = await getHeadline("./data/headline.json");
  return shuffle(data.slice(data.length / 2, data.length));
}

// 왼쪽 롤링 콘텐츠 변경할때 실행되는 함수
function moveLeftContent() {
  return function () {
    if (move[0] == 2) {
      moveTopContent(
        firstCorp[0],
        secondCorp[0],
        thirdCorp[0],
        firstTitle[0],
        secondTitle[0],
        thirdTitle[0]
      );
      move[0] = 0;
    } else if (move[0] == 1) {
      moveMiddleContent(
        firstCorp[0],
        secondCorp[0],
        thirdCorp[0],
        firstTitle[0],
        secondTitle[0],
        thirdTitle[0]
      );
      move[0] = 2;
    } else if (move[0] == 0) {
      moveBottomContent(
        firstCorp[0],
        secondCorp[0],
        thirdCorp[0],
        firstTitle[0],
        secondTitle[0],
        thirdTitle[0]
      );
      move[0] = 1;
    }

    replaceText(
      MAIN_CORP_CLASS_NAME_LFET,
      MAIN_TITLE_CLASS_NAME_LEFT,
      currentChildIndex[0],
      dataCnt[0],
      leftHeadlineData
    );
    dataCnt[0] += 1;
    dataCnt[0] = dataCnt[0] % leftHeadlineData.length;

    currentChildIndex[0] === 2
      ? (currentChildIndex[0] = 0)
      : currentChildIndex[0]++;
  };
}

// 오른쪽 롤링 콘텐츠 변경할때 실행되는 함수
function moveRightContent() {
  if (move[1] == 2) {
    moveTopContent(
      firstCorp[1],
      secondCorp[1],
      thirdCorp[1],
      firstTitle[1],
      secondTitle[1],
      thirdTitle[1]
    );
    move[1] = 0;
  } else if (move[1] == 1) {
    moveMiddleContent(
      firstCorp[1],
      secondCorp[1],
      thirdCorp[1],
      firstTitle[1],
      secondTitle[1],
      thirdTitle[1]
    );
    move[1] = 2;
  } else if (move[1] == 0) {
    moveBottomContent(
      firstCorp[1],
      secondCorp[1],
      thirdCorp[1],
      firstTitle[1],
      secondTitle[1],
      thirdTitle[1]
    );
    move[1] = 1;
  }

  replaceText(
    MAIN_CORP_CLASS_NAME_RIGHT,
    MAIN_TITLE_CLASS_NAME_RIGHT,
    currentChildIndex[1],
    dataCnt[1],
    rightHeadlineData
  );
  dataCnt[1] += 1;
  dataCnt[1] = dataCnt[1] % rightHeadlineData.length;

  currentChildIndex[1] === 2
    ? (currentChildIndex[1] = 0)
    : currentChildIndex[1]++;
}

// 롤링관련된 태그를 찾아서 미리 변수에 저장해두는 함수.
function findRollingTag() {
  position.map((pos) => {
    const parentCorp = document.querySelector(`.main__rolling-corp-${pos}`);
    const parentTitle = document.querySelector(`.main__rolling-title-${pos}`);
    const hoverTag = document.querySelector(`.main__rolling-title-${pos}`);

    firstCorp.push(parentCorp.children[0]);
    secondCorp.push(parentCorp.children[1]);
    thirdCorp.push(parentCorp.children[2]);

    firstTitle.push(parentTitle.children[0]);
    secondTitle.push(parentTitle.children[1]);
    thirdTitle.push(parentTitle.children[2]);

    hoverTags.push(hoverTag);
  });
}
