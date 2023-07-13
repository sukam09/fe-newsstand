function getElemId(base, id) {
    return base.getElementById(id);
}

function getElemClass(base, className) {
    return base.getElementsByClassName(className);
}

function getQuerySelector(base, selector) {
    return base.querySelector(selector)
}

function getQuerySelectorAll(base, selector) {
    return base.querySelectorAll(selector);
}

export {getElemId, getElemClass, getQuerySelector, getQuerySelectorAll};