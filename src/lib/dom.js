/**
 * html template literal을 parameter로 받아 HTMLElement를 생성합니다.
 * @param {string} html
 * @returns {HTMLElement}
 */
function createElement(html) {
    try {
        const $template = document.createElement("div");
        $template.innerHTML = html;
        if ($template.children.length !== 1)
            throw new Error("The createElement function must get an HTML string that has only one tag.");
        const $tag = $template.firstChild;
        return $tag;
    }
    catch (error) {
        console.error(error);
    }
}
/**
 * html template literal을 parameter로 받아 HTMLElement 배열을 생성합니다.
 * @param {string} html
 * @returns {HTMLElement[]}
 */
function createElements(html) {
    const $template = document.createElement("div");
    $template.innerHTML = html;
    const tags = $template.children;
    return [...tags];
}
/**
 * 요소를 DOM에서 제거합니다.
 * @param {HTMLElement} $element
 */
function removeElement($element) {
    $element.remove();
}
/**
 * document.querySelector의 축약형 함수입니다.
 * @param selectors
 * @returns
 */
function qs(selectors) {
    return document.querySelector(selectors);
}
export { createElement, createElements, removeElement, qs };
const DOM = { createElement, createElements, removeElement, qs };
export default DOM;
