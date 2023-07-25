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
import { mainStore, GRID, LIST } from "../../store/MainStore.js";
import { FIRST_PAGE, gridStore, setPage } from "../../store/GridStore.js";

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

  let $div = document.createElement("div");
  $div.setAttribute("class", "snack-bar");
  $div.innerText = snackBarText;

  cancelAnimation();

  // } else {
  //   lastPage =
  //     props.pressType === "all" ? listViewData[this.state.category].length : 1;

  //   const listProps = {
  //     ...commonProps,
  //     lastPage: lastPage,
  //     category: this.state.category,
  //     setContentState: this.setState,
  //     setPressType: props.setPressType,
  //     timerArr: timerArr,
  //     indexArr: indexArr,
  //     data:
  //       props.pressType === "all"
  //         ? listViewData[this.state.category]
  //         : {
  //             ...pressData[store.myPressList[this.state.category]],
  //             pid: store.myPressList[this.state.category],
  //           },
  //   };

  //   // new NewsListView($section, listProps);
  // }
}

Object.setPrototypeOf(MainContent.prototype, Component.prototype);

MainContent.prototype.initState = function () {
  return { lastPage: 4 };
};

MainContent.prototype.template = function () {
  const mainState = mainStore.getState();

  if (mainState.viewType === GRID) {
    return `<ul class="newspaper__list"></ul>${createButtons()}`;
  } else {
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

MainContent.prototype.mounted = function () {
  const mainState = mainStore.getState();
  const directions = ["left", "right"];

  let callBacks;

  if (mainState.viewType === GRID) {
    const $ul = this.$el.querySelector("ul");
    new PressGridView($ul, {
      ...this.props,
      lastPage: this.state,
      setLastPage: this.setLastPage,
    });

    callBacks = [prevGirdpage, nextGridPage];
  } else {
    const $div = this.$el.querySelector("div");
    new NewsListView($div, { ...this.props });
    callBacks = [prevGirdpage, nextGridPage];
  }

  const buttons = this.$el.querySelectorAll(".page");
  buttons.forEach(($button, index) => {
    new Button($button, {
      ...this.props,
      direction: directions[index],
      lastPage: this.state.lastPage,
      onClick: callBacks[index],
    });
  });
};
export default MainContent;
