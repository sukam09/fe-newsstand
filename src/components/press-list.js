import { getShuffleIds, getSliceIds } from '../utils/shuffle.js';
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
  setListArrow(); // 기능 추가 전
  setListCategory(pressData, categoryList);
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
 * 언론사 리스트의 화살표
 */
const setListArrow = () => {
  const arrowLeft = document.querySelector(`.arrows-category__img-left`);
  const arrowRight = document.querySelector(`.arrows-category__img-right`);

  // 이벤트 설정
};

///////////////////////////////////////////////////////////////

/**
 * 언론사 리스트의 기사
 */

const setListCategory = (pressData, categoryList) => {
  const categoryName = categoryList[LIST.PAGE];

  // 카테고리 <-> 구독 언론사 분리
  let categoryFilter = pressData.filter((press) => press.categoryName === categoryName);
  if (categoryFilter.length === 0) categoryFilter = pressData.filter((press) => press.name === categoryName);
  LIST.PAGE_LENTH = categoryFilter.length; // 이거는 카테고리의 길이 수정

  setListArticle(categoryFilter);
};

/// 화면 갈아줌
const setListArticle = (categoryFilter) => {
  const categoryArticle = categoryFilter[LIST.PAGE_COUNT];
  LIST.PAGE_COUNT += 1; // 페이지 카운트 증가 // 예외 처리 해줘야함

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

///////////////////////////////////////////////////////////////

/**
 * List 화살표 넘겨주기
 */
const setPressArrowElement = (initCategoryArticleList) => {
  const arrowRight = document.querySelector('.press__wrapper-list .arrows__img-right');

  arrowRight.addEventListener('click', () => {
    currentCategory += 1;
    const currentLi = document.querySelector('.progress-start');
    const nextLi = currentLi.nextElementSibling;

    currentLi.classList.remove('progress-start');
    nextLi.classList.add('progress-start');
    currentLi.querySelector('.press-category__div').classList.add('none');
    nextLi.querySelector('.press-category__div').classList.remove('none');

    ///
    const sectionMain = document.querySelector('.press-category__section-main');
    sectionMain.querySelector('.section-main__img-logo').src = initCategoryArticleList[currentCategory].logoSrc;
    sectionMain.querySelector('.section-main__edit-time').innerText = initCategoryArticleList[currentCategory].editTime;
    sectionMain.querySelector('.section-main__img-article').src = initCategoryArticleList[currentCategory].imgSrc;
    sectionMain.querySelector('.section-main__h2').innerText = initCategoryArticleList[currentCategory].mainTitle;

    const sectionSub = document.querySelector('.press-category__section-sub');
    const sectionSubList = sectionSub.querySelectorAll('.press-category__a-sub');
    sectionSub.querySelector('.section-sub__footer-press').innerText = initCategoryArticleList[currentCategory].name;

    sectionSubList.forEach((sub, subIdx) => {
      sub.href = initCategoryArticleList[currentCategory].subTitleList[subIdx].link;
      sub.innerText = initCategoryArticleList[currentCategory].subTitleList[subIdx].title;
    });
  });
};

/**
 * 카테고리 별 다음 언론사 화면으로 넘어가기
 */
const setPressCategoryArticleNext = (categoryData, shufflePressList) => {
  const imgList = document.querySelector('.press__img-list');
  const imgGrid = document.querySelector('.press__img-grid');
  const liList = document.querySelectorAll('.press-category__li');
  let interval;

  imgList.addEventListener('click', () => {
    interval = setInterval(() => {
      const [categoryArticleList, shuffleArticle, divNow] = getPressCategoryArticle(categoryData, shufflePressList);
      setPressCategoryArticle(categoryArticleList, shuffleArticle, divNow);
    }, 20000);
  });

  imgGrid.addEventListener('click', () => {
    clearInterval(interval);
    const addLi = document.querySelector('.press-category__ul').firstElementChild;
    const removeLi = document.querySelector('.progress-start');
    const addDiv = removeLi.querySelector('.press-category__div');
    const removeDiv = addLi.querySelector('.press-category__div');

    removeLi.classList.remove('progress-start');
    addDiv.classList.add('none');
    addLi.classList.add('progress-start');
    removeDiv.classList.remove('none');
  });

  liList.forEach((li) => {
    li.addEventListener('click', () => {
      clearInterval(interval);
      interval = setInterval(() => {
        const [categoryArticleList, shuffleArticle, divNow] = getPressCategoryArticle(categoryData, shufflePressList);
        setPressCategoryArticle(categoryArticleList, shuffleArticle, divNow);
      }, 20000);
      currentArticle = 0;
    });
  });
};

/**
 * 카테고리 별 랜덤 언론사 화면 가져오기
 */
const getPressCategoryArticle = (categoryData, shufflePressList) => {
  const li = document.querySelector('.progress-start');

  const categoryName = li.querySelector('.press-category__p').innerText;
  const divNow = li.querySelector('.press-category__div-now');
  const categoryArticle = categoryData.filter((data) => data.categoryName === categoryName)[0];
  const shuffleArticle = shufflePressList.filter((_, idx) => categoryArticle.categoryId === idx)[0];
  const categoryArticleList = categoryArticle.categoryData;

  return [categoryArticleList, shuffleArticle, divNow];
};

/**
 * 카테고리 별 랜덤 언론사 화면 넘겨주기
 */
const setPressCategoryArticle = (categoryArticleList, shuffleArticle, divNow) => {
  currentArticle += 1;

  if (currentArticle + 1 > categoryArticleList.length) {
    currentArticle = 0;
    currentCategory += 1;

    const removeLi = document.querySelector('.progress-start');
    const addDiv = removeLi.querySelector('.press-category__div');
    const addLi = removeLi.nextElementSibling
      ? removeLi.nextElementSibling
      : document.querySelector('.press-category__ul').firstElementChild;
    const removeDiv = addLi.querySelector('.press-category__div');

    removeLi.classList.remove('progress-start');
    addDiv.classList.add('none');
    addLi.classList.add('progress-start');
    removeDiv.classList.remove('none');
  }

  let changeIdx = shuffleArticle[currentArticle];
  const sectionMain = document.querySelector('.press-category__section-main');

  sectionMain.querySelector('.section-main__img-logo').src = categoryArticleList[changeIdx].logoSrc;
  sectionMain.querySelector('.section-main__edit-time').innerText = categoryArticleList[changeIdx].editTime;
  sectionMain.querySelector('.section-main__img-article').src = categoryArticleList[changeIdx].imgSrc;
  sectionMain.querySelector('.section-main__h2').innerText = categoryArticleList[changeIdx].mainTitle;

  const sectionSub = document.querySelector('.press-category__section-sub');
  const sectionSubList = sectionSub.querySelectorAll('.press-category__a-sub');
  sectionSub.querySelector('.section-sub__footer-press').innerText = categoryArticleList[changeIdx].name;

  sectionSubList.forEach((sub, subIdx) => {
    sub.href = categoryArticleList[changeIdx].subTitleList[subIdx].link;
    sub.innerText = categoryArticleList[changeIdx].subTitleList[subIdx].title;
  });

  divNow.innerText = currentArticle + 1;
};

/**
 * 카테고리 별 랜덤 언론사 화면 가져오기
 */
const getPressCategoryArticleInit = (categoryData, shufflePressList) => {
  const liList = document.querySelectorAll('.press-category__li');

  const initCategoryArticleList = [...liList].map((li) => {
    const categoryName = li.querySelector('.press-category__p').innerText;
    const categoryArticle = categoryData.filter((data) => data.categoryName === categoryName)[0];
    const shuffleArticle = shufflePressList.filter((_, idx) => categoryArticle.categoryId === idx)[0];

    const initShuffleArticle = shuffleArticle[0];
    const initCategoryArticle = categoryArticle.categoryData[initShuffleArticle];

    return initCategoryArticle;
  });

  return initCategoryArticleList;
};

/**
 * 카테고리 별 랜덤 언론사 화면 적용하기
 */
const setPressCategoryArticleInit = (initCategoryArticleList) => {
  const liList = document.querySelectorAll('.press-category__li');

  liList.forEach((li, liIdx) => {
    li.addEventListener('click', () => {
      const sectionMain = document.querySelector('.press-category__section-main');
      sectionMain.querySelector('.section-main__img-logo').src = initCategoryArticleList[liIdx].logoSrc;
      sectionMain.querySelector('.section-main__edit-time').innerText = initCategoryArticleList[liIdx].editTime;
      sectionMain.querySelector('.section-main__img-article').src = initCategoryArticleList[liIdx].imgSrc;
      sectionMain.querySelector('.section-main__h2').innerText = initCategoryArticleList[liIdx].mainTitle;

      const sectionSub = document.querySelector('.press-category__section-sub');
      const sectionSubList = sectionSub.querySelectorAll('.press-category__a-sub');
      sectionSub.querySelector('.section-sub__footer-press').innerText = initCategoryArticleList[liIdx].name;

      sectionSubList.forEach((sub, subIdx) => {
        sub.href = initCategoryArticleList[liIdx].subTitleList[subIdx].link;
        sub.innerText = initCategoryArticleList[liIdx].subTitleList[subIdx].title;
      });
    });
  });
};

const getPressList = (categoryData) => {
  const shfflePressList = [];
  categoryData.forEach((data) => {
    let shufflePress = Array.from({ length: data.categoryData.length }, (_, idx) => idx);
    shuffleList(shufflePress);
    shfflePressList.push(shufflePress);
  });

  return shfflePressList;
};

/**
 * LIST의 NAV 화면 - Progress Bar 설정
 */
const setProgressBar = (categoryData) => {
  const liList = document.querySelectorAll('.press-category__li');

  liList.forEach((li) => {
    li.addEventListener('click', () => {
      const removeLi = document.querySelector('.progress-start');
      const addDiv = removeLi.querySelector('.press-category__div');
      const removeDiv = li.querySelector('.press-category__div');

      removeLi.classList.remove('progress-start');
      addDiv.classList.add('none');
      li.classList.add('progress-start');
      removeDiv.classList.remove('none');
    });
  });

  const initLi = document.querySelector('.press-category__ul');
  initLi.firstElementChild.classList.add('progress-start');
  const initDiv = initLi.querySelector('.press-category__div');
  initDiv.classList.remove('none');
};

export { initPressList };
