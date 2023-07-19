import { fetchData } from "../../utils/js/getJson.js";
import { getQuerySelector, getQuerySelectorAll } from "../../utils/js/getElements.js";
import { showListNewsData } from "./pressListChange.js";
const numOfEachCategory = [];
const nameOfEachCategory = [];

const initPageValue = 1;
let categoryIdx = 0;
let currentPage = 1;

export async function getCategoryInfo() {
  const categoryPath = await fetchData("../assets/data/newspaperSrc.json");
  const categoryName = categoryPath.newsList.map((elem) => {
    return elem.category;
  })

  const categoryMap = categoryName.reduce((acc, curr)=>{
    if(!acc[curr]) {
      acc[curr] = 0;
    }
    acc[curr] += 1;
    return acc;
  }, {})

  const putCategory = Object.keys(categoryMap).reduce((acc, curr)=> {
    return acc + `<li class="press-content-category">
    <span class="press-content-category-name">${curr}</span>
    <div class="press-content-category-cnt">
    <span class="press-content-category-cnt-now">1</span>
    <span class="press-content-category-cnt-all">&nbsp/&nbsp${categoryMap[curr]}</span>
    </div>
    </li>`;
  }, "");

  nameOfEachCategory.push(...Object.keys(categoryMap));
  numOfEachCategory.push(...Object.values(categoryMap));

  getQuerySelector(document, '.press-content-categorybar').innerHTML = putCategory;
  getQuerySelector(document, '.press-content-category').classList.add('selected');

  selectCategory();
  getCategoryIdx();

};

// 카테고리 이름 알려주는 거 (완)
function getCategoryIdx() {
  const nowCategory = getQuerySelector(document, ".selected .press-content-category-name");
  
  nameOfEachCategory.forEach((elem, id) => {
    if (elem === nowCategory.innerHTML) {
      categoryIdx = id;
    }
  })
}

// selected 클래스 다 제거 (완)
function initSelectedState() {
  const categories = getQuerySelectorAll(document, '.press-content-category');
  categories.forEach((elem)=> elem.classList.remove('selected'));
}

//selected 클래스 추가(완)
function changeCategory(idx) {
  initSelectedState();
  const categories = getQuerySelectorAll(document, '.press-content-category');
  categories[idx].classList.add('selected');
}

// 마우스 클릭 시 해당하는 카테고리 selected 클래스 추가
function selectCategory() {
  const categories = getQuerySelectorAll(document, '.press-content-category');
  categories.forEach((elem)=> {
    elem.addEventListener('click', (e) => {
      initSelectedState();
      e.currentTarget.classList.add('selected');
      getCategoryIdx();
      currentPage = 1;
      changeCategory(categoryIdx);
      putCurrentPage();
      showListNewsData(nameOfEachCategory[categoryIdx], currentPage);
    })
  })
}

// 화살표로 카테고리 페이지 이동하기
export function moveCategory() {
  const listPrevArrow = getQuerySelector(document, "#press-content-list-prev");
  const listNextArrow = getQuerySelector(document, "#press-content-list-next");

  listPrevArrow.addEventListener('click', () => {
    currentPage --;
    if (currentPage < 1) {
      categoryIdx --;
      categoryIdx < 0 && (categoryIdx = numOfEachCategory.length-1);
      currentPage = numOfEachCategory[categoryIdx];
      changeCategory(categoryIdx);
    }
    putCurrentPage();
    showListNewsData(nameOfEachCategory[categoryIdx], currentPage);
  })

  listNextArrow.addEventListener('click', ()=> {
    currentPage ++;
    if (currentPage > numOfEachCategory[categoryIdx]) {
      categoryIdx ++;
      (categoryIdx === numOfEachCategory.length) && (categoryIdx = 0);
      currentPage = initPageValue;
      changeCategory(categoryIdx);
    }
    putCurrentPage();
    showListNewsData(nameOfEachCategory[categoryIdx], currentPage);
  })
}

function putCurrentPage() {
  getQuerySelector(document, '.selected .press-content-category-cnt-now').innerHTML = currentPage;
}