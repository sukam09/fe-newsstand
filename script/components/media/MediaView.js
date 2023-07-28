import { MEDIA } from '../../constants.js';
import { getCategoryData } from '../../fetch/getNewsData.js';
import { shuffleArray } from '../../utils/utils.js';
import EmptySubscribed from './EmptySubscribed.js';
import MediaGrid from './grid/MediaGrid.js';
import MediaList from './list/MediaList.js';

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

const MediaView = (themeStore, navStore) => {
  const { media, view, subscribed } = navStore.getState();
  const mediaView = document.createElement('div');
  const mediaData = createMediaData(view);

  mediaView.id = 'media_view';
  if (media === 'subscribed' && subscribed.length === 0) {
    mediaView.appendChild(EmptySubscribed());
    return mediaView;
  }
  if (view === 'grid') {
    mediaView.appendChild(
      MediaGrid(themeStore, navStore, { mediaData, subscribed })
    );
    return mediaView;
  }
  mediaData.then(mediaData => {
    mediaView.appendChild(
      MediaList(themeStore, navStore, { mediaData, subscribed })
    );
  });
  return mediaView;
};

export default MediaView;
