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

const gridBtn = document.querySelector(".grid-view-btn");
const listBtn = document.querySelector(".list-view-btn");

const all_press = document.querySelector(".all_press");
const subscribe_press = document.querySelector(".subscribe_press");

export const viewSelectHandler = (agencies) => {
  let copyAgencies = JSON.parse(JSON.stringify(agencies));

  // Grid 뷰 선택 시
  const setGrid = () => {
    // list 뷰 관련 삭제 및 grid 버튼, grid 컴포넌트 추가
    if (gridBtn.getAttribute("viewtype") === null) {
      gridBtn.setAttribute("viewtype", true);
      listBtn.removeAttribute("viewtype");
    }
    removeButton();

    const $grid = document.querySelector(".agency-grid");
    const $list = document.querySelector(".agency-list");
    $grid.style.display = "grid";
    $list.style.display = "none";
    console.log(subscribe_press.getAttribute("subscribetype"));

    if (Boolean(subscribe_press.getAttribute("subscribetype")) === true) {
      const subscribedAgencies = store.subscriptions.filter(
        (item) => item.subscribe
      );
      copyAgencies = subscribedAgencies.map((subscribeAgency) => {
        return copyAgencies.find(
          (agency) => agency.name === subscribeAgency.name
        );
      });
      const pages = sortPages(copyAgencies);
      setGridButton(pages);
      GridComponent(INITIAL_PAGE, pages);
    } else {
      const pages = sortPages(agencies);
      setGridButton(pages);
      GridComponent(INITIAL_PAGE, pages);
    }
  };

  // List 뷰 선택시
  const setList = () => {
    if (listBtn.getAttribute("viewtype") === null) {
      listBtn.setAttribute("viewtype", true);
      gridBtn.removeAttribute("viewtype");
    }
    removeButton();

    let currentPage = INITIAL_PAGE;
    let currentCategory = INITIAL_CATEGORY;

    const $grid = document.querySelector(".agency-grid");
    const $list = document.querySelector(".agency-list");
    $grid.style.display = "none";
    $list.style.display = "flex";

    // list view 생성
    const sortedAgencies = sortCategory(agencies);

    setListButton(sortedAgencies, currentPage, currentCategory);
    ListComponent(
      INITIAL_PAGE,
      sortedAgencies,
      FIELDTAB_LIST[currentCategory],
      currentCategory
    );
  };

  gridBtn.addEventListener("click", setGrid);
  listBtn.addEventListener("click", setList);

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
