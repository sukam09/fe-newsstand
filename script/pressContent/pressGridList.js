import {
  getQuerySelector,
  getQuerySelectorAll,
} from "../../utils/js/getElements.js";
import { fetchData } from "../../utils/js/getJson.js";
import { getState, register, setState } from "../observer/observer.js";
import {
  allOfPress,
  gridPageIdx,
  isSubscribed,
  subscribedPress,
} from "../store/store.js";

const page = [[], [], [], []];

const pressContentAllView = getQuerySelector(".press-content-all-grid-view");

// Json 객체로부터 받아오는 뉴스 데이터의 id값 랜덤 셔플 후 첫번째 페이지 구현
async function shuffleImgs() {
  const imgPath = await fetchData("../assets/data/newspaperSrc.json");
  const imgId = imgPath.newsList.map((elem) => {
    return elem.id;
  });

  const shuffledArray = [...imgId].sort(() => Math.random() - 0.5);
  shuffledArray.forEach((arr, idx) => {
    const pageIndex = Math.floor(idx / 24);
    page[pageIndex].push(arr);
  });

  let imgSrcContent = "";
  page[0].forEach((elem) => {
    imgSrcContent += `
    <li>
      <img src="../assets/images/pressLogo/light/img${elem}.svg" data-key=${elem}>
      <div class="press-content-all-grid-view-btn hidden">
        <button class="all-grid-view-btn-sub">+ 구독하기</button>
        <button class="all-grid-view-btn-unsub hidden">x 해지하기</button>
      </div>
    </li>`;
  });
  pressContentAllView.innerHTML = imgSrcContent;
  showSubscribeBtn();
  setSubClickEvents();
  register(gridPageIdx, showPressImg);
  register(subscribedPress, showPressImg);
}

// 각각의 페이지에 올바른 뉴스데이터 나타내기
function showPressImg() {
  const nowGridIdx = getState(gridPageIdx);
  const subList = getState(subscribedPress);
  let imgSrcContent = "";
  page[nowGridIdx].forEach((elem) => {
    imgSrcContent += `
    <li>
      <img src="../assets/images/pressLogo/light/img${elem}.svg" data-key=${elem}>
      <div class="press-content-all-grid-view-btn hidden">
      ${
        subList.includes(elem)
          ? `<button class="all-grid-view-btn-unsub">x 해지하기</button>`
          : `<button class="all-grid-view-btn-sub">+ 구독하기</button>`
      } 
      </div>
    </li>`;
  });

  pressContentAllView.innerHTML = imgSrcContent;
  showSubscribeBtn();
  setSubClickEvents();
}

function showSubscribeBtn() {
  const eachElementOfGrid = getQuerySelectorAll(
    ".press-content-all-grid-view li"
  );

  eachElementOfGrid.forEach((elem) => {
    elem.addEventListener("mouseover", () => {
      elem.children[0].classList.remove("show");
      elem.children[0].classList.add("hidden");

      elem.children[1].classList.remove("hidden");
      elem.children[1].classList.add("show");
    });
  });

  eachElementOfGrid.forEach((elem) => {
    elem.addEventListener("mouseout", () => {
      elem.children[0].classList.remove("hidden");
      elem.children[0].classList.add("show");

      elem.children[1].classList.remove("show");
      elem.children[1].classList.add("hidden");
    });
  });
}

function addSubscribedPress(element) {
  const subList = getState(subscribedPress);
  setState(subscribedPress, [
    ...subList,
    parseInt(element.children[0].dataset.key),
  ]);
}

function removeSubscribedPress(element) {
  const subList = getState(subscribedPress);
  const updateSubList = subList.filter((elem) => {
    return elem !== parseInt(element.children[0].dataset.key);
  });
  setState(subscribedPress, updateSubList);
}

function setSubClickEvents() {
  const subBtnLists = getQuerySelectorAll(".all-grid-view-btn-sub");
  const unsubBtnLists = getQuerySelectorAll(".all-grid-view-btn-unsub");
  subBtnLists.forEach((elem) => {
    elem.addEventListener("click", () => {
      addSubscribedPress(elem.parentNode.parentNode);
      elem.classList.remove("show");
      elem.classList.add("hidden");
    });
  });
  unsubBtnLists.forEach((elem) => {
    elem.addEventListener("click", () => {
      removeSubscribedPress(elem.parentNode.parentNode);
      elem.classList.remove("show");
      elem.classList.add("hidden");
    });
  });
}

export { shuffleImgs, showSubscribeBtn };
