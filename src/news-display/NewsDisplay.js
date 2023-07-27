import { $app } from "../app.js";
import Alert from "../common/Alert.js";
import Component from "../core/Component.js";
import { addObserver, getState, setState } from "../observer/observer.js";
import {
    pressDataState,
    viewModeState,
    viewTypeState,
} from "../store/store.js";
import NewsDisplayTab from "./NewsDisplayTab.js";
import NewsGridView from "./NewsGridView.js";
import NewsListView from "./NewsListView.js";
import SubscribeListView from "./SubscribeListView.js";

export default class NewsDisplay extends Component {
    setup() {
        this.state = {
            pressData: getState(pressDataState),
        };
        addObserver(viewModeState, this.render.bind(this));
        addObserver(viewTypeState, this.render.bind(this));
    }

    template() {
        return `
            <div class="news-press-tab-container"></div>
            <div class="news-display-container"></div>
            <div class="news-modal-container">
                <div class="snack-bar-container display-medium16 hidden">내가 구독한 언론사에 추가되었습니다.</div>
                <div class="alert-container display-medium16 hidden"></div>
            </div> 
        `;
    }

    async mounted() {
        const newsDisplayTab = this.$target.querySelector(
            ".news-press-tab-container"
        );

        const subscribeList = [];
        this.mountSubscribe(this.state.pressData, subscribeList);

        const currentTabMode = getState(viewTypeState);
        const currentViewMode = getState(viewModeState);
        new NewsDisplayTab(newsDisplayTab, {
            pressTab: currentTabMode,
            view: currentViewMode,
            onClickView: this.onClickView.bind(this),
            onClickTab: this.onClickTab.bind(this),
        });

        if (currentTabMode === "all") {
            if (currentViewMode === "grid") {
                new NewsGridView(
                    this.$target.querySelector(".news-display-container"),
                    {
                        newsData: this.state.pressData,
                        subscribeList: subscribeList,
                        page: 0,
                        pressTab: currentTabMode,
                    }
                );
            } else {
                new NewsListView(
                    this.$target.querySelector(".news-display-container"),
                    {
                        newsData: this.state.pressData,
                        subscribeList: subscribeList,
                    }
                );
            }
        } else {
            if (currentViewMode === "grid") {
                new NewsGridView(
                    this.$target.querySelector(".news-display-container"),
                    {
                        newsData: this.state.pressData,
                        subscribeList: subscribeList,
                        page: 0,
                        pressTab: currentTabMode,
                    }
                );
            } else {
                new SubscribeListView(
                    this.$target.querySelector(".news-display-container"),
                    {
                        newsData: this.filterSubscribeData(
                            this.state.pressData,
                            subscribeList
                        ),
                        subscribeList: subscribeList,
                    }
                );
            }
        }

        const modal = $app.querySelector(".alert-container");
        new Alert(modal);
    }

    onClickView(viewMode) {
        setState(viewModeState, viewMode);
    }

    onClickTab(pressTab) {
        setState(viewTypeState, pressTab);
        if (pressTab === "all") setState(viewModeState, "grid");
        else setState(viewModeState, "list");
    }

    mountSubscribe(pressData, subscribeList) {
        if (localStorage.getItem("subscribeList") === null) {
            pressData.forEach((data) => {
                if (data.subscribed === true) {
                    subscribeList.push({ id: data.id, name: data.name });
                }
            });
            localStorage.setItem(
                "subscribeList",
                JSON.stringify(subscribeList)
            );
        } else {
            const localSubscribeList = JSON.parse(
                localStorage.getItem("subscribeList")
            );
            localSubscribeList.forEach((data) =>
                subscribeList.push({ id: data.id, name: data.name })
            );
        }
    }

    filterSubscribeData(pressData, subscribeList) {
        const filteredSubscribeData = [];

        subscribeList.forEach((subscription) => {
            const subscriptionId = subscription.id;
            const subscribedData = pressData.find(
                (data) => data.id === subscriptionId
            );

            if (subscribedData) {
                filteredSubscribeData.push(subscribedData);
            }
        });
        return filteredSubscribeData;
    }
}
