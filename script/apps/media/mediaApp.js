import ArrowButton from '../../components/media/ArrowButton.js';
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
    subscribed: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    media: defaultMedia,
    view: defaultView,
  });

  const render = () => {
    const navArea = document.querySelector('#media_view_nav');
    const mediaView = document.querySelector('#media_view');

    navArea.replaceWith(MediaNav(store));
    mediaView.replaceWith(MediaView(store));
  };

  const createLayout = () => {
    const wrapper = document.querySelector('#media_view_wrapper');
    const mediaView = document.createElement('div');

    mediaView.id = 'media_view';
    wrapper.append(ArrowButton('left'), mediaView, ArrowButton('right'));
  };

  store.subscribe(render);
  createLayout();
  render();
};

export default mediaApp;
