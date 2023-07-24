import { MAX_GRID_PAGE_NUM } from "../../../config.js";
import { html } from "../../../lib/jsx.js";
import { store } from "../../../store/core.js";
import { movePage } from "./buttonHandler.js";
const NextButton = () => {
    const $template = html `
    <button
      class="next-page-btn move-page__btn"
      data-dir="next"
      onClick=${movePage("next")}
      disabled=${store.type === "grid" && store.idx >= MAX_GRID_PAGE_NUM - 1}
    >
      <span class="screen-reader-only">다음 페이지</span>
      <img src="/public/asset/icon/right-button.svg" alt="다음 페이지 버튼" />
    </button>
  `;
    return $template;
};
export default NextButton;
