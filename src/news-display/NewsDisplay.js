import { $app } from "../app.js";
import Alert from "../common/Alert.js";
import Component from "../core/Component.js";
import NewsDisplayTab from "./NewsDisplayTab.js";
import NewsGridView from "./NewsGridView.js";
import NewsListView from "./NewsListView.js";

let currentViewMode = "grid";

export default class NewsDisplay extends Component {
    setup() {
        this.state = { view: currentViewMode };
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

        new NewsDisplayTab(newsDisplayTab, {
            view: this.state.view,
            onClick: this.onClick.bind(this),
        });

        this.state.view === "grid"
            ? new NewsGridView(
                  this.$target.querySelector(".news-display-container"),
                  { newsData: jsonData, page: 0 }
              )
            : new NewsListView(
                  this.$target.querySelector(".news-display-container"),
                  { newsData: jsonData }
              );

        const modal = $app.querySelector(".alert-container");
        new Alert(modal);
    }

    onClick(viewMode) {
        currentViewMode = viewMode;
        this.setState({ view: currentViewMode });
    }
}
