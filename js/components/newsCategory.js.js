import { html } from '../core/createElement.js';
function createCategoryHtml(categorys, CURRENT_INDEX, KEY) {
  const categoryCount = categorys.filter((name) => name === KEY).length;
  const newCategorys = categorysParser(categorys);
  let htmls = '';
  newCategorys.map((category) => {
    if (category === KEY) {
      htmls += html`
        <div class="category-item select-category">${category} <span></span> ${CURRENT_INDEX}/${categoryCount}</div>
      `;
    } else {
      htmls += html` <div class="category-item">${category}</div> `;
    }
  });
  document.querySelector('.newsstand__category').innerHTML = '';
  document.querySelector('.newsstand__category').insertAdjacentHTML('beforeend', htmls);
}

function categorysParser(datas) {
  return [...new Set(datas)];
}
export { createCategoryHtml };
