import { SNACKBAR_DURATION } from "../../../constants/index.js";
import { store } from "../../../core/store.js";
import Icon from "../../common/Icon.js";

export default class SubButton {
  constructor(name) {
    this.$subButton = document.createElement("button");
    this.$plusIcon = new Icon({ name: "plus" });
    this.$text = document.createElement("span");
    this.$subButton.classList.add("pressInfo-subButton");

    this.$text.innerText = "구독하기";
    this.$subButton.appendChild(this.$plusIcon);
    this.$subButton.appendChild(this.$text);

    this.$subButton.addEventListener("click", () => {
      this.handleClickSubBtn(name);
    });

    return this.$subButton;
  }

  handleClickSubBtn(name) {
    const $gridWrapper = document.querySelector(".news-list-wrapper");
    const $listWrapper = document.querySelector(".list-container");
    const $snackBar = document.createElement("div");
    $snackBar.classList.add("snackBar-sub");
    $snackBar.innerText = "내가 구독한 언론사에 추가되었습니다.";
    if ($gridWrapper) $gridWrapper.appendChild($snackBar);
    if ($listWrapper) $listWrapper.appendChild($snackBar);

    store.press = [...store.press, name];

    setTimeout(() => {
      if ($gridWrapper) $gridWrapper.removeChild($snackBar);
      if ($listWrapper) $listWrapper.removeChild($snackBar);
    }, SNACKBAR_DURATION);
  }
}
