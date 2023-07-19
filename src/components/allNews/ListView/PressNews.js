import PressInfo from "./PressInfo.js";
import PressMain from "./PressMain.js";

export default class PressNews {
  constructor(pressData) {
    this.$wrapper = document.createElement("main");
    this.$wrapper.className = "press-news";
    this.page = 0;

    this.pressData = pressData;
    this.mainNews = this.pressData[this.page];

    this.render();
  }

  render() {
    this.$wrapper.replaceChildren();

    this.$wrapper.appendChild(
      new PressInfo(this.mainNews.logo, this.mainNews.editTime)
    );
    this.$wrapper.appendChild(
      new PressMain(
        this.mainNews.mainArticle.thumbnail,
        this.mainNews.name,
        this.mainNews.mainArticle.title,
        this.mainNews.subArticles
      )
    );
  }

  goNextPage(page) {
    this.page = page;
    this.mainNews = this.pressData[this.page];
    // console.log(this.mainNews);
    this.render();
  }
}
