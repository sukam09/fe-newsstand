import { TEXT_WEAK , TEXT_POINT} from "./constant.js";
/**
리스트 아이콘 클릭하면 리스트 보기로 바뀜
 */
const $listIcon = document.querySelector('.list-button');
const $gridIcon = document.querySelector('.grid-button');

function changeViewToList() {
  $listIcon.addEventListener('click', () => handleChangeView('list-button'));
}

function changeViewToGrid() {
  $gridIcon.addEventListener('click', () => handleChangeView('grid-button'));
}

function handleChangeView(whatButton) {
  const $pressGrid = document.querySelector('.press-grid-container');
  const $newsList = document.querySelector('.press-news-list-container');

  if (whatButton === 'list-button') {
    $pressGrid.style.display = 'none';
    $newsList.style.display = 'block';
    changeIconColor(whatButton, 'grid-button')
  }
  else {
    $pressGrid.style.display = 'block';
    $newsList.style.display = 'none';
    changeIconColor(whatButton, 'list-button');
  }
}

function changeIconColor(whatButton, unClickedButton) {
  const $whatButtonContent = document.querySelector(`.${whatButton}-content`);
  const $unClickedButtonContent = document.querySelector(`.${unClickedButton}-content`);
  $whatButtonContent.setAttribute('fill', TEXT_POINT);
  $unClickedButtonContent.setAttribute('fill', TEXT_WEAK);
}

function changeView() {
  changeViewToGrid();
  changeViewToList();
}

export default changeView
