import { html } from "../lib/html";
/**
 * HTML 형태 Template Literal을 입력받아 Alert Template Literal을 return 합니다.
 * @param { HTMLString } page
 * @returns { HTMLString }
 */
export const alertTemplate = (company) => html `
  <div class="alert popup">
    <div class="alert__content">
      <span class="alert__company">${company}</span>을(를)<br />
      구독해지하시겠습니까?
    </div>
    <div class="alert__buttons">
      <button class="alert__button alert__button--unsubscribe">
        예, 해지합니다
      </button>
      <button class="alert__button alert__button--cancel">아니오</button>
    </div>
  </div>
`;
