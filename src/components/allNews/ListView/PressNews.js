import mainNews from "../../../data/mainNews.js";
import PressInfo from "./PressInfo.js";
import PressMain from "./PressMain.js";

export default class PressNews {
  constructor() {
    this.$wrapper = document.createElement("main");
    this.$wrapper.className = "press-news";

    this.mainNews = mainNews[0].data[0];

    this.render();

    return this.$wrapper;
  }

  render() {
    this.$wrapper.appendChild(
      new PressInfo(this.mainNews.logoSrc, this.mainNews.editTime)
    );
    this.$wrapper.appendChild(
      new PressMain(
        this.mainNews.imgSrc,
        this.mainNews.name,
        this.mainNews.mainTitle,
        this.mainNews.subTitleList
      )
    );
  }
}
