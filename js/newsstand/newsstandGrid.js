import {
  shuffle,
  onFocusToClicked,
  handleElementClass,
  snackBarAction,
  removeChildElement,
} from "../utils/util.js";
import { getPressData } from "../fetchAPI.js";
import { makeButtonTag } from "../tag/buttonTag.js";
import { navTag } from "../tag/mediaNavTag.js";
import { MESSAGE, EVENT, VIEW } from "../utils/constant.js";
import { unsubscribeModal } from "../utils/unsubscribe.js";
import {
  setSubscribe,
  getSubscrbeList,
  isSubscribe,
  getNavTabView,
  setNavTabViewToAll,
  setNavTabViewToMy,
  getUserView,
  setSelectedPage,
  getSelectedPage,
} from "../store/dispatch.js";
import { store } from "../store/reducer.js";

let publisherData = await getPressData("./data/pressObj.json");

// 그리드 버튼 태그 / nav 태그 (전체 언론사 / 내가 구독한 언론사 ~~ 아이콘) 생성
makeButtonTag(".newsstand--grid-navigation-btn", "btn-disabled");
navTag();

const VIEWED_CONTENS = 24;
const FIRST_PAGE = 0;

let lastPage = 3;

const ul = document.querySelector(".newsstand-area—six-col-list");
const rightBtn = document.querySelector(".newsstand--right-btn");
const leftBtn = document.querySelector(".newsstand--left-btn");
const mySubscribe = document.querySelector(".newsstand-subscribe-publisher");
const allPublisher = document.querySelector(".newsstand-all-publisher");

store.subscribe(renderGrid);

export async function paintGridNewsstand() {
  initPaintNews();
  pagination();
  addEventOnMySubAndAllSub();
}

export function addGridButton() {
  getSelectedPage() === FIRST_PAGE
    ? handleElementClass(leftBtn, "add", "btn-disabled")
    : handleElementClass(leftBtn, "remove", "btn-disabled");
  getSelectedPage() === lastPage
    ? handleElementClass(rightBtn, "add", "btn-disabled")
    : handleElementClass(rightBtn, "remove", "btn-disabled");
}

export function deleteGridButton() {
  handleElementClass(leftBtn, "add", "btn-disabled");
  handleElementClass(rightBtn, "add", "btn-disabled");
}

// 시작할때 img태그를 만들어서 뉴스 로고를 화면에 띄어줌.
function initPaintNews() {
  publisherData = shuffle(publisherData);
  const ul = document.querySelector(".newsstand-area—six-col-list");
  for (
    let idx = getSelectedPage() * VIEWED_CONTENS;
    idx < getSelectedPage() * VIEWED_CONTENS + VIEWED_CONTENS;
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
    img.style.height = "20px";
    img.src = icon;
    img.alt = alt;
    img.dataset.id = publisherData[idx].id;

    li.appendChild(img);
    li.appendChild(btn);
    ul.appendChild(li);
  }
}

// 이후에 페이지가 바뀔때 img 태그의 속성값만 변경함.
function paintNews(paintData = publisherData) {
  const element = [...ul.children];
  let idx = getSelectedPage() * VIEWED_CONTENS; // 데이터의 인덱스 순서
  let elementIdx = 0; // 로고를 새로 등록할 li 순서

  element.map((child) => {
    const firstChild = element[elementIdx].children[1];
    if (idx < paintData.length) {
      const view = getNavTabView();
      const alt =
        view === VIEW.MY_SUB ? paintData[idx][0] : paintData[idx].name;
      const icon =
        view === VIEW.MY_SUB ? paintData[idx][1] : paintData[idx].lightSrc;

      handleElementClass(firstChild, "remove", "btn-disabled");

      // 구독중일때.
      isSubscribe(alt)
        ? (firstChild.textContent = MESSAGE.UNSUBSCRIBE)
        : (firstChild.textContent = MESSAGE.SUBSCRIBE);

      child.children[0].src = icon;
      child.children[0].alt = alt;
      child.children[0].dataset.id = paintData[idx].id;
    } else {
      const alt = "";
      const icon = "";

      handleElementClass(firstChild, "add", "btn-disabled");

      firstChild.textContent = "";

      child.children[0].src = icon;
      child.children[0].alt = alt;
    }
    idx++;
    elementIdx++;
  });
}

function renderGrid() {
  const subList = getSubscrbeList() || [];
  const currentUserView = getUserView();

  // 그리드 뷰 && 내가 구독한 언론사일때.
  currentUserView === VIEW.GRID &&
    getNavTabView() === VIEW.MY_SUB &&
    paintNews(subList);

  // 그리드 뷰 && 전체 언론사일때.
  currentUserView === VIEW.GRID &&
    getNavTabView() === VIEW.ALL_SUB &&
    paintNews();
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
      setSelectedPage(0); // selectedPage 0에서 시작

      lastPage = parseInt((subscribeList.length - 1) / VIEWED_CONTENS); // 마지막 페이지 수정.
      isBtnDisabled(); // 버튼 활성화 조건 실행.
    }
  });

  // 전체 언론사 클릭했을떄.
  allPublisher.addEventListener("click", () => {
    if (getUserView() === VIEW.GRID) {
      setNavTabViewToAll();
      // 전체 언론사에 포커스 효과주기
      onFocusToClicked(VIEW.ALL_SUB, mySubscribe, allPublisher);

      setSelectedPage(0); // selectedPage 0에서 시작
      lastPage = 3;
      isBtnDisabled(); // 버튼 활성화 조건 실행.
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
    const id = liElement.children[0].dataset.id;
    // 해지하기를 눌렀을때.
    if (isSubscribe(name)) {
      unsubscribeModal(name);
    }
    // 구독하기 버튼을 눌렀을때.
    else {
      liElement.children[1].textContent = MESSAGE.UNSUBSCRIBE;
      setSubscribe(name, src, id);

      snackBarAction(MESSAGE.SUB);
    }
  };
}

// 페이지네이션
function pagination() {
  leftBtn.addEventListener(EVENT.CLICK, (e) => {
    let page = getSelectedPage();
    setSelectedPage(--page);
    isBtnDisabled();
  });

  rightBtn.addEventListener(EVENT.CLICK, (e) => {
    let page = getSelectedPage();
    setSelectedPage(++page);
    isBtnDisabled();
  });
}

// 페이지에 따라 버튼을 비활성화
function isBtnDisabled() {
  // 보고있는 페이지가 첫 페이지라면 좌측 버튼 삭제.
  getSelectedPage() === FIRST_PAGE
    ? handleElementClass(leftBtn, "add", "btn-disabled")
    : handleElementClass(leftBtn, "remove", "btn-disabled");

  // 보고있는 페이지가 마지막 페이지라면 우측 버튼 삭제.
  getSelectedPage() === lastPage
    ? handleElementClass(rightBtn, "add", "btn-disabled")
    : handleElementClass(rightBtn, "remove", "btn-disabled");
  // 첫 페이지와 마지막 페이지가 같다면 모든 버튼 삭제.

  if (FIRST_PAGE === lastPage) {
    handleElementClass(leftBtn, "add", "btn-disabled");
    handleElementClass(rightBtn, "add", "btn-disabled");
  }
}
