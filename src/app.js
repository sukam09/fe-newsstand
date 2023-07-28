import { observe, store, updateStoreId } from "./store/state.js";
import newsStore from "./store/news.js";
import { html } from "./lib/jsx.js";
import Header from "./components/header/Header.js";
import { CATEGORY_OPTIONS } from "./constant.js";
import RecentNewsSection from "./components/recent-news/RecentNewsSection.js";
import { render } from "./lib/render.js";
const app = document.getElementById("app");
(async function () {
    // Initialize
    await newsStore.init();
    store.id = newsStore.getCategoryData({
        category: CATEGORY_OPTIONS[0],
    });
    app.append(html `
      <div class="app__container">
        ${Header()} ${RecentNewsSection()}
        <section class="main__container">
          <h2 class="main__title screen-reader-only">언론사 보기</h2>
        </section>
      </div>
    `);
    // log
    observe(() => {
        console.log(store.filter, store.type, store.idx, store.category);
    });
    observe(updateStoreId);
    observe(() => {
        store.category;
        store.filter;
        render();
    });
})();
