import { html } from "./html.js";
function renderGrid(page, PAGINATION_NUM) {
    const $companyList = document.querySelector(".company-list");
    // 기존 페이지 제거
    $companyList.innerHTML = "";
    // 새로운 child append
    const newGrid = page.map((data) => {
        const $li = document.createElement("li");
        const $img = document.createElement("img");
        $li.appendChild($img);
        $img.src = `/public/asset/images/light/${data.id}.png`;
        $img.alt = data.name;
        $img.className = "logo";
        const $button = document.createElement("button");
        $button.innerText = "test";
        $button.className = "agency-btn-hover";
        $li.addEventListener("mouseenter", function () {
            $li.appendChild($button);
        });
        $li.addEventListener("mouseleave", function () {
            $li.removeChild($button);
        });
        return $li;
    });
    while (newGrid.length < PAGINATION_NUM) {
        const $li = document.createElement("li");
        newGrid.push($li);
    }
    $companyList.append(...newGrid);
}
function renderListViewPage(data) {
    const $listViewPage = document.querySelector(".list-page");
    // $listViewPage.innerHTML = "";
    $listViewPage.innerHTML = html `
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
  `;
}
export { renderGrid, renderListViewPage };
