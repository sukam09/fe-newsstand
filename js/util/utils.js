import { isDark, subscribedPress, nowCategory, categoryPageCount, isSubView, subListPageCount } from "../store/store.js";
import { getState, setState, subscribe } from "../observer/observer.js";
import { drawGridView } from "../view/gridView.js";

let presses_by_category;
let presses;
const getJSON = async url => {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    console.error("Error : ", err);
    return null;
  }
};

function setDisplay(element, type, display) {
  //display = ['none' , 'block', 'flex']
  switch (type) {
    case "id":
      document.getElementById(element).style.display = display;
      break;
    case "query":
      document.querySelector(element).style.display = display;
      break;
  }
}

function removeDisplay() {
  setDisplay(".press-list-section", "query", "none");
  setDisplay(".press-grid", "query", "none");
  setDisplay(".no-sub-item-div", "query", "none");
}

function findPress(type, target) {
  if (type === "src") {
    let $target_src = target.getElementsByTagName("img")[0].src;
    $target_src = ".." + $target_src.split("5500")[1];
    const finded_press = presses.find(press => {
      const press_src = getState(isDark) ? press.path_dark : press.path_light;
      return $target_src === press_src;
    });
    return finded_press;
  } else if (type === "name") {
    return presses.find(press => press.name === target.textContent);
  }
}

function findSpanNearby(element) {
  var parentElement = element.parentNode;

  // 최대 5단계까지 부모 요소를 탐색하여 <span> 태그를 찾음
  var maxDepth = 5;
  var depth = 0;

  while (parentElement && depth < maxDepth) {
    var spanElement = parentElement.querySelector("span");

    if (spanElement) {
      return spanElement;
    }

    parentElement = parentElement.parentNode;
    depth++;
  }

  return null; // 근처에 <span> 태그가 없을 경우 null 반환
}

/*
  src, name에 따라 요소 있는지 확인
*/
function checkIsSubscribe(type, target) {
  const subscribed_presses = getState(subscribedPress);
  if (type === "src") {
    return subscribed_presses.find(data => (target === getState(isDark) ? data.path_dark : data.path_light));
  } else if (type === "name") {
    let rt;
    try {
      rt = subscribed_presses.find(data => data.name === target);
    } catch (e) {
      return undefined;
    }
    return rt;
  }
}

function setSubData(target) {
  subscribe(subscribedPress, drawGridView);
  const subscribed_presses = getState(subscribedPress);
  if (subscribed_presses.find(press => press.name === target.name) === undefined) {
    setState(subscribedPress, [...subscribed_presses, target]);
  } else {
    setState(
      subscribedPress,
      subscribed_presses.filter(press => press.name !== target.name),
    );
  }
}

function showListNav(type) {
  if (type === "subscribe") {
    setDisplay(".sub-list-nav", "query", "block");
    setDisplay(".list-nav", "query", "none");
  } else {
    setDisplay(".sub-list-nav", "query", "none");
    setDisplay(".list-nav", "query", "block");
  }
}

function getNews() {
  // 뷰 상태에 따라 맞는 뉴스 가져오기
  const subscribed_presses = getState(subscribedPress);
  const now_category = getState(nowCategory);
  const page_count = getState(categoryPageCount);
  return getState(isSubView) ? subscribed_presses[getState(subListPageCount)] : presses_by_category[now_category][page_count[now_category]];
}

function moveEmptySubListPage() {
  removeDisplay();
  changeOption("subscribe");
  setDisplay(".no-sub-item-div", "query", "flex");
}

function setProperty(query, property, value) {
  document.querySelector(query)[property] = value;
}

async function initUtilData() {
  presses_by_category = await getJSON("../assets/media.json");
  presses = Object.values(presses_by_category).reduce((acc, cur) => {
    return acc.concat(cur);
  });
}

export {
  setDisplay,
  removeDisplay,
  findPress,
  findSpanNearby,
  getJSON,
  initUtilData,
  checkIsSubscribe,
  setSubData,
  showListNav,
  getNews,
  moveEmptySubListPage,
  setProperty,
};
