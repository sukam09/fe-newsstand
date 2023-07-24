import pressName from "../../constants/pressName.js";
import { subscribedPress } from "../../core/store.js";
import Icon from "../common/Icon.js";

export default class UnsubButton {
  constructor(name, text = "") {
    this.$subButton = document.createElement("button");
    this.$plusIcon = new Icon({ name: "x" });
    this.$text = document.createElement("span");
    this.$subButton.classList.add("pressInfo-subButton");

    this.$text.innerText = text;
    this.$subButton.appendChild(this.$plusIcon);
    if (text !== "") this.$subButton.appendChild(this.$text);

    this.$subButton.addEventListener("click", () =>
      this.handleClickUnsubBtn(name)
    );

    return this.$subButton;
  }

  handleClickUnsubBtn(name) {
    const $gridWrapper = document.querySelector(".news-list-wrapper");
    const $listWrapper = document.querySelector(".list-container");

    if ($gridWrapper) $gridWrapper.appendChild(this.createUnsubModal(name));
    if ($listWrapper) $listWrapper.appendChild(this.createUnsubModal(name));
  }

  createUnsubModal(name) {
    const $wrapper = document.createElement("div");
    const $infoText = document.createElement("div");
    const $buttonsDiv = document.createElement("div");
    $wrapper.className = "unsub-modal";
    $infoText.className = "unsub-modal__text";
    $buttonsDiv.className = "unsub-modal__buttons";
    $infoText.innerHTML = `<span>${
      pressName[name - 1][name]
    }</span>을(를) <br> 구독해지하시겠습니까?`;

    const $yesButton = document.createElement("button");
    const $noButton = document.createElement("button");
    $yesButton.innerText = "예, 해지합니다";
    $noButton.innerText = "아니오";

    $yesButton.addEventListener("click", () => this.handleClickYesButton(name));
    $noButton.addEventListener("click", this.removeModal);

    $buttonsDiv.append($yesButton, $noButton);
    $wrapper.append($infoText, $buttonsDiv);

    return $wrapper;
  }

  handleClickYesButton(name) {
    subscribedPress.press = subscribedPress.press.filter((v) => v !== name);
    this.removeModal();
  }

  removeModal() {
    const $gridWrapper = document.querySelector(".news-list-wrapper");
    const $listWrapper = document.querySelector(".list-container");
    const $modal = document.querySelector(".unsub-modal");

    if ($gridWrapper) $gridWrapper.removeChild($modal);
    if ($listWrapper) $listWrapper.removeChild($modal);
  }
}
