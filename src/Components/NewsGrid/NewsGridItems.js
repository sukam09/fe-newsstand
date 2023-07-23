import Component from "../../core/Component.js";
import { constants } from "../../Data/constants.js";

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
              <div class="card-back">
                  <img src="./assets/icons/SubscribeButtonWhite.svg" alt="subscribeButton" />
              </div>
            </div>
          </li>
        `
      )
      .join(" ");
  }

  mounted() {
    const $newspaperSubscribe = this.$target.querySelectorAll(".card-back");

    $newspaperSubscribe.forEach((item, index) => {
      item.addEventListener("click", () =>
        console.log(this.$props.nowPageIndexArr[index])
      );
    });
  }
}
