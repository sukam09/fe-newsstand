import PressInfo from "./PressInfo.js";
import PressMain from "./PressMain.js";

export default class PressNews {
  constructor() {
    this.$wrapper = document.createElement("main");
    this.$wrapper.className = "press-news";

    this.render();

    return this.$wrapper;
  }

  render() {
    this.$wrapper.appendChild(new PressInfo(0, "2023.02.10. 18:27"));
    this.$wrapper.appendChild(new PressMain());
  }
}
