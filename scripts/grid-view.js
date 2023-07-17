import { NEWS_COUNT, VIEW_TYPE } from "../constants/index.js";
import { store, useSelector } from "../store/index.js";
import { addSubscribe } from "../store/reducer/subscribe-list.js";
import { SubscribeButton } from "./components.js";
import { $nextPageButton, $prevPageButton } from "./doms.js";

const fillGridView = (newsData, currentPage) => {
  const theme = useSelector((state) => state.theme.currentTheme);
  const $gridView = document.querySelector(".grid-view");

  const startIdx = currentPage * NEWS_COUNT;

  $gridView.innerHTML = Array.from(
    { length: NEWS_COUNT },
    (_, i) => i + startIdx
  ).reduce((acc, curr) => {
    const subscribeList = useSelector((state) => state.subscribeList);
    const isSubscribed = subscribeList.includes(newsData[curr].name);

    return (acc += `<li class="grid-cell">
      <img
        class="brand-mark"
        src="${newsData[curr].src[theme]}" 
        alt="${newsData[curr].name}" />
      ${SubscribeButton(isSubscribed)}
    </li>`);
  }, "");

  const $buttons = $gridView.querySelectorAll(".subscribe-btn");
  $buttons.forEach(($button) => {
    $button.addEventListener("click", (e) => {
      const name = e.currentTarget.previousElementSibling.alt;

      store.dispatch(addSubscribe(name));
    });
  });
};

const initGridView = (newsData) => {
  const currentPage = useSelector((state) => state.page.currentPage);
  fillGridView(newsData, currentPage);
};

const getMaxPage = (data) => {
  return Math.floor(data.length / NEWS_COUNT) - 1;
};

const updateButtonUI = (currentPage, maxPage) => {
  if (currentPage === 0) {
    $prevPageButton.classList.add("hidden");
  } else {
    $prevPageButton.classList.remove("hidden");
  }

  if (currentPage === maxPage) {
    $nextPageButton.classList.add("hidden");
  } else {
    $nextPageButton.classList.remove("hidden");
  }
};

export const renderGridView = (newsData) => {
  const maxPage = getMaxPage(newsData);
  initGridView(newsData);

  store.subscribe(() => {
    const { currentPage, viewType } = useSelector((state) => state.page);
    if (viewType !== VIEW_TYPE.GRID) return;

    fillGridView(newsData, currentPage);

    updateButtonUI(currentPage, maxPage);
  });
};
