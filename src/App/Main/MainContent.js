/* 
메인 컨텐츠 컴포넌트
그리드 뷰, 리스트 뷰를 보여주는 컴포넌트
*/
import getRandomIndexArr from "../../api/getRandomIndexArr.js";
import { fetchNews, fetchPress } from "../../api/fetchNews.js";
import Button from "../MainContent/Button.js";
import PressGridView from "../MainContent/PressGridView.js";
import NewsListView from "../MainContent/NewsListView.js";
import store from "../../store/PressStore.js";
import Component from "../../utils/Component.js";
import { mainStore, GRID, LIST } from "../../store/MainStore.js";

const listViewData = await fetchNews();
const pressData = await fetchPress();
const TOTAL_PRESS_NUMBER = 96;
const GRID_PRESS_NUBER = 24;

let timerArr = [];
let indexArr = getRandomIndexArr(4);

const snackBarText = "내가 구독한 언론사에 추가되었습니다.";
const cancelAnimation = () => {
  timerArr.forEach((timer) => {
    cancelAnimationFrame(timer);
  });
};

const suffile = (len) => {
  indexArr = Array.from({ length: len }, (_, i) => i);
  indexArr.sort(() => Math.random() - 0.5);
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
    return result + `<button class="${currentValue}-button_content"}></button>`;
  }, buttonTemplate);

  return buttonTemplate;
};

function MainContent($target, props) {
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

  // const commonButtonProps = {
  //   ...this.state,
  //   mode: props.mode,
  //   viewerType: props.viewerType,
  //   lastPage: lastPage,
  //   onClick: this.setCurrentPage,
  // };

  // // new Button($section, { ...commonButtonProps, direction: "left" });
  // new Button($section, { ...commonButtonProps, direction: "right" });

  // $section.appendChild($div);
  // $section.appendChild($alertDiv);
  // $target.appendChild($section);
}

Object.setPrototypeOf(MainContent.prototype, Component.prototype);

MainContent.prototype.template = function () {
  const mainState = mainStore.getState();

  if (mainState.viewType === GRID) {
    return `<ul class="newspaper__list"></ul>${createButtons()}`;
  } else {
    return `<div class="news-container"></div>${createButtons()}`;
  }
};

MainContent.prototype.mounted = function () {
  const mainState = mainStore.getState();

  if (mainState.viewType === GRID) {
    const $ul = this.$el.querySelector("ul");
    new PressGridView($ul, this.props);
  } else {
    const $div = this.$el.querySelector("div");
  }
};
export default MainContent;
