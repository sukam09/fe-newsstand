import MediaNav from '../../components/media/MediaNav.js';
import gridApp from './newsGridApp.js';
import listApp from './newsListApp.js';
import Icon from '../../components/Icon.js';
import Arrow from '../../components/media/Arrow.js';

const MediaViewWrapper = () => {
  const mediaViewWrapper = document.createElement('div');
  const mediaView = document.createElement('div');

  mediaViewWrapper.id = 'media_view_wrapper';
  mediaView.id = 'media_view';
  mediaViewWrapper.appendChild(Arrow('left'));
  mediaViewWrapper.appendChild(mediaView);
  mediaViewWrapper.appendChild(Arrow('right'));
  return mediaViewWrapper;
};

const initMedia = mediaWrapper => {
  mediaWrapper.appendChild(
    MediaNav(mediaWrapper.mediaSelectData, mediaWrapper.viewSelectData)
  );
  mediaWrapper.appendChild(MediaViewWrapper());
};

const mediaApp = () => {
  const mediaWrapper = document.querySelector('#media_wrapper');

  mediaWrapper.mediaSelectData = [
    {
      id: 'media_select_all',
      innerHTML: '전체 언론사',
      onChange: () => {
        console.log('전체');
      },
      defaultChecked: true,
    },
    {
      id: 'media_select_subscribed',
      innerHTML: '내가 구독한 언론사',
      onChange: () => {
        console.log('구독');
      },
    },
  ];
  mediaWrapper.viewSelectData = [
    {
      id: 'view_list',
      innerHTML: Icon.listView,
      onChange: listApp,
    },
    {
      id: 'view_grid',
      innerHTML: Icon.gridView,
      onChange: gridApp,
      defaultChecked: true,
    },
  ];
  initMedia(mediaWrapper);
  gridApp();
};

export default mediaApp;
