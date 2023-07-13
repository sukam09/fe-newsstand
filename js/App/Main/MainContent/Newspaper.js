/*
신문사 컨텐츠 컴포넌트
props: pressType, currentPage, setLastpage
*/

const indexArr = Array.from({ length: 96 }, (_, i) => i);
indexArr.sort(() => Math.random() - 0.5);

const createNewspaperItem = function (index, mode) {
  return `
    <li class="newspaper__item">
    <img src="./assets/newspaper/${mode}/${index + 1}.png" alt=${"name"} />
    </li>
    `;
};

const createNewspaperList = function (page, mode) {
  const nowPageIndexArr = indexArr.slice((page - 1) * 24, page * 24);
  const liArr = nowPageIndexArr.map((item) => createNewspaperItem(item, mode));
  let newspaperList = liArr.reduce((news, currentIndex) => news + currentIndex);
  return newspaperList;
};

export default function Newspaper($target, props) {
  //   this.state = mode;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const $ul = document.createElement("ul");

    $ul.setAttribute("class", "newspaper__list");
    $ul.innerHTML = createNewspaperList(props.currentPage, props.mode);

    $target.innerHTML = "";
    $target.appendChild($ul);
  };

  this.render();
}
