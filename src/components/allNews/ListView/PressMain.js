import PressImagesInfo from "./PressImagesInfo.js";
import PressTitles from "./PressTitles.js";

export default class PressMain {
  constructor(imgSrc, name, mainTitle, subTitleList) {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "press-main";

    this.imgSrc = imgSrc;
    this.name = name;
    this.mainTitle = mainTitle;
    this.subTitleList = subTitleList;
    this.render();

    return this.$wrapper;
  }

  render() {
    this.$wrapper.appendChild(new PressImagesInfo(this.imgSrc, this.mainTitle));
    this.$wrapper.appendChild(new PressTitles(this.name, this.subTitleList));
  }
}
