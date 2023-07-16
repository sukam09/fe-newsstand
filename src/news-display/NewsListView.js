import Component from "../core/Component.js";
import PageButton from "./PageButton.js";

const categoryList = [
    "종합/경제",
    "방송/통신",
    "IT",
    "영자지",
    "스포츠/연예",
    "매거진/전문지",
    "지역",
];

export default class NewsListView extends Component {
    setup() {
        this.state = {
            currentCategoryIndex: 0,
            currentPage: 1,
            newsData: [],
        };

        this.state.newsData = this.getCategoryNewsData(
            this.state.currentCategoryIndex
        );
    }

    template() {
        const newsData = this.state.newsData[this.state.currentPage - 1];

        return `
            <div class="news-press-list-view">
                <nav
                    class="list-view-category-bar available-medium14"
                >
                    <ul></ul>
                </nav>
                <div class="list-view-main-container">
                    <div class="press-head-container">
                        <img src=${newsData.logo} alt=${newsData.name} />
                        <div class="edit-time display-medium12">
                            2023.10.04. 11:22 편집
                        </div>
                        <button class="subscribe-button available-medium12">
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.5 6.49902H6.5V9.49902H5.5V6.49902H2.5V5.49902H5.5V2.49902H6.5V5.49902H9.5V6.49902Z"
                                    fill="#879298"
                                />
                            </svg>
                            <div>구독하기</div>
                        </button>
                    </div>
                    <div class="articles-container available-medium16">
                        <div class="main-article">
                            <div class="main-image">
                                <img src=${
                                    newsData.mainArticle.thumbnail
                                } alt=${newsData.mainArticle.title} />
                            </div>
                            <div class="main-title">
                                ${newsData.mainArticle.title}
                            </div>
                        </div>
                        <div class="sub-articles">
                            <ul>
                                ${newsData.subArticles
                                    .map((el) => `<li>${el.title}</li>`)
                                    .join("")}
                            </ul>
                            <div class="press-description display-medium14">
                                ${
                                    newsData.name
                                } 언론사에서 직접 편집한 뉴스입니다.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button class="left-button"></button>
            <button class="right-button"></button>
        `;
    }

    mounted() {
        this.mountCategory();
        this.mountPageButton();
    }

    mountCategory() {
        const categoryBar = this.$target.querySelector(
            ".list-view-category-bar > ul"
        );

        const categoryBarList = categoryList.reduce(
            (accumulator, category, index) => {
                if (index === this.state.currentCategoryIndex) {
                    return (
                        accumulator +
                        `<li class="category-selected">
                            <div class="category-text">
                                ${category}
                            </div>
                            <div class="category-progress-number-container">
                                <div class="category-progress-number">
                                    ${this.state.currentPage}
                                </div>
                                <div>/</div>
                                <div class="category-total-number">${this.state.newsData.length}</div>
                            </div>
                        </li>`
                    );
                }
                return (
                    accumulator +
                    `<li class="category">
                        <div class="category-text">
                            ${category}
                        </div>
                    </li>`
                );
            },
            ""
        );

        categoryBar.innerHTML = categoryBarList;
    }

    mountPageButton() {
        const leftButton = this.$target.querySelector(".left-button");
        const rightButton = this.$target.querySelector(".right-button");

        new PageButton(leftButton, {
            type: "left",
            hidden: false,
            onClick: this.setPrevPage.bind(this),
        });
        new PageButton(rightButton, {
            type: "right",
            hidden: false,
            onClick: this.setNextPage.bind(this),
        });
    }

    setEvent() {
        this.$target.addEventListener("click", (e) => {
            if (
                e.target.classList.contains("category") ||
                e.target.classList.contains("category-text")
            ) {
                const currentCategoryIndex = categoryList.indexOf(
                    e.target.textContent.trim()
                );
                this.setState({
                    currentCategoryIndex: currentCategoryIndex,
                    currentPage: 1,
                    newsData: this.getCategoryNewsData(currentCategoryIndex),
                });
            }
        });
    }

    setPrevPage() {
        if (this.state.currentPage === 1) {
            if (this.state.currentCategoryIndex === 0) {
                const newsData = this.getCategoryNewsData(
                    categoryList.length - 1
                );
                this.setState({
                    currentCategoryIndex: categoryList.length - 1,
                    newsData: newsData,
                    currentPage: newsData.length,
                });
            } else {
                const newsData = this.getCategoryNewsData(
                    this.state.currentCategoryIndex - 1
                );
                this.setState({
                    currentCategoryIndex: this.state.currentCategoryIndex - 1,
                    currentPage: newsData.length,
                    newsData: newsData,
                });
            }
        } else {
            this.setState({
                currentPage: this.state.currentPage - 1,
            });
        }
    }

    setNextPage() {
        if (this.state.currentPage === this.state.newsData.length) {
            this.state.currentCategoryIndex + 1 === categoryList.length
                ? this.setState({
                      currentCategoryIndex: 0,
                      currentPage: 1,
                      newsData: this.getCategoryNewsData(0),
                  })
                : this.setState({
                      currentCategoryIndex: this.state.currentCategoryIndex + 1,
                      currentPage: 1,
                      newsData: this.getCategoryNewsData(
                          this.state.currentCategoryIndex + 1
                      ),
                  });
        } else {
            this.setState({
                currentPage: this.state.currentPage + 1,
            });
        }
    }

    getCategoryNewsData(currentCategoryIndex) {
        return this.props.newsData.filter(
            (item) => item.category === categoryList[currentCategoryIndex]
        );
    }
}
