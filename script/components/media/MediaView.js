import { MEDIA } from '../../constants.js';
import { getCategoryData } from '../../fetch/getNewsData.js';
import { shuffleArray } from '../../utils/utils.js';
import MediaGrid from './MediaGrid.js';
import MediaList from './MediaList.js';

const createMediaData = view => {
  if (view === 'grid') {
    const gridMediaData = Array.from(
      { length: MEDIA.TOTAL },
      (_, index) => index
    );

    return shuffleArray(gridMediaData);
  }
  return getCategoryData().then(category => {
    category.forEach(categoryData => {
      shuffleArray(categoryData.media);
    });
    return category;
  });
};

const MediaView = (themeStore, viewStore) => {
  const { view, subscribed } = viewStore.getState();
  const mediaView = document.createElement('div');
  const mediaData = createMediaData(view);

  mediaView.id = 'media_view';
  if (view === 'list') {
    mediaData.then(mediaData => {
      mediaView.appendChild(
        MediaList(themeStore, viewStore, { mediaData, subscribed })
      );
    });
  } else {
    mediaView.appendChild(
      MediaGrid(themeStore, viewStore, { mediaData, subscribed })
    );
  }
  return mediaView;
};

export default MediaView;
