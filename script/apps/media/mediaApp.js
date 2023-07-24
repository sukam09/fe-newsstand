import ArrowButton from '../../components/media/ArrowButton.js';
import MediaNav from '../../components/media/MediaNav.js';
import MediaView from '../../components/media/MediaView.js';
import { MEDIA_APP_DATA } from '../../constants.js';
import Store from '../../core/Store.js';

const mediaApp = (themeStore, defaultMedia, defaultView) => {
  const viewStore = new Store({
    data: MEDIA_APP_DATA,
    defaultView: {
      all: 'grid',
      subscribed: 'list',
    },
    subscribed: [],
    media: defaultMedia,
    view: defaultView,
  });

  const clearThemeStates = () => {
    themeStore.unsubscribe('view');
  };
  const render = () => {
    const navArea = document.querySelector('#media_view_nav');
    const mediaView = document.querySelector('#media_view');

    navArea.replaceWith(MediaNav(viewStore));
    mediaView.replaceWith(MediaView(themeStore, viewStore));
  };

  const createLayout = () => {
    const wrapper = document.querySelector('#media_view_wrapper');
    const mediaView = document.createElement('div');

    mediaView.id = 'media_view';
    wrapper.append(ArrowButton('left'), mediaView, ArrowButton('right'));
  };

  viewStore.subscribe(clearThemeStates);
  viewStore.subscribe(render);
  createLayout();
  render();
};

export default mediaApp;
