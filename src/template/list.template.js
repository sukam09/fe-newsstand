import { html } from "../lib/html.js";
export const ListTemplate = (categories, activeCategory, idx, data) => html `
  <div class="list__container">
    ${ListNavTemplate(categories, activeCategory, idx)}
    <div class="list__page"></div>
    ${ListPageTemplate(data)}
  </div>
`;
/**
 * Company Data를 입력받아 List Page Template Literal을 return 합니다.
 * @param { Company } data
 * @returns { HTMLString }
 */
export const ListPageTemplate = (data) => html `
    <div class="list-page">
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
export const ListNavTemplate = (categories, activeCategory, idx) => html `
    <nav class="list__nav">
      ${categories.reduce((result, category) => result +
    (category.name === activeCategory
        ? html `
                <div class="active">
                  <span class="category-name">${category.name}</span>
                  <span class="category-idx">
                    <span class="category-idx--active">${idx + 1}</span>
                    /${category.amount}</span
                  >
                  <div class="category--progress"></div>
                </div>
              `
        : html `
                <div>
                  <span>${category.name}</span>
                  <span class="category-idx"> /${category.amount}</span>
                </div>
              `), "")}
    </nav>
  `;
