/**
 * 오늘 날짜를 원하는 포맷에 반환하는 함수
 * @returns {String}
 */
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

/**
 * 배열을 랜덤하게 섞어주는 함수
 * @param {Array} array
 * @returns {Array}
 */
const shufflePressOrder = (array = []) => {
  return array.sort(() => Math.random() - 0.5);
};

/**
 * querySelector와 같은 기능을 하는 커스텀 함수
 * @param {String} selector
 * @param {HTMLElement} $target
 * @returns {HTMLElement}
 */
export const customQuerySelector = (selector, $target = document) => {
  const childNodes = [...$target.childNodes];
  const targetSelctor = selector.trim();
  const tagType = targetSelctor.charAt(0);
  const name = targetSelctor.slice(1);

  while (childNodes.length > 0) {
    const $node = childNodes.shift();

    if (tagType === '#' && $node.id === name) return $node;
    if (tagType === '.' && $node.classList && $node.classList.contains(name)) return $node;
    if ($node.tagName === targetSelctor.toUpperCase()) return $node;

    const $result = customQuerySelector(selector, $node);

    if ($result) return $result;
  }

  return null;
};

/**
 * querySelectorAll과 같은 기능을 하는 커스텀 함수
 * @param {String} selector
 * @param {HTMLElement} $target
 * @returns {Array}
 */
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
