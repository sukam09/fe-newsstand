import mediaData from '../../../assets/data/mediaData.js';
import { MEDIA } from '../../constants.js';
import { shuffleArray } from '../../utils/utils.js';
import MediaGrid from './MediaGrid.js';
import MediaList from './MediaList.js';

const createMediaData = () => {
  const gridMediaData = Array.from(
    { length: MEDIA.TOTAL },
    (_, index) => index
  );
  const listMediaData = mediaData;

  shuffleArray(gridMediaData);
  listMediaData.category.forEach(category => {
    shuffleArray(category.media);
  });
  return { grid: gridMediaData, list: listMediaData };
};

const MediaView = store => {
  const { view, subscribed } = store.getState();
  const mediaView = document.createElement('div');
  const { list, grid } = createMediaData();
  const content =
    view === 'list'
      ? MediaList(store, { list, subscribed })
      : MediaGrid(store, { grid, subscribed });

  mediaView.id = 'media_view';
  mediaView.appendChild(content);
  return mediaView;
};

export default MediaView;
