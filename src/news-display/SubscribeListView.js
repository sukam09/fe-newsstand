import Component from "../core/Component.js";
import PageButton from "../common/PageButton.js";
import SubscribeButton from "../common/SubscribeButton.js";

const PROGRESS_DURATION = 20000;
const COLOR_IN_PROGRESS = "#4362d0";
const COLOR_PROGRESS_BACKGROUND = "#7890e7";

export default class SubscribeListView extends Component {
    setup() {
        this.state = {
            currentCategoryIndex: 0,
            currentPage: 1,
            subscribeList: this.props.subscribeList,
            pressData: this.props.newsData,
        };
    }

    template() {
        const newsData = this.state.pressData[this.state.currentPage - 1];

        return `
            <div class="news-press-list-view">
                <nav
                    class="list-view-category-bar available-medium14"
                >
                    <ul></ul>
                </nav>
                <div class="list-view-main-container">
                    <div class="press-head-container">
                        <img src=${newsData.logo} alt="${newsData.name}" />
                        <div class="edit-time display-medium12">
                            ${this.getEditTime(newsData.editTime)} 편집
                        </div>
                        <div class="subscribe-button-wrapper" data-id=${
                            newsData.id
                        } data-name=${newsData.name}></div>
                    </div>
                    <div class="articles-container available-medium16">
                        <div class="main-article">
                            <div class="main-image">
                                <img src=${
                                    newsData.mainArticle.thumbnail
                                } alt="${newsData.mainArticle.title}" />
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

        this.progressInterval();

        const subscribeButton = this.$target.querySelector(
            ".subscribe-button-wrapper"
        );
        new SubscribeButton(subscribeButton, {
            viewMode: "list",
            subscribed: this.isSubscribed(subscribeButton.dataset.id),
            pressName: subscribeButton.dataset.name,
            pressId: subscribeButton.dataset.id,
        });
    }

    mountCategory() {
        const categoryBar = this.$target.querySelector(
            ".list-view-category-bar > ul"
        );

        const categoryBarList = this.state.pressData.reduce(
            (accumulator, data, index) => {
                if (index === this.state.currentPage - 1) {
                    return (
                        accumulator +
                        `<li class="category-selected">
                            <div class="category-text selected-bold14">
                                ${data.name}
                            </div>
                            <div class="category-progress-number-container display-bold12">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.48341 10.5L4.66675 9.68333L7.35008 7L4.66675 4.31667L5.48341 3.5L8.98342 7L5.48341 10.5Z" fill="white"/>
                                </svg>                            
                            </div>
                        </li>`
                    );
                }
                return (
                    accumulator +
                    `<li class="category">
                        <div class="category-text">
                            ${data.name}
                        </div>
                    </li>`
                );
            },
            ""
        );

        categoryBar.innerHTML = categoryBarList;

        const categorySelected =
            this.$target.querySelector(".category-selected");
        categorySelected.scrollIntoView({ block: "end", behavior: "smooth" });
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
        this.$target.addEventListener("click", ({ target }) => {
            if (
                target.classList.contains("category") ||
                target.classList.contains("category-text")
            ) {
                const clickedIndex = this.state.pressData.findIndex(
                    (item) => item.name === target.textContent.trim()
                );

                this.setState({
                    currentPage: clickedIndex + 1,
                });
            }
        });
    }

    setPrevPage() {
        if (this.state.currentPage === 1) {
            this.setState({
                currentPage: this.state.pressData.length,
            });
        } else {
            this.setState({
                currentPage: this.state.currentPage - 1,
            });
        }
    }

    setNextPage() {
        if (this.state.currentPage === this.state.pressData.length) {
            this.setState({
                currentPage: 1,
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

    getEditTime(editTime) {
        const [datePart, timePart] = editTime.split(" ");
        const [year, month, day] = datePart.split("-");
        const [hours, minutes, _] = timePart.split(":");

        return `${year}.${month}.${day}. ${hours}:${minutes}`;
    }

    isSubscribed(id) {
        return this.state.subscribeList.some((data) => data.id === Number(id));
    }

    progressInterval() {
        clearInterval(this.interval);

        const activeCategory = this.$target.querySelector(".category-selected");

        let progress = 0;
        const increment = 100 / (PROGRESS_DURATION / 16);

        this.interval = setInterval(() => {
            if (progress < 100) {
                activeCategory.style.background = `linear-gradient(to right, 
                                                    ${COLOR_IN_PROGRESS} ${progress}%, 
                                                    ${COLOR_PROGRESS_BACKGROUND} 0%)`;
                progress += increment;
            } else {
                clearInterval(this.interval);
                this.setNextPage();
            }
        }, 16);
    }
}