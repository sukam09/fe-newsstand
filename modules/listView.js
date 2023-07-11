import { fetchData } from "./utils.js";

let listPage = 0;
const MAX_LIST_PAGE = 7;

export function showListage(page) {}
export function showNextListPage() {
  listPage >= MAX_LIST_PAGE ? MAX_LIST_PAGE : (listPage += 1);
}
export function showPrevListPage() {
  listPage <= 0 ? 0 : (listPage -= 1);
}

export async function initListNews() {
  console.log("test");
  const newsData = await fetchData("/data/news.json");
  const { categoryName, dataLen, data } = newsData;
  const $categoryName = document.getElementsByClassName("category_name")[0];
  const $nowPage = document.getElementsByClassName("now_page")[0];
  const $allPage = document.getElementsByClassName("all_page")[0];
  const $listContainer = document.getElementsByClassName("list_container")[0];
  // header
  $categoryName.innerHTML = categoryName;
  $nowPage.innerHTML = "1";
  $allPage.innerHTML = `/ ${newsData.dataLen}`;

  for (let i = 0; i < dataLen; i++) {
    // create header
    const newsInfoHeader = `
    <div class="news_info_header">
      <img src=${data[i].logoSrc} />
      <button class="news_info_sub_button"> + 구독하기 </button>
    </div>
    `;

    const newsInfoTopic = `
    <div class="news_info_topic flex_column">
      <img src=${data[i].imgSrc} class="news_info_main_img"/>
      <div class="news_info_title">${data[i].mainTitle}</div>
    </div>`;

    let newsList = "";
    for (let j = 0; j < data[i].subTitleList.length; j++) {
      newsList += `<li>${data[i].subTitleList[j].title}</li>`;
    }
    const newsInfoList = `
    <ul>
      ${newsList}
    </ul
    `;

    const newsInfoBody = `
    <div>
      ${newsInfoTopic}
      ${newsInfoList}
    </div>
    `;

    const $newsInfo = `<div class="news_info news_info_${i} flex_column">
      ${newsInfoHeader}
      ${newsInfoBody}
    </div>
    `;

    $listContainer.insertAdjacentHTML("beforeend", $newsInfo);
    console.log($newsInfo);
  }
}
