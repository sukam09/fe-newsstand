import pressName from "../../../constants/pressName.js";
import store from "../../../core/Store.js";
import Icon from "../../common/Icon.js";

export default class UnsubButton {
  constructor(pressId, text = "") {
    this.$subButton = document.createElement("button");
    this.$plusIcon = new Icon({ name: "x" });
    this.$text = document.createElement("span");
    this.$subButton.classList.add("pressInfo-subButton");

    this.$text.innerText = text;
    this.$subButton.appendChild(this.$plusIcon);
    if (text !== "") this.$subButton.appendChild(this.$text);

    this.$subButton.addEventListener("click", () =>
      this.handleClickUnsubBtn(pressId)
    );

    return this.$subButton;
  }

  handleClickUnsubBtn(pressId) {
    const $gridWrapper = document.querySelector(".news-list-wrapper");
    const $listWrapper = document.querySelector(".list-container");

    if ($gridWrapper) $gridWrapper.appendChild(this.createUnsubModal(pressId));
    if ($listWrapper) $listWrapper.appendChild(this.createUnsubModal(pressId));
  }

  createUnsubModal(pressId) {
    const $wrapper = document.createElement("div");
    const $infoText = document.createElement("div");
    const $buttonsDiv = document.createElement("div");
    $wrapper.className = "unsub-modal";
    $infoText.className = "unsub-modal__text";
    $buttonsDiv.className = "unsub-modal__buttons";
    $infoText.innerHTML = `<span>${
      pressName[pressId - 1][pressId]
    }</span>을(를) <br> 구독해지하시겠습니까?`;

    const $yesButton = document.createElement("button");
    const $noButton = document.createElement("button");
    $yesButton.innerText = "예, 해지합니다";
    $noButton.innerText = "아니오";

    $yesButton.addEventListener("click", () =>
      this.handleClickYesButton(pressId)
    );
    $noButton.addEventListener("click", this.removeModal);

    $buttonsDiv.append($yesButton, $noButton);
    $wrapper.append($infoText, $buttonsDiv);

    return $wrapper;
  }

  handleClickYesButton(pressId) {
    store.removeState(pressId);

    if (!store.showState.isShowGrid || store.showState.isShowAllPress) {
      this.removeModal();
    }
  }

  removeModal() {
    const $gridWrapper = document.querySelector(".news-list-wrapper");
    const $listWrapper = document.querySelector(".list-container");
    const $modal = document.querySelector(".unsub-modal");

    if ($gridWrapper) $gridWrapper.removeChild($modal);
    if ($listWrapper) $listWrapper.removeChild($modal);
  }
}
