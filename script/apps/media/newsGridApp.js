import { MEDIA, SUB_MEDIA } from '../../constants.js';
import mediaData from '../../../assets/data/mediaData.js';
import { SubButton } from '../../components/Button.js';

const shuffleArray = array => {
  array.sort(() => Math.random() - 0.5);
};
const createMediaArray = () => {
  const mediaArray = Array.from({ length: MEDIA.TOTAL }, (_, index) => index);
  shuffleArray(mediaArray);
  return mediaArray;
};

const updatePage = (mediaArray, page) => {
  const mediaLogo = document.querySelectorAll('.media_logo');
  const gridIndex = Array.from(
    { length: MEDIA.PAGE_SIZE },
    (_, index) => page * MEDIA.PAGE_SIZE + index
  );
  gridIndex.forEach((mediaIndex, index) => {
    const mediaId = mediaArray[mediaIndex];
    const logoSrc = mediaData.getLogoSrc(mediaId);
    const logoElement = mediaLogo[index];
    // 구독하기 or 해지하기 버튼 제거
    logoElement.nextElementSibling?.remove();
    if (!logoSrc) {
      logoElement.className = 'media_logo';
      logoElement.src = '';
      return;
    }
    logoElement.className = `media_logo media_${mediaId}`;
    logoElement.src = logoSrc;
    logoElement.alt = mediaData.getName(mediaId);
    // 구독 여부에 따라 구독하기 or 해지하기 버튼 추가
    const subButtonArea = document.createElement('div');
    subButtonArea.classList.add('media_hover', 'surface_alt');
    subButtonArea.appendChild(
      SubButton({ isSub: SUB_MEDIA.includes(mediaArray[mediaId]) })
    );
    logoElement.insertAdjacentElement('afterend', subButtonArea);
  });
};

const setPage = (gridData, move, leftArrow, rightArrow) => {
  gridData.page += move;
  updatePage(gridData.mediaArray, gridData.page);
  setArrowVisible(gridData.page, leftArrow, rightArrow);
};

const setArrow = gridData => {
  const leftArrow = document.querySelector('#left_arrow');
  const rightArrow = document.querySelector('#right_arrow');

  // 화살표 이벤트리스너
  leftArrow.addEventListener('click', () => {
    setPage(gridData, -1, leftArrow, rightArrow);
  });
  rightArrow.addEventListener('click', () => {
    setPage(gridData, 1, leftArrow, rightArrow);
  });
};

const setArrowVisible = (page, leftArrow, rightArrow) => {
  const leftDisplay = page === 0 ? 'none' : 'block';
  const rightDisplay = page === MEDIA.MAX_PAGE ? 'none' : 'block';

  leftArrow.style.display = leftDisplay;
  rightArrow.style.display = rightDisplay;
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
  const gridData = {
    page: 0,
    mediaArray: createMediaArray(),
  };

  initGrid();
  updatePage(gridData.mediaArray, gridData.page);
  setArrow(gridData);
};

export default gridApp;
