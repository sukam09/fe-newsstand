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
  const currentSelctor = selector.trim();
  const tagType = currentSelctor.charAt(0);
  const name = currentSelctor.slice(1);

  while (childNodes.length > 0) {
    const $node = childNodes.shift();

    if (tagType === '#' && $node.id === name) {
      return $node;
    } else if (tagType === '.' && $node.classList && $node.classList.contains(name)) {
      return $node;
    } else if ($node.tagName === name.toUpperCase()) {
      return $node;
    } else {
      const $result = customQuerySelector(selector, $node);
      if ($result) {
        return $result;
      }
    }
  }

  return null;
};

export { getTodayDate, shufflePressOrder };
