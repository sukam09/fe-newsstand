import newsStore from "../store/news.js";
import GridContainer from "../components/content/grid/GridContainer.js";
import ListContainer from "../components/content/list/ListContainer.js";
import ContentNaviagtion from "../components/content/navigation/ContentNavigation.js";
import NoContent from "../components/content/no-content/NoContent.js";
import NextButton from "../components/content/page-button/NextButton.js";
import PrevButton from "../components/content/page-button/PrevButton.js";
import { GRID, LIST } from "../constant.js";
import { store } from "../store/state.js";
import { html } from "./jsx.js";

export const makePage = () => {
  const { data, maxPage } =
    store.type === GRID
      ? newsStore.getGridPageData({
          idx: store.idx,
          subscribe: store.filter === "all" ? false : true,
        })
      : newsStore.getDataById({
          id: store.id[store.idx],
        });
  const hasData = data.length > 0;
  return html`
    <div>
      ${ContentNaviagtion()}
      <div class="page__container">
        ${hasData && [PrevButton(), NextButton({ maxPage })]}
        <main class="view">
          ${hasData
            ? (store.type === GRID && GridContainer({ data })) ||
              (store.type === LIST && ListContainer({ data }))
            : NoContent()}
        </main>
      </div>
    </div>
  `;
};

export const render = () => {
  store.category;
  const mainContainer = document.querySelector(".main__container");
  mainContainer.innerHTML = "";
  mainContainer.append(makePage());
  document.querySelector(".list__nav .active")?.scrollIntoView();
};
