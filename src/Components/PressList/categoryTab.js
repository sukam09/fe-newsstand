import { getPress, getView, setCurrentCategoryIndex, setPage } from "../../Store/store.js";
import { FIRST_PAGE_IDX } from "../../constant.js";
import pressStore from "../../pressDataStore.js";
import { getSubscribedPressOfList, setDrawPressNews } from "./pressNews.js";
import { initProgress } from "./progressBar.js";

const allPressNewsCategory = pressStore.getAllPressNewsCategory
const $pressNewsBar = document.querySelector('.press-news-bar');

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
  setCurrentCategoryIndex(categoryIndex);
}

/** 카테고리를 클릭하면 handleClickCategory함수 호출 */
function clickCategoryOfPressList() {
  const $progressCategory = document.querySelectorAll('.progress-category');
  const allCategory = Array.from($progressCategory);
  allCategory.forEach((category, idx) => {
    category.addEventListener('click', handleClickCategory);
  })
}

/** 전체 언론사 리스트 보기 내가 구독한 언론사 리스트 보기에 따라 카테고리 설정 */
function setCategories() {
  const MyPress = getSubscribedPressOfList();
  const MyPressNewsCategory = MyPress.map(press => press[0].name)
  getView() === 'list' && getPress() === 'all'
    ? setCategoryOfList(allPressNewsCategory)
    : ''
  getView() === 'list' && getPress() === 'my'
    ? setCategoryOfList(MyPressNewsCategory)
    : ''
}

/**
 카테고리 이동
 */
function changeCategory() {
  setDrawPressNews();
  initProgress();
}

/** 카테고리 이동 시 초기 세팅 */
function changeCategoryAtList() {
  setPage(FIRST_PAGE_IDX);
  changeCategory();
}

export { changeCategory, changeCategoryAtList, clickCategoryOfPressList, setCategories };
