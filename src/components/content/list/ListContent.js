import { html } from "../../../lib/jsx.js";
import SubscribeButton from "../../subscribe/SubscribeButton.js";
const ListContent = (data) => {
    const $template = html `
    <div class="list-page">
      <div class="list-page__nav">
        <a href="${data.url}">
          <img
            src=${`/public/asset/images/light/${data.id}.png`}
            class="logo"
            alt="${data.name}"
          />
        </a>
        <span class="list-page__datetime">${String(data.editTime)} 편집</span>
        ${SubscribeButton({
        type: "list",
        subscribe: data.subscribe,
    })}
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
            ${data.subArticles.map((article) => html `<li><a href="${article.url}">${article.title}</a></li>`)}
          </ul>
          <div class="copyright">${data.name}에서 직접 편집한 뉴스입니다.</div>
        </div>
      </div>
    </div>
  `;
    return $template;
};
export default ListContent;
