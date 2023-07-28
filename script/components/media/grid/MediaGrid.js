import { MEDIA } from '../../../constants.js';
import { getNewsData } from '../../../fetch/getNewsData.js';
import GridStore from '../../../store/GridStore.js';
import { clearAllChildren, setMediaLogo } from '../../../utils/utils.js';
import Button from '../../Button.js';
import { replaceArrow } from '../ArrowButton.js';

const setArrowDisplay = (gridStore, leftArrow, rightArrow) => {
  const { page, media } = gridStore.getState();
  const hasNextPage = media.length > (page + 1) * MEDIA.PAGE_SIZE;
  const leftDisplay = page === 0 ? 'none' : null;
  const rightDisplay = page === MEDIA.MAX_PAGE || !hasNextPage ? 'none' : null;

  leftArrow.style.display = leftDisplay;
  rightArrow.style.display = rightDisplay;
};

const SubButtonArea = ({ id, navStore, viewStore }) => {
  const subButtonArea = document.createElement('div');

  getNewsData(id).then(({ name }) => {
    subButtonArea.appendChild(
      Button(navStore.buttonData({ id, name, viewStore }))
    );
  });
  subButtonArea.classList.add('media_hover', 'surface_alt');
  return subButtonArea;
};

const GridItem = (themeStore, mediaId, navStore, gridStore) => {
  const gridItem = document.createElement('li');
  const gridItemImage = document.createElement('img');

  gridItem.appendChild(gridItemImage);
  gridItemImage.classList.add('media_logo');
  if (mediaId === undefined) return gridItem;
  themeStore.subscribe(
    state => setMediaLogo(gridItemImage, mediaId, state.theme),
    'view'
  );
  gridItemImage.classList.add(`media_${mediaId}`);
  setMediaLogo(gridItemImage, mediaId, themeStore.getState().theme);
  gridItem.appendChild(
    SubButtonArea({ id: mediaId, navStore, viewStore: gridStore })
  );
  return gridItem;
};

const MediaGrid = (themeStore, navStore, viewData) => {
  const viewAll = navStore.getState().media === 'all';
  const gridStore = new GridStore(viewData, viewAll);
  const mediaGrid = document.createElement('ul');
  const [leftArrow, rightArrow] = replaceArrow();

  const render = () => {
    clearAllChildren(mediaGrid);
    Array.from({ length: MEDIA.PAGE_SIZE }, (_, index) => {
      mediaGrid.appendChild(
        GridItem(themeStore, gridStore.getMediaId(index), navStore, gridStore)
      );
    });
    setArrowDisplay(gridStore, leftArrow, rightArrow);
  };

  gridStore.addArrowListener(leftArrow, rightArrow);
  gridStore.subscribe(render);
  mediaGrid.classList.add('media_view_grid');
  render();
  return mediaGrid;
};

export default MediaGrid;
