/*
신문사 컨텐츠 컴포넌트
*/
import getRandomIndexArr from "../../api/getRandomIndexArr.js";
import findTargetChildNode from "../../api/findTargetChildNode.js";
import findTargetParentNode from "../../api/findTargetParentNode.js";
import { addPress, removePress, pressStore } from "../../store/PressStore.js";
import Component from "../../utils/Component.js";
import { mainStore, ALL, MY } from "../../store/MainStore.js";
import { gridStore } from "../../store/GridStore.js";

const TOTAL_PRESS_NUMBER = 96;
const GRID_PRESS_NUBER = 24;

const subscibeButtonInner = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none">
<path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99799H13V10.998H19V12.998Z" fill="#879298"/>
</svg>구독하기`;

const unsubscibeButtonInner = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
  <path d="M4.26699 9L3.66699 8.4L6.06699 6L3.66699 3.6L4.26699 3L6.66699 5.4L9.06699 3L9.66699 3.6L7.26699 6L9.66699 8.4L9.06699 9L6.66699 6.6L4.26699 9Z" fill="#879298"/>
  </svg>해지하기`;

const isSubscribed = (pressId) => {
  return pressStore.getState().pressArr.indexOf(pressId) > -1;
};
const createButtonHTML = function (pressId, mode) {
  const buttonInner = isSubscribed(pressId)
    ? unsubscibeButtonInner
    : subscibeButtonInner;

  return `
<button class="subscribe-btn" data-key=${pressId}>
${buttonInner}
</button>`;
};

const createNewspaperItem = function (index, mode) {
  const pressId = String(index);
  const button = createButtonHTML(pressId, mode);

  return `
    <li class=${index > -1 ? "newspaper__item" : "blank"}>
    ${
      index > -1
        ? `<img src="./assets/newspaper/${mode}/${
            Number(pressId) + 1
          }.png" alt=${"name"} />`
        : ""
    }
    ${index > -1 ? button : ""}
    </li>
    `;
};

const createPressList = function (page, pressArr, mode) {
  const nowPageIndexArr = pressArr.slice(
    (page - 1) * GRID_PRESS_NUBER,
    page * GRID_PRESS_NUBER
  );

  while (nowPageIndexArr.length < GRID_PRESS_NUBER) nowPageIndexArr.push(-1);

  const liArr = nowPageIndexArr.map((item) => createNewspaperItem(item, mode));
  let pressList = liArr.reduce((news, currentIndex) => news + currentIndex, "");

  return pressList;
};

const handleSubscriptionButtonClick = ({ currentTarget, target }) => {
  let $button;
  let newPress;
  const pressState = pressStore.getState().pressArr;

  if (currentTarget !== target) {
    $button = findTargetChildNode(target, "button");
    if (!$button) {
      $button = findTargetParentNode(target, "button");
    }

    if ($button.innerText === "구독하기") {
      $button.innerHTML = unsubscibeButtonInner;
      pressState.push($button.dataset.key);
    } else {
      $button.innerHTML = subscibeButtonInner;
      const index = pressState.indexOf($button.dataset.key);
      if (index > -1) {
        // only splice array when item is found
        pressState.splice(index, 1); // 2nd parameter means remove one item only
      }
      newPress = removePress(pressState);
    }

    pressStore.dispatch(newPress);
  }
};

function PressGridView($target, props) {
  const mainState = mainStore.getState();

  this.indexArr = undefined;
  this.prevState = undefined;
  this.prePage = undefined;

  if (mainState.pressType === ALL) {
    this.indexArr = getRandomIndexArr(TOTAL_PRESS_NUMBER);
    props.setLastPage(TOTAL_PRESS_NUMBER / GRID_PRESS_NUBER);
  } else {
    this.indexArr = pressStore.getState().pressArr;
    const nextLastPage = Math.ceil(
      this.indexArr.length / GRID_PRESS_NUBER + 0.5
    );
    props.setLastPage(nextLastPage);
  }

  Component.call(this, $target, props);
}

Object.setPrototypeOf(PressGridView.prototype, Component.prototype);

PressGridView.prototype.render = function () {
  if (
    this.prevState !== ALL ||
    mainStore.getState().pressType !== ALL ||
    this.prePage !== gridStore.getState().currentPage
  ) {
    // 구독시 깜빡임 제거
    this.prevState = mainStore.getState().pressType;
    this.prePage = gridStore.getState().currentPage;
    this.$el.innerHTML = this.template();
  }
};

PressGridView.prototype.template = function () {
  const gridState = gridStore.getState();

  return createPressList(gridState.currentPage, this.indexArr, this.props.mode);
};

PressGridView.prototype.setEvent = function () {
  this.$el.addEventListener("click", handleSubscriptionButtonClick);
};

export default PressGridView;
