import Component from "../core/Component.js";
import { shuffleNewsPress } from "../utils/utils.js";
import PageButton from "../common/PageButton.js";
import SubscribeButton from "../common/SubscribeButton.js";

const MIN_PAGE = 0;
const MAX_PAGE = 3;

export default class NewsGridView extends Component {
    setup() {
        this.state = {
            pressData: shuffleNewsPress(this.props.newsData),
            subscribeList: this.props.subscribeList,
            page: 0,
        };
    }

    template() {
        return `
            <ul class="news-press-grid-view"></ul>
            <button class="left-button"></button>
            <button class="right-button"></button>
        `;
    }

    mounted() {
        const newsPressGrid = this.$target.querySelector(
            ".news-press-grid-view"
        );
        const leftButton = this.$target.querySelector(".left-button");
        const rightButton = this.$target.querySelector(".right-button");

        let gridList = "";
        for (
            let i = this.state.page * 24;
            i < 24 * (this.state.page + 1);
            i++
        ) {
            gridList += `<li class="news-press-item" 
                            data-id=${this.state.pressData[i].id} 
                            data-name=${this.state.pressData[i].name}
                            >
                            <div class="flip-card-container">
                                <div class="flip-front">
                                    <img class="news-press-item-logo" 
                                        src=${this.state.pressData[i].logo} 
                                        alt="${this.state.pressData[i].name}"
                                    />
                                </div>
                                <div class="flip-back">
                                </div>
                            </div>
                        </li>`;
        }

        newsPressGrid.innerHTML = gridList;

        new PageButton(leftButton, {
            type: "left",
            hidden: this.state.page === MIN_PAGE,
            onClick: this.setPrevPage.bind(this),
        });
        new PageButton(rightButton, {
            type: "right",
            hidden: this.state.page === MAX_PAGE,
            onClick: this.setNextPage.bind(this),
        });

        const subscribeButtons = this.$target.querySelectorAll(".flip-back");
        subscribeButtons.forEach((item) => {
            // console.log(item.parentNode.parentNode.dataset.id);
            new SubscribeButton(item, {
                viewMode: "grid",
                subscribed: this.isSubscribed(
                    item.parentNode.parentNode.dataset.id
                ),
                pressName: item.parentNode.parentNode.dataset.name,
                pressId: item.parentNode.parentNode.dataset.id,
            });
        });
    }

    setPrevPage() {
        this.setState({ page: this.state.page - 1 });
    }

    setNextPage() {
        this.setState({ page: this.state.page + 1 });
    }

    isSubscribed(id) {
        return this.state.subscribeList.some((data) => data.id === Number(id));
    }
}
