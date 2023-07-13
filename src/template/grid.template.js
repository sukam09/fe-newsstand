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
export const gridItemTemplate = (data) => html `
  <li class="company-list__item">
    <img
      class="logo"
      src=${`/public/asset/images/light/${data.id}.png`}
      alt=${data.name}
    />
  </li>
`;
