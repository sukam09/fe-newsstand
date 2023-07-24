import Component from "../../core/Component.js";
import { constants } from "../../Data/constants.js";

export default class NewsGridItems extends Component {
  setEvent() {
    this.$props.SubscribeStore.subscribe(() => this.render());
  }

  template() {
    return this.$props.nowPageIndexArr
      .map(
        (item) => `
          <li class="newspaper__item">
            <div class="newspaper__item__card">
              <div class="card-front">
                <img
                  src=${
                    this.$props.mode === constants.LIGHT_MODE
                      ? item.path
                      : item.path_dark
                  }
                  alt=${item.name}
                />
              </div>
              ${
                this.$props.SubscribeStore.subscribeList.filter(
                  (elem) => elem.id === item.id
                ).length === 0
                  ? `<div class="card-back subscribeButton">
                  <img src="./assets/icons/SubscribeButton_Grid.svg" alt="subscribeButton" />
              </div>`
                  : `<div class="card-back unSubscribeButton">
                  <img src="./assets/icons/UnSubscribeButton_Grid.svg" alt="unSubscribeButton" />
              </div>`
              }
            </div>
          </li>
        `
      )
      .join(" ");
  }

  mounted() {
    const $newspaperSubscribe = this.$target.querySelectorAll(".card-back");

    $newspaperSubscribe.forEach((item, index) => {
      item.addEventListener("click", () => {
        if (item.classList.contains("subscribeButton")) {
          this.$props.SubscribeStore.subscribeNews(
            this.$props.nowPageIndexArr[index]
          );
        } else {
          this.$props.SubscribeStore.unSubscribeNews(
            this.$props.nowPageIndexArr[index]
          );
        }
      });
    });
  }
}
