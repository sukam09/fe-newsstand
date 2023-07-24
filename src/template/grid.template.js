import { html } from "../lib/html.js";
/**
 * HTML 형태 Template Literal을 입력받아 Grid View Template Literal을 return 합니다.
 * @param { HTMLString } page
 * @returns { HTMLString }
 */
export const gridTemplate = (page) => html `
  <ul class="company-list">
    ${page}
  </ul>
`;
/**
 * Company Data를 입력받아 하나의 Grid Item Template Literal을 return 합니다.
 * @param { Company } data
 * @returns { HTMLString }
 */
export const gridItemTemplate = (data, subscribe = false) => {
    if (!data.name)
        return html ` <li class="company-list__item"></li> `;
    return html `
    <li class="company-list__item">
      <img
        class="logo"
        src=${`/public/asset/images/light/${data.id}.png`}
        alt=${data.name}
      />
      <div class="company-list__item--hover">
        ${subscribe
        ? html `
              <button
                class="subscribe__button subscribe__button--unsubscribe subscribe__button--grid"
              >
                <img
                  src="/public/asset/icon/closed.svg"
                  alt="closed-icon"
                  class="icon-s"
                />
                해지하기
              </button>
            `
        : html `
              <button class="subscribe__button subscribe__button--subscribe">
                <img
                  src="/public/asset/icon/plus.svg"
                  alt="plus-icon"
                  class="icon-s"
                />
                구독하기
              </button>
            `}
      </div>
    </li>
  `;
};
