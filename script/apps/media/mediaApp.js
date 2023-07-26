import ArrowButton from '../../components/media/ArrowButton.js';
import MediaNav from '../../components/media/MediaNav.js';
import MediaView from '../../components/media/MediaView.js';
import NavStore from '../../store/NavStore.js';

const mediaApp = themeStore => {
  const navStore = new NavStore();
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

  navStore.subscribe(() => {
    document.eventManager.unregister(['view', 'button']);
  });
  navStore.subscribe(clearThemeStates);
  navStore.subscribe(render);
  createLayout();
  render();
};

export default mediaApp;
