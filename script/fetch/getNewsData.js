import { THEME } from '../constants.js';

const FETCH_PATH = 'script/newsData.json';
const MEDIA_LOGO_PATH = '../../assets/images/logo/';

export const getNewsData = async id => {
  return await fetch(FETCH_PATH)
    .then(response => response.json())
    .then(data => data.media[id]);
};

export const getCategoryData = async () => {
  return await fetch(FETCH_PATH)
    .then(response => response.json())
    .then(data => data.category);
};

export const getMediaArray = async idArray => {
  return await fetch(FETCH_PATH)
    .then(response => response.json())
    .then(data => idArray.map(id => data.media[id]));
};

export const getMediaLogo = (id, theme) => {
  const themePath = theme === THEME.DARK ? 'dark/' : 'light/';

  return `${MEDIA_LOGO_PATH}${themePath}${id}.png`;
};
