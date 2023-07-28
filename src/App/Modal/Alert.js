import Component from "../../utils/Component.js";
import { pressNews } from "../../store/ListStore.js";
import { mainStore, setPress, MY } from "../../store/MainStore.js";
import { pressStore, removePress } from "../../store/PressStore.js";

const okButtonInner = "예, 해지하겠습니다";
const cancelButtonInner = "아니오";

function Alert($target, props) {
  Component.call(this, $target, props);
}

Object.setPrototypeOf(Alert.prototype, Component.prototype);

Alert.prototype.template = function () {
  return `
    <div class="text-box"><strong>${
      pressNews[Number(this.props.id) + 1].name
    }</strong>을(를) <br>구독해지하시겠습니까?</div>
    <div style="display: flex">
        <button class="ok-btn">${okButtonInner}</button>
        <button class="cancel-btn">${cancelButtonInner}</button>
    </div>
    `;
};

Alert.prototype.render = function () {
  const $div = document.createElement("div");
  $div.setAttribute("class", "alert");
  $div.innerHTML = this.template();
  this.$el.appendChild($div);
};

Alert.prototype.setEvent = function () {
  let id = this.props.id;
  let $el = this.$el;

  const pressState = pressStore.getState().pressArr;
  const okBtn = this.$el.querySelector(".ok-btn");
  const cancelBtn = this.$el.querySelector(".cancel-btn");

  okBtn.addEventListener("click", () => {
    const index = pressState.indexOf(String(id));
    if (index > -1) {
      pressState.splice(index, 1);
    }
    const newPressArr = removePress(pressState);
    const newPressType = setPress(MY);

    pressStore.dispatch(newPressArr);
    mainStore.dispatch(newPressType);

    $el.removeChild($el.lastElementChild);
  });

  cancelBtn.addEventListener("click", () => {
    $el.removeChild($el.lastElementChild);
  });
};
export default Alert;
