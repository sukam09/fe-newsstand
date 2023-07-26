export function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const fetchData = async (url) => {
  const res = await fetch(url);
  const jsonData = await res.json();
  return jsonData;
};

export const qs = document.querySelector.bind(document);
export const qsa = document.querySelectorAll.bind(document);

/**
 *
 * @param {string} str innerHTML로 넣을 수 있는 string(하나의 요소)
 * @returns HTMLElement
 */
export function strToHtmlElemnt(str) {
  const $container = document.createElement("div");
  $container.innerHTML = str.trim();
  return $container.childNodes[0];
}

