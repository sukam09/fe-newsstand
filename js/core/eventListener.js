const attachEventListener = (type, element, callback) => element.addEventListener(type, callback);
const detachEventListener = (type, element, callback) => element.removeEventListener(type, callback);

export { attachEventListener, detachEventListener };
