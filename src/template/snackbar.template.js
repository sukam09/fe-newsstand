import { html } from "../lib/html";
/**
 * HTML 형태 Template Literal을 입력받아 Snackbar Template Literal을 return 합니다.
 * @param { HTMLString } page
 * @returns { HTMLString }
 */
export const snackbarTemplate = (company) => html `
  <div class="snack-bar popup">내가 구독한 언론사에 추가되었습니다.</div>
`;
