import { MODE, STATE, CONSTANT, GLOBAL } from "../model/variable.js";
import { clickSubscribeBtn } from "./subscribeController.js";
import { updateCategory } from "./fieldTabController.js";
import { changeState } from "./mainController.js";
import { strToCategory } from "../model/model.js";

function initListEvent() {
  const listSubscribeBtn = document.querySelector(".list-view .list-sub-btn");

  listSubscribeBtn.addEventListener("click", (event) => {
    const targetSrc = document.querySelector(".list-press-icon").src;
    clickSubscribeBtn(targetSrc);
  });
}

function moveListPage(pagenum) {
  GLOBAL.LIST_CURRENT_PAGE = pagenum;
  resetProgressAnimation();
  updateCategory();
  changeState(STATE.MOVE_LIST_PAGE);
}

function resetProgressAnimation() {
  const progressBar = document.querySelector(".progress-bar");
  progressBar.style.animation = "none";
  void progressBar.offsetWidth;
  progressBar.style.animation = `${CONSTANT.PROGRESS_SEC}s linear progress infinite`;
}

function moveListPageFromClickFieldTab(event) {
  const target = (event.target.querySelector("span") || event.target).innerHTML; //해럴드경제
  let page = 0;
  if (GLOBAL.CURRENT_MODE === MODE.LIST_ALL) {
    page = GLOBAL.CATEGORY_START_INDEX[strToCategory(target)];
  } else {
    for (const news of GLOBAL.SUBSCRIBE_NEWS_DATA) {
      if (news.name === target) {
        break;
      }
      page++;
    }
  }

  moveListPage(page);
}

export { initListEvent, moveListPage, moveListPageFromClickFieldTab };
