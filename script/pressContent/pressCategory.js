import { fetchData } from "../../utils/js/getJson.js";
import { getQuerySelector, getQuerySelectorAll } from "../../utils/js/getElements.js";

export async function getCategory() {
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


  let currentPage = 1

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

