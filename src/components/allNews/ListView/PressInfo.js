import Icon from "../../common/Icon.js";
import Logo from "../../common/Logo.js";

export default class PressInfo {
  constructor(name, date) {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "press-info";

    this.name = name;
    this.date = date;

    this.render();

    return this.$wrapper;
  }

  render() {
    this.$wrapper.appendChild(this.createPressLogo(this.name));
    this.$wrapper.appendChild(this.createEditDate(this.date));
    this.$wrapper.appendChild(this.createSubscribeButton());
  }

  /** 언론사 로고 요소 생성 */
  createPressLogo(name) {
    const $logoImg = new Logo({ name });
    $logoImg.classList.add("pressInfo-logo");

    return $logoImg;
  }

  /** 편집 날짜 요소 생성 */
  createEditDate(date) {
    const $dateText = document.createElement("span");
    $dateText.classList.add("pressInfo-date");

    $dateText.innerText = `${date} 편집`;

    return $dateText;
  }

  /** 구독 버튼 요소 생성 */
  createSubscribeButton() {
    const $subButton = document.createElement("button");
    const $plusIcon = new Icon({ name: "plus" });
    const $text = document.createElement("span");
    $subButton.classList.add("pressInfo-subButton");

    $text.innerText = "구독하기";
    $subButton.appendChild($plusIcon);
    $subButton.appendChild($text);

    return $subButton;
  }
}
