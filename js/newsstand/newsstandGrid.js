import { shuffle } from "../utils/util.js";
import { getPressData } from "../fetchAPI.js";
import { makeButtonTag } from "../tag/buttonTag.js";
import { subscribeState } from "../state/subscribeState.js";

let publisherData = await getPressData("./data/pressObj.json");

// 그리드 버튼 태그 생성.
makeButtonTag(".newsstand--grid-navigation-btn", "btn-disabled");

const VIEWED_CONTENS = 24;
const FIRST_PAGE = 0;
const LAST_PAGE = 3;
let selectedPage = 0;

const rightBtn = document.querySelector(".newsstand--right-btn");
const leftBtn = document.querySelector(".newsstand--left-btn");

export async function paintGridNewsstand() {
  initPaintNews();
  pagination();
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
    const id = findPublisherId(name);
    const subScribeStatus = liElement.children[1].textContent.toString();

    // 구독버튼을 눌렀다면
    if (subScribeStatus === "+ 구독하기") {
      liElement.children[1].textContent = "x 해지하기";
      subscribeState.setSubscribeState(id, name);
    } else {
      liElement.children[1].textContent = "+ 구독하기";
      subscribeState.setUnSubscribeState(id);
    }
  };
}

// 언론사 이름이 주어졌을때 해당 언론사의 id 찾기.
function findPublisherId(name) {
  const [data] = publisherData.filter((item) => item.name === name);

  return data.id;
}

// 이후에 페이지가 바뀔때 img 태그의 속성값만 변경함.
function paintNews(element) {
  let idx = selectedPage * VIEWED_CONTENS;
  element.map((imgTag) => {
    const icon = publisherData[idx].lightSrc;
    const alt = publisherData[idx].name;
    imgTag.children[0].src = icon;
    imgTag.children[0].alt = alt;
    idx++;
  });
}

// 페이지네이션
function pagination() {
  const ul = document.querySelector(".newsstand-area—six-col-list");
  const rightBtn = document.querySelector(".newsstand--right-btn");
  const leftBtn = document.querySelector(".newsstand--left-btn");
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
  selectedPage === FIRST_PAGE
    ? leftBtn.classList.add("btn-disabled")
    : leftBtn.classList.remove("btn-disabled");
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
