import Component from "../core/Component.js";
import { shuffleNewsPress } from "../utils/utils.js";
import PageButton from "../common/PageButton.js";

const MIN_PAGE = 0;
const MAX_PAGE = 3;

export default class NewsGridView extends Component {
    setup() {
        this.state = {
            pressData: shuffleNewsPress(this.props.newsData),
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
            gridList += `<li class="news-press-item">
                            <img class="news-press-item-logo" 
                                src=${this.state.pressData[i].logo} 
                                alt=${this.state.pressData[i].name} 
                            />
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
    }

    setPrevPage() {
        this.setState({ page: this.state.page - 1 });
    }

    setNextPage() {
        this.setState({ page: this.state.page + 1 });
    }
}
