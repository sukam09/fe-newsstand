import gridApp from './newsGridApp.js';
import addMediaNav from './nav/mediaNav.js';
import listApp from './newsListApp.js';
import { ArrowButton } from '../../components/Button.js';

const createMediaViewWrapper = () => {
  const mediaViewWrapper = document.createElement('div');
  const mediaView = document.createElement('div');

  mediaViewWrapper.id = 'media_view_wrapper';
  mediaView.id = 'media_view';
  mediaViewWrapper.appendChild(ArrowButton('left'));
  mediaViewWrapper.appendChild(mediaView);
  mediaViewWrapper.appendChild(ArrowButton('right'));

  return mediaViewWrapper;
};

const setLayout = mediaWrapper => {
  addMediaNav(mediaWrapper);
  mediaWrapper.appendChild(createMediaViewWrapper());
};

const initMedia = mediaWrapper => {
  setLayout(mediaWrapper);
};

const mediaApp = () => {
  const mediaWrapper = document.querySelector('#media_wrapper');

  mediaWrapper.mediaSelectData = [
    {
      id: 'media_select_all',
      text: '전체 언론사',
      handler: () => {
        console.log('전체');
      },
      checked: true,
    },
    {
      id: 'media_select_subscribed',
      text: '내가 구독한 언론사',
      handler: () => {
        console.log('구독');
      },
    },
  ];
  mediaWrapper.viewSelectData = [
    {
      id: 'view_list',
      icon: 'listView',
      handler: listApp,
    },
    {
      id: 'view_grid',
      icon: 'gridView',
      handler: gridApp,
      checked: true,
    },
  ];
  initMedia(mediaWrapper);
  gridApp();
};

export default mediaApp;
