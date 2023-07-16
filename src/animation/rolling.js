// import { removeElement } from "../lib/dom.js";
/**
 * parameter로 받은 element에 rolling animation을 부여합니다.
 * @param {HTMLElement} $element Rolling Animation을 부여할 element
 * @param {EventListener} eventListener Transition이 끝나면 실행할 EventListener
 */
function setRolling($element, eventListener) {
    $element.style.transition = "all";
    $element.style.transitionDuration = "1s";
    // const removeListener = () => removeElement($element);
    startRolling($element, eventListener);
    if (eventListener) {
        $element.addEventListener("mouseenter", () => pauseRolling($element, eventListener));
        $element.addEventListener("mouseleave", () => startRolling($element, eventListener));
    }
}
// startRolling
/**
 * Rolling을 시작합니다.
 * @param {HTMLElement} $element
 * @param {EventListener} eventListener
 */
function startRolling($element, eventListener) {
    $element.style.transform = `translate3d(0px,${-100}%,0px)`;
    $element.addEventListener("transitionend", eventListener);
}
// pauseRolling
/**
 * Rolling을 일시정지 합니다.
 * @param {HTMLElement} $element
 * @param {EventListener} eventListener
 */
function pauseRolling($element, eventListener) {
    const style = getComputedStyle($element);
    $element.style.transform = style.transform;
    $element.removeEventListener("transitionend", eventListener);
}
export { setRolling };
