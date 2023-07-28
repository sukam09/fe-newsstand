import { GRID } from "../../../constant.js";
import { html } from "../../../lib/jsx.js";
import { store } from "../../../store/state.js";
const NoContent = () => html `
  <div class="view--empty">
    <h2>구독한 언론사가 없습니다.</h2>
    <div>
      언론사 구독 설정에서 관심 있는 언론사를 구독하시면<br />
      언론사가 직접 편집한 뉴스들을 네이버 홈에서 바로 보실 수 있습니다.
    </div>
    <button
      onClick=${() => {
    store.filter = "all";
    store.type = GRID;
}}
    >
      구독하러 가기
    </button>
  </div>
`;
export default NoContent;
