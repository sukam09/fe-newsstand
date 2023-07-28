import { getState, setState } from "../store/observer.js";
import {
  MAX_CATEGORY_ID,
  MAX_LIST_PAGE,
  MODE_ALL,
  categoryIdState,
  listPageState,
  myListPageState,
  pageModeState,
} from "../store/pageState.js";
import { qs, qsa } from "../utils.js";
import { updatePageCount } from "./pageController/pageController.js";

export function handleCategoryItemClick({ currentTarget }) {
  const pageMode = getState(pageModeState);
  const id = currentTarget.id;
  const clicked = currentTarget.classList.contains("category_clicked");

  if (pageMode === MODE_ALL) {
    const [, categoryId] = id.split("_");
    setState(categoryIdState, parseInt(categoryId));
    setState(listPageState, 0);
  } else {
    const [, , pressId] = id.split("_");
    setState(myListPageState, parseInt(pressId));
  }

  if (!clicked) {
    highlightCategoryItem();
  }
}

export function highlightCategoryItem() {
  const categoryId = getState(categoryIdState);
  const $clickedElements = qsa(".category_clicked");
  const pageMode = getState(pageModeState);
  [...$clickedElements].forEach((elemnet) => {
    elemnet.classList.remove("category_clicked");
  });

  if (pageMode === MODE_ALL) {
    const $category = qs(`#category_${parseInt(categoryId)}`);
    const $progressbar = $category.getElementsByClassName("progressbar")[0];
    $category.classList.add("category_clicked");
    startProgressAnimation($progressbar);
  } else {
    const myListPage = getState(myListPageState);
    const $category = qs(`#category_my_${parseInt(myListPage)}`);
    $category.classList.add("category_clicked");
    const $progressbar = $category.querySelector(".progressbar");
    startProgressAnimation($progressbar);
  }
}

function startProgressAnimation($progressbar) {
  let raf;
  let runningTime = 20000;
  let percentage = 0;
  let start;
  const listPage = getState(listPageState);
  const startPage = listPage;
  const startMode = getState(pageModeState);
  const categoryId = getState(categoryIdState);

  const performAnimation = (timestamp) => {
    start === undefined ? (start = timestamp) : null;
    const elapsed = timestamp - start;
    const clicked =
      $progressbar.parentNode.classList.contains("category_clicked");

    // runningtime 넘어가면 처음부터 시작
    if (elapsed >= runningTime) {
      cancelAnimationFrame(raf);
      if (listPage >= MAX_LIST_PAGE[categoryId] - 1) {
        if (categoryId >= MAX_CATEGORY_ID - 1) {
          setState(categoryIdState, 0);
        } else {
          setState(categoryIdState, categoryId + 1);
        }
        setState(listPageState, 0);
      } else {
        setState(listPageState, listPage + 1);
      }
      updatePageCount();
      highlightCategoryItem();

      return;
    }

    // click 해제 되면 중지
    if (!clicked) {
      cancelAnimationFrame(raf);
      return;
    }

    // 페이지 변화
    if (startPage !== getState(listPageState)) {
      cancelAnimationFrame(raf);
      highlightCategoryItem();
      return;
    }

    if (startMode !== getState(pageModeState)) {
      cancelAnimationFrame(raf);
      return;
    }
    percentage = (elapsed / runningTime) * 100;
    $progressbar.style.width = `${percentage}%`;
    raf = requestAnimationFrame(performAnimation);
  };

  raf = requestAnimationFrame(performAnimation);
}

let isDragging;
let startX;
let draggableElement;
let draggableElementX;
let categoryContainerX;
let maxX;

export function handleCategoryMousedown({ currentTarget, clientX }) {
  const $categoryContainer = currentTarget.parentNode;
  isDragging = true;
  draggableElement = currentTarget;
  categoryContainerX = $categoryContainer.getBoundingClientRect().left;
  draggableElementX = draggableElement.getBoundingClientRect().left;
  startX = clientX - draggableElementX;
  maxX = currentTarget.scrollWidth - $categoryContainer.offsetWidth;
}
export function handleCategoryMousemove(e) {
  if (!isDragging) {
    return;
  }
  const curX = e.clientX - draggableElementX;
  const moveX = curX - startX;
  const x = draggableElementX + moveX - categoryContainerX;
  if (x > 0 || x < -maxX) {
    return;
  }
  draggableElement.style.left = `${x}px`;
}
export function handleCategoryMouseup() {
  isDragging = false;
}
