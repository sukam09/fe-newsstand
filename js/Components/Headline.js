import Component from "../core/Component.js";
import HeadlineContent from "./HeadlineContent.js";
import { constants } from "../Data/constants.js";

export default class Headline extends Component {
  setup() {
    this.$state = {
      rollingData: [],
    };
    this.rollingStop = [false, false];
    this.getRollingData();
  }

  template() {
    return `
      <div class="headline__content"></div>
      <div class="headline__content"></div>
    `;
  }

  mounted() {
    const $headline__content =
      this.$target.querySelectorAll(".headline__content");

    new HeadlineContent($headline__content[0], {
      rollingData: this.$state.rollingData.slice(0, 5),
    });
    new HeadlineContent($headline__content[1], {
      rollingData: this.$state.rollingData.slice(5),
    });
    this.setRolling();
  }

  async getRollingData() {
    const rollingData = await fetch("./js/Data/RollingNews.json").then(
      (res) => {
        return res.json();
      }
    );

    this.setState({ rollingData: rollingData });
  }

  repeatRolling(rollingElement, index) {
    if (this.rollingStop[index]) return;

    rollingElement.style.transitionDuration =
      constants.ROLLING_TRANSITION_DURATION_MS + "ms";
    rollingElement.style.marginTop = "-16px";

    setTimeout(() => {
      rollingElement.removeAttribute("style");
      if (!rollingElement.firstElementChild) return;
      rollingElement.appendChild(rollingElement.firstElementChild);
    }, constants.ROLLING_TRANSITION_DURATION_MS);
  }

  setRollingEvent(rollingElement, index) {
    setTimeout(() => {
      setInterval(
        () => this.repeatRolling(rollingElement, index),
        constants.ROLLING_TIMING_MS
      );
    }, index * constants.ROLLING_DIFF_MS);
  }

  setRollingAndStop(rollingElement, index) {
    this.setRollingEvent(rollingElement, index);
    rollingElement.addEventListener(
      "mouseover",
      () => (this.rollingStop[index] = true)
    );
    rollingElement.addEventListener(
      "mouseout",
      () => (this.rollingStop[index] = false)
    );
  }

  setRolling() {
    const $rollingTarget = document.querySelectorAll(
      ".headline__content_rolling > ul"
    );
    $rollingTarget.forEach((elem, index) =>
      this.setRollingAndStop(elem, index)
    );
  }
}
