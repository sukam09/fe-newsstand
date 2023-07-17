import { shuffle } from "../utils/util.js";
import { getPressData } from "../fetchAPI.js";
import { makeButtonTag } from "../tag/buttonTag.js";
import { subscribeState } from "../store/subscribeState.js";
import { navTag } from "../tag/mediaNavTag.js";

let publisherData = await getPressData("./data/pressObj.json");

// 그리드 버튼 태그 / nav 태그 (전체 언론사 / 내가 구독한 언론사 ~~ 아이콘) 생성
makeButtonTag(".newsstand--grid-navigation-btn", "btn-disabled");
navTag();

const VIEWED_CONTENS = 24;
const FIRST_PAGE = 0;
const LAST_PAGE = 3;
let selectedPage = 0;

const ul = document.querySelector(".newsstand-area—six-col-list");
const rightBtn = document.querySelector(".newsstand--right-btn");
const leftBtn = document.querySelector(".newsstand--left-btn");
const mySubscribe = document.querySelector(".newsstand-subscribe-publisher");
const allPublisher = document.querySelector(".newsstand-all-publisher");
let isMySubscribe = false;

export async function paintGridNewsstand() {
  initPaintNews();
  pagination();
  addEventOnMySubAndAllSub();
}

// 시작할때 img태그를 만들어서 뉴스 로고를 화면에 띄어줌.
function initPaintNews() {
  publisherData = shuffle(publisherData);
  const ul = document.querySelector(".newsstand-area—six-col-list");
  for (
    let idx = selectedPage * VIEWED_CONTENS;
    idx < selectedPage * VIEWED_CONTENS + VIEWED_CONTENS;
    idx++
  ) {
    const li = document.createElement("li");
    const btn = document.createElement("button");

    addEventOnPublisher(li, btn);

    btn.classList.add("newsstand__subscribe-button");
    btn.classList.add("view-disabled");
    btn.textContent = "+ 구독하기";
    li.className = "newsstand—subscrtion-box";
    const img = document.createElement("img");
    const icon = publisherData[idx].lightSrc;
    const alt = publisherData[idx].name;
    img.src = icon;
    img.alt = alt;
    li.appendChild(img);
    li.appendChild(btn);
    ul.appendChild(li);
  }
}

// 이후에 페이지가 바뀔때 img 태그의 속성값만 변경함.
function paintNews(element, paintData = []) {
  // 전체 언론사일때.
  if (!isMySubscribe) {
    let idx = selectedPage * VIEWED_CONTENS;
    let elementIdx = 0;

    element.map((imgTag) => {
      const icon = publisherData[idx].lightSrc;
      const alt = publisherData[idx].name;

      element[elementIdx].children[1].classList.remove("btn-disabled");
      // 구독중일때.
      if (subscribeState.getSubscribeByName(alt).length) {
        element[elementIdx].children[1].textContent = "x 해지하기";
      } else {
        element[elementIdx].children[1].textContent = "+ 구독하기";
      }

      imgTag.children[0].src = icon;
      imgTag.children[0].alt = alt;
      idx++;
      elementIdx++;
    });
  } else {
    let idx = selectedPage * VIEWED_CONTENS;
    let elementIdx = 0;

    element.map((imgTag) => {
      if (elementIdx < paintData.length) {
        const [alt, icon] = paintData[idx];
        element[elementIdx].children[1].textContent = "x 해지하기";

        imgTag.children[0].src = icon;
        imgTag.children[0].alt = alt;
        idx++;
        elementIdx++;
      } else {
        // 구독중일때.
        element[elementIdx].children[1].classList.add("btn-disabled");

        imgTag.children[0].src = "";
        imgTag.children[0].alt = "";
        idx++;
        elementIdx++;
      }
    });
  }
}

// 전체 언론사 / 내가 구독한 언론사에 이벤트리스너 등록
function addEventOnMySubAndAllSub() {
  const childUl = Array.from(ul.children);
  mySubscribe.addEventListener("click", () => {
    selectedPage = 0;
    isBtnDisabled();

    isMySubscribe = true;
    const mySubscribeData = subscribeState.getSubscribeState();
    paintNews(childUl, mySubscribeData);
  });

  allPublisher.addEventListener("click", () => {
    isMySubscribe = false;
    paintNews(childUl);
  });
}

// 각 언론사에 이벤트리스너 등록
function addEventOnPublisher(liElement, btnElement) {
  liElement.addEventListener("mouseover", mouseOverOnPublisher(liElement));
  liElement.addEventListener("mouseout", mouseOutOnPublisher(liElement));
  btnElement.addEventListener("click", userClickSubscribeButton(liElement));
}

// 언론사에 마우스가 올라갔을때 기능
function mouseOverOnPublisher(element) {
  return function () {
    element.children[0].classList.add("view-disabled");
    element.classList.add("newsstand__subscribe-background");
    element.children[1].classList.remove("view-disabled");
  };
}
// 언론사에 마우스가 나갔을때 기능
function mouseOutOnPublisher(element) {
  return function () {
    element.children[0].classList.remove("view-disabled");
    element.classList.remove("newsstand__subscribe-background");
    element.children[1].classList.add("view-disabled");
  };
}

// 사용자가 구독버튼 or 해지버튼을 눌렀을때 기능
function userClickSubscribeButton(liElement) {
  return function () {
    const name = liElement.children[0].alt;
    const src = liElement.children[0].attributes.src.nodeValue;

    // 해지하기 버튼을 눌렀을때.
    if (subscribeState.getSubscribeByName(name)[0]) {
      liElement.children[1].textContent = "+ 구독하기";
      subscribeState.setUnSubscribeState(name);
    } else {
      liElement.children[1].textContent = "x 해지하기";
      subscribeState.setSubscribeState(name, src);
    }
  };
}

// 페이지네이션
function pagination() {
  const childUl = Array.from(ul.children);

  leftBtn.addEventListener("click", (e) => {
    selectedPage -= 1;
    paintNews(childUl);
    isBtnDisabled();
  });

  rightBtn.addEventListener("click", (e) => {
    selectedPage += 1;
    paintNews(childUl);
    isBtnDisabled();
  });
}

// 페이지에 따라 버튼을 비활성화
function isBtnDisabled() {
  // 보고있는 페이지가 첫 페이지라면 좌측 버튼 삭제.
  selectedPage === FIRST_PAGE
    ? leftBtn.classList.add("btn-disabled")
    : leftBtn.classList.remove("btn-disabled");
  // 보고있는 페이지가 마지막 페이지라면 우측 버튼 삭제.
  selectedPage === LAST_PAGE
    ? rightBtn.classList.add("btn-disabled")
    : rightBtn.classList.remove("btn-disabled");
}

export function addGridButton() {
  selectedPage === FIRST_PAGE
    ? leftBtn.classList.add("btn-disabled")
    : leftBtn.classList.remove("btn-disabled");
  selectedPage === LAST_PAGE
    ? rightBtn.classList.add("btn-disabled")
    : rightBtn.classList.remove("btn-disabled");
}

export function deleteGridButton() {
  leftBtn.classList.add("btn-disabled");
  rightBtn.classList.add("btn-disabled");
}
