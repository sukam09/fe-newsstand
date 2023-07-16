const addEventListener = (type, element, callback) => element.addEventListener(type, callback);
const removeEventListener = (type, element, callback) => element.removeEventListener(type, callback);

export { addEventListener, removeEventListener };
