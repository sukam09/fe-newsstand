import PressImagesInfo from "./PressImagesInfo.js";
import PressTitles from "./PressTitles.js";

export default class PressMain {
  constructor() {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "press-main";

    this.render();

    return this.$wrapper;
  }

  render() {
    this.$wrapper.appendChild(
      new PressImagesInfo("https://picsum.photos/536/354", "예시 제목")
    );
    this.$wrapper.appendChild(new PressTitles());
  }
}
