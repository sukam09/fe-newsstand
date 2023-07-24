export default function findTargetParentNode(element, targetTagName) {
  if (!element) {
    return null;
  }

  if (element.tagName.toLowerCase() === targetTagName.toLowerCase()) {
    return element;
  }

  return findTargetParentNode(element.parentNode, targetTagName);
}
