const getTodayDate = () => {
  const today = new Date();
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
  };

  return today.toLocaleDateString('ko-KR', options);
};

const shufflePressOrder = () => {
  const array = Array.from({ length: 96 }, (_, idx) => idx);
  array.sort(() => Math.random() - 0.5);
  return array;
};

export const customQuerySelector = (selector, $target = document) => {
  const childNodes = [...$target.childNodes];
  const targetSelctor = selector.trim();
  const tagType = targetSelctor.charAt(0);
  const name = targetSelctor.slice(1);

  while (childNodes.length > 0) {
    const $node = childNodes.shift();

    if (tagType === '#' && $node.id === name) return $node;
    else if (tagType === '.' && $node.classList && $node.classList.contains(name)) return $node;
    else if ($node.tagName === targetSelctor.toUpperCase()) return $node;
    else {
      const $result = customQuerySelector(selector, $node);
      if ($result) return $result;
    }
  }

  return null;
};

export const customQuerySelectorAll = (selector, $target = document) => {
  const result = [];
  const childNodes = [...$target.childNodes];
  const targetSelctor = selector.trim();
  const tagType = targetSelctor.charAt(0);
  const name = targetSelctor.slice(1);

  while (childNodes.length > 0) {
    const $node = childNodes.shift();

    if (tagType === '#' && $node.id === name) result.push($node);
    else if (tagType === '.' && $node.classList && $node.classList.contains(name))
      result.push($node);
    else if ($node.tagName === targetSelctor.toUpperCase()) result.push($node);
    else childNodes.push(...$node.childNodes);
  }
  return result;
};

export { getTodayDate, shufflePressOrder };
