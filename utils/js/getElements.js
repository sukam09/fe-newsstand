function getElemId(id, base = document) {
  return base.getElementById(id);
}

function getElemClass(className, base = document) {
  return base.getElementsByClassName(className);
}

function getQuerySelector(selector, base = document) {
  return base.querySelector(selector);
}

function getQuerySelectorAll(selector, base = document) {
  return base.querySelectorAll(selector);
}

export { getElemId, getElemClass, getQuerySelector, getQuerySelectorAll };
