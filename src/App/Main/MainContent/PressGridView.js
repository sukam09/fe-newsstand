/*
신문사 컨텐츠 컴포넌트
*/
import getRandomIndexArr from "../../../api/getRandomIndexArr.js";
import store from "../../../Store/Store.js";
import findTargetParentNode from "../../../api/findTargetParentNode.js";

const TOTAL_PRESS_NUMBER = 96;
const GRID_PRESS_NUBER = 24;

const subscibeButtonInner = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none">
<path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99799H13V10.998H19V12.998Z" fill="#879298"/>
</svg>구독하기`;

const unsubscibeButtonInner = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
  <path d="M4.26699 9L3.66699 8.4L6.06699 6L3.66699 3.6L4.26699 3L6.66699 5.4L9.06699 3L9.66699 3.6L7.26699 6L9.66699 8.4L9.06699 9L6.66699 6.6L4.26699 9Z" fill="#879298"/>
  </svg>해지하기`;

const indexArr = getRandomIndexArr(TOTAL_PRESS_NUMBER);

const findTargetChildNode = (element, targetTagName) => {
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

const createNewspaperItem = function (index, mode) {
  const pressId = index + 1;
  const buttonInner = store.isSubscribed(String(pressId))
    ? unsubscibeButtonInner
    : subscibeButtonInner;

  const inner = `<img src="./assets/newspaper/${mode}/${pressId}.png" alt=${"name"} />
  <button class="subscribe-btn" data-key=${pressId}>
  ${buttonInner}
  </button>`;

  return `
    <li class=${pressId ? "newspaper__item" : "blank"}>
    ${pressId ? inner : ""}
    </li>
    `;
};

const createPressList = function (page, mode) {
  const nowPageIndexArr = indexArr.slice(
    (page - 1) * GRID_PRESS_NUBER,
    page * GRID_PRESS_NUBER
  );

  while (nowPageIndexArr.length < 24) nowPageIndexArr.push(-1);

  const liArr = nowPageIndexArr.map((item) => createNewspaperItem(item, mode));
  let pressList = liArr.reduce((news, currentIndex) => news + currentIndex);

  return pressList;
};

export default function PressGridView($target, props) {
  this.render = () => {
    const $ul = document.createElement("ul");

    $ul.setAttribute("class", "newspaper__list");
    $ul.innerHTML = createPressList(props.currentPage, props.mode);

    $ul.addEventListener("click", (e) => {
      let $button;
      if (e.currentTarget !== e.target) {
        $button = findTargetChildNode(e.target, "button");
        console.log($button);
        store.dispatch($button.innerText, $button.dataset.key);

        $button.innerHTML =
          $button.innerText === "구독하기"
            ? unsubscibeButtonInner
            : subscibeButtonInner;

        console.log(store.myPressList);
      }
    });
    $target.innerHTML = "";
    $target.appendChild($ul);
  };

  this.render();
}
