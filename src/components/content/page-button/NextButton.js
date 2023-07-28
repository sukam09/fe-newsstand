import { html } from "../../../lib/jsx.js";
import { store } from "../../../store/state.js";
import { movePage } from "./buttonHandler.js";
const ICON_PATH = "/public/asset/icon/right-button.svg";
const ALT_TEXT = "다음 페이지 버튼";
const NextButton = ({ maxPage }) => {
    const $template = html `
    <button
      class="next-page-btn move-page__btn"
      data-dir="next"
      onClick=${movePage("next")}
      disabled=${store.type === "grid" && store.idx >= maxPage - 1}
    >
      <span class="screen-reader-only">${ALT_TEXT}</span>
      <img src=${ICON_PATH} alt=${ALT_TEXT} />
    </button>
  `;
    return $template;
};
export default NextButton;
