import { html } from "../../lib/jsx.js";
/**
 * 브라우저를 새로고침합니다.
 */
const refresh = () => location.reload();
/**
 * @returns {string} 오늘 날짜를 반환합니다.
 */
const today = () => {
    return new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
    });
};
/**
 * time 태그의 datetime 속성을 현재 시간으로 설정합니다.
 * @param {Element} $element
 */
const setDate = ($element) => {
    $element.querySelector("time").setAttribute("datetime", String(new Date()));
};
const Header = () => {
    const $template = html `
    <header class="header">
      <h1 class="header__title" onClick=${refresh}>뉴스스탠드</h1>
      <time class="header__date">${today()}</time>
    </header>
  `;
    setDate($template);
    return $template;
};
const registerComponents = (obj) => {
    Object.entries(obj).forEach(([key, value]) => {
        console.log(key, value);
        const $customEl = class extends HTMLElement {
            constructor() {
                super();
            }
            connectedCallback() {
                this.append(value);
                // this.parentNode?.replaceChild(value, this);
                console.log(this);
            }
        };
        customElements.define(`custom-${key}`, $customEl);
    });
};
export default Header;
