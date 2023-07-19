import Component from "../core/Component.js";
import { shuffleNewsPress, updateSubscribeList } from "../utils/utils.js";
import PageButton from "../common/PageButton.js";
import SubscribeButton from "../common/SubscribeButton.js";

let MIN_PAGE = 0;
let MAX_PAGE = 3;

export default class NewsGridView extends Component {
    setup() {
        this.state = {
            pressData: shuffleNewsPress(this.props.newsData),
            subscribeList: this.props.subscribeList,
            page: 0,
        };

        MAX_PAGE =
            Math.floor(this.state.pressData.length / 24) === 0
                ? 0
                : Math.floor(this.state.pressData.length / 24) - 1;
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
            gridList += this.getGridCell(i);
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
        this.setState({
            page: this.state.page - 1,
            subscribeList: updateSubscribeList(
                this.state.pressData,
                this.state.subscribeList
            ),
        });
    }

    setNextPage() {
        this.setState({
            page: this.state.page + 1,
            subscribeList: updateSubscribeList(
                this.state.pressData,
                this.state.subscribeList
            ),
        });
    }

    isSubscribed(id) {
        return this.state.subscribeList.some((data) => data.id === Number(id));
    }

    getGridCell(i) {
        if (i > this.state.pressData.length - 1) {
            return `
                <li class="news-press-item"></li>
                `;
        } else {
            return `<li class="news-press-item" 
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
    }
}
