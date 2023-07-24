import { store } from "../../../core/store.js";
import Logo from "../../common/Logo.js";
import SubButton from "../SubButton.js";
import UnsubButton from "../UnsubButton.js";

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

  showSubButton(event, name) {
    const li = event.target;
    li.replaceChildren();
    if (store.press.includes(name)) {
      li.appendChild(new UnsubButton(name, "해지하기"));
    } else {
      li.appendChild(new SubButton(name));
    }
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
}
