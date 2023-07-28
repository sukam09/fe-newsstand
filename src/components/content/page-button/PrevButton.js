import { html } from "../../../lib/jsx.js";
import { store } from "../../../store/state.js";
import { movePage } from "./buttonHandler.js";
const ICON_PATH = "/public/asset/icon/left-button.svg";
const ALT_TEXT = "이전 페이지 ";
const PrevButton = () => {
    const $template = html `
    <button
      class="prev-page-btn move-page__btn"
      data-dir="prev"
      onClick=${movePage("prev")}
      disabled=${store.type === "grid" && store.idx <= 0}
    >
      <span class="screen-reader-only">${ALT_TEXT}</span>
      <img src=${ICON_PATH} alt=${ALT_TEXT} />
    </button>
  `;
    return $template;
};
export default PrevButton;
