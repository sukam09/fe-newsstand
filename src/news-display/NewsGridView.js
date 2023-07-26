import Component from "../core/Component.js";
import {
    filterSubscribeData,
    shuffleNewsPress,
    updateSubscribeList,
} from "../utils/utils.js";
import PageButton from "../common/PageButton.js";
import SubscribeButton from "../common/SubscribeButton.js";
import { addObserver, getState } from "../observer/observer.js";
import { subscribeDataState } from "../store/store.js";

const MIN_PAGE = 0;
let max_page = 3;

export default class NewsGridView extends Component {
    setup() {
        this.state = {
            pressData: shuffleNewsPress(this.props.newsData),
            subscribeList: this.props.subscribeList,
            page: 0,
        };
    }

    template() {
        max_page = this.getMaxPage();

        return `
            <ul class="news-press-grid-view"></ul>
            <button class="left-button"></button>
            <button class="right-button"></button>
        `;
    }

    mounted() {
        const leftButton = this.$target.querySelector(".left-button");
        const rightButton = this.$target.querySelector(".right-button");

        this.setGridView();
        addObserver(subscribeDataState, this.setGridView.bind(this));

        new PageButton(leftButton, {
            type: "left",
            hidden: this.state.page === MIN_PAGE,
            onClick: this.setPrevPage.bind(this),
        });
        new PageButton(rightButton, {
            type: "right",
            hidden: this.state.page === max_page,
            onClick: this.setNextPage.bind(this),
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
        const subscribeList = getState(subscribeDataState);
        return subscribeList.some((data) => data.id === Number(id));
    }

    setGridView() {
        const newsPressGrid = this.$target.querySelector(
            ".news-press-grid-view"
        );

        let gridList = "";
        for (
            let i = this.state.page * 24;
            i < 24 * (this.state.page + 1);
            i++
        ) {
            gridList += this.getGridCell(i);
        }

        newsPressGrid.innerHTML = gridList;

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

    getGridCell(i) {
        let pressData = [];
        if (this.props.pressTab === "all") pressData = this.state.pressData;
        else {
            const subscribeData = getState(subscribeDataState);
            pressData = filterSubscribeData(this.props.newsData, subscribeData);
        }

        if (i > pressData.length - 1) {
            return `
                <li class="news-press-item"></li>
                `;
        } else {
            return `<li class="news-press-item" 
                    data-id=${pressData[i].id} 
                    data-name=${pressData[i].name}
                    >
                    <div class="flip-card-container">
                        <div class="flip-front">
                            <img class="news-press-item-logo" 
                                src=${pressData[i].logo} 
                                alt="${pressData[i].name}"
                            />
                        </div>
                        <div class="flip-back">
                        </div>
                    </div>
                </li>`;
        }
    }

    getMaxPage() {
        let pressData = [];
        if (this.props.pressTab === "all") pressData = this.state.pressData;
        else {
            const subscribeData = getState(subscribeDataState);
            pressData = filterSubscribeData(this.props.newsData, subscribeData);
        }
        return Math.floor(pressData.length / 24) === 4
            ? 3
            : Math.floor(pressData.length / 24);
    }
}
