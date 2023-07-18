/* 
메인 컨텐츠 컴포넌트
그리드 뷰, 리스트 뷰를 보여주는 컴포넌트
*/
import getRandomIndexArr from "../../api/getRandomIndexArr.js";
import Button from "./MainContent/Button.js";
import PressGridView from "./MainContent/PressGridView.js";
import NewsListView from "./MainContent/NewsListView.js";

let timerArr = [];
let indexArr = getRandomIndexArr(4);

const cancelAnimation = () => {
  timerArr.forEach((timer) => {
    cancelAnimationFrame(timer);
  });
};

const suffile = (len) => {
  indexArr = Array.from({ length: len }, (_, i) => i);
  indexArr.sort(() => Math.random() - 0.5);
};

export default function MainContent($target, props) {
  this.state = { currentPage: 1, lastPage: 4, category: 0 };

  cancelAnimation();

  this.setState = (nextState) => {
    this.state = nextState;
    suffile(this.state.lastPage);
    this.render();
  };

  this.setCategory = (nextCategory) => {
    this.state = { ...this.state, category: nextCategory % 7 };
    suffile(this.state.lastPage);
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
    let $section = document.querySelector(".news-section");

    if ($section) {
      $target.removeChild($section);
    }

    $section = document.createElement("section");
    $section.setAttribute("class", "news-section");

    const commonProps = {
      mode: props.mode,
      store: props.store,
      currentPage: this.state.currentPage,
    };

    if (props.viewerType === "grid") {
      const gridProps = {
        ...commonProps,
      };

      new PressGridView($section, gridProps);
    } else {
      const listProps = {
        ...commonProps,
        lastPage: this.state.lastPage,
        category: this.state.category,
        setContentState: this.setState,
        timerArr: timerArr,
        indexArr: indexArr,
      };

      new NewsListView($section, listProps);
    }

    const commonButtonProps = {
      mode: props.mode,
      viewerType: props.viewerType,
      ...this.state,
      onClick: this.setCurrentPage,
    };

    new Button($section, { ...commonButtonProps, direction: "left" });
    new Button($section, { ...commonButtonProps, direction: "right" });

    $target.appendChild($section);
  };

  this.render();
}
