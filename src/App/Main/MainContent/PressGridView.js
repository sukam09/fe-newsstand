/*
신문사 컨텐츠 컴포넌트
*/

const TOTAL_PRESS_NUMBER = 96;
const GRID_PRESS_NUBER = 24;

const indexArr = Array.from({ length: TOTAL_PRESS_NUMBER }, (_, i) => i);
indexArr.sort(() => Math.random() - 0.5);

const findTargetParentNode = (element, targetTagName) => {
  if (!element) {
    return null;
  }

  if (element.tagName === targetTagName) {
    return element;
  }

  return findTargetParentNode(element.parentNode, targetTagName);
};

const findTargetChildNode = (element, targetTagName) => {
  if (!element) return null;

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

const viewSubscriptionButton = (e) => {
  let target = e.target;
  let img, btn;

  target = findTargetParentNode(target, "LI");
  img = findTargetChildNode(target, "img");
  btn = findTargetChildNode(target, "button");

  if (img) img.style.display = "none";
  if (btn) btn.style.display = "inline";
};

const createNewspaperItem = function (index, mode) {
  return `
    <li class="newspaper__item">
    <img src="./assets/newspaper/${mode}/${index + 1}.png" alt=${"name"} />
    <button class="subscribe-btn" data-key=${
      index + 1
    }><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none">
    <path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99799H13V10.998H19V12.998Z" fill="#879298"/>
    </svg>구독하기</button>
    </li>
    `;
};

const createPressList = function (page, mode) {
  const nowPageIndexArr = indexArr.slice(
    (page - 1) * GRID_PRESS_NUBER,
    page * GRID_PRESS_NUBER
  );
  const liArr = nowPageIndexArr.map((item) => createNewspaperItem(item, mode));
  let pressList = liArr.reduce((news, currentIndex) => news + currentIndex);

  return pressList;
};

export default function PressGridView($target, props) {
  this.render = () => {
    const $ul = document.createElement("ul");

    $ul.setAttribute("class", "newspaper__list");

    $ul.addEventListener("mouseover", viewSubscriptionButton);

    $ul.innerHTML = createPressList(props.currentPage, props.mode);

    $ul.childNodes.forEach((elem) => {
      elem.addEventListener("mouseout", (e) => {
        const img = findTargetChildNode(e.target, "img");
        const btn = findTargetChildNode(e.target, "button");

        if (img) img.style.display = "inline";
        if (btn) btn.style.display = "none";
      });
    });

    $target.innerHTML = "";
    $target.appendChild($ul);
  };

  this.render();
}
