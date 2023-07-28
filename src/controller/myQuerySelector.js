Document.prototype.myQuerySelector = function myQuerySelector(target) {
  const parsedTargetArr = parseTarget(target);
  let dfsStack = [this];
  let result = undefined;

  while (parsedTargetArr.length > 0) {
    const node = parsedTargetArr.shift();
    result = searchNode(dfsStack, node);
    dfsStack = [result];
  }

  if (!result) return null;
  return result;
};

Element.prototype.myQuerySelector = function myQuerySelector(target) {
  const parsedTargetArr = parseTarget(target);
  let dfsStack = [this];
  let result = undefined;

  while (parsedTargetArr.length > 0) {
    const node = parsedTargetArr.shift();
    result = searchNode(dfsStack, node);
    dfsStack = [result];
  }

  if (!result) return null;
  return result;
};

function parseTarget(target) {
  return target.split(" ");
}

function searchNode(dfsStack, node) {
  if (node[0] === ".") {
    return findTargetClass(dfsStack, node.slice(1));
  } else if (node[0] === "#") {
    return findTargetId(dfsStack, node.slice(1));
  } else {
    return findTargetNode(dfsStack, node);
  }
}

function findTargetNode(stack, target) {
  while (stack.length > 0) {
    let currentNode = stack.shift();
    for (let i = 0; i < currentNode.childNodes.length; i++) {
      if (currentNode.childNodes[i].localName === target) {
        return currentNode.childNodes[i];
      }
      stack.push(currentNode.childNodes[i]);
    }
  }
}

function findTargetClass(stack, target) {
  while (stack.length > 0) {
    let currentNode = stack.shift();
    for (let i = 0; i < currentNode.childNodes.length; i++) {
      if (currentNode.childNodes[i].classList) {
        for (let j = 0; j < currentNode.childNodes[i].classList.length; j++) {
          if (currentNode.childNodes[i].classList[j] === target) {
            return currentNode.childNodes[i];
          }
        }
      }
      stack.push(currentNode.childNodes[i]);
    }
  }
}

function findTargetId(stack, target) {
  while (stack.length > 0) {
    let currentNode = stack.shift();
    for (let i = 0; i < currentNode.childNodes.length; i++) {
      if (currentNode.childNodes[i].id === target) {
        return currentNode.childNodes[i];
      }
      stack.push(currentNode.childNodes[i]);
    }
  }
}
