import {
  getQuerySelector,
  getQuerySelectorAll,
} from "../../utils/js/getElements.js";
import { fetchData } from "../../utils/js/getJson.js";
import {
  HEADLINE_ROLLING_NEWS_NUM,
  HEADLINE_ROLLING_TIME_GAP,
  HEADLINE_ROLLING_TIME,
} from "../constant/constants.js";

let intervalFirstNewsbar;
let intervalSecondNewsbar;

// 최신 헤드라인 뉴스 자동 롤링 시작
function startRolling() {
  intervalFirstNewsbar = setInterval(() => {
    rollingInterval("first");
  }, HEADLINE_ROLLING_TIME);

  intervalSecondNewsbar = setInterval(() => {
    setTimeout(() => {
      rollingInterval("second");
    }, HEADLINE_ROLLING_TIME_GAP);
  }, HEADLINE_ROLLING_TIME);
}

// 최신 헤드라인 뉴스 자동 롤링 중지
function stopRolling() {
  clearInterval(intervalFirstNewsbar);
  clearInterval(intervalSecondNewsbar);
}

// 헤드라인 뉴스 자동 롤링 영역 마우스 이벤트
function mouseEventRolling(state) {
  const headlineNews = getQuerySelectorAll(
    `.newsbar-content-container-${state} li`
  );

  headlineNews.forEach((elem) => {
    elem.addEventListener("mouseover", stopRolling);
    elem.addEventListener("mouseout", startRolling);
  });
}
// 헤드라인 뉴스 데이터 html에 입력
function putNewsHeadline(state, headlineTitleArr) {
  let headlineSrc = "";
  headlineTitleArr.forEach((elem, rollingOrder) => {
    switch (rollingOrder) {
      case 0:
        headlineSrc += `<li class="current"><a>${elem}</a></li>`;
        break;
      case 1:
        headlineSrc += `<li class="next"><a>${elem}</a></li>`;
        break;
      case HEADLINE_ROLLING_NEWS_NUM - 1:
        headlineSrc += `<li class="prev"><a>${elem}</a></li>`;
        break;
      default:
        headlineSrc += `<li class="next"><a>${elem}</a></li>`;
        break;
    }
  });
  const headlineContainer = getQuerySelector(
    `.newsbar-content-container-${state}`
  );
  headlineContainer.innerHTML = headlineSrc;
  mouseEventRolling(state);
}

// 헤드라인 뉴스 데이터 받아오기
async function getNewsHeadline() {
  const headlinePath = await fetchData("../assets/data/newsTitle.json");
  const headlineTitleFirst = headlinePath.titleFirst.map((elem) => elem.name);
  const headlineTitleSecond = headlinePath.titleSecond.map((elem) => elem.name);

  putNewsHeadline("first", headlineTitleFirst);
  putNewsHeadline("second", headlineTitleSecond);
}

// 헤드라인 뉴스 자동 롤링 반복
function rollingInterval(state) {
  getQuerySelector(
    `.newsbar-content-container-${state} .prev`
  ).classList.remove("prev");
  const current = getQuerySelector(
    `.newsbar-content-container-${state} .current`
  );
  current.classList.remove("current");
  current.classList.add("prev");

  const next = getQuerySelector(`.newsbar-content-container-${state} .next`);
  if (next.nextElementSibling == null) {
    getQuerySelector(
      `.newsbar-content-container-${state} li:first-child`
    ).classList.add("next");
  } else {
    next.nextElementSibling.classList.add("next");
  }
  next.classList.remove("next");
  next.classList.add("current");
}

export { startRolling, getNewsHeadline };
