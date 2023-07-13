const _querySelector = (selectors, root) => {
  if (!root) root = document.children;
  else root = root.children;

  let result;

  const searchNodeTag = (selectors, root) => {
    for (const dom of root) {
      if (selectors === dom.localName) {
        if (!result) result = dom;
        return result;
      }
      searchNodeTag(selectors, dom.children);
    }

    return null;
  };

  const searchNodeClass = (selectors, root) => {
    for (const dom of root) {
      if ([...dom.classList].includes(selectors)) {
        if (!result) result = dom;
        return result;
      }
      searchNodeClass(selectors, dom.children);
    }
    return null;
  };

  const searchNodeId = (selectors, root) => {
    for (const dom of root) {
      if (dom.id === selectors) {
        if (!result) result = dom;
        return result;
      }
      searchNodeId(selectors, dom.children);
    }
    return null;
  };

  if (selectors[0] === ".") {
    searchNodeClass(selectors.slice(1, selectors.length), root);
  } else if (selectors[0] === "#") {
    searchNodeId(selectors.slice(1, selectors.length), root);
  } else {
    searchNodeTag(selectors, root);
  }

  return result;
};

const _querySelectorAll = (selectors, root) => {
  if (!root) root = document.children;
  else root = root.children;

  let result = [];

  const searchNodeTag = (selectors, root) => {
    for (const dom of root) {
      if (selectors === dom.localName) {
        result.push(dom);
      }
    }

    for (const dom of root) {
      searchNodeTag(selectors, dom.children);
    }
  };

  const searchNodeClass = (selectors, root) => {
    for (const dom of root) {
      if ([...dom.classList].includes(selectors)) {
        result.push(dom);
      }
    }

    for (const dom of root) {
      searchNodeClass(selectors, dom.children);
    }
  };

  const searchNodeId = (selectors, root) => {
    for (const dom of root) {
      if (dom.id === selectors) {
        result.push(dom);
      }
    }

    for (const dom of root) {
      searchNodeId(selectors, dom.children);
    }
  };

  if (selectors[0] === ".") {
    searchNodeClass(selectors.slice(1, selectors.length), root);
  } else if (selectors[0] === "#") {
    searchNodeId(selectors.slice(1, selectors.length), root);
  } else {
    searchNodeTag(selectors, root);
  }

  return result;
};

export { _querySelector, _querySelectorAll };
