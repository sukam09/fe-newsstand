import Component from "../../core/Component.js";

export default class RollingItem extends Component {
  template() {
    return this.$props.data.reduce((acc, item) => {
      return (
        acc +
        `<li>
          <span class="headline__content__title">
            ${item.title}
          </span>
        </li>`
      );
    }, "");
  }
}
