import { fetchData } from "../../utils/js/getJson.js";
import {
  getQuerySelector,
  getQuerySelectorAll,
} from "../../utils/js/getElements.js";
import { getState, register, setState } from "../observer/observer.js";
import { nowCategoryIdx, listPageIdx } from "../store/store.js";

const numOfEachCategory = [];
const nameOfEachCategory = [];

export async function getCategoryInfo() {
  const categoryPath = await fetchData("../assets/data/newspaperSrc.json");
  const categoryNames = categoryPath.newsList.map((elem) => elem.category);

  // 누적합 연산을 통한 카테고리 개수세기
  const categoryMap = categoryNames.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  const putCategory = Object.keys(categoryMap).reduce((acc, curr) => {
    return (
      acc +
      `<li class="press-content-category">
    <div class="press-content-category-progressbar"></div>
    <span class="press-content-category-name">${curr}</span>
    <div class="press-content-category-cnt">
    <span class="press-content-category-cnt-now">1</span>
    <span class="press-content-category-cnt-all">&nbsp/&nbsp${categoryMap[curr]}</span>
    </div>
    </li>`
    );
  }, "");

  nameOfEachCategory.push(...Object.keys(categoryMap));
  numOfEachCategory.push(...Object.values(categoryMap));

  getQuerySelector(".press-content-categorybar").innerHTML = putCategory;
  getQuerySelector(".press-content-category").classList.add("selected");

  // register(nowCategoryIdx, initSelectedState);
  register(nowCategoryIdx, changeCategory);
  // register(nowCategoryIdx, updatePageAndCategory);
  register(nowCategoryIdx, putCurrentPage);
  register(nowCategoryIdx, restartProgressbar);

  // register(listPageIdx, initSelectedState);
  // register(listPageIdx, changeCategory);
  // register(listPageIdx, updatePageAndCategory);
  register(listPageIdx, putCurrentPage);
  register(listPageIdx, restartProgressbar);
  moveCategoryProgressbar();
  selectCategory();
}

// selected 클래스 다 제거 (완)
function initSelectedState() {
  const categories = getQuerySelectorAll(".press-content-category");
  categories.forEach((elem) => elem.classList.remove("selected"));
}

//selected 클래스 추가(완)
function changeCategory() {
  const idx = getState(nowCategoryIdx);
  const categories = getQuerySelectorAll(".press-content-category");
  categories[idx].classList.add("selected");
}

// 마우스 클릭 시 해당하는 카테고리 selected 클래스 추가
function selectCategory() {
  const categories = getQuerySelectorAll(".press-content-category");
  categories.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      initSelectedState();
      e.currentTarget.classList.add("selected");

      setState(listPageIdx, 1);
    });
  });
}

register(listPageIdx, updatePageAndCategory);

function updatePageAndCategory() {
  console.log(getState(listPageIdx));
  if (getState(listPageIdx) < 1) {
    setState(listPageIdx, 19);
    setState(nowCategoryIdx, numOfEachCategory.length);
  }
}

function putCurrentPage() {
  getQuerySelector(".selected .press-content-category-cnt-now").innerHTML =
    getState(listPageIdx);
}

function moveCategoryProgressbar() {
  const progressbarState = getQuerySelector(
    ".selected .press-content-category-progressbar"
  );
  progressbarState.addEventListener("animationend", () => {
    setState(listPageIdx, getState(listPageIdx) + 1);
  });
}

function restartProgressbar() {
  const nowCategory = getQuerySelector(
    ".selected .press-content-category-progressbar"
  );
  const parentOfNowCategory = nowCategory.parentElement;
  parentOfNowCategory.removeChild(nowCategory);
  parentOfNowCategory.insertAdjacentHTML(
    "afterbegin",
    '<div class="press-content-category-progressbar"></div>'
  );
  moveCategoryProgressbar();
}
