import RadioInputWrapper from '../RadioInput.js';

const NavSelector = (selectData, name) => {
  const navSelector = document.createElement('div');
  navSelector.classList.add(`${name}_wrapper`);

  selectData.forEach(data => {
    navSelector.appendChild(RadioInputWrapper({ selectData: data, name }));
  });
  return navSelector;
};

const MediaNav = (mediaSelectData, viewSelectData) => {
  const mediaViewNav = document.createElement('nav');

  mediaViewNav.id = 'media_view_nav';
  mediaViewNav.appendChild(NavSelector(mediaSelectData, 'media_select'));
  mediaViewNav.appendChild(NavSelector(viewSelectData, 'view_select'));
  return mediaViewNav;
};

export default MediaNav;
