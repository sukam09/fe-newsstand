import { html } from "../../lib/jsx.js";
import SubscribeButton from "../subscribe/SubscribeButton.js";
const ListContainer = ({ data }) => {
    const $template = html `
      <div class="list__container">
        <div class="list__page"></div>
        ${ListContent(data)}
      </div>
    `;
    return $template;
};
const isActive = () => false;
const ListNav = () => {
    const $template = html `
    <nav class="list__nav">
      ${categories.map((category) => html `
          <div class="active">
            <span class="category-name">${category.name}</span>

            ${isActive() &&
        html ` <span class="category-idx">
                <span class="category-idx--active"> ${idx + 1} </span>
                /${category.amount}
              </span>
              <div class="category--progress"></div>`}
          </div>
        `)}
    </nav>
  `;
    return $template;
};
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
        toggleSubscribe: () => console.log("구독하기"),
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
    console.log($template);
    return $template;
};
export default ListContainer;
