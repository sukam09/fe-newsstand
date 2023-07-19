import { getShuffle } from '../utils/shuffle.js';
import { LIST, PAGE } from '../constants/press-data.js';

let pageNum = 0;
let currentArticle = 0;
let currentCategory = 0;

/**
 * 언론사 리스트의 INIT
 */
const initPressList = (pressData, categoryList) => {
  setList();
  setListMain();
  setListSub();
  setListNav(categoryList);

  setListShuffle(pressData, categoryList);
  setListArticle();

  setProgressBarClick();
  setProgressBarEvent();

  setArrowRight();
  setArrowLeft();

  setArticleEvent();
};

/**
 * 언론사 리스트의 설정
 */
const setList = () => {
  const listWrapper = document.querySelector(`.press__wrapper-list`);
  const listElement = `
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

  listWrapper.innerHTML = listElement;
};

const setListMain = () => {
  const mainSection = document.querySelector(`.press-category__section-main`);
  const mainElement = `
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

  mainSection.innerHTML = mainElement;
};

const setListSub = () => {
  const subSection = document.querySelector(`.press-category__section-sub`);
  const subFrame = Array.from({ length: 6 }, (_, idx) => idx);
  const subElement = `
  <footer class='section-sub__footer'> 
    <p class='section-sub__footer-press'></p> 
    <p class='section-sub__footer-text'>&nbsp언론사에서 직접 편집한 뉴스입니다.</p>
  </footer>
  `;

  subFrame.forEach((_) => {
    const subTitle = `
    <h4 class='section-sub__h4'>
      <a class='section-sub__a' href=''></a>
    </h4>
    `;
    subSection.insertAdjacentHTML('beforeend', subTitle);
  });
  subSection.insertAdjacentHTML('beforeend', subElement);
};

const setListNav = (categoryList) => {
  const categorySection = document.querySelector(`.press-category__ul`);
  categoryList.forEach((category) => {
    const categoryElement = `
    <li class='press-category__li'>
      <p class='press-category__p'>${category}</p>
      <div class='press-category__div none'>
        <div class='press-category__div-now'>1</div>
        <div class='press-category__div-divide'>/</div>
        <div class='press-category__div-sum'></div>
      </div>
    </li>
    `;
    categorySection.insertAdjacentHTML('beforeend', categoryElement);
  });
};

/**
 * 언론사 리스트의 Article
 */
const setListShuffle = (pressData, categoryList) => {
  categoryList.forEach((category) => {
    let categoryFilter = pressData.filter((press) => press.categoryName === category);
    if (categoryFilter.length === 0) categoryFilter = pressData.filter((press) => press.name === category);
    LIST.SUFFLE_CATEGORY.push(getShuffle(categoryFilter));
  });
  LIST.PAGE_LENTH = LIST.SUFFLE_CATEGORY[LIST.CATEGORY_COUNT - 1].length;
  LIST.CATEGORY_LENGTH = LIST.SUFFLE_CATEGORY.length;
};

const setListArticle = () => {
  const categoryArticle = LIST.SUFFLE_CATEGORY[LIST.CATEGORY_COUNT - 1][LIST.PAGE_COUNT - 1];

  // 다크모드는 나중에 처리하자
  const sectionMain = document.querySelector('.press-category__section-main');
  sectionMain.querySelector('.section-main__img-logo').src = categoryArticle.lightSrc;
  sectionMain.querySelector('.section-main__edit-time').innerText = categoryArticle.categoryEdit;
  sectionMain.querySelector('.section-main__img-article').src = categoryArticle.categoryImg;
  sectionMain.querySelector('.section-main__h2').innerText = categoryArticle.categoryMainTitle;

  const sectionSub = document.querySelector('.press-category__section-sub');
  const sectionSubList = sectionSub.querySelectorAll('.section-sub__a');
  sectionSub.querySelector('.section-sub__footer-press').innerText = categoryArticle.name;
  sectionSubList.forEach((sub, subIdx) => {
    sub.innerText = categoryArticle.categorySubTitle[subIdx].title;
    sub.href = categoryArticle.categorySubTitle[subIdx].link;
  });
};

/**
 * 언론사 리스트의 Progress Bar
 */
