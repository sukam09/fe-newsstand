import {
  shuffle,
  onFocusToClicked,
  handleElementClass,
  snackBarAction,
} from "../utils/util.js";
import { getPressData } from "../fetchAPI.js";
import { makeButtonTag } from "../tag/buttonTag.js";
import { navTag } from "../tag/mediaNavTag.js";
import { MESSAGE, EVENT, VIEW } from "../utils/constant.js";
import {
  setSubscribe,
  setUnsubscribe,
  getSubscrbeList,
  isSubscribe,
  getNavTabView,
  setNavTabViewToAll,
  setNavTabViewToMy,
  getUserView,
} from "../store/state.js";
import { store } from "../store/redux.js";

let publisherData = await getPressData("./data/pressObj.json");

// 그리드 버튼 태그 / nav 태그 (전체 언론사 / 내가 구독한 언론사 ~~ 아이콘) 생성
makeButtonTag(".newsstand--grid-navigation-btn", "btn-disabled");
navTag();

const VIEWED_CONTENS = 24;
const FIRST_PAGE = 0;

let LAST_PAGE = 3;
let selectedPage = 0;

const ul = document.querySelector(".newsstand-area—six-col-list");
const rightBtn = document.querySelector(".newsstand--right-btn");
const leftBtn = document.querySelector(".newsstand--left-btn");
const mySubscribe = document.querySelector(".newsstand-subscribe-publisher");
const allPublisher = document.querySelector(".newsstand-all-publisher");

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

    handleElementClass(btn, "add", "newsstand__subscribe-button");
    handleElementClass(btn, "add", "view-disabled");

    btn.textContent = MESSAGE.SUBSCRIBE;
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
function paintNews(paintData = publisherData) {
  const element = [...ul.children];
  let idx = selectedPage * VIEWED_CONTENS; // 데이터의 인덱스 순서
  let elementIdx = 0; // 로고를 새로 등록할 li 순서

  element.map((child) => {
    if (idx < paintData.length) {
      const alt =
        getNavTabView() === VIEW.MY_SUB
          ? paintData[idx][0]
          : paintData[idx].name;
      const icon =
        getNavTabView() === VIEW.MY_SUB
          ? paintData[idx][1]
          : paintData[idx].lightSrc;

      handleElementClass(
        element[elementIdx].children[1],
        "remove",
        "btn-disabled"
      );

      // 구독중일때.
      if (isSubscribe(alt)) {
        element[elementIdx].children[1].textContent = MESSAGE.UNSUBSCRIBE;
      } else {
        element[elementIdx].children[1].textContent = MESSAGE.SUBSCRIBE;
      }

      child.children[0].src = icon;
      child.children[0].alt = alt;
      idx++;
      elementIdx++;
    } else {
      const alt = "";
      const icon = "";

      handleElementClass(
        element[elementIdx].children[1],
        "add",
        "btn-disabled"
      );

      element[elementIdx].children[1].textContent = "";

      child.children[0].src = icon;
      child.children[0].alt = alt;
      idx++;
      elementIdx++;
    }
  });
}

// 전체 언론사 & 내가 구독한 언론사에 이벤트리스너 등록
function addEventOnMySubAndAllSub() {
  // 내가 구독한 언론사 클릭됬을때.
  mySubscribe.addEventListener("click", () => {
    if (getUserView() === VIEW.GRID) {
      setNavTabViewToMy();
      // 현재 구독중인 리스트. undefined일때 빈배열 사용
      const subscribeList = getSubscrbeList() || [];

      // 현재 구독중인 리스트에 포커스 효과주기
      onFocusToClicked(VIEW.MY_SUB, mySubscribe, allPublisher);

      // selectedPage를 0페이지에서 시작한다. [버튼 활성화 조건도 수정해야함]
      selectedPage = 0; // selectedPage 0에서 시작

      LAST_PAGE = parseInt((subscribeList.length - 1) / VIEWED_CONTENS); // 마지막 페이지 수정.
      isBtnDisabled(); // 버튼 활성화 조건 실행.

      paintNews(subscribeList);
    }
    // store에서 구독중인 목록을 가져와서 그려준다. [paint 함수 실행] 이때, 남는 영역은 빈칸으로 채운다. [이때, 마우스오버 효과 삭제]
  });

  // 전체 언론사 클릭했을떄.
  allPublisher.addEventListener("click", () => {
    if (getUserView() === VIEW.GRID) {
      setNavTabViewToAll();
      // 전체 언론사에 포커스 효과주기
      onFocusToClicked(VIEW.ALL_SUB, mySubscribe, allPublisher);

      selectedPage = 0; // selectedPage 0에서 시작
      LAST_PAGE = 3;
      isBtnDisabled(); // 버튼 활성화 조건 실행.

      paintNews();
    }
  });
}

