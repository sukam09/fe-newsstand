import { html } from '../core/createElement.js';

function paintNewsstand(datas, SELECTED_PAGE) {
  const ul = document.querySelector('.newsstand-area—six-col-list');
  let htmls = '';
  for (let idx = SELECTED_PAGE * 24; idx < SELECTED_PAGE * 24 + 24; idx++) {
    const [name, src] = datas[idx];
    htmls += html`
      <li class="newsstand—subscrtion-box">
        <div class="inner">
          <div class="inner-front">
            <img class="front" src="${src}" alt="${name}" />
          </div>
          <div class="inner-back">
            <button class="back">+ 구독하기</button>
          </div>
        </div>
      </li>
    `;
  }
  ul.innerHTML = '';
  ul.insertAdjacentHTML('beforeend', htmls);
}

export { paintNewsstand };
