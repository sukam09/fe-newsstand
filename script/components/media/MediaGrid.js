import { MEDIA } from '../../constants.js';
import Store from '../../core/Store.js';
import { clearAllChildren, setMediaLogo } from '../../utils/utils.js';
import { replaceArrow } from './ArrowButton.js';
import { SubButtonArea } from './SubToggleButton.js';

const setArrowButtons = store => {
  const [leftArrow, rightArrow] = replaceArrow();
  const page = store.getState().page;

  leftArrow.addEventListener('click', () => {
    store.setState({ page: page - 1 });
  });
  rightArrow.addEventListener('click', () => {
    store.setState({ page: page + 1 });
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

const GridItem = (themeStore, index, navStore, store) => {
  const gridItem = document.createElement('li');
  const gridItemImage = document.createElement('img');
  const page = store.getState().page;
  const mediaId = store.getState().media[index + page * MEDIA.PAGE_SIZE];

  gridItem.appendChild(gridItemImage);
  gridItemImage.classList.add('media_logo');
  if (mediaId === undefined) return gridItem;
  themeStore.subscribe(
    state => setMediaLogo(gridItemImage, mediaId, state.theme),
    'view'
  );
  gridItemImage.classList.add(`media_${mediaId}`);
  setMediaLogo(gridItemImage, mediaId, themeStore.getState().theme);
  gridItem.appendChild(SubButtonArea(mediaId, navStore, store));
  return gridItem;
};

const MediaGrid = (themeStore, navStore, viewData) => {
  const viewAll = navStore.getState().media === 'all';
  const viewStore = new Store({
    page: 0,
    media: viewAll ? viewData.mediaData : viewData.subscribed,
  });
  const mediaGrid = document.createElement('ul');
  const [leftArrow, rightArrow] = setArrowButtons(viewStore);

  const draw = () => {
    clearAllChildren(mediaGrid);
    Array.from({ length: MEDIA.PAGE_SIZE }, (_, index) => {
      mediaGrid.appendChild(GridItem(themeStore, index, navStore, viewStore));
    });
    setArrowDisplay(viewStore, leftArrow, rightArrow);
  };

  viewStore.subscribe(draw);
  mediaGrid.classList.add('media_view_grid');
  draw();

  return mediaGrid;
};

export default MediaGrid;
