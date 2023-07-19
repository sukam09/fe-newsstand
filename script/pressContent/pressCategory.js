import { fetchData } from "../../utils/js/getJson.js";
import { getQuerySelector, getQuerySelectorAll } from "../../utils/js/getElements.js";
let currentPage = 1
export async function getCategory() {
  const categoryPath = await fetchData("../assets/data/newspaperSrc.json");
  const categoryNames = categoryPath.newsList.map((elem) => {
    return elem.category;
  })

  const categoryMap = categoryNames.reduce((acc, curr)=>{
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
    <span class="press-content-category-cnt-now">${currentPage}</span>
    <span class="press-content-category-cnt-all">&nbsp/&nbsp${categoryMap[curr]}</span>
    </div>
    </li>`;
  }, "");

  getQuerySelector(document, '.press-content-categorybar').innerHTML = putCategory;
  getQuerySelector(document, '.press-content-category').classList.add('selected');

  selectCategory();
};

function initSelectedState() {
  const selectedCategory = getQuerySelectorAll(document, '.press-content-category');
  selectedCategory.forEach((elem)=> {
    elem.classList.remove('selected');
  })
}

function selectCategory() {
  const candidateCategory = getQuerySelectorAll(document, '.press-content-category');
  candidateCategory.forEach((elem)=> {
    elem.addEventListener('click', (e) => {
      initSelectedState();
      e.currentTarget.classList.add('selected');
    })
  })
}

let pageNumber = 0;
const sectionPrevButton = getQuerySelector(document, '#press-content-prev');
const sectionNextButton = getQuerySelector(document, '#press-content-next');


function changeCategory({pageValue}) {
  pageValue < 0 ? --currentPage : ++ currentPage;
  console.log(currentPage);
  
}


// 이전 페이지 이동 및 다음 페이지 이동 구현
export function changePressCategory(state) {
  if (state === "list") {
    currentPage = 1;
    console.log("list");
    sectionPrevButton.style.visibility = "visible";
    sectionNextButton.style.visibility = "visible";
    sectionPrevButton.addEventListener('click', () => changeCategory({ pageValue: -1 }));
    sectionNextButton.addEventListener('click', () => changeCategory({ pageValue: 1 }));
  }
  else return false;
}


// changePressCategory();