import { html } from "../../../lib/jsx.js";
import { store } from "../../../store/core.js";
import { movePage } from "./buttonHandler.js";
const PrevButton = () => {
    const $template = html `
    <button
      class="prev-page-btn move-page__btn"
      data-dir="prev"
      onClick=${movePage("prev")}
      disabled=${store.type === "grid" && store.idx <= 0}
    >
      <span class="screen-reader-only">이전 페이지</span>
      <img src="/public/asset/icon/left-button.svg" alt="이전 페이지 버튼" />
    </button>
  `;
    return $template;
};
export default PrevButton;
