import { html } from '../core/createElement.js';
function createCategoryHtml(categorys, NEWCATEGORY, CURRENT_INDEX, KEY) {
  const categoryCount = categorys.filter((name) => name === KEY).length;
  let htmls = '';
  NEWCATEGORY.map((category) => {
    if (category === KEY) {
      htmls += html`
        <div class="category-item select-category">${category} <span></span> ${CURRENT_INDEX + 1}/${categoryCount}</div>
      `;
    } else {
      htmls += html` <div class="category-item">${category}</div> `;
    }
  });
  document.querySelector('.newsstand__category').innerHTML = '';
  document.querySelector('.newsstand__category').insertAdjacentHTML('beforeend', htmls);
}

export { createCategoryHtml };
