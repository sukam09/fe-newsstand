/*
기사 컨텐츠 컴포넌트
카테고리 변경시 MainContents의 lastPage변경
*/

import Nav from "./News/Nav.js";
import Contents from "./News/Contents.js";

export default function News($target, props, onClick) {
  this.state = {
    category: "1",
    mainContent: "newspaper",
    renderContent: "all",
    page: props.page,
  };

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
        page: this.state.page,
        renderContent: props.renderContent,
        category: this.state.category,
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
