import newsStore from "../../store/news.js";
import { html } from "../../lib/jsx.js";
import { render } from "../../lib/render.js";
import { useAlert } from "./Alert.js";
import { useSnackBar } from "./SnackBar.js";
const SUBSCRIBE_BUTTON_MESSAGE = {
    SUBSCRIBE: "구독하기",
    UNSUBSCRIBE: "해지하기",
};
const toggleSubscribe = (company) => {
    const isSubscribe = company.subscribe;
    if (isSubscribe) {
        const showAlert = useAlert(document.querySelector(".main__container"), {
            name: company.name,
            id: company.id,
        });
    }
    else {
        newsStore.postSubscribeById(company.id, true);
        render();
        const showSnackbar = useSnackBar(document.querySelector(".main__container"));
        showSnackbar();
    }
};
const SubscribeButton = ({ type, company, }) => {
    return company.subscribe
        ? html `
        <button
          class=${`subscribe__button subscribe__button--unsubscribe subscribe__button--${type}`}
          onClick=${toggleSubscribe.bind(null, company)}
        >
          <img
            src="/public/asset/icon/closed.svg"
            alt="closed-icon"
            class="icon-s"
          />
          ${type === "grid" && SUBSCRIBE_BUTTON_MESSAGE.UNSUBSCRIBE}
        </button>
      `
        : html `
        <button
          class="subscribe__button subscribe__button--subscribe"
          onClick=${toggleSubscribe.bind(null, company)}
        >
          <img
            src="/public/asset/icon/plus.svg"
            alt="plus-icon"
            class="icon-s"
          />
          ${SUBSCRIBE_BUTTON_MESSAGE.SUBSCRIBE}
        </button>
      `;
};
export default SubscribeButton;
