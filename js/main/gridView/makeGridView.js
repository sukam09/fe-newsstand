import {
  GRID_NUM,
  MIN_PAGE,
  MAX_PAGE,
  PRESS_NUM,
  ALL_PRESS,
  SUB_PRESS,
} from "../../utils/constant.js";
import {
  gridAllPage,
  gridSubPage,
  isDark,
  subPress,
  viewOption,
} from "../../store/store.js";
import { getState } from "../../store/observer.js";
import {
  changePage,
  handleMouseOut,
  handleMouseOver,
} from "../../feature/eventHandlers.js";
import { clickSubscribeBtn } from "../../feature/subscribe.js";

const imgIndex = Array(PRESS_NUM)
  .fill()
  .map((arr, i) => i);

function shuffleImgIndex() {
  return [...imgIndex].sort(() => Math.random() - 0.5);
}

const shuffledPress = shuffleImgIndex(imgIndex);

let _press;

function makeGridView(press) {
  if (press !== null) {
    _press = press;
  }
  const main_list_ul = document.querySelector(".grid-view-ul");

  main_list_ul.innerHTML = "";
  for (
    let i = GRID_NUM * (getState(gridAllPage) - 1);
    i < GRID_NUM * getState(gridAllPage);
    i++
  ) {
    let _li, _img;
    if (getState(viewOption) === ALL_PRESS) {
      [_li, _img] = makeGrid(_press[shuffledPress[i]]);
    } else {
      [_li, _img] = makeGrid(_press[i]);
    }

    //구독하기 && 해제하기 클릭 시
    _img.addEventListener("click", (e) =>
      clickSubscribeBtn(e.target.parentElement.dataset.press, _img)
    );

    main_list_ul.appendChild(_li);
    _li.appendChild(_img);
  }

  checkPage();
}

function makeGrid(pressinfo) {
  const _li = document.createElement("li");
  const _img = document.createElement("img");

  if (pressinfo !== undefined) {
    _li.setAttribute("data-press", `${pressinfo.name}`);
    if (getState(isDark)) {
      _img.setAttribute("src", `${pressinfo.darkSrc}`);
    } else {
      _img.setAttribute("src", `${pressinfo.lightSrc}`);
    }

    /* li hover 이벤트 리스너 */
    _li.addEventListener("mouseover", () =>
      handleMouseOver(_img, _li.dataset.press)
    );

    _li.addEventListener("mouseout", () => {
      if (getState(isDark)) {
        handleMouseOut(_img, ` ${pressinfo.darkSrc}`);
      } else {
        handleMouseOut(_img, ` ${pressinfo.lightSrc}`);
      }
    });
  }
  return [_li, _img];
}

function checkPage() {
  const left_btn = document.getElementById("grid-left-btn");
  const right_btn = document.getElementById("grid-right-btn");

  left_btn.style.visibility = "visible";
  right_btn.style.visibility = "visible";

  if (getState(viewOption) === ALL_PRESS) {
    if (getState(gridAllPage) === MIN_PAGE) {
      left_btn.style.visibility = "hidden";
    } else if (getState(gridAllPage) === MAX_PAGE) {
      right_btn.style.visibility = "hidden";
    }
  } else if (getState(viewOption) === SUB_PRESS) {
    if (
      getState(gridSubPage) === MIN_PAGE &&
      getState(gridSubPage) >= Math.ceil(getState(subPress).length / GRID_NUM)
    ) {
      left_btn.style.visibility = "hidden";
      right_btn.style.visibility = "hidden";
    } else if (getState(gridSubPage) === MIN_PAGE) {
      left_btn.style.visibility = "hidden";
    } else if (
      getState(gridSubPage) >= Math.ceil(getState(subPress).length / GRID_NUM)
    ) {
      right_btn.style.visibility = "hidden";
    }
  }
}

function addEventToGridBtn() {
  const left_btn = document.getElementById("grid-left-btn");
  const right_btn = document.getElementById("grid-right-btn");

  right_btn.addEventListener("click", (e) => changePage(e));
  left_btn.addEventListener("click", (e) => changePage(e));
}

export { checkPage, makeGridView, addEventToGridBtn };
