import { MSG } from '../../constants.js';
import { getNewsData } from '../../fetch/getNewsData.js';
import Button from '../Button.js';
import SnackBar from '../SnackBar.js';
import UnsubAlert from './UnsubAlert.js';

const subscribe = (id, navStore) => {
  document.querySelector('#media_view').appendChild(
    SnackBar(MSG.SUBSCRIBE, () => {
      const { media, view } = navStore.getState();

      if (media === 'subscribed' && view === 'list') return;
      navStore.setState({ media: 'subscribed', view: 'list' });
    })
  );
  navStore.getState().subscribed.push(id);
};

const SubButton = (id, navStore) => {
  return Button({
    icon: 'plus',
    isWhite: true,
    text: MSG.BUTTON_SUB,
    once: true,
    onClick: () => subscribe(id, navStore),
  });
};

const unsubscribe = (id, name, navStore, viewStore, button) => {
  document.querySelector('#media_view').appendChild(
    UnsubAlert(id, name, id => {
      const { media, subscribed } = navStore.getState();
      const { page, media: sub } = viewStore.getState();

      subscribed.splice(subscribed.indexOf(id), 1);
      if (media === 'subscribed') {
        viewStore.setState({ page: page % sub.length });
      } else {
        button.replaceWith(SubButton(id, navStore));
      }
    })
  );
};

const UnsubButton = (id, name, navStore, viewStore, withText) => {
  return Button({
    icon: 'close',
    isWhite: false,
    text: withText ? MSG.BUTTON_UNSUB : null,
    onClick: button => {
      unsubscribe(id, name, navStore, viewStore, button);
    },
  });
};

const SubToggleButton = ({
  id,
  name,
  navStore,
  viewStore,
  withText = true,
}) => {
  if (navStore.getState().subscribed.includes(id)) {
    return UnsubButton(id, name, navStore, viewStore, withText);
  }
  return SubButton(id, navStore);
};

export const SubButtonArea = ({ id, navStore, viewStore }) => {
  const subButtonArea = document.createElement('div');

  getNewsData(id).then(({ name }) => {
    subButtonArea.appendChild(
      SubToggleButton({ id, name, navStore, viewStore })
    );
  });
  subButtonArea.classList.add('media_hover', 'surface_alt');
  return subButtonArea;
};

export default SubToggleButton;
