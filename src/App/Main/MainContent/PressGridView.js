/*
신문사 컨텐츠 컴포넌트
*/

const TOTAL_PRESS_NUMBER = 96;
const GRID_PRESS_NUBER = 24;

const indexArr = Array.from({ length: TOTAL_PRESS_NUMBER }, (_, i) => i);
indexArr.sort(() => Math.random() - 0.5);

const createNewspaperItem = function (index, mode) {
  return `
    <li class="newspaper__item">
    <img src="./assets/newspaper/${mode}/${index + 1}.png" alt=${"name"} />
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
    $ul.innerHTML = createPressList(props.currentPage, props.mode);

    $target.innerHTML = "";
    $target.appendChild($ul);
  };

  this.render();
}
