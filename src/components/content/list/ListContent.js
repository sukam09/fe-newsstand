import { html } from "../../../lib/jsx.js";
import SubscribeButton from "../../subscribe/SubscribeButton.js";
const ListContent = (data) => {
    const company = data[0];
    return html `
    <div class="list-page">
      <div class="list-page__nav">
        <a href="${company.url}">
          <img
            src=${`/public/asset/images/light/${company.id}.png`}
            class="logo"
            alt="${company.name}"
          />
        </a>
        <span class="list-page__datetime"
          >${String(company.editTime)} 편집</span
        >
        ${SubscribeButton({
        type: "list",
        company: company,
    })}
      </div>
      <div class="list-page__articles">
        <a href="${company.mainArticle.url}">
          <article class="main-article">
            <img src="${company.mainArticle.thumbnail}" />
            <span> ${company.mainArticle.title} </span>
          </article>
        </a>
        <div class="sub-articles">
          <ul class="sub-articles__list">
            ${company.subArticles.map((article) => html `<li><a href="${article.url}">${article.title}</a></li>`)}
          </ul>
          <div class="copyright">
            ${company.name}에서 직접 편집한 뉴스입니다.
          </div>
        </div>
      </div>
    </div>
  `;
};
export default ListContent;
