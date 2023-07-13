import { getQuerySelector, getQuerySelectorAll } from "../../utils/js/getElements.js";
import { fetchData } from "../../utils/js/getJson.js";

let intervalFirstNewsbar;
let intervalSecondNewsbar;

// 최신 헤드라인 뉴스 자동 롤링 시작
function startRolling() {
  intervalFirstNewsbar = setInterval(() => {
    rollingInterval('first');
  }, 5000);

  intervalSecondNewsbar = setInterval(() => {
    setTimeout(() => {
      rollingInterval('second');
    }, 1000)
  }, 5000);
}

// 최신 헤드라인 뉴스 자동 롤링 중지
function stopRolling() {
  clearInterval(intervalFirstNewsbar);
  clearInterval(intervalSecondNewsbar);
}

// 헤드라인 뉴스 자동 롤링 영역 마우스 이벤트
function mouseEventRolling(state) {
  const headlineNews = getQuerySelectorAll(document, `.newsbar-content-container-${state} li`);

  headlineNews.forEach((elem) => {
    elem.addEventListener('mouseover', () => {
      elem.style.textDecoration = "underline";
      elem.style.cursor = "pointer";
      stopRolling();
    })

    elem.addEventListener('mouseout', () => {
      elem.style.textDecoration = "none";
      elem.style.cursor = "auto";
      startRolling();
    })
  })
}
// 헤드라인 뉴스 데이터 html에 입력
function putNewsHeadline(state, headlineTitleArr) {
  let headlineSrc = "";
  headlineTitleArr.forEach((elem, id) => {
    switch (id) {
      case 0:
        headlineSrc += `<li class="current"><a>${elem}</a></li>`;
        break;
      case 1:
        headlineSrc += `<li class="next"><a>${elem}</a></li>`;
        break;
      case 4:
        headlineSrc += `<li class="prev"><a>${elem}</a></li>`;
        break;
      default:
        headlineSrc += `<li class="next"><a>${elem}</a></li>`;
        break;
    }
  });
  const headlineContainer = getQuerySelector(document, `.newsbar-content-container-${state}`);
  headlineContainer.innerHTML = headlineSrc;
  mouseEventRolling(state);
}

// 헤드라인 뉴스 데이터 받아오기
async function getNewsHeadline() {
  const headlinePath = await fetchData("../assets/data/newsTitle.json");
  const headlineTitleFirst = headlinePath.titleFirst.map((elem) => {
    return elem.name;
  })
  const headlineTitleSecond = headlinePath.titleSecond.map((elem) => {
    return elem.name;
  })

  putNewsHeadline("first", headlineTitleFirst);
  putNewsHeadline("second", headlineTitleSecond);
}

// 헤드라인 뉴스 자동 롤링 반복
function rollingInterval(state) {
  getQuerySelector(document, `.newsbar-content-container-${state} .prev`).classList.remove('prev');
  let current = getQuerySelector(document, `.newsbar-content-container-${state} .current`);
  current.classList.remove('current');
  current.classList.add('prev');

  let next = getQuerySelector(document, `.newsbar-content-container-${state} .next`);
  if (next.nextElementSibling == null) {
    getQuerySelector(document, `.newsbar-content-container-${state} li:first-child`).classList.add('next');
  } else {
    next.nextElementSibling.classList.add('next');
  }
  next.classList.remove('next');
  next.classList.add('current');
}

export { startRolling, getNewsHeadline };