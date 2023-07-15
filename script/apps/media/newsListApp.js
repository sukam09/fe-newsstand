import mediaData from '../../../assets/data/mediaData.js';
import MediaList from '../../components/media/MediaList.js';
import {
  clearAllChildren,
  createNewArrow,
  shuffleArray,
} from '../../utils/utils.js';

const createMediaArray = () => {
  const mediaArray = mediaData.category;

  mediaArray.forEach(category => {
    shuffleArray(category.media);
  });
  return mediaArray;
};

const setPage = (listData, newPage) => {
  listData.page = newPage;
  if (listData.page === -1) {
    listData.category = (listData.category - 1) % listData.categoryData.length;
    listData.page = listData.categoryData[listData.category].media.length - 1;
  }
  if (listData.page === listData.categoryData[listData.category].media.length) {
    listData.category = (listData.category + 1) % listData.categoryData.length;
    listData.page = 0;
  }
  initList(listData);
};

const setArrow = listData => {
  const [leftArrow, rightArrow] = createNewArrow();

  leftArrow.addEventListener('click', () => {
    setPage(listData, listData.page - 1);
  });
  rightArrow.addEventListener('click', () => {
    setPage(listData, listData.page + 1);
  });
};

const initList = listData => {
  const mediaView = document.querySelector('#media_view');

  clearAllChildren(mediaView);
  mediaView.appendChild(MediaList(listData, setPage));
};

const listApp = () => {
  const listData = {
    category: 0,
    page: 0,
    categoryData: createMediaArray(),
  };

  initList(listData);
  setArrow(listData);
};

export default listApp;
