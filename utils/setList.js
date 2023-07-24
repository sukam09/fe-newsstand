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

const grid_btn = document.querySelector(".grid-view-btn");
const list_btn = document.querySelector(".list-view-btn");

const subscribe_press = document.querySelector(".subscribe_press");

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

  const $grid = document.querySelector(".agency-grid");
  const $list = document.querySelector(".agency-list");
  $grid.style.display = "none";
  $list.style.display = "flex";

  // 내가 구독한 언론사일 때 넘길 로직 구현
  if (Boolean(subscribe_press.getAttribute("subscribetype"))) {
    // sorted_agencies 역할을 할 예정
    agencies = filterSubscribePress(agencies);

    // FIELDTAB_LIST 역할을 할 예정
    const subscribed_list = getPressName();

    setListButton(agencies, current_page, current_category);
    ListComponent(
      INITIAL_PAGE,
      agencies,
      subscribed_list[current_category],
      current_category
    );
  } else {
    // 전체 언론사
    const sorted_agencies = sortCategory(agencies);

    setListButton(sorted_agencies, current_page, current_category);
    ListComponent(
      INITIAL_PAGE,
      sorted_agencies,
      FIELDTAB_LIST[current_category],
      current_category
    );
  }
};

const getPressName = () => {
  // FIELDTAB_LIST 생성해주기 ..
  const subscribed_name = store.subscriptions
    .filter((agency) => agency.subscribe === true)
    .map((li) => {
      return li.name;
    });
  return subscribed_name;
};
