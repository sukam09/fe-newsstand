import { categoryData, pressData } from "../../../../../state/dataState.js";

// 하나의 카테고리의 하나의 페이지
export function createPressList(categoryId, page) {
  const { categoryList } = categoryData;
  const { pressList } = pressData;
  const { pressIdList } = categoryList[categoryId];

  const targetPressList = [...pressList].filter((press) =>
    [...pressIdList].includes(press.id)
  );

  return `
  <div class="news news_${categoryId}_${page}  flex_column">
    ${createNewsHeader(targetPressList[page])}
    ${createNewsBody(targetPressList[page])}
  </div>
  `;
}

function createNewsHeader(press) {
  const newsHeader = `
    <div class="news_header flex_row">
      <img src=${press.lightSrc} />
      <span>${press.data.editTime} 편집</span>
      <button class="news_info_sub_button"> + 구독하기 </button>
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
