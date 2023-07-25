import store from "../../../core/Store.js";
import Logo from "../../common/Logo.js";
import SubButton from "../Buttons/SubButton.js";
import UnsubButton from "../Buttons/UnsubButton.js";

export default class AllNewsList {
  constructor(name = -1) {
    this.$component = document.createElement("li");

    if (name > 0) {
      this.render(name);

      this.$component.addEventListener("mouseenter", (e) =>
        this.showSubButton(e, name)
      );
      this.$component.addEventListener("mouseleave", (e) =>
        this.hideSubButton(e, name)
      );
    }

    return this.$component;
  }

  render(name) {
    this.$component.appendChild(this.createLogoImage(name));
  }

  showSubButton({ target: li }, name) {
    li.replaceChildren();
    if (store.getState().includes(name)) {
      li.appendChild(new UnsubButton(name, "해지하기"));
    } else {
      li.appendChild(new SubButton(name));
    }
  }

  hideSubButton({ target: li }, name) {
    li.replaceChildren();
    li.appendChild(this.createLogoImage(name));
  }

  /** 로고 이미지 요소 생성 */
  createLogoImage(name) {
    const $logoImg = new Logo({ name });
    return $logoImg;
  }
}
