import Component from "../core/Component.js";

export default class NewsDisplayTab extends Component {
    template() {
        return `
            <div class="news-press-type-menu available-medium16">
                <div class="news-press-tab-all">
                    전체 언론사
                </div>
                <div class="news-press-tab-subscribe">내가 구독한 언론사</div>
            </div>
            <div class="news-press-view-menu">
                <button class="display-list-button">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 5V19H5V5H19ZM20.1 3H3.9C3.4 3 3 3.4 3 3.9V20.1C3 20.5 3.4 21 3.9 21H20.1C20.5 21 21 20.5 21 20.1V3.9C21 3.4 20.5 3 20.1 3ZM11 7H17V9H11V7ZM11 11H17V13H11V11ZM11 15H17V17H11V15ZM7 7H9V9H7V7ZM7 11H9V13H7V11ZM7 15H9V17H7V15Z"
                            fill="inherit"
                        />
                    </svg>
                </button>
                <button
                    class="display-grid-button display-active"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3 11V3H11V11H3ZM3 21V13H11V21H3ZM13 11V3H21V11H13ZM13 21V13H21V21H13ZM5 9H9V5H5V9ZM15 9H19V5H15V9ZM15 19H19V15H15V19ZM5 19H9V15H5V19Z"
                            fill="inherit"
                        />
                    </svg>
                </button>
            </div>
        `;
    }

    setEvent() {
        /* 그리드 or 리스트 */
        const listIcon = this.$target.querySelector(".display-list-button");
        const gridIcon = this.$target.querySelector(".display-grid-button");

        if (this.props.view === "list") {
            listIcon.classList.add("display-active");
            gridIcon.classList.remove("display-active");
        } else {
            listIcon.classList.remove("display-active");
            gridIcon.classList.add("display-active");
        }

        listIcon.addEventListener("click", () =>
            this.props.onClickView("list")
        );
        gridIcon.addEventListener("click", () =>
            this.props.onClickView("grid")
        );

        const allPressTab = this.$target.querySelector(".news-press-tab-all");
        const subscribeTab = this.$target.querySelector(
            ".news-press-tab-subscribe"
        );

        /* 전체 언론사 or 내가 구독한 언론사 */
        if (this.props.pressTab === "all") {
            allPressTab.classList.add("tab-active", "selected-bold16");
            subscribeTab.classList.remove("tab-active", "selected-bold16");
        } else {
            allPressTab.classList.remove("tab-active", "selected-bold16");
            subscribeTab.classList.add("tab-active", "selected-bold16");
        }

        allPressTab.addEventListener("click", () =>
            this.props.onClickTab("all")
        );
        subscribeTab.addEventListener("click", () =>
            this.props.onClickTab("subscribe")
        );
    }
}
