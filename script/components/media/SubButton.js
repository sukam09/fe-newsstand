import mediaData from '../../../assets/data/mediaData.js';
import { BUTTON, MSG } from '../../constants.js';
import Button from '../Button.js';
import SnackBar from '../SnackBar.js';
import UnsubAlert from './UnsubAlert.js';

const subscribe = (id, navStore, viewStore) => {
  document.querySelector('#media_view').appendChild(
    SnackBar(MSG.SUBSCRIBE, () => {
      const { media, view } = navStore.getState();

      if (media === 'subscribed' && view === 'list') return;
      navStore.setState({ media: 'subscribed', view: 'list' });
    })
  );
  navStore.getState().subscribed.push(id);
};

const unsubscribe = (id, navStore, viewStore) => {
  document.querySelector('#media_view').appendChild(
    UnsubAlert(id, mediaData.getName(id), id => {
      const { media, subscribed } = navStore.getState();
      const { page, media: sub } = viewStore.getState();

      subscribed.splice(subscribed.indexOf(id), 1);
      if (media === 'subscribed') {
        viewStore.setState({ page: page % sub.length });
      }
    })
  );
};

const SubButton = (id, navStore, viewStore, withText = true) => {
  if (navStore.getState().subscribed.includes(id)) {
    return Button({
      icon: 'close',
      isWhite: false,
      text: withText ? BUTTON.UNSUBSCRIBE : null,
      onClick: () => unsubscribe(id, navStore, viewStore),
    });
  }
  return Button({
    icon: 'plus',
    isWhite: true,
    text: BUTTON.SUBSCRIBE,
    once: true,
    onClick: () => subscribe(id, navStore),
  });
};

export const SubButtonArea = (id, navStore, viewStore) => {
  const subButtonArea = document.createElement('div');

  subButtonArea.classList.add('media_hover', 'surface_alt');
  subButtonArea.appendChild(SubButton(id, navStore, viewStore));
  return subButtonArea;
};

export default SubButton;
