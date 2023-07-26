import { html } from '../core/createElement.js';
import { subScribeStore } from '../store/subScribeStore.js';
function gridView(datas, SELECTED_PAGE) {
  const ul = document.querySelector('.newsstand-area—six-col-list');
  let template = '';
  for (let idx = SELECTED_PAGE * 24; idx < SELECTED_PAGE * 24 + 24; idx++) {
    const [name, src] = datas[idx];
    let num = '';
    if (!name) num = 0;
    template += html`
      <li class="newsstand—subscrtion-box">
        <div class="inner" style="opacity: ${num};">
          <div class="inner-front">
            <img class="front" src="${src}" alt="${name}" />
          </div>
          <div class="inner-back">
            <button class="back">
              ${subScribeStore.getGetter('getsubscribeData').includes(name) ? '해제하기' : '+ 구독하기'}
            </button>
          </div>
        </div>
      </li>
    `;
  }
  ul.innerHTML = '';
  ul.insertAdjacentHTML('beforeend', template);
}

export { gridView };
