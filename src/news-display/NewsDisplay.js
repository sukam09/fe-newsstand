import { $app } from "../app.js";
import Alert from "../common/Alert.js";
import Component from "../core/Component.js";
import NewsDisplayTab from "./NewsDisplayTab.js";
import NewsGridView from "./NewsGridView.js";
import NewsListView from "./NewsListView.js";

let currentPressTab = "all";
let currentViewMode = "grid";

export default class NewsDisplay extends Component {
    setup() {
        this.state = { pressTab: currentPressTab, view: currentViewMode };
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

        const response = await fetch(`../data/press-data.json`);
        const jsonData = await response.json();

        const subscribeList = [];
        this.mountSubscribe(jsonData, subscribeList);

        new NewsDisplayTab(newsDisplayTab, {
            pressTab: this.state.pressTab,
            view: this.state.view,
            onClickView: this.onClickView.bind(this),
            onClickTab: this.onClickTab.bind(this),
        });

        // this.state.view === "grid"
        //     ? new NewsGridView(
        //           this.$target.querySelector(".news-display-container"),
        //           { newsData: jsonData, subscribeList: subscribeList, page: 0 }
        //       )
        //     : new NewsListView(
        //           this.$target.querySelector(".news-display-container"),
        //           { newsData: jsonData, subscribeList: subscribeList }
        //       );
        // this.filterSubscribeData(jsonData, subscribeList);
        if (this.state.pressTab === "all") {
            if (this.state.view === "grid") {
                new NewsGridView(
                    this.$target.querySelector(".news-display-container"),
                    {
                        newsData: jsonData,
                        subscribeList: subscribeList,
                        page: 0,
                    }
                );
            } else {
                new NewsListView(
                    this.$target.querySelector(".news-display-container"),
                    { newsData: jsonData, subscribeList: subscribeList }
                );
            }
        } else {
            if (this.state.view === "grid") {
                new NewsGridView(
                    this.$target.querySelector(".news-display-container"),
                    {
                        newsData: this.filterSubscribeData(
                            jsonData,
                            subscribeList
                        ),
                        subscribeList: subscribeList,
                        page: 0,
                    }
                );
            } else {
                new NewsListView(
                    this.$target.querySelector(".news-display-container"),
                    {
                        newsData: this.filterSubscribeData(
                            jsonData,
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
        currentViewMode = viewMode;
        this.setState({ view: currentViewMode });
    }

    onClickTab(pressTab) {
        currentPressTab = pressTab;
        this.setState({ pressTab: currentPressTab });
    }

    mountSubscribe(jsonData, subscribeList) {
        if (localStorage.getItem("subscribeList") === null) {
            jsonData.forEach((data) => {
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

    filterSubscribeData(jsonData, subscribeList) {
        const filteredSubscribeData = [];

        subscribeList.forEach((subscription) => {
            const subscriptionId = subscription.id;
            const subscribedData = jsonData.find(
                (data) => data.id === subscriptionId
            );

            if (subscribedData) {
                filteredSubscribeData.push(subscribedData);
            }
        });
        return filteredSubscribeData;
    }
}
