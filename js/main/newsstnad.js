import { shuffle } from '../utils/utils.js';
import { getNewsData } from '../core/apis.js';
import { html } from '../core/createElement.js';

let SELECTED_PAGE = 0;
const $ul = document.querySelector('.newsstand-area—six-col-list');
const $rightBtn = document.querySelector('.newsstand--right-btn');
const $leftBtn = document.querySelector('.newsstand--left-btn');

async function initNewsStand() {
  const newsData = await getNewsData();
  const datas = newsDataPaser(shuffle(newsData));
  paintNewsstand(datas);
  pagination(datas);
}

function paintNewsstand(datas) {
  let htmls = '';
  for (let idx = SELECTED_PAGE * 24; idx < SELECTED_PAGE * 24 + 24; idx++) {
    const [name, src] = datas[idx];
    htmls += html`
      <li class="newsstand—subscrtion-box">
        <img src="${src}" alt="${name}" />
      </li>
    `;
  }
  $ul.insertAdjacentHTML('beforeend', htmls);
}

function pagination(datas) {
  const handleRightBtn = () => {
    $ul.innerHTML = '';
    ++SELECTED_PAGE;
    paintNewsstand(datas);
    isBtnDisabled();
  };

  const handleLeftBtn = () => {
    $ul.innerHTML = '';
    --SELECTED_PAGE;
    paintNewsstand(datas);
    isBtnDisabled();
  };

  const isBtnDisabled = () => {
    SELECTED_PAGE ? $leftBtn.classList.remove('btn-disabled') : $leftBtn.classList.add('btn-disabled');
    SELECTED_PAGE === 3 ? $rightBtn.classList.add('btn-disabled') : $rightBtn.classList.remove('btn-disabled');
  };

  $rightBtn.addEventListener('click', handleRightBtn);
  $leftBtn.addEventListener('click', handleLeftBtn);
}

function newsDataPaser(datas) {
  return datas.map((data) => [data.name, data.src]);
}

export { initNewsStand };
