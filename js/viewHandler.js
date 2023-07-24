import { removeDisplay, setDisplay, getJSON } from "./utils.js";
import { drawNews, setNowCount } from "./newsList.js";
import { drawGridView } from "./gridFunction.js";
import { STATE } from "./const.js";
import { setSubListNav } from "./subscribeListView.js";
import { setState, subscribe,getState } from "./observer/observer.js";
import { isGridView, isSubView, subListPageCount, subscribedPress } from "./store/store.js";

let presses;

async function addEventInSymbol() {
  presses = await getJSON("../assets/media.json");
  presses = Object.values(presses).reduce((acc, cur) => {
    return acc.concat(cur);
  });

  let $list_symbol = document.querySelectorAll(".list-symbol");
  let $grid_symbol = document.querySelectorAll(".grid-symbol");
  $list_symbol.forEach(symbol => {
    symbol.addEventListener("click",handleView)
  });
  $grid_symbol.forEach(symbol => {
    symbol.addEventListener("click", handleView)
    });
    subscribe(isGridView,drawNews)
    subscribe(isGridView,setSubListNav)
    subscribe(isGridView,drawGridView)
    subscribe(isSubView,drawNews)
    subscribe(isSubView,setSubListNav)
    subscribe(isSubView,drawGridView)
    subscribe(isGridView,setNowCount)
    subscribe(isSubView,setNowCount)

}

function changeViewIcon(selected) {
  if (selected === "list") {
    setDisplay(".grid-selected", "query", "none");
    setDisplay(".list-selected", "query", "flex");
  } else {
    //grid 선택
    setDisplay(".grid-selected", "query", "flex");
    setDisplay(".list-selected", "query", "none");
  }
}

function changeOption(selected) {
  const $total = document.querySelector(".total-press");
  const $subscribe = document.querySelector(".subscribed-press");
  if (selected === "total") {
    $subscribe.classList.remove("selected-bold16", "text-strong");
    $total.classList.add("selected-bold16", "text-strong");
  } else {
    $subscribe.classList.add("selected-bold16", "text-strong");
    $total.classList.remove("selected-bold16", "text-strong");
  }
}

function handleView({target:target}) {
  const target_class = target.classList;
  function checkClass(_class) {
    return target_class.contains(_class); // 있으면 true 반환
  }
  removeDisplay();
  if (checkClass("list-symbol")) {
    //list 버튼 눌렀을 때
    setState(subListPageCount,0);
    changeViewIcon("list");
    setState(isGridView, false);
    if (getState(isSubView)) {
      // list 선택, list 구독 뷰 출력
      if (getState(subscribedPress).length === 0) {
        setDisplay(".no-sub-item-div", "query", "block");
      } else {
        setDisplay(".press-list-section", "query", "block");
        setDisplay(".sub-list-nav",'query','block');
        setDisplay(".list-nav",'query','none');  
      }
    } else {
      // list선택, total list 뷰 출력
      setDisplay(".press-list-section", "query", "block");
      setDisplay(".sub-list-nav",'query','none');
      setDisplay(".list-nav",'query','block');
    }
  }
  if (checkClass("grid-symbol")) {
    //grid 버튼 눌렀을 때
    changeViewIcon("grid");
    setDisplay(".press-grid", "query", "block");
    drawGridView();
    setState(isGridView,true);
    setState(isSubView,true);
  }
  if (checkClass("total-press")) {
    // 전체 언론사 클릭
    setState(isGridView,true);
    setState(isSubView,false);
    setDisplay(".press-grid", "query", "block");
    changeViewIcon("grid");
    changeOption("total");
  }
  if (checkClass("subscribed-press")) {
    // 내 구독 언론사 클릭
    changeViewIcon("list");
    changeOption("subscribe");
    setState(subListPageCount, 0);
    setState(isGridView,false);
    setState(isSubView,true);
    if (getState(subscribedPress).length === 0) {
      setDisplay(".no-sub-item-div", "query", "block");
    } else {
      setDisplay(".press-list-section", "query", "block");
      // setSubListNav();
      // drawNews();
      setDisplay(".sub-list-nav",'query','block');
      setDisplay(".list-nav",'query','none');
    }
  }
}

export { handleView, addEventInSymbol, changeViewIcon, changeOption };
