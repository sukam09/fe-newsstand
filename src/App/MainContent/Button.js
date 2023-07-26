/*
메인 컨텐츠 페이지 전환 버튼
*/
import Component from "../../utils/Component.js";
import { mainStore, GRID } from "../../store/MainStore.js";
import { gridStore, FIRST_PAGE } from "../../store/GridStore.js";

const FIRST_PAGE_NUMBER = 1;
const leftButtonInner = `<svg
xmlns="http://www.w3.org/2000/svg"
width="26"
height="42"
viewBox="0 0 26 42"
fill="none"
>
<path d="M25 1L1 21L25 41" stroke="#6E8091" />
</svg>`;

const rightButtonInner = `<svg
xmlns="http://www.w3.org/2000/svg"
width="26"
height="42"
viewBox="0 0 26 42"
fill="none"
>
<path d="M1 41L25 21L1 1" stroke="#6E8091" />
</svg>`;

const buttonInner = { left: leftButtonInner, right: rightButtonInner };

function Button($target, props) {
  Component.call(this, $target, props);
  if (mainStore.getState().viewType === GRID) {
    gridStore.subscribe(this.setUp);
  }
}

Object.setPrototypeOf(Button.prototype, Component.prototype);

Button.prototype.template = function () {
  return buttonInner[this.props.direction];
};

Button.prototype.setEvent = function () {
  this.$el.addEventListener("click", this.props.onClick);
};

Button.prototype.mounted = function () {
  if (mainStore.getState().viewType === GRID) {
    let style;
    if (this.props.direction === "left") {
      style =
        gridStore.getState().currentPage === FIRST_PAGE ? "none" : "block";
    } else {
      style =
        gridStore.getState().currentPage === this.props.lastPage
          ? "none"
          : "block";
    }

    this.$el.style.display = style;
  }
};
export default Button;
