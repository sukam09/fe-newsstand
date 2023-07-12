/* 
리스트 뉴스 컨테이너 컴포넌트
*/

import Left from "./News/Left.js";
import Right from "./News/Right.js";

export default function Contents($target, props) {
  this.state = "light";

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const $div = document.createElement("div");

    $div.setAttribute("class", "list-news");

    new Left($div, props);
    new Right($div, props);

    $target.appendChild($div);
  };

  this.render();
}
