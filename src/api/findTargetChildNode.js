const findTargetChildNode = function (element, targetTagName) {
  if (!element) return null;

  if (element.tagName.toLowerCase() === targetTagName.toLowerCase())
    return element;

  const children = Array.from(element.children);

  for (const child of children) {
    if (child.tagName.toLowerCase() === targetTagName.toLowerCase()) {
      return child;
    }

    const matchedElement = findTargetChildNode(child, targetTagName);
    if (matchedElement) return matchedElement;
  }

  return null;
};

export default findTargetChildNode;
