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
    }

    onClick(viewMode) {
        currentViewMode = viewMode;
        this.setState({ view: currentViewMode });
    }
}
