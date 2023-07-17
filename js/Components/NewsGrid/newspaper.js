import { constants } from "../../Data/constants.js";
import newspaperData from "../../Data/newspaper.js";

let $newspaperList;

const newspaperRandom = [...newspaperData];
newspaperRandom.sort(() => Math.random() - 0.5);

const createNewspaperItem = (item, mode) => {
  return `
    <li class="newspaper__item">
      <img src=${
        mode === constants.LIGHT_MODE ? item.lightSrc : item.darkSrc
      } alt=${item.name} />
    </li>
  `;
};

const createNewspaperList = (page, mode) => {
  const nowPageIndexArr = newspaperRandom.slice(
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
  $newspaperList = document.querySelector(".newspaper__list");
  $newspaperList.innerHTML = createNewspaperList(page, mode);
};

export { renderNewspaper };
