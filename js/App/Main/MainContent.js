/* 
메인 컨텐츠 컴포넌트
언론사, 기사를 보여주는 컴포넌트
props: mode, viewerType, pressType
state: lastPage, currentPage
*/
import Button from "./MainContent/Button.js";
import Newspaper from "./MainContent/Newspaper.js";
import News from "./MainContent/News.js";

let timerArr = [];

const cancelAnimation = () => {
  timerArr.forEach((timer) => {
    cancelAnimationFrame(timer);
  });
};

let indexArr = Array.from({ length: 4 }, (_, i) => i);

export default function MainContent($target, props) {
  this.state = { currentPage: 1, lastPage: 4, category: 0 };

  cancelAnimation();

  this.setState = (nextState) => {
    this.state = nextState;
    indexArr.sort(() => Math.random() - 0.5);
    this.render();
  };

  this.setCategory = (nextCategory) => {
    this.state = { ...this.state, category: nextCategory % 7 };
    indexArr.sort(() => Math.random() - 0.5);
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

    if (props.viewerType === "grid") {
      new Newspaper($section, {
        mode: props.mode,
        pressType: props.pressType,
        currentPage: this.state.currentPage,
      });
    } else {
      new News($section, {
        mode: props.mode,
        pressType: props.pressType,
        currentPage: this.state.currentPage,
        lastPage: this.state.lastPage,
        category: this.state.category,
        setContentState: this.setState,
        timerArr: timerArr,
        indexArr: indexArr,
      });
    }

    new Button($section, {
      mode: props.mode,
      direction: "left",
      ...this.state,
      onClick: this.setCurrentPage,
    });

    new Button($section, {
      mode: props.mode,
      direction: "right",
      ...this.state,
      onClick: this.setCurrentPage,
    });

    $target.appendChild($section);
  };

  this.render();
}
