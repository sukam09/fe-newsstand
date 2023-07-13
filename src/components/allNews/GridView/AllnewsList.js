import Logo from "../../common/Logo.js";

export default class AllNewsList {
  constructor(name) {
    this.$component = document.createElement("li");

    this.render(name);
    return this.$component;
  }

  render(name) {
    const $logoImg = new Logo({ name });
    this.$component.appendChild($logoImg);
  }
}
