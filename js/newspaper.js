import { constants } from "./constants.js";

const $newspaperList = document.querySelector(".newspaper__list");

const indexArr = Array.from(
  { length: constants.ALL_PAGE_NEWSPAPER },
  (_, i) => i
);
indexArr.sort(() => Math.random() - 0.5);

const createNewspaperItem = (index, mode) => {
  return `
    <li class="newspaper__item">
    <img src="./assets/newspaper/${mode}/${index + 1}.png" alt=${"name"} />
    </li>
    `;
};

const createNewspaperList = (page, mode) => {
  const nowPageIndexArr = indexArr.slice(
    page * constants.ONE_PAGE_NEWSPAPER,
    (page + 1) * constants.ONE_PAGE_NEWSPAPER
  );
  const liArr = nowPageIndexArr.map((item) => createNewspaperItem(item, mode));
  const newspaperList = liArr.reduce(
    (news, currentIndex) => news + currentIndex
  );
  return newspaperList;
};

const renderNewspaper = (page, mode) => {
  $newspaperList.innerHTML = createNewspaperList(page, mode);
};

export { renderNewspaper };
