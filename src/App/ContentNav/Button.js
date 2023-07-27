/* 
메인 컨텐츠를 선택하는 버튼(전체/구독, 리스트 뷰/그리드를 선택 가능)
*/
import Component from "../../utils/Component.js";
import { SET_PRESS } from "../../store/MainStore.js";

const findTargetChildNode = (element, targetTagName) => {
  if (!element) {
    return null;
  }

  if (element.tagName === targetTagName) {
    return element;
  }

  return findTargetChildNode(element.firstElementChild, targetTagName);
};

function Button($target, props) {
  Component.call(this, $target, props);
}

Object.setPrototypeOf(Button.prototype, Component.prototype);

Button.prototype.template = function () {
  return this.props.inner;
};

Button.prototype.setEvent = function () {
  this.$el.addEventListener("click", this.props.onClick);
};

Button.prototype.mounted = function () {
  if (this.props.actionType === SET_PRESS) {
    this.$el.style.color = this.props.selected ? "#14212B" : "#879298";
    this.$el.style.fontWeight = this.props.selected ? 700 : 500;
  } else {
    const path = this.$el.querySelector("path");
    path.style.fill = this.props.selected ? "#4362D0" : "";
  }
};
export default Button;
