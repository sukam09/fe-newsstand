import ArrowButton from '../../components/media/ArrowButton.js';
import MediaNav from '../../components/media/MediaNav.js';
import MediaView from '../../components/media/MediaView.js';
import { MEDIA_APP_DATA } from '../../constants.js';
import Store from '../../core/Store.js';

const mediaApp = (themeStore, defaultMedia, defaultView) => {
  const navStore = new Store({
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

    navArea.replaceWith(MediaNav(navStore));
    mediaView.replaceWith(MediaView(themeStore, navStore));
    mediaView.querySelectorAll('.snack_bar').forEach(snackbar => {
      snackbar.remove();
    });
  };
  const createLayout = () => {
    const wrapper = document.querySelector('#media_view_wrapper');
    const mediaView = document.createElement('div');

    mediaView.id = 'media_view';
    wrapper.append(ArrowButton('left'), mediaView, ArrowButton('right'));
  };

  navStore.subscribe(clearThemeStates);
  navStore.subscribe(render);
  createLayout();
  render();
};

export default mediaApp;
