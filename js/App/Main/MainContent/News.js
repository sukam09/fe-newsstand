/*
기사 컨텐츠 컴포넌트
카테고리 변경시 MainContents의 lastPage변경
*/

import Nav from "./News/Nav.js";
import Contents from "./News/Contents.js";

export default function News($target, props, onClick) {
  this.state = { category: "1" };
  this.state = { mainContent: "newspaper", renderContent: "all", page: 0 };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const $div = document.createElement("div");
    $div.setAttribute("class", "news-container");

    new Nav(
      $div,
      {
        page: props.page,
        renderContent: props.renderContent,
        category: this.state.cahtegory,
      },
      onClick,
      this.setState
    );
    new Contents($div, props);

    $target.innerHtml = "";
    $target.appendChild($div);
  };

  this.render();
}