// 함수 줄이기
const setProgressBarClick = () => {
  const progressBar = document.querySelectorAll('.press-category__li');

  progressBar.forEach((progress) => {
    progress.addEventListener('click', () => {
      const removeLi = document.querySelector('.progress-start');
      const removeDiv = removeLi.querySelector('.press-category__div');
      removeLi.classList.remove('progress-start');
      removeDiv.classList.add('none');

      let progressIndex;
      const progressName = progress.querySelector('.press-category__p').innerText;
      const isCategory = LIST.CATEGORY_NAME.includes(progressName);
      const isSubscribe = LIST.SUBSCRIBE_NAME.includes(progressName);

      if (isCategory) progressIndex = LIST.CATEGORY_NAME.findIndex((name) => name === progressName);
      if (isSubscribe) progressIndex = LIST.SUBSCRIBE_NAME.findIndex((name) => name === progressName);

      LIST.CATEGORY_COUNT = progressIndex + 1;
      LIST.PAGE_COUNT = 1;
      LIST.PAGE_LENTH = LIST.SUFFLE_CATEGORY[LIST.CATEGORY_COUNT - 1].length;

      progress.classList.add('progress-start');
      progress.querySelector('.press-category__div').classList.remove('none');
      const progressNow = progress.querySelector('.press-category__div-now');
      const progressSum = progress.querySelector('.press-category__div-sum');

      progressNow.innerText = LIST.PAGE_COUNT;
      progressSum.innerText = LIST.PAGE_LENTH;
    });
  });
};

const setProgressBarEvent = () => {
  const initLi = document.querySelector('.press-category__ul');
  initLi.querySelector('.press-category__li').classList.add('progress-start');
  initLi.querySelector('.press-category__div').classList.remove('none');
  initLi.querySelector('.press-category__div-now').innerText = LIST.PAGE_COUNT;
  initLi.querySelector('.press-category__div-sum').innerText = LIST.PAGE_LENTH;

  const progressBar = document.querySelectorAll('.press-category__li');
  progressBar.forEach((progress) => {
    progress.addEventListener('animationiteration', () => {
      const progressNow = progress.querySelector('.press-category__div-now');
      const progressSum = progress.querySelector('.press-category__div-sum');

      progressNow.innerText = LIST.PAGE_COUNT;
      progressSum.innerText = LIST.PAGE_LENTH;
      getProgressBarEvent(progressNow, progressSum);
    });
  });
};

const getProgressBarEvent = (progressNow, progressSum) => {
  setListArticle();
  const PAGE = LIST.PAGE_COUNT < LIST.PAGE_LENTH;
  const CATEGORY = LIST.CATEGORY_COUNT < LIST.CATEGORY_LENGTH;
  progressNow.innerText = LIST.PAGE_COUNT;
  progressSum.innerText = LIST.PAGE_LENTH;

  if (PAGE) setNextPage(progressNow);
  if (!PAGE && CATEGORY) setNextCategory();
  if (!PAGE && !CATEGORY) setFirstCategory();
};

const setNextPage = (progressNow) => {
  LIST.PAGE_COUNT += 1;
  progressNow.innerText = LIST.PAGE_COUNT;
};

const setNextCategory = () => {
  LIST.CATEGORY_COUNT += 1;
  LIST.PAGE_LENTH = LIST.SUFFLE_CATEGORY[LIST.CATEGORY_COUNT - 1].length;
  LIST.PAGE_COUNT = 1;

  const removeLi = document.querySelector('.progress-start');
  const removeDiv = removeLi.querySelector('.press-category__div');
  const addLi = removeLi.nextElementSibling;
  const addDiv = addLi.querySelector('.press-category__div');

  addLi.querySelector('.press-category__div-now').innerText = LIST.PAGE_COUNT;
  addLi.querySelector('.press-category__div-sum').innerText = LIST.PAGE_LENTH;

  removeLi.classList.remove('progress-start');
  removeDiv.classList.add('none');
  addLi.classList.add('progress-start');
  addDiv.classList.remove('none');
};

const setFirstCategory = () => {
  LIST.CATEGORY_COUNT = 1;
  LIST.PAGE_LENTH = LIST.SUFFLE_CATEGORY[LIST.CATEGORY_COUNT - 1].length;
  LIST.PAGE_COUNT = 1;

  const removeLi = document.querySelector('.progress-start');
  const removeDiv = removeLi.querySelector('.press-category__div');
  const addLi = document.querySelector('.press-category__ul').firstElementChild;
  const addDiv = addLi.querySelector('.press-category__div');

  addLi.querySelector('.press-category__div-now').innerText = LIST.PAGE_COUNT;
  addLi.querySelector('.press-category__div-sum').innerText = LIST.PAGE_LENTH;

  removeLi.classList.remove('progress-start');
  removeDiv.classList.add('none');
  addLi.classList.add('progress-start');
  addDiv.classList.remove('none');
};

/**
 * 언론사 리스트의 Arrow
 */
