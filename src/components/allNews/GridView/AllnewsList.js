import Icon from "../../common/Icon.js";
import Logo from "../../common/Logo.js";

export default class AllNewsList {
  constructor(name) {
    this.$component = document.createElement("li");

    this.render(name);

    this.$component.addEventListener("mouseenter", (e) =>
      this.showSubButton(e)
    );
    this.$component.addEventListener("mouseleave", (e) =>
      this.hideSubButton(e, name)
    );

    return this.$component;
  }

  render(name) {
    // const $logoImg = new Logo({ name });
    this.$component.appendChild(this.createLogoImage(name));
  }

  showSubButton(event) {
    const li = event.target;
    li.replaceChildren();
    li.appendChild(this.createSubscribeButton());
  }

  hideSubButton(event, name) {
    const li = event.target;
    li.replaceChildren();
    li.appendChild(this.createLogoImage(name));
  }

  /** 로고 이미지 요소 생성 */
  createLogoImage(name) {
    const $logoImg = new Logo({ name });
    return $logoImg;
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
