import { fetchData } from "../../utils/js/getJson.js";
import {
  getQuerySelector,
  getQuerySelectorAll,
} from "../../utils/js/getElements.js";
import { getState, register, setState } from "../observer/observer.js";
import { nowCategoryIdx } from "../store/store.js";

const numOfEachCategory = [];
const nameOfEachCategory = [];
let flag = false;

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

  register(nowCategoryIdx, initSelectedState);
  register(nowCategoryIdx, changeCategory);
  register(nowCategoryIdx, putCurrentPage);
  register(nowCategoryIdx, restartProgressbar);
  register(nowCategoryIdx, updatePageAndCategory);

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
  const idx = getState(nowCategoryIdx).category;
  const categories = getQuerySelectorAll(".press-content-category");
  categories[idx].classList.add("selected");
}

// 마우스 클릭 시 해당하는 카테고리 selected 클래스 추가
function selectCategory() {
  const categories = getQuerySelectorAll(".press-content-category");
  categories.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.currentTarget.classList.add("selected");
      let newCateIdx = getState(nowCategoryIdx);
      newCateIdx.list = 1;
      newCateIdx.category = nameOfEachCategory.indexOf(
        e.currentTarget.children[1].textContent
      );
      setState(nowCategoryIdx, newCateIdx);
    });
  });
}

function updatePageAndCategory() {
  const currentIdx = getState(nowCategoryIdx);
  let newCateIdx = getState(nowCategoryIdx);
  if (currentIdx.list < 1) {
    if (currentIdx.category === 0) {
      newCateIdx.list = numOfEachCategory[numOfEachCategory.length - 1];
      newCateIdx.category = numOfEachCategory.length - 1;
      setState(nowCategoryIdx, newCateIdx);
    } else {
      newCateIdx.list = numOfEachCategory[currentIdx.category - 1];
      newCateIdx.category = currentIdx.category - 1;
      setState(nowCategoryIdx, newCateIdx);
    }
  } else if (currentIdx.list > numOfEachCategory[currentIdx.category]) {
    if (currentIdx.category + 1 === numOfEachCategory.length) {
      newCateIdx.list = 1;
      newCateIdx.category = 0;
      setState(nowCategoryIdx, newCateIdx);
    } else if (currentIdx.category + 1 !== numOfEachCategory.length) {
      newCateIdx.list = 1;
      newCateIdx.category = currentIdx.category + 1;
      setState(nowCategoryIdx, newCateIdx);
    }
  }
}

function putCurrentPage() {
  getQuerySelector(".selected .press-content-category-cnt-now").innerHTML =
    getState(nowCategoryIdx).list;
}

function moveCategoryProgressbar() {
  const progressbarState = getQuerySelector(
    ".selected .press-content-category-progressbar"
  );
  progressbarState.addEventListener("animationend", () => {
    let newCateIdx = getState(nowCategoryIdx);
    newCateIdx.list = getState(nowCategoryIdx).list + 1;
    newCateIdx.category = getState(nowCategoryIdx).category;
    setState(nowCategoryIdx, newCateIdx);
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
