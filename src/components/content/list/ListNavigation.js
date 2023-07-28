import newsStore from "../../../store/news.js";
import { CATEGORY_OPTIONS } from "../../../constant.js";
import { html } from "../../../lib/jsx.js";
import { store } from "../../../store/state.js";
const CHEVRON_RIGHT_ICON_PATH = "/public/asset/icon/chevron-right.svg";
const isActiveAll = (category) => category === CATEGORY_OPTIONS[store.category];
const isActiveSubscribe = (id) => id === store.id[store.idx];
const isSubscribe = () => (store.filter === "all" ? false : true);
const ListNavigation = () => {
    const subscribe = isSubscribe();
    const categories = newsStore.getListNavigationData({
        subscribe,
    });
    return html `
    <nav class="list__nav">
      ${!subscribe &&
        categories.map(({ category, length }) => {
            const active = isActiveAll(category);
            return html `
          <div
            class=${active && "active"}
            onClick=${() => {
                store.category = CATEGORY_OPTIONS.indexOf(category);
                store.id = newsStore.getCategoryData({ category });
                store.idx = 0;
            }}
          >
            <span class="category-name">${category}</span>

            ${active &&
                html `
              <span class="category-idx">
                <span class=${active && `category-idx--active`}>
                  ${store.idx + 1}
                </span>
                /${length}
              </span>
            `}
            ${active &&
                html ` <div
              class="category--progress"
              onAnimationEnd=${() => store.idx++}
            ></div>`}
          </div>
        `;
        })}
      ${subscribe &&
        categories.map(({ id, name }) => {
            const active = isActiveSubscribe(id);
            return html ` <div
          class=${active && "active"}
          onClick=${() => (store.idx = store.id.indexOf(id))}
        >
          <span class="category-name">${name}</span>

          ${active &&
                html `
            <div
              class="category--progress"
              onAnimationEnd=${() => store.idx++}
            />
          `}
          ${active && html `<img src=${CHEVRON_RIGHT_ICON_PATH} />`}
        </div>`;
        })}
    </nav>
  `;
};
export default ListNavigation;
