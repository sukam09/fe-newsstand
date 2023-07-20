import mediaData from '../../../assets/data/mediaData.js';
import { MEDIA } from '../../constants.js';
import Store from '../../core/Store.js';
import { clearAllChildren } from '../../utils/utils.js';
import Arrow from './Arrow.js';
import { SubButtonArea } from './SubToggleButton.js';

const replaceArrow = store => {
  const leftArrow = Arrow('left');
  const rightArrow = Arrow('right');

  document.querySelector('#left_arrow').replaceWith(leftArrow);
  document.querySelector('#right_arrow').replaceWith(rightArrow);
  leftArrow.addEventListener('click', () => {
    store.setState({ page: store.getState().page - 1 });
  });
  rightArrow.addEventListener('click', () => {
    store.setState({ page: store.getState().page + 1 });
  });
  return [leftArrow, rightArrow];
};

const setArrowDisplay = (store, leftArrow, rightArrow) => {
  const { page, media } = store.getState();
  const hasNextPage = media.length > (page + 1) * MEDIA.PAGE_SIZE;
  const leftDisplay = page === 0 ? 'none' : null;
  const rightDisplay = page === MEDIA.MAX_PAGE || !hasNextPage ? 'none' : null;

  leftArrow.style.display = leftDisplay;
  rightArrow.style.display = rightDisplay;
};

const GridItem = (index, navStore, store) => {
  const gridItem = document.createElement('li');
  const gridItemImage = document.createElement('img');
  const page = store.getState().page;
  const mediaId = store.getState().media[index + page * MEDIA.PAGE_SIZE];

  gridItem.appendChild(gridItemImage);
  gridItemImage.classList.add('media_logo');
  if (mediaId !== undefined) {
    gridItemImage.classList.add(`media_${mediaId}`);
    gridItemImage.src = mediaData.getLogoSrc(mediaId);
    gridItemImage.alt = mediaData.getName(mediaId);
    gridItem.appendChild(SubButtonArea(mediaId, navStore, store));
  }
  return gridItem;
};

const MediaGrid = (navStore, mediaData) => {
  const viewAll = navStore.getState().media === 'all';
  const store = new Store({
    page: 0,
    media: viewAll ? mediaData.grid : mediaData.subscribed,
  });
  const mediaGrid = document.createElement('ul');
  const [leftArrow, rightArrow] = replaceArrow(store);

  const draw = () => {
    clearAllChildren(mediaGrid);
    Array.from({ length: MEDIA.PAGE_SIZE }, (_, index) => {
      mediaGrid.appendChild(GridItem(index, navStore, store));
    });
    setArrowDisplay(store, leftArrow, rightArrow);
  };

  store.subscribe(draw);
  mediaGrid.classList.add('media_view_grid');
  draw();

  return mediaGrid;
};

export default MediaGrid;
