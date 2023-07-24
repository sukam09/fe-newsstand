/* 
메인 컨텐츠 컴포넌트
그리드 뷰, 리스트 뷰를 보여주는 컴포넌트
*/
import getRandomIndexArr from "../../api/getRandomIndexArr.js";
import { fetchNews, fetchPress } from "../../api/fetchNews.js";
import Button from "../MainContent/Button.js";
import PressGridView from "../MainContent/PressGridView.js";
import NewsListView from "../MainContent/NewsListView.js";
import store from "../../store/Store.js";

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

export default function MainContent($target, props) {
  this.state = { currentPage: 1, category: 0 };

  let $section = document.querySelector(".news-section");
  let lastPage;

  let $div = document.createElement("div");
  $div.setAttribute("class", "snack-bar");
  $div.innerText = snackBarText;

  cancelAnimation();

  this.setState = (nextState) => {
    this.state = nextState;
    suffile(lastPage);
    this.render();
  };

  this.setCategory = (nextCategory) => {
    this.state = { ...this.state, category: nextCategory % 7 };
    suffile(lastPage);
    this.render();
  };

  this.setCurrentPage = (nextPage) => {
    this.state = { ...this.state, currentPage: nextPage };
    this.render();
  };

  this.setLastPage = (number) => {
    this.state = { ...this.state, lastPage: number };
    this.render();
  };

  this.render = () => {
    console.log(this.state.category);
    if ($section) {
      $target.removeChild($section);
    }

    $section = document.createElement("section");
    $section.setAttribute("class", "news-section");

    const commonProps = {
      mode: props.mode,
      pressType: props.pressType,
      currentPage: this.state.currentPage,
    };

    if (props.viewerType === "grid") {
      const gridProps = {
        ...commonProps,
      };

      lastPage =
        props.pressType === "all"
          ? parseInt(TOTAL_PRESS_NUMBER / GRID_PRESS_NUBER)
          : parseInt(store.myPressList.length / GRID_PRESS_NUBER + 1);

      new PressGridView($section, gridProps);
    } else {
      lastPage =
        props.pressType === "all"
          ? listViewData[this.state.category].length
          : 1;

      const listProps = {
        ...commonProps,
        lastPage: lastPage,
        category: this.state.category,
        setContentState: this.setState,
        setPressType: props.setPressType,
        timerArr: timerArr,
        indexArr: indexArr,
        data:
          props.pressType === "all"
            ? listViewData[this.state.category]
            : {
                ...pressData[store.myPressList[this.state.category]],
                pid: store.myPressList[this.state.category],
              },
      };

      new NewsListView($section, listProps);
    }

    const commonButtonProps = {
      ...this.state,
      mode: props.mode,
      viewerType: props.viewerType,
      lastPage: lastPage,
      onClick: this.setCurrentPage,
    };

    new Button($section, { ...commonButtonProps, direction: "left" });
    new Button($section, { ...commonButtonProps, direction: "right" });

    $section.appendChild($div);
    // $section.appendChild($alertDiv);
    $target.appendChild($section);
  };

  this.render();
}
