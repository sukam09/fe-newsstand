import CategoriesParent from "./CategoriesParent.js";
import PressInfo from "./PressInfo.js";
import PressMain from "./PressMain.js";

export default class PressNews {
  constructor(pressData) {
    // super(pressData, 0);
    this.$wrapper = document.createElement("main");
    this.$wrapper.className = "press-news";
    this.page = 0;

    this.pressData = pressData;
    this.mainNews = this.pressData[this.page];
    //this.currentCategory = this.getCategoryName.call(new CategoriesParent());

    // this.filterData();
    this.nextPage();
    //return this.$wrapper;
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

  nextPage(page) {
    this.page = page;
    this.render();
  }

  // goNextNews() {
  //   // 현재 페이지 가져오기
  //   const currentPage = new CategoriesParent().categories[this.currentCategory]
  //     .currentPage;
  //   this.mainNews = this.pressData[currentPage - 1];
  //   this.render();
  // }

  // getCategoryName() {
  //   return Object.keys(this.categories)[this.currentCategory];
  // }

  // filterData() {
  //   this.pressData = this.pressData.filter(
  //     (v) => v["category"] === this.currentCategory
  //   );
  // }
}
// 각 카테고리 이름과 현재 페이지를 가져와서 바뀔때마다  mainNews 바꿔줌 -> render() 해주면
// render 인자로 mainNews 를 넘김
