import { removeElement } from "../lib/dom.js";
function initRolling($element) {
    $element.style.transition = "all";
    $element.style.transitionDuration = "0.5s";
    const removeListener = () => removeElement($element);
    startRolling($element, removeListener);
    $element.addEventListener("mouseenter", () => pauseRolling($element, removeListener));
    $element.addEventListener("mouseleave", () => startRolling($element, removeListener));
}
// startRolling
/**
 * Rolling을 시작합니다.
 * @param {HTMLElement} $element
 * @param {EventListener} removeElement
 */
function startRolling($element, removeElement) {
    $element.style.transform = `translate3d(0px,${-100}%,0px)`;
    $element.addEventListener("transitionend", removeElement);
}
// pauseRolling
/**
 * Rolling을 일시정지 합니다.
 * @param {HTMLElement} $element
 * @param {EventListener} removeElement
 */
function pauseRolling($element, removeElement) {
    const style = getComputedStyle($element);
    $element.style.transform = style.transform;
    $element.removeEventListener("transitionend", removeElement);
}
export { initRolling };
