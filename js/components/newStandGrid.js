import { html } from '../core/createElement.js';

function paintNewsstand(datas, SELECTED_PAGE) {
  let htmls = '';
  for (let idx = SELECTED_PAGE * 24; idx < SELECTED_PAGE * 24 + 24; idx++) {
    const [name, src] = datas[idx];
    htmls += html`
      <li class="newsstand—subscrtion-box">
        <img src="${src}" alt="${name}" />
      </li>
    `;
  }
  document.querySelector('.newsstand-area—six-col-list').insertAdjacentHTML('beforeend', htmls);
}

export { paintNewsstand };
