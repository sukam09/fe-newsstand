import { html } from '../core/createElement.js';
import { globalStore } from '../store/globalVarStore.js';

function categoryView(NEWCATEGORY, KEY, categoryCount) {
  let template = '';
  NEWCATEGORY.map((category) => {
    if (globalStore.state.KEY === '전체언론_리스트') {
      if (category === KEY) {
        template += html`
          <div class="category-item select-category">
            ${category} <span></span> ${globalStore.state.전체언론_리스트.뉴스_인덱스 + 1}/${categoryCount}
          </div>
        `;
      } else {
        template += html` <div class="category-item">${category}</div> `;
      }
    } else if (globalStore.state.KEY === '구독언론_리스트') {
      if (category === KEY) {
        template += html` <div class="category-item select-category">${category} <span></span> ></div> `;
      } else {
        template += html` <div class="category-item">${category}</div> `;
      }
    }
  });
  const newsCategoryTag = document.querySelector('.newsstand__category');

  newsCategoryTag.innerHTML = '';
  newsCategoryTag.insertAdjacentHTML('beforeend', template);
}

export { categoryView };
