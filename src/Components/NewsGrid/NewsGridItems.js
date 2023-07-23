import Component from "../../core/Component.js";
import { constants } from "../../Data/constants.js";
import {
  setSubscribe,
  setUnSubscribe,
  subscribeStore,
} from "../../Store/subscribeStore.js";

export default class NewsGridItems extends Component {
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
                subscribeStore.getState().subscribe.indexOf(item.id) < 0
                  ? `<div class="card-back subscribeButton">
                  <img src="./assets/icons/SubscribeButtonWhite.svg" alt="subscribeButton" />
              </div>`
                  : `<div class="card-back unSubscribeButton">
                  <img src="./assets/icons/UnSubscribeButton.svg" alt="unSubscribeButton" />
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
          subscribeStore.dispatch(
            setSubscribe(this.$props.nowPageIndexArr[index].id)
          );
        } else {
          subscribeStore.dispatch(
            setUnSubscribe(this.$props.nowPageIndexArr[index].id)
          );
        }
        this.render();
      });
    });
  }
}
