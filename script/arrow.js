import { getQuerySelector } from "../utils/js/getElements.js";
import { getState, register, setState } from "./observer/observer.js";
import { gridPageIdx, isGrid, nowCategoryIdx } from "./store/store.js";

const prevPageBtn = getQuerySelector("#press-content-btn-prev");
const nextPageBtn = getQuerySelector("#press-content-btn-next");

// 뷰 모드에 따라서 왼/오 화살표 보이고, 안보이고 ㄱ ㄱ
function updatePageBtn() {
  const currentIsGridMode = getState(isGrid);
  const nowGridIdx = getState(gridPageIdx);

  if (currentIsGridMode) {
    switch (nowGridIdx) {
      case 0:
        prevPageBtn.style.display = "none";
        break;
      case 3:
        nextPageBtn.style.display = "none";
        break;
      default:
        prevPageBtn.style.display = "block";
        nextPageBtn.style.display = "block";
    }
  } else {
    prevPageBtn.style.display = "block";
    nextPageBtn.style.display = "block";
  }
}

// 페이지 이동
function movePage(increment) {
  const currentMode = getState(isGrid);
  if (currentMode) {
    setState(gridPageIdx, getState(gridPageIdx) + increment);
  } else {
    let currentIdx = getState(nowCategoryIdx);
    currentIdx.list = getState(nowCategoryIdx).list + increment;
    currentIdx.category = getState(nowCategoryIdx).category;
    setState(nowCategoryIdx, currentIdx);
  }
}

export function initPageBtn() {
  register(isGrid, updatePageBtn);
  register(gridPageIdx, updatePageBtn);

  prevPageBtn.addEventListener("click", () => {
    movePage(-1);
  });

  nextPageBtn.addEventListener("click", () => {
    movePage(1);
  });
}
