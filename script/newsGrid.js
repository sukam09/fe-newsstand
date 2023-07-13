import { MEDIA, SUB_MEDIA } from './constants.js';
import media_data from '../assets/data/media_data.js';
import { SubButton } from './components/Button.js';

const shuffleArray = array => {
  array.sort(() => Math.random() - 0.5);
};
const createMediaArray = () => {
  const mediaArray = Array.from({ length: MEDIA.TOTAL }, (_, index) => index);
  shuffleArray(mediaArray);
  return mediaArray;
};

const mediaArray = createMediaArray();
let page = 0;

const setGrid = () => {
  const mediaLogo = document.querySelectorAll('.media_logo');
  const gridIndex = Array.from(
    { length: MEDIA.PAGE_SIZE },
    (_, index) => page * MEDIA.PAGE_SIZE + index
  );
  gridIndex.forEach((mediaIndex, index) => {
    const mediaId = mediaArray[mediaIndex];
    const image = media_data[mediaId];
    const imageElement = mediaLogo[index];
    // 구독하기 or 해지하기 버튼 제거
    imageElement.nextElementSibling?.remove();
    if (!image) {
      imageElement.className = 'media_logo';
      imageElement.src = '';
      return;
    }
    imageElement.className = `media_logo media_${mediaId}`;
    imageElement.src = `assets/images/logo/light/${image.src}`;
    imageElement.alt = image.name;
    // 구독 여부에 따라 구독하기 or 해지하기 버튼 추가
    const subButtonArea = document.createElement('div');
    subButtonArea.classList.add('media_hover', 'surface_alt');
    subButtonArea.appendChild(
      SubButton({ isSub: SUB_MEDIA.includes(mediaArray[mediaId]) })
    );
    imageElement.insertAdjacentElement('afterend', subButtonArea);
  });
};

const setPage = (index, leftArrow, rightArrow) => {
  page += index;
  setGrid();
  setArrowVisible(leftArrow, rightArrow);
};

const setArrow = () => {
  const leftArrow = document.querySelector('#left_arrow');
  const rightArrow = document.querySelector('#right_arrow');

  // 화살표 이벤트리스너
  leftArrow.addEventListener('click', () => {
    setPage(-1, leftArrow, rightArrow);
  });
  rightArrow.addEventListener('click', () => {
    setPage(1, leftArrow, rightArrow);
  });
};

const setArrowVisible = (leftArrow, rightArrow) => {
  leftArrow.className = `page_${page}`;
  rightArrow.className = `page_${page}`;
};

const createGridItems = gridElement => {
  Array.from({ length: MEDIA.PAGE_SIZE }, (_, index) => {
    const gridItem = document.createElement('li');
    const gridItemImage = document.createElement('img');

    gridItemImage.classList.add('media_logo');
    gridItem.appendChild(gridItemImage);
    gridElement.appendChild(gridItem);
  });
};

const createGridElement = () => {
  const gridElement = document.createElement('ul');

  gridElement.classList.add('media_view_grid');
  createGridItems(gridElement);
  return gridElement;
};

const initGrid = () => {
  const mediaView = document.querySelector('#media_view');

  Array.from(mediaView.childNodes).forEach(child => child.remove());
  mediaView.appendChild(createGridElement());
};

const gridApp = () => {
  initGrid();
  setGrid();
  setArrow();
};

export default gridApp;
