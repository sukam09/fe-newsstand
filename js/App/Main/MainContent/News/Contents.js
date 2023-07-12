/* 
리스트 뷰  컨테이너 컴포넌트
*/

import Header from "./Contents/Header.js";
import News from "./Contents/News.js";

export default function Contents($target, props) {
  this.state = "light";

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const $section = document.createElement("section");

    $section.setAttribute("class", "list-content");

    new Header($section, { mode: props.mode });
    new News($section, props);

    $target.appendChild($section);
  };

  this.render();
}
