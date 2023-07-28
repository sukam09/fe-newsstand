/*
기사 컨텐츠 컴포넌트
카테고리 변경시 MainContents의 lastPage변경
*/

import CategoryNav from "../NewsListView/CategoryNav.js";
import Contents from "../NewsListView/Contents.js";
import getRandomIndexArr from "../../api/getRandomIndexArr.js";
import Component from "../../utils/Component.js";
import { LIST, mainStore } from "../../store/MainStore.js";
import { listStore } from "../../store/ListStore.js";

function NewsListView($target, props) {
  this.prevCategory = undefined;

  this.setLastCategory = (nextLastCategory) => {
    this.state.lastCategory = nextLastCategory;
  };

  Component.call(this, $target, props);
}

Object.setPrototypeOf(NewsListView.prototype, Component.prototype);

NewsListView.prototype.template = function () {
  return `
    <nav class="categoty-nav"></nav>
    <section class="list-content"></section>
    `;
};

NewsListView.prototype.mounted = function () {
  const $nav = this.$el.querySelector("nav");
  const $section = this.$el.querySelector("section");

  this.prevCategory = listStore.getState().category;
  new CategoryNav($nav, {
    ...this.props,
  });
  new Contents($section, { ...this.props });
};

NewsListView.prototype.isRender = function () {
  return (
    mainStore.getState().viewType === LIST &&
    this.prevCategory !== listStore.getState().category
  );
};

export default NewsListView;
