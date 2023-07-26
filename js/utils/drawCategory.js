import { showListView } from "./makeListView.js";
import { store } from "../core/store.js";
import { getPage, getTabMode } from "../core/getter.js";
import { FIRST_PAGE_NUM } from "../constants/constants.js";

function handleClick(e) {
  const li_target = e.target.closest("li");
  if (li_target && li_target.classList.contains("category")) {
    const current = li_target.querySelector(".ctg").textContent.trim();
    store.setState({ page: FIRST_PAGE_NUM });
    showListView(current);
  }
}

function checkProgress(current) {
  const progress = document.getElementById("play-animation");
  if (progress) {
    progress.addEventListener("animationend", () => {
      const _order = getPage();
      store.setState({ page: _order + 1 });
      showListView(current);
    });
  }
}

function drawNext(contents) {
  if (getTabMode() === "all") {
    return `
    <div class="display-bold12 count">
      <span class=>${getPage()}</span>
      <span><svg xmlns="http://www.w3.org/2000/svg" width="5" height="12" viewBox="0 0 5 12" fill="none">
      <path d="M5 0.919922H3.5L0.769531 11.0801H2.25781L5 0.919922Z" fill="white" fill-opacity="0.7"/>
      </svg></span>
      <span class = "entire">${contents.length}</span>
    </div>`;
  } else {
    return `
    <div class="next">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M5.48341 10.5L4.66675 9.68333L7.35008 7L4.66675 4.31667L5.48341 3.5L8.98342 7L5.48341 10.5Z" fill="white"/>
      </svg>
    </div>
  `;
  }
}

//all일 때 list는 category, subscribe일 때에는 subscribedPress를 받음
export function drawCategory(current, list, contents) {
  const main_list = document.querySelector(".main-list");
  let list_content = "";
  //카테고리 그리는 부분
  list.forEach((element) => {
    list_content +=
      current === element
        ? `
      <li class="category selected">
        <div class="progress-bar" id="play-animation">
        </div>
        <div class="ctg-wrapper">
          <span class="selected-bold14 ctg">${element}</span>
          ${drawNext(contents)}
        </div>
      </li>`
        : `
        <li class="category">
          <div class="progress-bar">
          </div>
            <div class="ctg-wrapper">
              <span class="available-medium14 ctg">${element}</span>
            </div
        </li>`;
  });
  main_list.innerHTML = `<div class="field-tab"><ul>${list_content}</ul></div>`;

  const tabContainer = document.querySelector(".field-tab ul");
  const tabContent = document.querySelector(".category");

  // 클릭한 탭의 index를 구하고, 해당 위치를 기준으로 탭을 정렬
  const clickedTab = document.querySelector(".selected");
  const tabContainerWidth = tabContainer.offsetWidth;
  const tabContentWidth = tabContent.offsetWidth;
  const tabPosition = clickedTab.offsetLeft;
  const scrollLeft = Math.max(
    0,
    tabPosition + tabContentWidth / 2 - tabContainerWidth / 2
  );
  tabContainer.scrollTo({ left: scrollLeft, behavior: "smooth" });

  document.addEventListener("DOMContentLoaded", checkProgress(current));
  let isDragging = false;
  let startScrollX;
  let startClickX;

  tabContainer.addEventListener("mousedown", (e) => {
    const popups = document.querySelectorAll(".popup");
    popups.forEach((popup) => {
      popup.style.display = "none";
    });
    isDragging = true;
    startScrollX = e.pageX + tabContainer.scrollLeft;
    tabContent.style.cursor = "grabbing";
    startClickX = e.pageX;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const scrollX = startScrollX - e.pageX;
    tabContainer.scrollLeft = scrollX;
  });

  document.addEventListener("mouseup", (e) => {
    isDragging = false;
    tabContent.style.cursor = "grab";
    if (startClickX === e.pageX) {
      handleClick(e);
    }
  });
}
