/* 
Main 컴포넌트의 컨텐츠를 변경하는 네비게이션 컴포넌트
*/

import Component from "../../utils/Component.js";
import PressType from "../ContentNav/PressType.js";
import ViewerType from "../ContentNav/ViewerType.js";

function ContentNav($target, props) {
  Component.call(this, $target, props);
  this.$pressBox = undefined;
  this.$viewBox = undefined;
}

Object.setPrototypeOf(ContentNav.prototype, Component.prototype);

ContentNav.prototype.template = function () {
  return `
  <div class="news-navbar_newspaper"></div>
  <div class="news-navbar_content"></div>
  `;
};

ContentNav.prototype.mounted = function () {
  if (!this.$pressBox || !this.$viewBox) {
    this.$pressBox = this.$el.querySelector(".news-navbar_newspaper");
    this.$viewBox = this.$el.querySelector(".news-navbar_content");
  }

  new PressType(this.$pressBox, this.props);
  new ViewerType(this.$viewBox, this.props);
};

export default ContentNav;
