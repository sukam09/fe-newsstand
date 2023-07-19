import Component from "../core/Component.js";
import RollingItem from "./RollingItem.js";

export default class HeadlineContent extends Component {
  template() {
    return `
      <div class="headline__content__newspaper">연합뉴스</div>
      <div class="headline__content_rolling">
        <ul>
        </ul>
      </div>
    `;
  }

  mounted() {
    const $ul = this.$target.querySelector(".headline__content_rolling > ul");

    new RollingItem($ul, {
      data: this.$props.rollingData,
    });
  }
}
