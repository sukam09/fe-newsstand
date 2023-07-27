/*
신문사 컨텐츠 컴포넌트
*/
import getRandomIndexArr from "../../api/getRandomIndexArr.js";
import findTargetChildNode from "../../api/findTargetChildNode.js";
import findTargetParentNode from "../../api/findTargetParentNode.js";
import { addPress, removePress, pressStore } from "../../store/PressStore.js";
import Component from "../../utils/Component.js";
import { mainStore, ALL, MY, GRID } from "../../store/MainStore.js";
import { gridStore } from "../../store/GridStore.js";
import Alert from "../Modal/Alert.js";

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

let handleSubscriptionButtonClick = function ({ currentTarget, target }) {
  let $button;
  let newPressArr;
  const pressState = pressStore.getState().pressArr;

  if (currentTarget !== target) {
    $button = findTargetChildNode(target, "button");
    if (!$button) {
      $button = findTargetParentNode(target, "button");
    }
  }

  if ($button.innerText === "구독하기") {
    $button.innerHTML = unsubscibeButtonInner;
    pressState.push($button.dataset.key);
    newPressArr = addPress(pressState);
    pressStore.dispatch(newPressArr);
  } else {
    new Alert(this.$el.parentNode, {
      ...this.props,
      id: $button.dataset.key,
    });
  }
};

function PressGridView($target, props) {
  this.init = true;

  if (mainStore.getState().pressType === ALL) {
    this.indexArr = getRandomIndexArr(TOTAL_PRESS_NUMBER);
  } else {
    this.indexArr = pressStore.getState().pressArr;
  }

  Component.call(this, $target, props);

  mainStore.subscribe(this.setUp);
  gridStore.subscribe(this.setUp);
}

Object.setPrototypeOf(PressGridView.prototype, Component.prototype);

PressGridView.prototype.template = function () {
  return createPressList(
    gridStore.getState().currentPage,
    this.indexArr,
    this.props.mode
  );
};

PressGridView.prototype.setEvent = function () {
  if (this.init) {
    this.$el.addEventListener(
      "click",
      handleSubscriptionButtonClick.bind(this)
    );

    this.init = false;
  }
};

PressGridView.prototype.mounted = function () {
  if (mainStore.getState().pressType === ALL) {
    pressStore.unsubscribe(this.setUp);
  } else {
    pressStore.subscribe(this.setUp);
  }
};

PressGridView.prototype.isRender = function () {
  return mainStore.getState().viewType === GRID;
};

export default PressGridView;