// 각 언론사에 이벤트리스너 등록
function addEventOnPublisher(liElement, btnElement) {
  liElement.addEventListener(
    EVENT.MOUSER_OVER,
    mouseOverOnPublisher(liElement)
  );
  liElement.addEventListener(EVENT.MOUSER_OUT, mouseOutOnPublisher(liElement));
  btnElement.addEventListener(EVENT.CLICK, userClickSubscribeButton(liElement));
}

// 언론사에 마우스가 올라갔을때 기능
function mouseOverOnPublisher(element) {
  return function () {
    const [firstChild, secondChild] = element.children;
    handleElementClass(element, "add", "newsstand__subscribe-background");
    handleElementClass(firstChild, "add", "view-disabled");
    handleElementClass(secondChild, "remove", "view-disabled");
  };
}
// 언론사에 마우스가 나갔을때 기능
function mouseOutOnPublisher(element) {
  return function () {
    const [firstChild, secondChild] = element.children;
    handleElementClass(element, "remove", "newsstand__subscribe-background");
    handleElementClass(firstChild, "remove", "view-disabled");
    handleElementClass(secondChild, "add", "view-disabled");
  };
}

// 사용자가 구독버튼 or 해지버튼을 눌렀을때 기능
function userClickSubscribeButton(liElement) {
  return function () {
    const name = liElement.children[0].alt;
    const src = liElement.children[0].attributes.src.nodeValue;

    // 해지하기를 눌렀을때.
    if (isSubscribe(name)) {
      liElement.children[1].textContent = MESSAGE.SUBSCRIBE;
      setUnsubscribe(name);

      snackBarAction(MESSAGE.UN_SUB);

      // 내가 구독한 언론사에 있을때 해지하기하면 바로 다시 그려줌.
      const subList = getSubscrbeList();
      getNavTabView() === VIEW.MY_SUB && paintNews(subList);
    }
    // 구독하기 버튼을 눌렀을때.
    else {
      liElement.children[1].textContent = MESSAGE.UNSUBSCRIBE;
      setSubscribe(name, src);

      snackBarAction(MESSAGE.SUB);
    }
  };
}

// 페이지네이션
function pagination() {
  leftBtn.addEventListener(EVENT.CLICK, (e) => {
    const subList = getSubscrbeList();
    selectedPage -= 1;
    getNavTabView() === VIEW.MY_SUB ? paintNews(subList) : paintNews();
    isBtnDisabled();
  });

  rightBtn.addEventListener(EVENT.CLICK, (e) => {
    const subList = getSubscrbeList();
    selectedPage += 1;
    console.log(subList);
    getNavTabView() === VIEW.MY_SUB ? paintNews(subList) : paintNews();
    isBtnDisabled();
  });
}

// 페이지에 따라 버튼을 비활성화
function isBtnDisabled() {
  // 보고있는 페이지가 첫 페이지라면 좌측 버튼 삭제.
  selectedPage === FIRST_PAGE
    ? handleElementClass(leftBtn, "add", "btn-disabled")
    : handleElementClass(leftBtn, "remove", "btn-disabled");

  // 보고있는 페이지가 마지막 페이지라면 우측 버튼 삭제.
  selectedPage === LAST_PAGE
    ? handleElementClass(rightBtn, "add", "btn-disabled")
    : handleElementClass(rightBtn, "remove", "btn-disabled");
  // 첫 페이지와 마지막 페이지가 같다면 모든 버튼 삭제.

  if (FIRST_PAGE === LAST_PAGE) {
    handleElementClass(leftBtn, "add", "btn-disabled");
    handleElementClass(rightBtn, "add", "btn-disabled");
  }
}

export function addGridButton() {
  selectedPage === FIRST_PAGE
    ? handleElementClass(leftBtn, "add", "btn-disabled")
    : handleElementClass(leftBtn, "remove", "btn-disabled");
  selectedPage === LAST_PAGE
    ? handleElementClass(rightBtn, "add", "btn-disabled")
    : handleElementClass(rightBtn, "remove", "btn-disabled");
}

export function deleteGridButton() {
  handleElementClass(leftBtn, "add", "btn-disabled");
  handleElementClass(rightBtn, "add", "btn-disabled");
}