const setArrowRight = () => {
  const arrowRight = document.querySelector('.arrows-category__img-right');
  arrowRight.addEventListener('click', () => {
    const progressStart = document.querySelector('.progress-start');
    const progressStartClone = progressStart.cloneNode(true);
    progressStart.parentNode.replaceChild(progressStartClone, progressStart);
    const progressNow = progressStartClone.querySelector('.press-category__div-now');
    const progressSum = progressStartClone.querySelector('.press-category__div-sum');

    const PAGE = LIST.PAGE_COUNT < LIST.PAGE_LENTH;
    const CATEGORY = LIST.CATEGORY_COUNT < LIST.CATEGORY_LENGTH;
    progressNow.innerText = LIST.PAGE_COUNT;
    progressSum.innerText = LIST.PAGE_LENTH;

    if (PAGE) setNextPage(progressNow);
    if (!PAGE && CATEGORY) setNextCategory();
    if (!PAGE && !CATEGORY) setFirstCategory();

    setListArticle();
  });
};

const setArrowLeft = () => {
  const arrowLeft = document.querySelector('.arrows-category__img-left');
  arrowLeft.addEventListener('click', () => {
    const progressStart = document.querySelector('.progress-start');
    const progressStartClone = progressStart.cloneNode(true);
    progressStart.parentNode.replaceChild(progressStartClone, progressStart);
    const progressNow = progressStartClone.querySelector('.press-category__div-now');
    const progressSum = progressStartClone.querySelector('.press-category__div-sum');

    const PAGE = 1 < LIST.PAGE_COUNT;
    const CATEGORY = 1 < LIST.CATEGORY_COUNT;
    progressNow.innerText = LIST.PAGE_COUNT;
    progressSum.innerText = LIST.PAGE_LENTH;

    if (PAGE) setPrevPage(progressNow);
    if (!PAGE && CATEGORY) setPrevCategory();
    if (!PAGE && !CATEGORY) setLastCategory();

    setListArticle();
  });
};

const setPrevPage = (progressNow) => {
  LIST.PAGE_COUNT -= 1;
  progressNow.innerText = LIST.PAGE_COUNT;
};

const setPrevCategory = () => {
  LIST.CATEGORY_COUNT -= 1;
  LIST.PAGE_LENTH = LIST.SUFFLE_CATEGORY[LIST.CATEGORY_COUNT - 1].length;
  LIST.PAGE_COUNT = LIST.SUFFLE_CATEGORY[LIST.CATEGORY_COUNT - 1].length;

  const removeLi = document.querySelector('.progress-start');
  const removeDiv = removeLi.querySelector('.press-category__div');
  const addLi = removeLi.previousElementSibling;
  const addDiv = addLi.querySelector('.press-category__div');

  addLi.querySelector('.press-category__div-now').innerText = LIST.PAGE_COUNT;
  addLi.querySelector('.press-category__div-sum').innerText = LIST.PAGE_LENTH;

  removeLi.classList.remove('progress-start');
  removeDiv.classList.add('none');
  addLi.classList.add('progress-start');
  addDiv.classList.remove('none');
};

const setLastCategory = () => {
  LIST.CATEGORY_COUNT = LIST.CATEGORY_LENGTH;
  LIST.PAGE_LENTH = LIST.SUFFLE_CATEGORY[LIST.CATEGORY_COUNT - 1].length;
  LIST.PAGE_COUNT = LIST.SUFFLE_CATEGORY[LIST.CATEGORY_COUNT - 1].length;

  const removeLi = document.querySelector('.progress-start');
  const removeDiv = removeLi.querySelector('.press-category__div');
  const addLi = document.querySelector('.press-category__ul').lastElementChild;
  const addDiv = addLi.querySelector('.press-category__div');

  addLi.querySelector('.press-category__div-now').innerText = LIST.PAGE_COUNT;
  addLi.querySelector('.press-category__div-sum').innerText = LIST.PAGE_LENTH;

  removeLi.classList.remove('progress-start');
  removeDiv.classList.add('none');
  addLi.classList.add('progress-start');
  addDiv.classList.remove('none');
};

/**
 * 언론사 리스트의 CSS 효과
 */
const setArticleEvent = () => {
  const article = document.querySelector('.press-category__article');
  const mainImg = document.querySelector('.section-main__img-article');

  article.addEventListener('mouseenter', () => {
    mainImg.classList.add('section-main__img-article-hover');
  });
  article.addEventListener('mouseleave', () => {
    mainImg.classList.remove('section-main__img-article-hover');
  });
};

export { initPressList };
