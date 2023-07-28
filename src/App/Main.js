/**
 * 메인 컨튼츠의 컨테이너 컴포넌트
 */
import Component from "../utils/Component.js";
import ContentNav from "./Main/ContentNav.js";
import MainContent from "./Main/MainContent.js";

function Main($target, props) {
  Component.call(this, $target, props);
}

Object.setPrototypeOf(Main.prototype, Component.prototype);

Main.prototype.template = function () {
  return `
  <nav class="news-navbar"></nav>
  <section class="news-section"></section>
  `;
};

Main.prototype.mounted = function () {
  const $nav = this.$el.querySelector("nav");
  const $section = this.$el.querySelector("section");

  new ContentNav($nav, this.props);
  new MainContent($section, this.props);
};

export default Main;
