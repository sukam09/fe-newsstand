import { FIRST_PAGE_IDX } from "../../constant.js"
import { setDrawPressNews, underlineNewsTitle, getSubscribedPressOfList, clickSubUnsubBtnAtList } from "./pressNews.js";
import { turnNewsPage } from "./pageMoveButton.js";
import { initProgress } from "./progressBar.js";
import pressStore from "../../pressDataStore.js";
import { getPress, getSubscribedPressId, getView, setClickedCategoryIndex, setPage } from "../../store.js";
import { _changeDispay } from "../../utils.js";
import { getSubscribedPressOfGrid } from "../PressGrid/pressLogos.js";

const allPressNewsCategory = pressStore.getAllPressNewsCategory
const $pressNewsBar = document.querySelector('.press-news-bar');

/** 전체 언론사 리스트 보기 내가 구독한 언론사 리스트 보기에 따라 카테고리 설정 */
function setCategory() {
  const MyPress = getSubscribedPressOfList();
  const MyPressNewsCategory = MyPress.map(press => press[0].name)
  getView() === 'list' && getPress() === 'all'
    ? setCategoryOfList(allPressNewsCategory)
    : ''
  getView() === 'list' && getPress() === 'my'
    ? setCategoryOfList(MyPressNewsCategory)
    : ''
}

/** 카테고리 설정 */
function setCategoryOfList(whatCategory) {
  $pressNewsBar.innerHTML = `
  ${whatCategory.map(category => (
    `<li class="non-progress pointer">
    <div class="progress-category">${category}</div>
  </li>`
  )).join('')}
`
}

/** 카테고리를 클릭하면 handleClickCategory함수 호출 */
function showNewsOfCategory() {
  const $progressCategory = document.querySelectorAll('.progress-category');
  const allCategory = Array.from($progressCategory);
  allCategory.forEach((category, idx) => {
    category.addEventListener('click', handleClickCategory);
  })
}

/**
 어떤 카테고리를 클릭했는지 확인하고 클릭한 카테고리로 이동
 */
function handleClickCategory({ target }) {
  const MyPress = getSubscribedPressOfList();
  const MyPressNewsCategory = MyPress.map(press => press[0].name)
  getView() === 'list' && getPress() === 'all'
    ? handleClickCategoryOfList(target, allPressNewsCategory)
    : ''
  getView() === 'list' && getPress() === 'my'
    ? handleClickCategoryOfList(target, MyPressNewsCategory)
    : ''
}

/** 클릭한 카테고리로 이동 */
function handleClickCategoryOfList(target, whatNewsCategory) {
  const categoryIndex = whatNewsCategory.findIndex(category => category === target.innerText);
  setClickedCategoryIndex(categoryIndex);
  changeCategory();
}

/**
 카테고리가 넘어가면 NewsTurner 리셋하기
 */
function resetNewsTurner() {
  const $newsPrevButton = document.querySelector('.press-news-left-button');
  const $newsNextButton = document.querySelector('.press-news-right-button');
  _changeDispay($newsPrevButton, 'none', $newsNextButton, 'block');
}

/**
 클릭한 카테고리에 대해서 화면에 나타냄
 */
function changeCategory() {
  setPage(FIRST_PAGE_IDX)
  resetNewsTurner();
  setDrawPressNews();
  initProgress();
  underlineNewsTitle();
  clickSubUnsubBtnAtList();
}

export { showNewsOfCategory, changeCategory, setCategory }