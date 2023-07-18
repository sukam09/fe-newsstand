import { getNewsListData } from '../core/apis.js';
import { createCategoryHtml } from '../components/newsCategory.js.js';
import { attachEventListener, detachEventListener } from '../core/eventListener.js';
import { createNewsListHtml } from '../components/newsStandList.js';
import { shuffle } from '../utils/utils.js';
import { store } from '../store.js';

let CATEGORY = [];
let NEWS_LIST = [];
let KEY = '';
let CURRENT_CATEGORY = 0;
let CURRENT_INDEX = 0;
let NEWCATEGORY = [];

async function initNewsStandList() {
  CURRENT_CATEGORY = 0;
  CURRENT_INDEX = 0;

  const datas = await getNewsListData();
  CATEGORY = getCategoryList(datas);
  NEWCATEGORY = categorysParser(CATEGORY);
  KEY = NEWCATEGORY[0];
  createCategoryHtml(CATEGORY, NEWCATEGORY, CURRENT_INDEX, KEY);
  NEWS_LIST = getNewsListFilter(NEWCATEGORY, datas);
  createNewsListHtml(NEWS_LIST[0][0]);
  isProgressBarEnd();
  selectCategoryEvent();
}

function handleRightBtn() {
  const newNewsList = nextNewsList();
  reCreateNewsStandList(newNewsList);
}
function handleLeftBtn() {
  const newNewsList = prevNewsList();
  reCreateNewsStandList(newNewsList);
}

function toggleListEventListner(type) {
  const rightBtn = document.querySelector('.newslist--right-btn');
  const leftBtn = document.querySelector('.newslist--left-btn');

  if (type === 'attach') {
    attachEventListener('click', rightBtn, handleRightBtn);
    attachEventListener('click', leftBtn, handleLeftBtn);
    isBtnDisabled();
  } else if (type === 'detach') {
    detachEventListener('click', rightBtn, handleRightBtn);
    detachEventListener('click', leftBtn, handleLeftBtn);
    document.querySelector('.news-Rbtn').classList.remove('newslist--right-btn');
    document.querySelector('.news-Lbtn').classList.remove('newslist--left-btn');
  }
}

function nextNewsList() {
  if (CURRENT_INDEX === NEWS_LIST[CURRENT_CATEGORY].length - 1) {
    CURRENT_CATEGORY++;
    if (CURRENT_CATEGORY === 7) CURRENT_CATEGORY = 0;
    CURRENT_INDEX = 0;
    KEY = NEWCATEGORY[CURRENT_CATEGORY];
    return NEWS_LIST[CURRENT_CATEGORY][CURRENT_INDEX];
  } else {
    return NEWS_LIST[CURRENT_CATEGORY][++CURRENT_INDEX];
  }
}

function prevNewsList() {
  CURRENT_INDEX -= 1;
  if (CURRENT_INDEX < 0) {
    KEY = NEWCATEGORY[--CURRENT_CATEGORY];
    CURRENT_INDEX = CATEGORY.filter((name) => name === KEY).length - 1;
  }
  return NEWS_LIST[CURRENT_CATEGORY][CURRENT_INDEX];
}

function getCategoryList(datas) {
  return datas.map((data) => data.category);
}

function getNewsListFilter(category, datas) {
  const newsList = [];
  category.forEach((d) => newsList.push(datas.filter((data) => data.category === d)));
  return newsList;
}

function categorysParser(datas) {
  return shuffle([...new Set(datas)]);
}

function isBtnDisabled() {
  const leftBtn = document.querySelector('.newslist--left-btn');
  CURRENT_CATEGORY === 0 && CURRENT_INDEX === 0
    ? leftBtn.classList.add('disabled')
    : leftBtn.classList.remove('disabled');
}

function isProgressBarEnd() {
  const progressBar = document.querySelector('.select-category');
  attachEventListener('animationiteration', progressBar, () => {
    const newNewsList = nextNewsList();
    reCreateNewsStandList(newNewsList);
  });
}

function reCreateNewsStandList(newNewsList) {
  createCategoryHtml(CATEGORY, NEWCATEGORY, CURRENT_INDEX, KEY);
  createNewsListHtml(newNewsList);
  const btnSubscribe = document.querySelector('.header-btn-subscribe');
  btnSubscribe.addEventListener('click', (e) => isSubScribeHandler(e));
  isBtnDisabled();
  isProgressBarEnd();
}

const isSubScribeHandler = (e) => {
  const data = e.target.parentElement.querySelector('.list-header-title').textContent;
  if (!store.getGetter('getsubscribeData').includes(data)) {
    store.commit('setState', data);
    e.target.textContent = 'X';
  } else {
    store.commit('updateState', data);
    e.target.textContent = '+ 구독하기';
  }
};

function selectCategoryEvent() {
  const categoryEle = document.querySelector('.newsstand__category');
  categoryEle.addEventListener('click', (e) => {
    KEY = e.target.textContent;
    CURRENT_INDEX = 0;
    CURRENT_CATEGORY = NEWCATEGORY.indexOf(KEY);
    createCategoryHtml(CATEGORY, NEWCATEGORY, CURRENT_INDEX, KEY);
    createNewsListHtml(NEWS_LIST[CURRENT_CATEGORY][CURRENT_INDEX]);
    isProgressBarEnd();
    selectCategoryEvent();
  });
}
export { initNewsStandList, toggleListEventListner };
