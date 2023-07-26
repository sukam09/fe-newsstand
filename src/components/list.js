import { LIST } from '../constants/press-data.js';
import { getShuffle } from '../utils/shuffle.js';

import { initListProgress } from './press-list-progress.js';
import { Store } from '../utils/store.js';

class PressListStore extends Store {
  constructor(pressData, categoryList) {
    super();
    this.state = {};
    this.pressData = pressData;
    this.categoryList = categoryList;

    this.initList();
    initListProgress();

    // const pressId = LIST.SUFFLE_CATEGORY[LIST.CATEGORY_COUNT - 1][LIST.PAGE_COUNT - 1].id;
    // const isSubscribe = LIST.SUBSCRIBE_ID.includes(pressId);
    // setListButtonChange(isSubscribe);
    // setSubscribeArrow(isSubscribe);
  }

  initList() {
    this.renderList();
    this.renderMain();
    this.renderSub();
    this.renderNav();
    this.setShuffle();
  }

  renderList() {
    this.listWrapper = document.querySelector(`.press__wrapper-list`);
    this.listElement = `
    <article class='press-category'>
        <nav class='press-category__nav'>
        <ul class='press-category__ul'></ul>
        </nav>
        <article class='press-category__article'>
        <section class='press-category__section-main'></section>
        <section class='press-category__section-sub'></section>
        </article>
    </article>
    <img class='arrows-category__img-left' src='./assets/icons/chevron-left.svg' />
    <img class='arrows-category__img-right' src='./assets/icons/chevron-right.svg' />
    `;
    this.listWrapper.innerHTML = this.listElement;
  }

  renderMain() {
    this.mainSection = document.querySelector(`.press-category__section-main`);
    this.mainElement = `
    <nav class='section-main__nav'>
        <img class='section-main__img-logo' src=''>
        <div class='section-main__edit'>
        <time class='section-main__edit-time'></time>
        <p class='section-main__edit-p'>&nbsp편집</p>
        </div>
        <buttion class='section-main__button'>
        <img class='section-main__img-button' src='./assets/icons/button-plus.svg' />
        <p class='section-main__p-button'>구독하기</p>
        </button>
    </nav>
    <img class='section-main__img-article' src=''/>
    <h2 class='section-main__h2'></h2>
    `;

    this.mainSection.innerHTML = this.mainElement;
  }

  renderSub() {
    this.subSection = document.querySelector(`.press-category__section-sub`);
    this.subFrame = Array.from({ length: 6 }, (_, idx) => idx);
    this.subElement = `
    <footer class='section-sub__footer'> 
        <p class='section-sub__footer-press'></p> 
        <p class='section-sub__footer-text'>&nbsp언론사에서 직접 편집한 뉴스입니다.</p>
    </footer>
    `;

    this.subFrame.forEach((_) => {
      this.subTitle = `
        <h4 class='section-sub__h4'>
        <a class='section-sub__a' href=''></a>
        </h4>
        `;
      this.subSection.insertAdjacentHTML('beforeend', this.subTitle);
    });
    this.subSection.insertAdjacentHTML('beforeend', this.subElement);
  }

  renderNav() {
    this.categorySection = document.querySelector(`.press-category__ul`);
    this.categoryList.forEach((category) => {
      this.categoryElement = `
        <li class='press-category__li'>
        <p class='press-category__p'>${category}</p>
        <div class='press-category__div none'>
            <div class='press-category__div-now'>1</div>
            <div class='press-category__div-divide'>/</div>
            <div class='press-category__div-sum'></div>
        </div>
        </li>
        `;
      this.categorySection.insertAdjacentHTML('beforeend', this.categoryElement);
    });
  }

  setShuffle() {
    LIST.SUFFLE_CATEGORY = [];
    this.categoryList.forEach((category) => {
      let categoryFilter = this.pressData.filter((press) => press.categoryName === category);
      if (categoryFilter.length === 0) categoryFilter = this.pressData.filter((press) => press.name === category);
      LIST.SUFFLE_CATEGORY.push(getShuffle(categoryFilter));
    });
  }
}

const initPressList = (pressData, categoryList) => {
  const pressListStore = new PressListStore(pressData, categoryList);
  return pressListStore;
};

export { initPressList };
