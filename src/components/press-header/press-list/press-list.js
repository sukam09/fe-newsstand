import { HEADER_CLASS, PATH, CONTENT, NUMBER } from '../../../constants/press-list.js';
import { LIST } from '../../../constants/press-data.js';
import { getShuffle } from '../../../utils/shuffle.js';
import { initListProgress } from './press-list-progress.js';
import { Store } from '../../../utils/store.js';

class PressListStore extends Store {
  constructor(pressData, categoryList) {
    super();
    this.state = {};
    this.pressData = pressData;
    this.categoryList = categoryList;

    this.initList();
    initListProgress(pressData, categoryList);
  }

  initList() {
    this.renderList();
    this.renderMain();
    this.renderSub();
    this.renderNav();
    this.setShuffle();
    this.setHover();
  }

  renderList() {
    this.listWrapper = document.querySelector(`.${HEADER_CLASS.WRAPPER_LIST}`);
    this.listElement = `
    <article class=${HEADER_CLASS.CATEGORY}>
        <nav class=${HEADER_CLASS.CATEGORY_NAV}>
        <ul class=${HEADER_CLASS.CATEGORY_UL}></ul>
        </nav>
        <article class=${HEADER_CLASS.CATEGORY_ARTICLE}>
        <section class=${HEADER_CLASS.SECTION_MAIN}></section>
        <section class=${HEADER_CLASS.SECTION_SUB}></section>
        </article>
    </article>
    <img class=${HEADER_CLASS.ARROW_LEFT} src=${PATH.ARROW_LEFT} />
    <img class=${HEADER_CLASS.ARROW_RIGHT} src=${PATH.ARROW_RIGHT} />
    `;
    this.listWrapper.innerHTML = this.listElement;
  }

  renderMain() {
    this.mainSection = document.querySelector(`.${HEADER_CLASS.SECTION_MAIN}`);
    this.mainElement = `
    <nav class=${HEADER_CLASS.SECTION_NAV}>
        <img class=${HEADER_CLASS.SECTION_LOGO} src=''>
        <div class=${HEADER_CLASS.SECTION_EDIT}>
        <time class=${HEADER_CLASS.SECTION_EDIT_TIME}></time>
        <p class=${HEADER_CLASS.SECTION_EDIT_P}>${CONTENT.EDIT}</p>
        </div>
        <buttion class=${HEADER_CLASS.SECTION_BUTTON}>
        <img class=${HEADER_CLASS.SECTION_BUTTON_SUBSCRIBE} src=${PATH.BUTTON_PLUS} />
        <p class=${HEADER_CLASS.SECTION_P_SUBSCRIBE}>${CONTENT.SUBSCRIBE}</p>
        </button>
    </nav>
    <img class=${HEADER_CLASS.SECTION_ARTICLE} src=''/>
    <h2 class=${HEADER_CLASS.SECTION_MAIN_P}></h2>
    `;

    this.mainSection.innerHTML = this.mainElement;
  }

  renderSub() {
    this.subSection = document.querySelector(`.${HEADER_CLASS.SECTION_SUB}`);
    this.subFrame = Array.from({ length: NUMBER.SUB_FRAME }, (_, idx) => idx);
    this.subElement = `
    <footer class=${HEADER_CLASS.SECTION_FOOTER}> 
        <p class=${HEADER_CLASS.SECTION_FOOTER_PRESS}></p> 
        <p class=${HEADER_CLASS.SECTION_FOOTER_TEXT}>${CONTENT.PRESS_EDIT}</p>
    </footer>
    `;

    this.subFrame.forEach((_) => {
      this.subTitle = `
        <h4 class=${HEADER_CLASS.SECTION_SUB_H4}>
        <a class=${HEADER_CLASS.SECTION_SUB_A} href=''></a>
        </h4>
        `;
      this.subSection.insertAdjacentHTML('beforeend', this.subTitle);
    });
    this.subSection.insertAdjacentHTML('beforeend', this.subElement);
  }

  renderNav() {
    this.categorySection = document.querySelector(`.${HEADER_CLASS.CATEGORY_UL}`);
    this.categoryList.forEach((category) => {
      this.categoryElement = `
        <li class=${HEADER_CLASS.CATEGORY_LI}>
        <p class=${HEADER_CLASS.CATEGORY_P}>${category}</p>
        <div class='${HEADER_CLASS.CATEGORY_DIV} ${HEADER_CLASS.NONE}'>
            <div class=${HEADER_CLASS.CATEGORY_DIV_NOW}>1</div>
            <div class=${HEADER_CLASS.CATEGORY_DIV_DIVIDE}>/</div>
            <div class=${HEADER_CLASS.CATEGORY_DIV_SUM}></div>
        </div>
        <img class='${HEADER_CLASS.CATEGORY_IMG} ${HEADER_CLASS.NONE}' src=${PATH.ARROW_NAV} />

        </li>
        `;
      this.categorySection.insertAdjacentHTML('beforeend', this.categoryElement);
    });
  }

  setShuffle() {
    LIST.SUFFLE_CATEGORY = [];
    this.categoryList.forEach((category) => {
      let categoryFilter = this.pressData.filter((press) => press.categoryName === category);
      if (categoryFilter.length === NUMBER.CATEGORY_LENGTH)
        categoryFilter = this.pressData.filter((press) => press.name === category);
      LIST.SUFFLE_CATEGORY.push(getShuffle(categoryFilter));
    });
  }

  setHover() {
    const article = document.querySelector(`.${HEADER_CLASS.CATEGORY_ARTICLE}`);
    const mainImg = document.querySelector(`.${HEADER_CLASS.SECTION_ARTICLE}`);

    const handleArticleHover = (isHover) => mainImg.classList.toggle(HEADER_CLASS.SECTION_MAIN_HOVER, isHover);
    article.addEventListener('mouseenter', () => handleArticleHover(true));
    article.addEventListener('mouseleave', () => handleArticleHover(false));
  }
}

const initPressList = (pressData, categoryList) => {
  const pressListStore = new PressListStore(pressData, categoryList);
  return pressListStore;
};

export { initPressList };
