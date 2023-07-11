/* 
메인 컨텐츠 컴포넌트
언론사, 기사를 보여주는 컴포넌트
*/
import Button from "./MainContent/Button.js";
import Newspaper from "./MainContent/Newspaper.js";
import News from "./MainContent/News.js";

export default function MainContent($target, props, onClick) {
  this.state = { lastPage: 4 };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const $section = document.createElement("section");
    $section.setAttribute("class", "news-section");

    new Newspaper($section, props);
    // new News($section, { page: props.page }, this.setState);

    new Button($section, { ...props, direction: "left" }, onClick);
    new Button(
      $section,
      { ...props, direction: "right", lastPage: this.state.lastPage },
      onClick
    );

    $target.appendChild($section);
  };

  this.render();
}
