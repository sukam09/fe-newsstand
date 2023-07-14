import { shuffle } from '../utils/utils.js';
import { getNewsData } from '../core/apis.js';
import { paintNewsstand } from '../components/newStandGrid.js';
import { addEventListener, removeEventListener } from '../core/eventListener.js';

let SELECTED_PAGE = 0;
const $ul = document.querySelector('.newsstand-area—six-col-list');
const $rightBtn = document.querySelector('.newsstand--right-btn');
const $leftBtn = document.querySelector('.newsstand--left-btn');
let datas = [];

async function initNewsStand() {
  SELECTED_PAGE = 0;

  removeGridBtn();

  const newsData = await getNewsData();
  datas = newsDataPaser(shuffle(newsData));
  paintNewsstand(datas, SELECTED_PAGE);
  pagination();
}

function pagination() {
  isBtnDisabled();
  addEventListener('click', $rightBtn, handleRightBtn);
  addEventListener('click', $leftBtn, handleLeftBtn);
}

function removeGridBtn() {
  removeEventListener('click', $rightBtn, handleRightBtn);
  removeEventListener('click', $leftBtn, handleLeftBtn);
}
function addGridBtn() {
  addEventListener('click', $rightBtn, handleRightBtn);
  addEventListener('click', $leftBtn, handleLeftBtn);
}

function handleRightBtn() {
  $ul.innerHTML = '';
  ++SELECTED_PAGE;
  console.log(SELECTED_PAGE);
  paintNewsstand(datas, SELECTED_PAGE);
  isBtnDisabled();
}

function handleLeftBtn() {
  $ul.innerHTML = '';
  --SELECTED_PAGE;
  paintNewsstand(datas, SELECTED_PAGE);
  isBtnDisabled();
}

function isBtnDisabled() {
  SELECTED_PAGE ? $leftBtn.classList.remove('disabled') : $leftBtn.classList.add('disabled');
  SELECTED_PAGE === 3 ? $rightBtn.classList.add('disabled') : $rightBtn.classList.remove('disabled');
}

function newsDataPaser(datas) {
  return datas.map((data) => [data.name, data.src]);
}

export { initNewsStand, removeGridBtn, addGridBtn };
