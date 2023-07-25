import { ListComponent } from "../components/List/ListComponent.js";
import { setListButton } from "../components/List/setListButton.js";
import { store } from "../store/store.js";
import { filterSubscribePress } from "./filter/filterSubscription.js";
import { getAllAgencies } from "./setAgencies.js";
import { removeButton } from "../components/Button/removeButton.js";
import { sortCategory } from "./sort/sortCategory.js";
import {
  FIELDTAB_LIST,
  INITIAL_CATEGORY,
  INITIAL_PAGE,
} from "../constants/constant.js";
import { checkSubscription } from "./utils.js";
import { setGrid } from "./setGrid.js";
import { stopProgress } from "../components/List/progress.js";

const grid_btn = document.querySelector(".grid-view-btn");
const list_btn = document.querySelector(".list-view-btn");

const subscribe_press = document.querySelector(".subscribe_press");
const all_press = document.querySelector(".all_press");

const $grid = document.querySelector(".agency-grid");
const $list = document.querySelector(".agency-list");

// List 뷰 선택시
export const setList = () => {
  let agencies = getAllAgencies();

  if (list_btn.getAttribute("viewtype") === null) {
    list_btn.setAttribute("viewtype", true);
    grid_btn.removeAttribute("viewtype");
  }
  removeButton();

  let current_page = INITIAL_PAGE;
  let current_category = INITIAL_CATEGORY;

  $grid.style.display = "none";
  $list.style.display = "flex";

  // 전체인지 내가 구독한 언론사인지 체크하는 변수
  const isSubscribedMode = Boolean(
    subscribe_press.getAttribute("subscribetype")
  );

  agencies = isSubscribedMode
    ? filterSubscribePress(agencies)
    : sortCategory(agencies);

  const fieldtab_list = isSubscribedMode ? getPressName() : FIELDTAB_LIST;

  setListButton(agencies, current_page, current_category);
  ListComponent(
    INITIAL_PAGE,
    agencies,
    fieldtab_list[current_category],
    current_category
  );
};

export const setSubList = () => {
  if (checkSubscription()) {
    alert("구독한 언론사가 없습니다!");
    all_press.setAttribute("subscribetype", true);
    subscribe_press.removeAttribute("subscribetype");
    $list.style.display = "none";
    stopProgress();
    setGrid();
  } else {
    let agencies = getAllAgencies();

    if (list_btn.getAttribute("viewtype") === null) {
      list_btn.setAttribute("viewtype", true);
      grid_btn.removeAttribute("viewtype");
    }
    removeButton();

    let current_page = INITIAL_PAGE;
    let current_category = INITIAL_CATEGORY;

    $grid.style.display = "none";
    $list.style.display = "flex";

    agencies = filterSubscribePress(agencies);

    const fieldtab_list = getPressName();

    setListButton(agencies, current_page, current_category);
    ListComponent(
      INITIAL_PAGE,
      agencies,
      fieldtab_list[current_category],
      current_category
    );
  }
};

// 구독한 언론사 FIELDTAB_LIST 생성
const getPressName = () => {
  const subscribed_name = store.subscriptions
    .filter((agency) => agency.subscribe === true)
    .map((li) => {
      return li.name;
    });
  return subscribed_name;
};
