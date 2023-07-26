import store from "../../../core/Store.js";
import Logo from "../../common/Logo.js";
import SubButton from "../Buttons/SubButton.js";
import UnsubButton from "../Buttons/UnsubButton.js";

export default class AllNewsList {
  constructor(name = -1) {
    this.$wrapper = document.createElement("li");

    if (name > 0) {
      this.render(name);

      this.$wrapper.addEventListener("mouseenter", () =>
        this.showSubButton(name)
      );
      this.$wrapper.addEventListener("mouseleave", () =>
        this.hideSubButton(name)
      );
    }
  }

  render(name) {
    this.$wrapper.appendChild(this.createLogoImage(name));
  }

  /** 구독 및 해지버튼 생성 */
  showSubButton(name) {
    this.$wrapper.replaceChildren();
    if (store.getState().includes(name)) {
      this.$wrapper.appendChild(new UnsubButton(name, "해지하기"));
    } else {
      this.$wrapper.appendChild(new SubButton(name));
    }
  }

  /** 구독 및 해지버튼 제거 */
  hideSubButton(name) {
    this.$wrapper.replaceChildren();
    this.$wrapper.appendChild(this.createLogoImage(name));
  }

  /** 로고 이미지 요소 생성 */
  createLogoImage(name) {
    const $logoImg = new Logo({ name });
    return $logoImg;
  }
}
