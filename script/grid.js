import { MEDIA } from './constants.js';
import media_data from '../assets/data/media_data.js';

// (임시) 구독한 언론사 배열
const subscribed = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27,
];
let page = 0;

const logoIndex = Array.from({ length: MEDIA.TOTAL }, (_, index) => index);

const shuffle = array => {
  array.sort(() => Math.random() - 0.5);
};

const setLogoList = () => {
  const addSubButton = isSub => {
    const subElement = document.createElement('div');
    const subButton = document.createElement('button');
    subElement.className = 'media-hover surface-alt';
    subButton.className = 'button white-button';
    subButton.innerHTML = isSub ? '구독하기' : '해지하기';
    subElement.appendChild(subButton);
    return subElement;
  };
  const mediaLogo = document.querySelectorAll('.media_logo');
  const gridIndex = Array.from(
    { length: MEDIA.PAGE_SIZE },
    (_, index) => page * MEDIA.PAGE_SIZE + index
  );
  gridIndex.forEach((id, index) => {
    const image = media_data[logoIndex[id]];
    const imageElement = mediaLogo[index];
    // 이미지랑 같은 노드인 구독하기 or 해지하기 제거
    imageElement.nextElementSibling?.remove();
    if (!image) {
      imageElement.className = 'media_logo';
      imageElement.src = '';
      return;
    }
    imageElement.className = `media_logo media_${logoIndex[id]}`;
    imageElement.src = `assets/images/logo/light/${image.src}`;
    imageElement.alt = image.name;
    // imageElement.parentElement.className = '';
    // 구독 여부에 따라 구독하기 or 해지하기 추가
    imageElement.insertAdjacentElement(
      'afterend',
      addSubButton(!subscribed.includes(logoIndex[id]))
    );
  });
};

const setPage = (index, leftArrow, rightArrow) => {
  page += index;
  setLogoList();
  setArrowVisible(leftArrow, rightArrow);
};

const setArrow = () => {
  const leftArrow = document.querySelector('#left_arrow');
  const rightArrow = document.querySelector('#right_arrow');

  setArrowVisible(leftArrow, rightArrow);

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

    gridItemImage.className = 'media_logo';
    gridItem.appendChild(gridItemImage);
    gridElement.appendChild(gridItem);
  });
};

const createGrid = () => {
  const gridElement = document.createElement('ul');
  const mediaView = document.querySelector('.media_view');

  gridElement.className = 'media_view_grid';
  createGridItems(gridElement);
  Array.from(mediaView.childNodes).forEach(child => child.remove());

  mediaView.appendChild(gridElement);
  initGrid();
};

const initGrid = () => {
  shuffle(logoIndex);
  setLogoList();
  setArrow();
};

createGrid();
