import { fetchData } from "../../utils/js/getJson.js";
import { getQuerySelector, getQuerySelectorAll } from "../../utils/js/getElements.js";

const categoryObj = {
  "종합/경제" : [],
  "방송/통신" : [],
  "IT" : [],
  "영자지" : [],
  "스포츠/연예" : [],
  "매거진/전문지" : [],
  "지역" : []
};

// 뉴스리스트에 필요한 요소들 받아오기
export async function getNewsData() {
  const NewsPath = await fetchData("../assets/data/newspaperSrc.json");
  NewsPath.newsList.map((elem) => {
    categoryObj[elem.category].push({"name" : elem.name, "lightSrc" : elem.lightSrc, "editDate" : elem.editDate, "mainNews" : elem.mainNews, "subNews" : elem.subNews});
  }) 
}

// 뉴스리스트 요소들 보여주기
export function showListNewsData(category, newsIdx) {
  const contentBigNews = getQuerySelector(document, ".press-content-big-news");
  // console.log(categoryObj[category][newsIdx-1].subNews);
  contentBigNews.innerHTML = `<img src="${categoryObj[category][newsIdx-1].mainNews.thumbnail}">
  <span>${categoryObj[category][newsIdx-1].mainNews.title}</span>`;

  //리팩토링 고민중
  // const pressContentNewsLogo = getQuerySelector(document, ".press-content-news-info").insertAdjacentElement("afterbegin", `<img src="${categoryObj[category][newsIdx-1].lightSrc}"/>`);
  const pressContentNewsLogo = getQuerySelector(document, ".press-content-news-info");
  pressContentNewsLogo.innerHTML = `<img src="${categoryObj[category][newsIdx-1].lightSrc}"/>
  <span class="press-content-news-info-time">${categoryObj[category][newsIdx-1].editDate}</span>
  <button class="press-content-news-info-subscribe">+ 구독하기</button>
  `

  const pressNewsContentHeadlines = getQuerySelector(document, ".press-content-news-headlines");
  const putSubTitles = categoryObj[category][newsIdx-1].subNews.reduce((acc, _, idx)=> {
    return acc + `<span class="press-content-news-title">${categoryObj[category][newsIdx-1].subNews[idx]}</span>`
  }, "");
  
  // getQuerySelector(document, '.press-content-news-info-time').innerHTML = categoryObj[category][newsIdx-1].editDate;

  pressNewsContentHeadlines.innerHTML = putSubTitles;
}

