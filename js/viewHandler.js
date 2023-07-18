import { removeDisplay, setDisplay, getJSON } from "./utils.js";
import { drawNews } from "./newsList.js";
import { setSubListNav, drawSubNews } from "./subscribeListView.js";
import { drawGridView, drawSubGridView } from "./gridFunction.js";
import { STATE } from "./const.js";

let presses;

async function addEventInSymbol() {
  presses = await getJSON("../assets/media.json");
  presses = Object.values(presses).reduce((acc, cur) => {
    return acc.concat(cur);
  });

  let $list_symbol = document.querySelectorAll(".list-symbol");
  let $grid_symbol = document.querySelectorAll(".grid-symbol");
  $list_symbol.forEach(symbol => {
    symbol.addEventListener("click", event => {
      handleView(event.target);
    });
  });
  $grid_symbol.forEach(symbol => {
    symbol.addEventListener("click", event => {
      handleView(event.target);
    });
  });
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
    $subscribe.classList.remove("option-selected");
    $total.classList.add("option-selected");
  } else {
    $subscribe.classList.add("option-selected");
    $total.classList.remove("option-selected");
  }
}

function handleView(target) {
  const target_class = target.classList;
  function checkClass(_class) {
    return target_class.contains(_class); // 있으면 true 반환
  }
  removeDisplay();
  if (checkClass("list-symbol")) {
    //list 버튼 눌렀을 때
    STATE.SUB_NEWS_PAGE = 0;
    changeViewIcon("list");
    if (STATE.IS_SUB_VIEW) {
      // list 선택, list 구독 뷰 출력
      if (STATE.SUB_DATA.length === 0) {
        setDisplay(".no-sub-item-div", "query", "block");
      } else {
        setDisplay(".sub-press-list-section", "query", "block");
        drawSubNews(STATE.SUB_NEWS_PAGE);
      }
    } else {
      // list선택, total list 뷰 출력
      setDisplay(".press-list-section", "query", "block");
      drawNews();
    }
    STATE.IS_GRID_VIEW = false;
  }
  if (checkClass("grid-symbol")) {
    //grid 버튼 눌렀을 때
    changeViewIcon("grid");
    if (STATE.IS_SUB_VIEW) {
      // grid 선택, grid 구독 뷰 출력
      setDisplay(".press-grid-sub", "query", "block");
      drawSubGridView();
    } else {
      // grid선택, total grid 뷰 출력
      setDisplay(".press-grid", "query", "block");
      drawGridView();
    }
    STATE.IS_GRID_VIEW = true;
  }
  if (checkClass("total-press")) {
    // 전체 언론사 클릭
    setDisplay(".press-grid", "query", "block");
    changeViewIcon("grid");
    changeOption("total");
    drawGridView();
    STATE.IS_SUB_VIEW = false;
  }
  if (checkClass("subscribed-press")) {
    // 내 구독 언론사 클릭
    changeViewIcon("list");
    changeOption("subscribe");
    STATE.SUB_NEWS_PAGE = 0;
    if (STATE.SUB_DATA.length === 0) {
      setDisplay(".no-sub-item-div", "query", "block");
    } else {
      setDisplay(".sub-press-list-section", "query", "block");
      drawSubNews(STATE.SUB_NEWS_PAGE);
    }
    STATE.IS_SUB_VIEW = true;
  }
}

export { handleView, addEventInSymbol, changeViewIcon, changeOption };
