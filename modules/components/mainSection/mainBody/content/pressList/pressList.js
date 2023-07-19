import {
  categoryDataState,
  pressDataState,
} from "../../../../../store/dataState.js";
import { getState } from "../../../../../store/observer.js";

// 하나의 카테고리의 하나의 페이지
export function createPressList(categoryId, page) {
  const { categoryList } = getState(categoryDataState);
  const { pressList } = getState(pressDataState);
  const { pressIdList } = categoryList[categoryId];

  const targetPressList = [...pressList].filter((press) =>
    [...pressIdList].includes(press.id)
  );
  const targetPress = targetPressList[page];

  return `
  <div class="list_press_${
    targetPress.id
  } news news_${categoryId}_${page}  flex_column">
    ${createNewsHeader(targetPress)}
    ${createNewsBody(targetPress)}
  </div>
  `;
}

function createNewsHeader(press) {
  const newsHeader = `
    <div class="news_header flex_row">
      <img src=${press.lightSrc} />
      <span>${press.data.editTime} 편집</span>
      <button  key="sub_${press.id}" class="list_sub_button"> + 구독하기 </button>
      <button key="unsub_${press.id}" class="list_unsub_button"> x </button>
    </div>
    `;

  return newsHeader;
}

function createNewsBody(press) {
  const newsBody = `
    <div class="flex_row">
      ${createMainNews(press)}
      <div>
        ${createSubNews(press.data.subTitleList)} 
        <span class="caption">${press.data.caption}</span>
      </div>
    </div>
    `;

  return newsBody;
}

function createMainNews(press) {
  const mainNews = `
    <div class="main_news flex_column">
      <div class="main_news_img_container"> 
        <img src=${press.data.mainImgSrc} class="main_news_img"/>
      </div>
      <div class="main_news_title">${press.data.mainTitle}</div>
    </div>`;

  return mainNews;
}

function createSubNews(subTitleList) {
  let newsList = "";
  for (let i = 0; i < subTitleList.length; i++) {
    newsList += `<li>${subTitleList[i].title}</li>`;
  }
  const subNews = `
    <ul class="sub_news">
      ${newsList}
    </ul>
    `;

  return subNews;
}
