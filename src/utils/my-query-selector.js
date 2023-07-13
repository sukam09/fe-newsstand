const _querySelector = (selectors, root = document) => {
  const childrens = root.children;
  let result;

  const searchNodeTag = (selectors, childrens) => {
    for (const dom of childrens) {
      if (selectors === dom.localName) {
        if (!result) result = dom;
        return result;
      }
      searchNodeTag(selectors, dom.children);
    }

    return null;
  };

  const searchNodeClass = (selectors, childrens) => {
    for (const dom of childrens) {
      if ([...dom.classList].includes(selectors)) {
        if (!result) result = dom;
        return result;
      }
      searchNodeClass(selectors, dom.children);
    }
    return null;
  };

  const searchNodeId = (selectors, childrens) => {
    for (const dom of childrens) {
      if (dom.id === selectors) {
        if (!result) result = dom;
        return result;
      }
      searchNodeId(selectors, dom.children);
    }
    return null;
  };

  if (selectors[0] === ".") {
    searchNodeClass(selectors.slice(1, selectors.length), childrens);
  } else if (selectors[0] === "#") {
    searchNodeId(selectors.slice(1, selectors.length), childrens);
  } else {
    searchNodeTag(selectors, childrens);
  }

  return result;
};

const _querySelectorAll = (selectors, root = document) => {
  const childrens = root.children;
  let result = [];

  const searchNodeTag = (selectors, childrens) => {
    for (const dom of childrens) {
      if (selectors === dom.localName) {
        result.push(dom);
      }
    }

    for (const dom of childrens) {
      searchNodeTag(selectors, dom.children);
    }
  };

  const searchNodeClass = (selectors, childrens) => {
    for (const dom of childrens) {
      if ([...dom.classList].includes(selectors)) {
        result.push(dom);
      }
    }

    for (const dom of childrens) {
      searchNodeClass(selectors, dom.children);
    }
  };

  const searchNodeId = (selectors, childrens) => {
    for (const dom of childrens) {
      if (dom.id === selectors) {
        result.push(dom);
      }
    }

    for (const dom of childrens) {
      searchNodeId(selectors, dom.children);
    }
  };

  if (selectors[0] === ".") {
    searchNodeClass(selectors.slice(1, selectors.length), childrens);
  } else if (selectors[0] === "#") {
    searchNodeId(selectors.slice(1, selectors.length), childrens);
  } else {
    searchNodeTag(selectors, childrens);
  }

  return result;
};

export { _querySelector, _querySelectorAll };
