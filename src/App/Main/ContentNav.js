/* 
Main 컴포넌트의 컨텐츠를 변경하는 네비게이션 컴포넌트
*/

import Component from "../../utils/Component.js";
import PressType from "../ContentNav/PressType.js";
import ViewerType from "../ContentNav/viewerType.js";

function ContentNav($target, props) {
  Component.call(this, $target, props);
}

Object.setPrototypeOf(ContentNav.prototype, Component.prototype);

ContentNav.prototype.template = function () {
  return `
  <div class="news-navbar_newspaper">
  </div>
  <div class="news-navbar_content">
  </div>
  `;
};

ContentNav.prototype.mounted = function () {
  const $pressBox = this.$el.querySelector(".news-navbar_newspaper");
  const $viewBox = this.$el.querySelector(".news-navbar_content");

  new PressType($pressBox, this.props);
  new ViewerType($viewBox, this.props);
};

export default ContentNav;
