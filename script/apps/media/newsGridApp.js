import mediaData from '../../../assets/data/mediaData.js';
import MediaGrid from '../../components/media/MediaGrid.js';
import { MEDIA, MSG, SUB_MEDIA } from '../../constants.js';
import { SubButtonArea } from '../../components/Button.js';
import {
  clearAllChildren,
  createNewArrow,
  shuffleArray,
} from '../../utils/utils.js';
import SnackBar from '../../components/snackBar.js';

const createMediaArray = () => {
  const mediaArray = Array.from({ length: MEDIA.TOTAL }, (_, index) => index);

  shuffleArray(mediaArray);
  return mediaArray;
};

const updateLogo = (logoElement, mediaId) => {
  const mediaView = document.querySelector('#media_view');

  logoElement.nextElementSibling?.remove();
  logoElement.className = 'media_logo';
  if (mediaId === undefined) {
    logoElement.src = '';
    logoElement.alt = '';
    return;
  }
  logoElement.classList.add(`media_${mediaId}`);
  logoElement.src = mediaData.getLogoSrc(mediaId);
  logoElement.alt = mediaData.getName(mediaId);
  logoElement.insertAdjacentElement(
    'afterend',
    SubButtonArea(
      SUB_MEDIA.includes(mediaId),
      () => {
        mediaView.appendChild(SnackBar(MSG.SUBSCRIBE));
      },
      () => {
        // TODO: 구독 취소 alert
        console.log('unsubscribe alert');
      }
    )
  );
};

const updatePage = (mediaArray, page) => {
  const mediaLogo = document.querySelectorAll('.media_logo');

  mediaLogo.forEach((logo, index) => {
    updateLogo(logo, mediaArray[page * MEDIA.PAGE_SIZE + index]);
  });
};

const setPage = (gridData, move, leftArrow, rightArrow) => {
  gridData.page += move;
  updatePage(gridData.mediaArray, gridData.page);
  setArrowDisplay(gridData.page, leftArrow, rightArrow);
};

const initArrow = gridData => {
  const [leftArrow, rightArrow] = createNewArrow();

  setArrowDisplay(gridData.page, leftArrow, rightArrow);
  leftArrow.addEventListener('click', () => {
    setPage(gridData, -1, leftArrow, rightArrow);
  });
  rightArrow.addEventListener('click', () => {
    setPage(gridData, 1, leftArrow, rightArrow);
  });
};

const setArrowDisplay = (page, leftArrow, rightArrow) => {
  const leftDisplay = page === 0 ? 'none' : 'block';
  const rightDisplay = page === MEDIA.MAX_PAGE ? 'none' : 'block';

  leftArrow.style.display = leftDisplay;
  rightArrow.style.display = rightDisplay;
};

const initGrid = () => {
  const mediaView = document.querySelector('#media_view');

  clearAllChildren(mediaView);
  mediaView.appendChild(MediaGrid());
};

const gridApp = () => {
  const gridData = {
    page: 0,
    mediaArray: createMediaArray(),
  };

  initGrid();
  updatePage(gridData.mediaArray, gridData.page);
  initArrow(gridData);
};

export default gridApp;
