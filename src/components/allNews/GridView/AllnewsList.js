import { SNACKBAR_DURATION } from "../../../constants/index.js";
import Icon from "../../common/Icon.js";
import Logo from "../../common/Logo.js";
import { createSubscribeButton } from "../SubscribeButton.js";

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
    this.$component.appendChild(this.createLogoImage(name));
  }

  showSubButton(event) {
    const li = event.target;
    li.replaceChildren();
    li.appendChild(createSubscribeButton());
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

  handleClickSubBtn(event) {
    const $gridWrapper = document.querySelector(".news-list-wrapper");
    const snackBar = `
      <div class="snackBar-sub">
        내가 구독한 언론사에 추가되었습니다.
      </div>
    `;
    $gridWrapper.innerHTML += snackBar;
    setTimeout(() => {
      $gridWrapper.removeChild(document.querySelector(".snackBar-sub"));
    }, SNACKBAR_DURATION);
  }
}
