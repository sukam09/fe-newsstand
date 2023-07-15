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

    mounted() {
        const newsDisplayTab = this.$target.querySelector(
            ".news-press-tab-container"
        );

        new NewsDisplayTab(newsDisplayTab, {
            view: this.state.view,
            onClick: this.onClick.bind(this),
        });

        this.state.view === "grid"
            ? new NewsGridView(
                  this.$target.querySelector(".news-display-container")
              )
            : new NewsListView(
                  this.$target.querySelector(".news-display-container")
              );
    }

    onClick(viewMode) {
        currentViewMode = viewMode;
        this.setState({ view: currentViewMode });
    }
}
