import { shuffle } from '../utils/utils.js';
import { getNewsData } from '../core/apis.js';
import { paintNewsstand } from '../components/newStandGrid.js';

let SELECTED_PAGE = 0;
const $ul = document.querySelector('.newsstand-area—six-col-list');
const $rightBtn = document.querySelector('.newsstand--right-btn');
const $leftBtn = document.querySelector('.newsstand--left-btn');

async function initNewsStand() {
  const newsData = await getNewsData();
  const datas = newsDataPaser(shuffle(newsData));
  paintNewsstand(datas, SELECTED_PAGE);
  pagination(datas);
}

function pagination(datas) {
  const handleRightBtn = () => {
    $ul.innerHTML = '';
    ++SELECTED_PAGE;
    paintNewsstand(datas, SELECTED_PAGE);
    isBtnDisabled();
  };

  const handleLeftBtn = () => {
    $ul.innerHTML = '';
    --SELECTED_PAGE;
    paintNewsstand(datas, SELECTED_PAGE);
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
