function myQuerySelector(selector) {
  //최초 dom 탐색
  const dom = document.querySelector('#root');

  //ID, Class 구분
  if (selector.startsWith('.')) return classSelector(dom, selector);
  if (selector.startsWith('#')) return idSelector(dom, selector);

  return null;
}

function classSelector(dom, selector) {
  const className = selector.slice(1);
  let currentElement = '';

  for (const node of dom.children) {
    currentElement = dfs(node, className);
    if (currentElement) break;
  }

  return currentElement;
}

function idSelector(dom, selector) {
  const id = selector.slice(1);
  let currentElement = '';

  for (const node of dom.children) {
    currentElement = dfs(node, id);
    if (currentElement) break;
  }

  return currentElement;
}

const dfs = (node, elementIdentifier) => {
  if (node.className === elementIdentifier) return node;
  if (node.id === elementIdentifier) return node;

  for (const child of node.children) {
    const findNode = dfs(child, elementIdentifier);
    if (findNode) return findNode;
  }
};

export { myQuerySelector };
