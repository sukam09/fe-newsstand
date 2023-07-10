/* 
메인 컨텐츠 컴포넌트
언론사, 기사를 보여주는 컴포넌트
*/
import Button from "./MainContent/Button.js";
import Newspaper from "./MainContent/Newspaper.js";

export default function MainContent($target, props, onClick) {
  // this.state = mode;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const $section = document.createElement("section");
    $section.setAttribute("class", "news-section");

    new Newspaper($section, { page: props.page, mode: props.mode });
    // new News()
    new Button($section, { direction: "left", page: props.page }, onClick);
    new Button($section, { direction: "right", page: props.page }, onClick);

    $target.appendChild($section);
  };

  this.render();
}
