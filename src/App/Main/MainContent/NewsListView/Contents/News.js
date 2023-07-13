/* 
리스트 뉴스 컨테이너 컴포넌트
*/

import MainNews from "./News/MainNews.js";
import SubNews from "./News/SubNews.js";

export default function Contents($target, props) {
  this.render = () => {
    const $div = document.createElement("div");

    $div.setAttribute("class", "list-news");

    new MainNews($div, props.mainNewsData);
    new SubNews($div, props.subNewsData);

    $target.appendChild($div);
  };

  this.render();
}
