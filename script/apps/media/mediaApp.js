import Arrow from '../../components/media/Arrow.js';
import MediaNav from '../../components/media/MediaNav.js';
import MediaView from '../../components/media/MediaView.js';
import { MEDIA_APP_DATA } from '../../constants.js';
import Store from '../../core/Store.js';

const mediaApp = (defaultMedia, defaultView) => {
  const store = new Store({
    data: MEDIA_APP_DATA,
    defaultView: {
      all: 'grid',
      subscribed: 'list',
    },
    subscribed: [1, 2, 3, 4, 5, 15, 16, 17, 18, 19],
    media: defaultMedia,
    view: defaultView,
  });

  const draw = () => {
    const navArea = document.querySelector('#media_view_nav');
    const mediaView = document.querySelector('#media_view');

    navArea.replaceWith(MediaNav(store));
    mediaView.replaceWith(MediaView(store));
  };

  const createLayout = () => {
    const wrapper = document.querySelector('#media_view_wrapper');
    const mediaView = document.createElement('div');

    mediaView.id = 'media_view';
    wrapper.appendChild(Arrow('left'));
    wrapper.appendChild(mediaView);
    wrapper.appendChild(Arrow('right'));
  };

  store.subscribe(draw);
  createLayout();
  draw();
};

export default mediaApp;
