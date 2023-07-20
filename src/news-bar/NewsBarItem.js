import Component from "../core/Component.js";

const ROLLING_DURATION = 5000;
const REMOVE_APPEND_DURATION = 1000;

export default class NewsBarItem extends Component {
    setup() {
        setTimeout(() => {
            this.startInterval();
        }, 1000 * this.props.index);
    }

    template() {
        return `
            <ul>
                ${this.props.data.reduce(
                    (html, item) =>
                        html +
                        `
                            <li>
                                <span class="display-bold14 news-bar-press">${item.press}</span>
                                <span class="available-medium14 news-bar-headline">${item.headline}</span>
                            </li>
                        `,
                    ""
                )}
            </ul>
        `;
    }

    setEvent() {
        this.$target.addEventListener("mouseenter", () => {
            clearInterval(this.interval);
        });

        this.$target.addEventListener("mouseleave", () => {
            this.startInterval();
        });
    }

    startInterval() {
        const rollingElement = this.$target.querySelector("ul");

        this.interval = setInterval(() => {
            rollingElement.style.transitionDuration = "500ms";
            rollingElement.style.marginTop = "-28px";

            setTimeout(() => {
                rollingElement.removeAttribute("style");
                rollingElement.appendChild(rollingElement.firstElementChild);
            }, REMOVE_APPEND_DURATION);
        }, ROLLING_DURATION);
    }
}
