import { gridItemTemplate, gridTemplate } from "../template/grid.template.js";
import { ListTemplate } from "../template/list.template.js";
import { qs } from "./dom.js";
import { html } from "./html.js";
import { getGridPageData, getListPageData } from "../api/index.js";
import { PAGINATION_UNIT } from "../config.js";
const $view = qs(".view");
async function renderGridView(idx) {
    // grid data fetching
    const data = await getGridPageData(idx);
    // empty data padding
    while (data.length < PAGINATION_UNIT) {
        // @ts-ignore
        data.push({});
    }
    // render
    $view.innerHTML = gridTemplate(data.reduce((acc, cur) => {
        return acc + gridItemTemplate(cur);
    }, ""));
}
async function renderListView(idx) {
    // list data fetching
    const data = await getListPageData("종합/경제", idx);
    $view.innerHTML = ListTemplate(data);
    // $view.innerHTML = ListTemplate(data);
}
function renderView(type, idx) {
    try {
        switch (type) {
            case "grid":
                renderGridView(idx);
                break;
            case "list":
                renderListView(idx);
                break;
            default:
                throw new Error("Invalid View Type");
        }
    }
    catch (error) {
        console.error(error);
    }
}
function renderListViewPage(data) {
    const $listViewPage = document.querySelector(".list-view");
    // $listViewPage.innerHTML = "";
    $listViewPage.innerHTML = html `
    <div class="list-view">
      <div class="list-page__nav">
        <a href="${data.url}">
          <img
            src="/public/asset/images/light/${data.id}.png"
            class="logo"
            alt="${data.name}"
          />
        </a>
        <span class="list-page__datetime">${String(data.editTime)} 편집</span>
        <button class="subscribe__btn">구독하기</button>
      </div>
      <div class="list-page__articles">
        <a href="${data.mainArticle.url}">
          <article class="main-article">
            <img src="${data.mainArticle.thumbnail}" />
            <span> ${data.mainArticle.title} </span>
          </article>
        </a>
        <div class="sub-articles">
          <ul class="sub-articles__list">
            ${data.subArticles
        .slice(0, 6)
        .reduce((accumulator, article) => accumulator +
        `<li><a href="${article.url}">${article.title}</a></li>`, "")}
          </ul>
          <div class="copyright">${data.name}에서 직접 편집한 뉴스입니다.</div>
        </div>
      </div>
    </div>
  `;
}
export { renderView };
