import {
  getQuerySelector,
  getQuerySelectorAll,
} from "../../utils/js/getElements.js";
import { fetchData } from "../../utils/js/getJson.js";
import { getState, register } from "../observer/observer.js";
import { allOfPress, gridPageIdx } from "../store/store.js";

const page = [[], [], [], []];

const pressContentAllView = getQuerySelector(".press-content-all-grid-view");
const pressContentMyView = getQuerySelector(".press-content-my-grid-view");

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
    imgSrcContent += `<li><img src="../assets/images/pressLogo/light/img${elem}.svg"/>
    <svg class="hidden" width="72" height="20" viewBox="0 0 72 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="71" height="23" rx="11.5" fill="white"/>
    <path d="M15.5 12.499H12.5V15.499H11.5V12.499H8.5V11.499H11.5V8.49902H12.5V11.499H15.5V12.499Z" fill="#879298"/>
    <path d="M28.7422 7.15234V8.07812C28.7422 9.07422 28.7422 10.1582 28.4492 11.6523H29.9609V12.5664H25.707V17.0078H24.582V12.5664H20.3867V11.6523H27.3242C27.6348 10.1523 27.6348 9.05664 27.6406 8.07812V8.06641H21.5586V7.15234H28.7422ZM40.332 11.6758V12.5781H30.7578V11.6758H34.9883V10.5273H31.9531V6.91797H39.1602V7.80859H33.0664V9.61328H39.2656V10.5273H36.1016V11.6758H40.332ZM31.8242 14.4062V13.5039H39.1719V17.0547H38.0703V14.4062H31.8242ZM49.3086 6.49609V10.75H50.9961V11.6758H49.3086V16.9961H48.207V6.49609H49.3086ZM41.0703 9.05078V8.13672H43.6602V6.63672H44.7734V8.13672H47.293V9.05078H41.0703ZM41.6094 12.2617C41.6094 10.832 42.7109 9.82422 44.2227 9.82422C45.7285 9.82422 46.8301 10.832 46.8359 12.2617C46.8301 13.7031 45.7285 14.7051 44.2227 14.7109C42.7109 14.7051 41.6094 13.7031 41.6094 12.2617ZM42.6758 12.2617C42.6699 13.1758 43.3262 13.7852 44.2227 13.7734C45.1133 13.7852 45.7637 13.1758 45.7695 12.2617C45.7637 11.3652 45.1133 10.7441 44.2227 10.7383C43.3262 10.7441 42.6699 11.3652 42.6758 12.2617ZM60.2305 6.49609V16.9961H59.1055V6.49609H60.2305ZM51.6055 14.1836C54.3945 12.8535 55.7598 10.9609 55.9766 8.51172H52.1094V7.62109H57.1016C57.1016 10.6973 55.7949 13.3574 52.1914 15.0859L51.6055 14.1836Z" fill="#879298"/>
    <rect x="0.5" y="0.5" width="71" height="23" rx="11.5" stroke="#D2DAE0"/>
    </svg></li>`;
  });
  pressContentAllView.innerHTML = imgSrcContent;
  showSubscribeBtn();

  register(gridPageIdx, showPressImg);
  register(allOfPress, showMyPressImg);
}

// 각각의 페이지에 올바른 뉴스데이터 나타내기
function showPressImg() {
  const nowGridIdx = getState(gridPageIdx);
  let imgSrcContent = "";
  page[nowGridIdx].forEach((elem) => {
    imgSrcContent += `<li><img src="../assets/images/pressLogo/light/img${elem}.svg"/>
    <svg class="hidden" width="72" height="20" viewBox="0 0 72 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="71" height="23" rx="11.5" fill="white"/>
    <path d="M15.5 12.499H12.5V15.499H11.5V12.499H8.5V11.499H11.5V8.49902H12.5V11.499H15.5V12.499Z" fill="#879298"/>
    <path d="M28.7422 7.15234V8.07812C28.7422 9.07422 28.7422 10.1582 28.4492 11.6523H29.9609V12.5664H25.707V17.0078H24.582V12.5664H20.3867V11.6523H27.3242C27.6348 10.1523 27.6348 9.05664 27.6406 8.07812V8.06641H21.5586V7.15234H28.7422ZM40.332 11.6758V12.5781H30.7578V11.6758H34.9883V10.5273H31.9531V6.91797H39.1602V7.80859H33.0664V9.61328H39.2656V10.5273H36.1016V11.6758H40.332ZM31.8242 14.4062V13.5039H39.1719V17.0547H38.0703V14.4062H31.8242ZM49.3086 6.49609V10.75H50.9961V11.6758H49.3086V16.9961H48.207V6.49609H49.3086ZM41.0703 9.05078V8.13672H43.6602V6.63672H44.7734V8.13672H47.293V9.05078H41.0703ZM41.6094 12.2617C41.6094 10.832 42.7109 9.82422 44.2227 9.82422C45.7285 9.82422 46.8301 10.832 46.8359 12.2617C46.8301 13.7031 45.7285 14.7051 44.2227 14.7109C42.7109 14.7051 41.6094 13.7031 41.6094 12.2617ZM42.6758 12.2617C42.6699 13.1758 43.3262 13.7852 44.2227 13.7734C45.1133 13.7852 45.7637 13.1758 45.7695 12.2617C45.7637 11.3652 45.1133 10.7441 44.2227 10.7383C43.3262 10.7441 42.6699 11.3652 42.6758 12.2617ZM60.2305 6.49609V16.9961H59.1055V6.49609H60.2305ZM51.6055 14.1836C54.3945 12.8535 55.7598 10.9609 55.9766 8.51172H52.1094V7.62109H57.1016C57.1016 10.6973 55.7949 13.3574 52.1914 15.0859L51.6055 14.1836Z" fill="#879298"/>
    <rect x="0.5" y="0.5" width="71" height="23" rx="11.5" stroke="#D2DAE0"/>
    </svg>
    </li>`;
  });
  pressContentAllView.innerHTML = imgSrcContent;
  showSubscribeBtn();
}

function showSubscribeBtn() {
  const eachElementOfGrid = getQuerySelectorAll(
    ".press-content-all-grid-view li"
  );

  eachElementOfGrid.forEach((elem) => {
    elem.addEventListener("mouseover", () => {
      elem.firstChild.classList.remove("show");
      elem.firstChild.classList.add("hidden");

      elem.children[1].classList.remove("hidden");
      elem.children[1].classList.add("show");
    });
  });

  eachElementOfGrid.forEach((elem) => {
    elem.addEventListener("mouseout", () => {
      elem.firstChild.classList.remove("hidden");
      elem.firstChild.classList.add("show");

      elem.children[1].classList.remove("show");
      elem.children[1].classList.add("hidden");
    });
  });
}

function showUnsubscribeBtn() {}

function showMyPressImg() {
  let imgSrcContent = "";
  for (let i = 0; i < 24; i++) {
    imgSrcContent += `<li></li>`;
  }
  pressContentMyView.innerHTML = imgSrcContent;
}

export { shuffleImgs, showSubscribeBtn };
