import { NEWS_COUNT, TAB_TYPE, VIEW_TYPE } from "../constants/index.js";
import { NewsDB } from "../core/db.js";
import { store, useSelector } from "../store/index.js";
import { openModal } from "../store/reducer/modal.js";
import { openSnackbar } from "../store/reducer/snackbar.js";
import { addSubscribe } from "../store/reducer/subscribe-list.js";
import { SubscribeButton } from "./components.js";
import { $nextPageButton, $prevPageButton } from "./doms.js";

const $gridView = document.querySelector(".grid-view");

function fillGridView(newsData, currentPage) {
  const theme = useSelector((state) => state.theme.currentTheme);

  const startIdx = currentPage * NEWS_COUNT;
  const subscribeList = useSelector((state) => state.subscribeList);

  $gridView.innerHTML = Array.from(
    { length: NEWS_COUNT },
    (_, i) => i + startIdx
  ).reduce((acc, curr) => {
    if (!newsData[curr]) {
      return acc + `<li class="grid-cell"></li>`;
    }

    const isSubscribed = subscribeList.includes(newsData[curr].name);

    return (acc += `<li class="grid-cell">
      <img
        class="brand-mark"
        src="${newsData[curr].src[theme]}" 
        alt="${newsData[curr].name}" />
      ${SubscribeButton(isSubscribed)}
    </li>`);
  }, "");
}

function handleSubscribeButtonClick(e) {
  const $button = e.target.closest(".subscribe-btn");
  if (!$button) return;

  const name = $button.previousElementSibling.alt;
  const isSubscribed = JSON.parse($button.dataset.subscribed);

  if (isSubscribed) {
    store.dispatch(openModal(name));
    return;
  }

  store.dispatch(openSnackbar());
  store.dispatch(addSubscribe(name));
}

function addEventHandlerOnGridView() {
  $gridView.addEventListener("click", handleSubscribeButtonClick);
}

function initGridView(newsData) {
  const currentPage = useSelector((state) => state.page.currentPage);
  fillGridView(newsData, currentPage);
}

function getMaxPage(data) {
  return Math.floor((data.length - 1) / NEWS_COUNT);
}

function updateButtonUI(currentPage, maxPage) {
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
}

function renderGridViewOnSubscribe(currentPage) {
  const subscribeList = useSelector((state) => state.subscribeList);
  const newsData = subscribeList.map((press) => ({
    name: press,
    ...NewsDB.getNewsOneByName(press),
  }));
  const maxPage = getMaxPage(newsData);

  fillGridView(newsData, currentPage);
  updateButtonUI(currentPage, maxPage);
}

export function renderGridView() {
  const newsData = NewsDB.getNewsData();
  const maxPage = getMaxPage(newsData);
  initGridView(newsData);
  addEventHandlerOnGridView();

  store.subscribe(() => {
    const { currentPage, viewType, tabType } = useSelector(
      (state) => state.page
    );
    if (viewType !== VIEW_TYPE.GRID) return;

    if (tabType === TAB_TYPE.ALL) {
      fillGridView(newsData, currentPage);
      updateButtonUI(currentPage, maxPage);
    } else {
      renderGridViewOnSubscribe(currentPage);
    }
  });
}
