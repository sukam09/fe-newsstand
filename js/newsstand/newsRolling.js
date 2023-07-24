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
import { EVENT, POSITION } from "../utils/constant.js";

// fetch 헤드라인 데이터
const leftHeadlineData = await makeLeftHeadlineData();
const rightHeadlineData = await makeRightHeadlineData();

// 인터벌 시간
const SET_TIME = 5000; // 롤링되는 주기 입니다 (1000 => 1초)

const CLASS_LEFT_CORP = ".main__rolling-corp-left";
const CLASS_LEFT_TITLE = ".main__rolling-title-left";
const CLASS_RIGHT_CORP = ".main__rolling-corp-right";
const CLASS_RIGHT_TITLE = ".main__rolling-title-right";

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

const position = [POSITION.LEFT, POSITION.RIGHT];
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
  leftInterval = setInterval(moveContent(0), SET_TIME);
  hoverTags[0].addEventListener(EVENT.MOUSER_OVER, () => {
    clearInterval(leftInterval);
  });
  hoverTags[0].addEventListener(EVENT.MOUSER_OUT, () => {
    leftInterval = setInterval(moveContent(0), SET_TIME);
  });
}

// 오른쪽 롤링
function rightRolling() {
  rightInterval = setInterval(moveContent(1), SET_TIME);
  hoverTags[1].addEventListener(EVENT.MOUSER_OVER, () => {
    clearInterval(rightInterval);
  });
  hoverTags[1].addEventListener(EVENT.MOUSER_OUT, () => {
    rightInterval = setInterval(moveContent(1), SET_TIME);
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
function moveContent(idx) {
  return function () {
    const headlineData = idx ? rightHeadlineData : leftHeadlineData;
    const headCorp = idx ? CLASS_RIGHT_CORP : CLASS_LEFT_CORP;
    const headTitle = idx ? CLASS_RIGHT_TITLE : CLASS_LEFT_TITLE;
    const [firstCp, secondCp, thirdCp] = [
      firstCorp[idx],
      secondCorp[idx],
      thirdCorp[idx],
    ];
    const [firstT, secondT, thirdT] = [
      firstTitle[idx],
      secondTitle[idx],
      thirdTitle[idx],
    ];
    if (move[idx] == 2) {
      moveTopContent(firstCp, secondCp, thirdCp, firstT, secondT, thirdT);
      move[idx] = 0;
    } else if (move[idx] == 1) {
      moveMiddleContent(firstCp, secondCp, thirdCp, firstT, secondT, thirdT);
      move[idx] = 2;
    } else if (move[idx] == 0) {
      moveBottomContent(firstCp, secondCp, thirdCp, firstT, secondT, thirdT);
      move[idx] = 1;
    }

    replaceText(
      headCorp,
      headTitle,
      currentChildIndex[idx],
      dataCnt[idx],
      headlineData
    );
    dataCnt[idx] += 1;
    dataCnt[idx] = dataCnt[idx] % headlineData.length;

    currentChildIndex[idx] === 2
      ? (currentChildIndex[idx] = 0)
      : currentChildIndex[idx]++;
  };
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
