/* 
Main 컴포넌트의 컨텐츠를 변경하는 네비게이션 컴포넌트
*/

import SourceSwich from "./ContentNav/SourceSwich.js";
import SubscriptionSwitch from "./ContentNav/SubscriptionSwitch.js";

export default function ContentNav($target, props, onClick) {
  // this.state = mode;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const $nav = document.createElement("nav");
    $nav.setAttribute("class", "news-navbar");

    new SubscriptionSwitch($nav, props, onClick);
    new SourceSwich($nav, props, onClick);

    $target.appendChild($nav);
  };

  this.render();
}
