import Component from "../../utils/Component.js";

import { mainStore, setPress, MY } from "../../store/MainStore.js";

const snackBarInner = "내가 구독한 언론사에 추가되었습니다.";

function SnackBar($target, props) {
  Component.call(this, $target, props);
}

Object.setPrototypeOf(SnackBar.prototype, Component.prototype);

SnackBar.prototype.template = function () {
  return snackBarInner;
};

SnackBar.prototype.render = function () {
  const $div = document.createElement("div");
  $div.setAttribute("class", "snack-bar");
  $div.innerHTML = this.template();
  this.$el.appendChild($div);
};

SnackBar.prototype.mounted = function () {
  setTimeout(() => {
    let nextState = setPress(MY);
    mainStore.dispatch(nextState);
  }, 5000);
};

export default SnackBar;
