import newsStore from "../../store/news.js";
import { GRID, PAGINATION_UNIT } from "../../constant.js";
import { html } from "../../lib/jsx.js";
import { render } from "../../lib/render.js";
import { store, updateStoreId } from "../../store/state.js";
const SUBSCRIBE_ALERT_MESSAGE = {
    ALERT_MESSAGE: "구독해지하시겠습니까?",
    OK: "예, 해지합니다",
    CANCEL: "아니오",
};
const setProgressState = (state) => {
    const $progress = document.querySelector(".category--progress");
    if (!$progress)
        return;
    $progress.style.animationPlayState = state;
};
const Alert = ({ name, id }) => {
    const $template = html `
    <div class="alert popup">
      <div class="alert__content">
        <div><span class="alert__company"> ${name} </span>을(를)</div>
        <span>${SUBSCRIBE_ALERT_MESSAGE.ALERT_MESSAGE}</span>
      </div>
      <div class="alert__buttons">
        <button
          class="alert__button alert__button--unsubscribe"
          onClick=${() => {
        newsStore.postSubscribeById(id, false);
        if (store.filter === "subscribe") {
            updateStoreId();
        }
        if (store.filter === "subscribe" &&
            store.id.length % PAGINATION_UNIT === 0 &&
            store.type === GRID) {
            store.idx -= 1;
        }
        store.idx = store.id.length > 0 ? store.idx % store.id.length : 0;
        render();
    }}
        >
          ${SUBSCRIBE_ALERT_MESSAGE.OK}
        </button>
        <button
          class="alert__button alert__button--cancel"
          onClick=${() => {
        $template.remove();
        setProgressState("running");
    }}
        >
          ${SUBSCRIBE_ALERT_MESSAGE.CANCEL}
        </button>
      </div>
    </div>
  `;
    return $template;
};
const useAlert = ($parent, { name, id }) => {
    const $alert = Alert({ name, id });
    $parent.append($alert);
    setProgressState("paused");
};
export { useAlert };
