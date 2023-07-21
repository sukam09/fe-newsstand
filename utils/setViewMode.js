import { setGridButton } from "../components/Grid/setGridButton.js";
import { GridComponent } from "../components/GridComponent.js";
import { ListComponent } from "../components/ListComponent.js";
import {
  FIELDTAB_LIST,
  INITIAL_CATEGORY,
  INITIAL_PAGE,
} from "../constants/constant.js";
import { removeButton } from "../components/Button/removeButton.js";
import { sortCategory } from "./sortCategory.js";
import { sortPages } from "./sortPage.js";
import { setListButton } from "../components/List/setListButton.js";
import { store } from "../store/store.js";

const grid_btn = document.querySelector(".grid-view-btn");
const list_btn = document.querySelector(".list-view-btn");

const all_press = document.querySelector(".all_press");
const subscribe_press = document.querySelector(".subscribe_press");

const filterSubscribePress = (copy_agencies) => {
  const subscribe_agencies = store.subscriptions.filter(
    (item) => item.subscribe
  );
  copy_agencies = subscribe_agencies.map((subscribe_agency) => {
    return copy_agencies.find(
      (agency) => agency.name === subscribe_agency.name
    );
  });
  return copy_agencies;
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

export const viewSelectHandler = (agencies) => {
  // Grid 뷰 선택 시
  const setGrid = () => {
    // Fetch를 통해 받은 언론사에 대한 모든 정보를 deep copy
    let copy_agencies = JSON.parse(JSON.stringify(agencies));

    // list 뷰 관련 삭제 및 grid 버튼, grid 컴포넌트 추가
    if (grid_btn.getAttribute("viewtype") === null) {
      grid_btn.setAttribute("viewtype", true);
      list_btn.removeAttribute("viewtype");
    }
    removeButton();

    const $grid = document.querySelector(".agency-grid");
    const $list = document.querySelector(".agency-list");
    $grid.style.display = "grid";
    $list.style.display = "none";

    // 내가 구독한 언론사가 클릭된 상태라면
    if (Boolean(subscribe_press.getAttribute("subscribetype"))) {
      copy_agencies = filterSubscribePress(copy_agencies);

      const pages = sortPages(copy_agencies);
      setGridButton(pages);
      GridComponent(INITIAL_PAGE, pages);
    }
    // 전체 언론사라면
    else {
      const pages = sortPages(agencies);
      setGridButton(pages);
      GridComponent(INITIAL_PAGE, pages);
    }
  };

  // List 뷰 선택시
  const setList = () => {
    let copy_agencies = JSON.parse(JSON.stringify(agencies));

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
    // if (Boolean(subscribe_press.getAttribute("subscribetype")) === true) {
    //   // sorted_agencies 역할을 할 예정
    //   copy_agencies = filterSubscribePress(copy_agencies);

    //   // FIELDTAB_LIST 역할을 할 예정
    //   const subscribed_list = getPressName();

    //   setListButton(copy_agencies, current_page, current_category);
    //   ListComponent(
    //     INITIAL_PAGE,
    //     copy_agencies,
    //     subscribed_list[current_category],
    //     current_category
    //   );
    // } else {
    // 전체 언론사
    const sorted_agencies = sortCategory(agencies);

    setListButton(sorted_agencies, current_page, current_category);
    ListComponent(
      INITIAL_PAGE,
      sorted_agencies,
      FIELDTAB_LIST[current_category],
      current_category
    );
    // }
  };

  grid_btn.addEventListener("click", setGrid);
  list_btn.addEventListener("click", setList);

  // 신문사 타입에 따른 event listener 추가 예정(전체 언론사, 내가 구독한 언론사)

  all_press.addEventListener("click", () => {
    if (all_press.getAttribute("subscribetype") === null) {
      all_press.setAttribute("subscribetype", true);
      subscribe_press.removeAttribute("subscribetype");
    }
    setGrid();
  });

  subscribe_press.addEventListener("click", () => {
    if (subscribe_press.getAttribute("subscribetype") === null) {
      subscribe_press.setAttribute("subscribetype", true);
      all_press.removeAttribute("subscribetype");
    }
    setGrid();
  });
};
