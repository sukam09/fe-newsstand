import Component from "../core/Component.js";
import NewsBarItem from "./NewsBarItem.js";

export default class NewsBar extends Component {
    template() {
        return `
            <div class="news-bar-item">
                <div class="news-bar-rolling"></div>
            </div>
            <div class="news-bar-item">
                <div class="news-bar-rolling"></div>
            </div>
        `;
    }

    mounted() {
        const newsBarItems = this.$target.querySelectorAll(".news-bar-rolling");
        newsBarItems.forEach(async (item, index) => {
            const response = await fetch(
                `../data/news-bar-data-${index + 1}.json`
            );
            const jsonData = await response.json();

            new NewsBarItem(item, { index: index, data: jsonData });
        });
    }
}
