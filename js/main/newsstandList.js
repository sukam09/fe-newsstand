import { getNewsListData } from '../core/apis.js';
import { createCategoryHtml } from '../components/newsCategory.js.js';
import { addEventListener, removeEventListener } from '../core/eventListener.js';
import { createNewsListHtml } from '../components/newsStandList.js';

let CATEGORY = [];
let NEWS_LIST = [];
let KEY = '방송/통신';
let CURRENT_CATEGORY = 0;
let CURRENT_INDEX = 1;
let NEWCATEGORY = [];

async function initNewsStandList() {
  const datas = await getNewsListData();
  CATEGORY = getCategoryList(datas);
  NEWCATEGORY = categorysParser(CATEGORY);
  createCategoryHtml(CATEGORY, CURRENT_INDEX, KEY);
  NEWS_LIST = getNewsListFilter(NEWCATEGORY, datas);
  createNewsListHtml(NEWS_LIST[0][0]);
}

function handleRightBtn() {
  console.log('right');
  const newNewsList = nextNewsList();
  createCategoryHtml(CATEGORY, CURRENT_INDEX, KEY);
  createNewsListHtml(newNewsList);

  isBtnDisabled();
}
function handleLeftBtn() {
  console.log('left');
  const newNewsList = prevNewsList();
  createCategoryHtml(CATEGORY, CURRENT_INDEX, KEY);
  createNewsListHtml(newNewsList);

  //isBtnDisabled();
}

function addListBtn() {
  const rightBtn = document.querySelector('.newslist--right-btn');
  const leftBtn = document.querySelector('.newslist--left-btn');

  addEventListener('click', rightBtn, handleRightBtn);
  addEventListener('click', leftBtn, handleLeftBtn);
  isBtnDisabled();
}
function removeListBtn() {
  const rightBtn = document.querySelector('.newslist--right-btn');
  //const leftBtn = document.querySelector('.newslist--left-btn');
  removeEventListener('click', rightBtn, handleRightBtn);
  //removeEventListener('click', leftBtn, handleLeftBtn);

  document.querySelector('.news-Rbtn').classList.remove('newslist--right-btn');
  //document.querySelector('.news-Lbtn').classList.remove('newslist--left-btn');
}

function nextNewsList() {
  if (CURRENT_INDEX === NEWS_LIST[CURRENT_CATEGORY].length) {
    CURRENT_CATEGORY++;
    CURRENT_INDEX = 0;
    KEY = NEWCATEGORY[CURRENT_CATEGORY];
  }
  return NEWS_LIST[CURRENT_CATEGORY][CURRENT_INDEX++];
}

function prevNewsList() {
  CURRENT_INDEX -= 1;
  if (CURRENT_INDEX < 1) {
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
  category.forEach((d) => {
    newsList.push(datas.filter((data) => data.category === d));
  });
  return newsList;
}

function categorysParser(datas) {
  return [...new Set(datas)];
}

function isBtnDisabled() {
  const leftBtn = document.querySelector('.newslist--left-btn');
  CURRENT_INDEX === 1 ? leftBtn.classList.add('disabled') : leftBtn.classList.remove('disabled');
}
export { initNewsStandList, addListBtn, removeListBtn };

/*
프로그래시브바가 한번씩 찰때마다 
언론사를 20초 마다 한개씩 보여줌
버튼을 통해서 언론사 이동 가능

마지막 순서의 언론사를 보여주면 다음 카테고리로 이동 
마지막에 보인 카테고리에서 넘어가려면 첫카테고리로 이동
*/
