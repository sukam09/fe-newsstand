/**
 * HTMLElement에 event를 추가하는 함수입니다. EventListener에 parameter를 넘겨줄 수 있습니다.
 * @param { HTMLElement } $element
 * @param { string } event
 * @param { function([Obejct]) : EventListenerOrEventListenerObject } handler
 * @param { Object } [parameter]
 * @param { boolean | AddEventListenerOptions } [options]
 */
function addCustomEventListener($element, event, eventListener, parameter, options) {
    if (parameter) {
        const callback = () => eventListener(parameter);
        $element.addEventListener(event, callback, options);
        return callback;
    }
    else {
        $element.addEventListener(event, eventListener, options);
    }
}
export { addCustomEventListener };
