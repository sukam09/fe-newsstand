import Component from "../core/Component.js";
import { constants } from "../Data/constants.js";

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
                      ? item.lightSrc
                      : item.darkSrc
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
}
