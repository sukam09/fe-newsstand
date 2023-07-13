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

function handleChangeView(clickedButton) {
  const $pressGrid = document.querySelector('.press-grid-container');
  const $newsList = document.querySelector('.press-news-list-container');

  if (clickedButton === 'list-button') {
    $pressGrid.style.display = 'none';
    $newsList.style.display = 'block';
    changeIconColor(clickedButton, 'grid-button')
  }
  else {
    $pressGrid.style.display = 'block';
    $newsList.style.display = 'none';
    changeIconColor(clickedButton, 'list-button');
  }
}

function changeIconColor(clickedButton, unClickedButton) {
  const $whatButtonContent = document.querySelector(`.${clickedButton}-content`);
  const $unClickedButtonContent = document.querySelector(`.${unClickedButton}-content`);
  $whatButtonContent.setAttribute('fill', TEXT_POINT);
  $unClickedButtonContent.setAttribute('fill', TEXT_WEAK);
}

function changeView() {
  changeViewToGrid();
  changeViewToList();
}

export default changeView
