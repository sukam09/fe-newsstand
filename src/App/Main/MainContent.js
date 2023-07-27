/* 
메인 컨텐츠 컴포넌트
그리드 뷰, 리스트 뷰를 보여주는 컴포넌트
*/
import getRandomIndexArr from "../../api/getRandomIndexArr.js";
import { fetchNews, fetchPress } from "../../api/fetchNews.js";
import Button from "../MainContent/Button.js";
import PressGridView from "../MainContent/PressGridView.js";
import NewsListView from "../MainContent/NewsListView.js";
import Component from "../../utils/Component.js";
import { mainStore, GRID, LIST, ALL, MY } from "../../store/MainStore.js";
import { FIRST_PAGE, gridStore, setPage } from "../../store/GridStore.js";
import { pressStore } from "../../store/PressStore.js";
import { listStore, setCategory, setListPage } from "../../store/ListStore.js";

const listViewData = await fetchNews();
const pressData = await fetchPress();
const TOTAL_PRESS_NUMBER = 96;
const GRID_PRESS_NUBER = 24;

let timerArr = [];

const snackBarText = "내가 구독한 언론사에 추가되었습니다.";
const cancelAnimation = () => {
  timerArr.forEach((timer) => {
    cancelAnimationFrame(timer);
  });
};

const $alertDiv = document.createElement("div");
$alertDiv.setAttribute("class", "alert");
const okButton = document.createElement("button");
const cancelButton = document.createElement("button");

okButton.innerHTML = "예, 해지합니다.";
cancelButton.innerHTML = "아니오";

$alertDiv.appendChild(document.createElement("div"));
$alertDiv.appendChild(okButton);
$alertDiv.appendChild(cancelButton);

const createButtons = function () {
  let buttonTemplate = "";
  const direction = ["left", "right"];

  buttonTemplate = direction.reduce((result, currentValue) => {
    return (
      result + `<button class="${currentValue}-button_content page"}></button>`
    );
  }, buttonTemplate);

  return buttonTemplate;
};

function MainContent($target, props) {
  this.setLastPage = (nextLastPage) => {
    this.state.lastPage = nextLastPage;
  };

  Component.call(this, $target, props);
  mainStore.subscribe(this.setUp);

  this.prevView = undefined;
  this.prevPress = undefined;

  let $div = document.createElement("div");
  $div.setAttribute("class", "snack-bar");
  $div.innerText = snackBarText;

  cancelAnimation();
}

Object.setPrototypeOf(MainContent.prototype, Component.prototype);

MainContent.prototype.template = function () {
  const mainState = mainStore.getState();

  if (mainState.viewType === GRID) {
    return `<ul class="newspaper__list"></ul>${createButtons()}`;
  } else if (mainState.viewType === LIST) {
    return `<div class="news-container"></div>${createButtons()}`;
  }
};

const prevGirdpage = () => {
  const currentPage = gridStore.getState().currentPage;
  let nextPage = currentPage - 1;
  const nextState = setPage(nextPage);
  gridStore.dispatch(nextState);
};

const nextGridPage = () => {
  const currentPage = gridStore.getState().currentPage;
  const nextState = setPage(currentPage + 1);
  gridStore.dispatch(nextState);
};

const prevListPage = () => {
  let lastCategory = 6;
  let action;

  const currentPage = listStore.getState().page;
  if (currentPage === FIRST_PAGE) {
    if (mainStore.getState().pressType === MY) {
      lastCategory = pressStore.getState().pressArr.length - 1;
    }

    action = setCategory(
      (listStore.getState().category + lastCategory) % (lastCategory + 1)
    );
  } else {
    action = setListPage(listStore.getState().page - 1);
  }

  listStore.dispatch(action);
};

const nextListPage = () => {
  let lastCategory = 6;
  let action;

  const currentPage = listStore.getState().page;
  if (currentPage === listStore.getState().lastPage) {
    let nextCategory;
    if (mainStore.getState().pressType === MY) {
      lastCategory = pressStore.getState().pressArr.length - 1;
    }

    action = setCategory(
      (listStore.getState().category + 1) % (lastCategory + 1)
    );
  } else {
    action = setListPage(listStore.getState().page + 1);
  }

  listStore.dispatch(action);
};
MainContent.prototype.mounted = function () {
  const mainState = mainStore.getState();
  const directions = ["left", "right"];
  let lastPage = undefined;

  let callBacks;

  if (mainState.viewType === GRID) {
    gridStore.observers.clear();

    const $ul = this.$el.querySelector("ul");

    lastPage =
      mainStore.getState().pressType === ALL
        ? TOTAL_PRESS_NUMBER / GRID_PRESS_NUBER
        : Math.ceil(
            pressStore.getState().pressArr.length / GRID_PRESS_NUBER + 0.5
          );

    new PressGridView($ul, {
      ...this.props,
    });

    callBacks = [prevGirdpage, nextGridPage];
  } else if (mainState.viewType === LIST) {
    const $div = this.$el.querySelector("div");
    listStore.observers.clear();

    new NewsListView($div, { ...this.props });

    callBacks = [prevListPage, nextListPage];
  }

  const buttons = this.$el.querySelectorAll(".page");
  buttons.forEach(($button, index) => {
    new Button($button, {
      ...this.props,
      direction: directions[index],
      lastPage: lastPage,
      onClick: callBacks[index],
    });
  });
};

MainContent.prototype.isRender = function () {
  return this.prevView !== mainStore.getState().viewType;
};

export default MainContent;
